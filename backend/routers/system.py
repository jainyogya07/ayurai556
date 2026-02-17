from fastapi import APIRouter
import psutil
import time
import os

router = APIRouter(prefix="/api/system", tags=["System"])
start_time = time.time()

@router.get("/health")
async def system_health():
    process = psutil.Process(os.getpid())
    return {
        "status": "online",
        "uptime_seconds": round(time.time() - start_time, 2),
        "cpu_percent": psutil.cpu_percent(),
        "memory_info": {
            "rss": process.memory_info().rss / 1024 / 1024, # MB
            "percent": process.memory_percent()
        }
    }
