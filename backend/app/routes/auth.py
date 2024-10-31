from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter()

class UserLogin(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(user_data: UserLogin):
    # Demo login - replace with actual authentication
    if user_data.email == "demo@example.com" and user_data.password == "demo":
        return {"access_token": "demo_token", "token_type": "bearer"}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password"
    )