from fastapi import WebSocket

clients = []

async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for client in clients:
                await client.send_text(f'���� ����: {data}')
    except:
        clients.remove(websocket)
