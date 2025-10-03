import json
import os
import requests
from openai import OpenAI

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
SPRING_API_URL = os.environ.get("SPRING_API_URL", "http://localhost:8080/api/notices")

client = OpenAI(api_key=OPENAI_API_KEY)

def get_embedding(text):
    """OpenAI text-embedding-3-small 임베딩 생성"""
    resp = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return [float(x) for x in resp.data[0].embedding]

def main():
    with open("aca_notice_data_backup.json", "r", encoding="utf-8") as f:
        data_list = json.load(f)

    for item in data_list:
        vector = get_embedding(item.get("text", ""))

        # 날짜를 YYYY-MM-DD 형식으로 Python에서 처리
        post_date = item.get("post_date")  # 예: "2025-09-22"
        register_date = item.get("register_date")  # 예: "2025-02-28"

        payload = {
            "seq": item.get("seq"),
            "url": item.get("url"),
            "content": item.get("text"),
            "imagePath": item.get("image_path"),
            "contact": item.get("contact"),
            "department": item.get("department"),
            "postDate": post_date,
            "registerDate": register_date,
            "vector": vector
        }

        resp = requests.post(SPRING_API_URL, json=payload)
        if resp.status_code == 200:
            print(f"Notice {item.get('seq')} inserted.")
        else:
            print(f"Failed to insert {item.get('seq')}: {resp.text}")

if __name__ == "__main__":
    main()
