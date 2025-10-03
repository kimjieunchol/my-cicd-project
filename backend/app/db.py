import json
import psycopg2
from psycopg2.extras import execute_values
from datetime import datetime

conn = psycopg2.connect(
    dbname='your_db',
    user='your_user',
    password='your_password',
    host='localhost',
    port='5432'
)
cur = conn.cursor()

def insert_notices(json_path='data/notices.json'):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    records = []
    for item in data:
        post_date = datetime.strptime(item['date'].split('(')[0], '%Y-%m-%d')
        register_date = datetime.strptime(item['date'].split(':')[-1].strip(')'), '%Y-%m-%d')
        records.append((
            item.get('title','°øÁö'),
            item['text'],
            item.get('image_path'),
            item.get('contact'),
            item.get('department'),
            post_date,
            register_date,
            None
        ))
    insert_query = \"\"\"
    INSERT INTO notices
    (title, content, image_path, contact, department, post_date, register_date, vector)
    VALUES %s
    \"\"\"
    execute_values(cur, insert_query, records)
    conn.commit()
    cur.close()
    conn.close()
