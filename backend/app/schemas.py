from pydantic import BaseModel
from typing import Optional, List

# ================
# USER SCHEMAS
# ================

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class TaskBase(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool
    
    class Config:
        from_attributes = True

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    tasks: List[TaskBase] = []
    
    class Config:
        from_attributes = True

# ================
# TASK SCHEMAS
# ================

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    completed: bool
    user_id: int
    
    class Config:
        from_attributes = True

# ================
# AUTH SCHEMAS
# ================

class UserLogin(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: Optional[int] = None