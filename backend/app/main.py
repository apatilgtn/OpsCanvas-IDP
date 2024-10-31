from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, projects

app = FastAPI(title="Platform API")

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(projects.router, prefix="/api/projects", tags=["projects"])

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}