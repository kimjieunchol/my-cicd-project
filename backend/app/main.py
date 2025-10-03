from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from app.db import insert_notices
from app.llm_service import create_notice_embeddings, query_notice
from app.websocket import websocket_endpoint

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.on_event('startup')
def startup_event():
    insert_notices()           # JSON -> DB
    create_notice_embeddings() # ���� �Ӻ��� ����

@app.get('/notices')
def notices():
    return '���� ����� DB Ȯ��'

@app.get('/query')
def query(q: str):
    return {'answer': query_notice(q)}

@app.websocket('/ws')
async def ws_endpoint(websocket: WebSocket):
    await websocket_endpoint(websocket)
