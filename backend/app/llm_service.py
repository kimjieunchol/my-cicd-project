import os
import psycopg2
from psycopg2.extras import RealDictCursor
from langchain.embeddings import OpenAIEmbeddings
from langchain.llms import OpenAI

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
llm = OpenAI(openai_api_key=OPENAI_API_KEY)
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)

conn = psycopg2.connect(
    dbname='your_db',
    user='your_user',
    password='your_password',
    host='localhost',
    port='5432'
)
cur = conn.cursor(cursor_factory=RealDictCursor)

def create_notice_embeddings():
    cur.execute("SELECT id, content FROM notices WHERE vector IS NULL")
    rows = cur.fetchall()
    for row in rows:
        vector = embeddings.embed_query(row['content'])
        cur.execute("UPDATE notices SET vector=%s WHERE id=%s", (vector, row['id']))
    conn.commit()

def query_notice(query, top_k=3):
    query_vec = embeddings.embed_query(query)
    cur.execute(
        \"\"\"
        SELECT id, title, content, post_date
        FROM notices
        ORDER BY vector <-> %s
        LIMIT %s
        \"\"\",
        (query_vec, top_k)
    )
    results = cur.fetchall()
    combined = '\\n'.join([r['content'] for r in results])
    return llm(f'다음 공지를 요약해서 답변해줘:\\n{combined}')
