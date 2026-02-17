from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
from database import init_db
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

# Import Routers
from routers import vitals, vision, diagnostics, system, auth

# ... (rest of imports)



# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("AyurAI.Main")

# Setup Rate Limiter
limiter = Limiter(key_func=get_remote_address, default_limits=["100/minute"])

app = FastAPI(title="AyurAI Engine", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configure CORS
origins = [
    "http://localhost:3000",  # Next.js frontend
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:11000",
    "http://127.0.0.1:11000",
    "http://192.168.1.103:11000",
    "http://192.168.1.103:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    init_db()
    logger.info("AyurAI Engine Started")

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # Dont catch RateLimitExceeded here, let slowapi handle it
    if isinstance(exc, RateLimitExceeded):
         return _rate_limit_exceeded_handler(request, exc)
         
    logger.error(f"Global Exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error. The Vaidya is currently unavailable.", "details": str(exc)}
    )

@app.get("/")
async def root():
    return {"message": "AyurAI Diagnostic Engine Ready", "status": "online"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Include Routers
app.include_router(auth.router)
app.include_router(vitals.router)
app.include_router(vision.router)
app.include_router(diagnostics.router)
app.include_router(system.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=10000, reload=True)
