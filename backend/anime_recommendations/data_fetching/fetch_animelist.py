import requests
import json
from dotenv import load_dotenv
import os
import time

# Load environment variables
load_dotenv()
client_id = os.getenv("MAL_CLIENT_ID")

# Constants
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "data", "user_data")
USERNAMES_FILE = os.path.join(SCRIPT_DIR, "data", "usernames", "unique_usernames.json")

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# API headers
headers = {
    "X-MAL-CLIENT-ID": client_id
}

# API parameters
params = {
    "fields": "list_status",
    "limit": 1000  # max allowed per request
}


def get_user_anime_list(username):
    print(f"Fetching list for: {username}")
    all_anime = []
    next_url = f"https://api.myanimelist.net/v2/users/{username}/animelist"

    while next_url:
        response = requests.get(next_url, headers=headers, params=params)
        
        if response.status_code == 200:
            data = response.json()
            all_anime.extend(data.get("data", []))
            next_url = data.get("paging", {}).get("next", None)
            time.sleep(0.5)  # rate limiting precaution
        elif response.status_code == 403:
            print(f"⚠️  Skipping '{username}': List is private or access is forbidden.")
            return None
        elif response.status_code == 404:
            print(f"❌ Skipping '{username}': User not found.")
            return None
        else:
            print(f"🔥 Error fetching '{username}': {response.status_code} {response.text}")
            return None

    return shrink_anime_list(all_anime)


def shrink_anime_list(full_data):
    shrunk_data = []
    for entry in full_data:
        node = entry.get("node", {})
        list_status = entry.get("list_status", {})
        shrunk_data.append({
            "id": node.get("id"),
            "status": list_status.get("status"),
            "score": list_status.get("score"),
            "episodes_watched": list_status.get("num_episodes_watched"),
        })
    return shrunk_data


def main():
    # Load usernames
    with open(USERNAMES_FILE, "r", encoding="utf-8") as f:
        usernames = json.load(f)

    for username in usernames:
        output_file = os.path.join(OUTPUT_DIR, f"{username}_anime_list.json")

        # Skip if already fetched
        if os.path.exists(output_file):
            print(f"✅ Already saved: {username}")
            continue

        # Fetch and save
        data = get_user_anime_list(username)
        if data is not None:
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            print(f"💾 Saved: {username}")
        time.sleep(1)  # additional delay to avoid rate limiting


if __name__ == "__main__":
    main()
