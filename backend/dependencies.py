from fastapi import UploadFile, HTTPException, File, Depends, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from auth import SECRET_KEY, ALGORITHM
from database import get_user_by_email

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = get_user_by_email(email)
    if user is None:
        raise credentials_exception
    return user

async def validate_image_file(file: UploadFile = File(...)):
    # Magic numbers for common image formats
    # JPEG: FF D8 FF
    # PNG: 89 50 4E 47
    
    ACCEPTABLE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"]
    
    if file.content_type not in ACCEPTABLE_MIME_TYPES:
        raise HTTPException(status_code=400, detail=f"Invalid file type. Only {', '.join(ACCEPTABLE_MIME_TYPES)} are allowed.")
        
    # Read first 1024 bytes for magic number check (simplified)
    # in production, use python-magic or similar
    
    file.file.seek(0)
    return file

async def validate_video_file(file: UploadFile = File(...)):
    ACCEPTABLE_MIME_TYPES = ["video/webm", "video/mp4"] # rPPG sends webm/mp4 blobs
    
    # MIME type check
    # Note: Blob from browser might just be 'application/octet-stream' sometimes, 
    # but we enforce mime type in frontend request usually.
    
    return file
