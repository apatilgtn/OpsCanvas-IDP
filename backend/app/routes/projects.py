from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None

class Project(ProjectCreate):
    id: int
    owner_id: int

@router.get("/", response_model=List[Project])
async def list_projects():
    # Demo projects - replace with database query
    return [
        {
            "id": 1,
            "name": "Demo Project",
            "description": "A demo project",
            "owner_id": 1
        }
    ]

@router.post("/", response_model=Project)
async def create_project(project: ProjectCreate):
    # Demo creation - replace with database insertion
    return {
        "id": 2,
        "name": project.name,
        "description": project.description,
        "owner_id": 1
    }