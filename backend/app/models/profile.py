from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
import re


class FatherInfo(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50)
    middle_name: Optional[str] = Field(None, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    birth_year: int = Field(..., ge=1900, le=2024)
    birth_month: int = Field(..., ge=1, le=12)
    birth_day: int = Field(..., ge=1, le=31)

    @field_validator('first_name', 'middle_name', 'last_name')
    @classmethod
    def validate_name_letters(cls, v):
        if v and not re.match(r'^[A-Za-z\s]+$', v):
            raise ValueError('Names must contain only letters and spaces')
        return v


class MotherInfo(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50)
    middle_name: Optional[str] = Field(None, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    birth_year: int = Field(..., ge=1900, le=2024)
    birth_month: int = Field(..., ge=1, le=12)
    birth_day: int = Field(..., ge=1, le=31)

    @field_validator('first_name', 'middle_name', 'last_name')
    @classmethod
    def validate_name_letters(cls, v):
        if v and not re.match(r'^[A-Za-z\s]+$', v):
            raise ValueError('Names must contain only letters and spaces')
        return v


class ChildInfo(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=50)
    middle_name: Optional[str] = Field(None, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)
    gender: str = Field(..., regex=r'^(male|female|other)$')
    birth_year: int = Field(..., ge=2000, le=2024)
    birth_month: int = Field(..., ge=1, le=12)
    birth_day: int = Field(..., ge=1, le=31)

    @field_validator('first_name', 'middle_name', 'last_name')
    @classmethod
    def validate_name_letters(cls, v):
        if v and not re.match(r'^[A-Za-z\s]+$', v):
            raise ValueError('Names must contain only letters and spaces')
        return v


class PetInfo(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    pet_type: str = Field(..., regex=r'^(dog|cat)$')
    breed: str = Field(..., min_length=1, max_length=50)
    color: str = Field(..., min_length=1, max_length=50)

    @field_validator('name', 'breed', 'color')
    @classmethod
    def validate_pet_fields(cls, v):
        if not re.match(r'^[A-Za-z0-9\s]+$', v):
            raise ValueError('Pet information must contain only letters, numbers, and spaces')
        return v


class UserProfileCreate(BaseModel):
    father: FatherInfo
    mother: MotherInfo
    child: ChildInfo
    pet: Optional[PetInfo] = None


class UserProfileUpdate(BaseModel):
    father: Optional[FatherInfo] = None
    mother: Optional[MotherInfo] = None
    child: Optional[ChildInfo] = None
    pet: Optional[PetInfo] = None


class UserProfile(UserProfileCreate):
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime] = None 