from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional
from datetime import datetime
import re


class UserBase(BaseModel):
    mobile_phone: str = Field(..., description="Mobile phone number (username)")
    email: EmailStr
    name: str
    is_active: bool = True

    @field_validator('mobile_phone')
    @classmethod
    def validate_mobile_phone(cls, v):
        # Basic mobile phone validation (you can customize this)
        if not re.match(r'^\+?1?\d{10,15}$', v):
            raise ValueError('Invalid mobile phone number format')
        return v


class UserCreate(UserBase):
    password: str

    @field_validator('password')
    @classmethod
    def validate_password(cls, v):
        if len(v) < 4:
            raise ValueError('Password must be at least 4 characters long')
        if len(v) > 12:
            raise ValueError('Password must be less than 12 characters long')
        if not re.match(r'^[A-Za-z0-9]+$', v):
            raise ValueError('Password can only contain letters and numbers')
        return v


class UserUpdate(BaseModel):
    mobile_phone: Optional[str] = None
    email: Optional[EmailStr] = None
    name: Optional[str] = None
    is_active: Optional[bool] = None

    @field_validator('mobile_phone')
    @classmethod
    def validate_mobile_phone(cls, v):
        if v is not None:
            if not re.match(r'^\+?1?\d{10,15}$', v):
                raise ValueError('Invalid mobile phone number format')
        return v


class UserInDB(UserBase):
    id: str = Field(default_factory=lambda: str(datetime.utcnow().timestamp()).replace('.', ''))
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True


class User(UserBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None


class PasswordReset(BaseModel):
    mobile_phone: str
    new_password: str

    @field_validator('mobile_phone')
    @classmethod
    def validate_mobile_phone(cls, v):
        if not re.match(r'^\+?1?\d{10,15}$', v):
            raise ValueError('Invalid mobile phone number format')
        return v

    @field_validator('new_password')
    @classmethod
    def validate_password(cls, v):
        if len(v) < 4:
            raise ValueError('Password must be at least 4 characters long')
        if len(v) > 12:
            raise ValueError('Password must be less than 12 characters long')
        if not re.match(r'^[A-Za-z0-9]+$', v):
            raise ValueError('Password can only contain letters and numbers')
        return v 