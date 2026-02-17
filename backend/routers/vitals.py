from fastapi import APIRouter, UploadFile, File, WebSocket, WebSocketDisconnect, Depends
from fastapi.concurrency import run_in_threadpool
import logging
from rppg import processor
from dependencies import validate_video_file

router = APIRouter(prefix="/api", tags=["Vitals"])
logger = logging.getLogger("AyurAI.Vitals")

@router.websocket("/ws/rppg")
async def rppg_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_bytes()
            # Run CPU-bound signal processing in a separate thread
            result = await run_in_threadpool(processor.process_frame, data)
            
            if result:
                await websocket.send_json(result)
            else:
                await websocket.send_json({"bpm": None, "signal": 0, "snr": 0})
                
    except WebSocketDisconnect:
        logger.info("rPPG Client disconnected")
    except Exception as e:
        logger.error(f"WebSocket Error: {e}")
        try:
            await websocket.close()
        except:
            pass

@router.post("/rppg")
async def process_rppg(file: UploadFile = File(...)): # Removed strict validation here for raw blobs/testing
    contents = await file.read()
    result = await run_in_threadpool(processor.process_frame, contents)
    return result if result else {"bpm": None, "signal": 0}
