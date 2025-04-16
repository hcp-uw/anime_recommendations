import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()
username = "CactiCognoscente"  # replace with actual MAL username
client_id = os.getenv("MAL_CLIENT_ID")

url = f"https://api.myanimelist.net/v2/users/{username}/animelist"
params = {
    "fields": "list_status",
    "limit": 1000  # max per request; MAL might paginate beyond this
}
headers = {
    "X-MAL-CLIENT-ID": client_id
}
def get_user_anime_list():
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        shrunk_data = shrink_anime_list(data)
        with open(f"./backend/anime_recommendations/data_fetching/data/user_data/{username}_anime_list.json", "w") as f:
            json.dump(shrunk_data, f, indent=2)
        print("Anime list saved!")
    else:
        print("Error:", response.status_code, response.text)

def shrink_anime_list(full_data):
    shrunk_data = []
    # Iterate through the data and extract relevant fields
    for entry in full_data.get("data"):
        node = entry["node"]
        list_status = entry["list_status"]

        shrunk_data.append({
            "id": node["id"],
            "title": node["title"],
            "status": list_status["status"],
            "score": list_status["score"],
            "episodes_watched": list_status["num_episodes_watched"],
        })
    return shrunk_data

if __name__ == "__main__":
    get_user_anime_list()
