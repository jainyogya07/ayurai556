from fastapi import APIRouter, UploadFile, File, Depends
from fastapi.concurrency import run_in_threadpool
from vision import analyzer
from dependencies import validate_image_file

router = APIRouter(prefix="/api/vision", tags=["Vision"])

@router.post("/tongue")
async def analyze_tongue(file: UploadFile = Depends(validate_image_file)):
    contents = await file.read()
    # Offload heavy CV analysis to threadpool
    result = await run_in_threadpool(analyzer.analyze_image, contents)
    return result
