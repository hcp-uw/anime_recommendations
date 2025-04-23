import requests
import json
import time

TOTAL_PAGES = 1139
BATCH_SIZE = 10
START_PAGE = 100
BASE_URL = "https://api.jikan.moe/v4/anime?page={}"
OUTPUT_FILE_TEMPLATE = "anime_pages_{:03}.json"
DELAY = 1  # Slight delay to be nice to the API (Jikan rate limit = ~2 req/sec)

def fetch_page(page_num):
    url = BASE_URL.format(page_num)
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()["data"]
    else:
        print(f"Failed to fetch page {page_num}: {response.status_code}")
        return []

def main():
    for start_page in range(START_PAGE, TOTAL_PAGES + 1, BATCH_SIZE):
        all_data = []
        end_page = min(start_page + BATCH_SIZE - 1, TOTAL_PAGES)
        print(f"Fetching pages {start_page} to {end_page}...")

        for page in range(start_page, end_page + 1):
            data = fetch_page(page)
            all_data.extend(data)
            time.sleep(DELAY)

        file_index = (start_page - 1) // BATCH_SIZE + 1
        file_name = OUTPUT_FILE_TEMPLATE.format(file_index)

        with open(f"./backend/anime_recommendations/data_fetching/data/all_anime/{file_name}", "w", encoding="utf-8") as f:
            json.dump(all_data, f, ensure_ascii=False, indent=2)

        print(f"Saved {len(all_data)} anime entries to {file_name}")

if __name__ == "__main__":
    main()
