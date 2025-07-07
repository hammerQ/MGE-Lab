from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import List
from datetime import timedelta

from app.core.config import settings
from app.models.user import User, UserCreate, UserUpdate, PasswordReset
from app.models.profile import UserProfile, UserProfileCreate, UserProfileUpdate
from app.services.user_service import user_service
from app.services.profile_service import profile_service
from app.utils.security import create_access_token, decode_access_token

# Create main API router
api_router = APIRouter()

# OAuth2 scheme for token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Get current user from token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception
    
    mobile_phone: str = payload.get("sub")
    if mobile_phone is None:
        raise credentials_exception
    
    user = user_service.get_user_by_mobile_phone(mobile_phone)
    if user is None:
        raise credentials_exception
    
    return user


@api_router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login endpoint - username should be mobile phone number"""
    user = user_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect mobile phone number or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    access_token = create_access_token(
        data={"sub": user.mobile_phone}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@api_router.post("/users/", response_model=User)
async def create_user(user: UserCreate):
    """Create a new user"""
    try:
        db_user = user_service.create_user(user)
        return User(
            id=db_user.id,
            mobile_phone=db_user.mobile_phone,
            email=db_user.email,
            name=db_user.name,
            is_active=db_user.is_active,
            created_at=db_user.created_at,
            updated_at=db_user.updated_at
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@api_router.get("/users/me", response_model=User)
async def read_users_me(current_user=Depends(get_current_user)):
    """Get current user info"""
    return User(
        id=current_user.id,
        mobile_phone=current_user.mobile_phone,
        email=current_user.email,
        name=current_user.name,
        is_active=current_user.is_active,
        created_at=current_user.created_at,
        updated_at=current_user.updated_at
    )


@api_router.get("/users/{mobile_phone}", response_model=User)
async def read_user(mobile_phone: str, current_user=Depends(get_current_user)):
    """Get user by mobile phone"""
    user = user_service.get_user_by_mobile_phone(mobile_phone)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return User(
        id=user.id,
        mobile_phone=user.mobile_phone,
        email=user.email,
        name=user.name,
        is_active=user.is_active,
        created_at=user.created_at,
        updated_at=user.updated_at
    )


@api_router.put("/users/{mobile_phone}", response_model=User)
async def update_user(
    mobile_phone: str, 
    user_update: UserUpdate, 
    current_user=Depends(get_current_user)
):
    """Update user"""
    user = user_service.update_user(mobile_phone, user_update)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return User(
        id=user.id,
        mobile_phone=user.mobile_phone,
        email=user.email,
        name=user.name,
        is_active=user.is_active,
        created_at=user.created_at,
        updated_at=user.updated_at
    )


@api_router.delete("/users/{mobile_phone}")
async def delete_user(mobile_phone: str, current_user=Depends(get_current_user)):
    """Delete user"""
    success = user_service.delete_user(mobile_phone)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}


@api_router.get("/users/", response_model=List[User])
async def read_users(
    skip: int = 0, 
    limit: int = 100, 
    current_user=Depends(get_current_user)
):
    """Get all users"""
    users = user_service.get_all_users(skip=skip, limit=limit)
    return [
        User(
            id=user.id,
            mobile_phone=user.mobile_phone,
            email=user.email,
            name=user.name,
            is_active=user.is_active,
            created_at=user.created_at,
            updated_at=user.updated_at
        )
        for user in users
    ]


@api_router.post("/reset-password")
async def reset_password(reset_data: PasswordReset):
    """Reset user password"""
    # Check if user exists
    if not user_service.user_exists(reset_data.mobile_phone):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with this mobile phone number not found"
        )
    
    # Reset password
    success = user_service.reset_password(reset_data)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to reset password"
        )
    
    return {"message": "Password reset successfully"}


@api_router.post("/check-user")
async def check_user_exists(mobile_phone: str):
    """Check if user exists by mobile phone"""
    exists = user_service.user_exists(mobile_phone)
    return {"exists": exists}


# Profile routes
@api_router.post("/profile/", response_model=UserProfile)
async def create_profile(profile: UserProfileCreate, current_user=Depends(get_current_user)):
    """Create a new user profile"""
    try:
        db_profile = profile_service.create_profile(current_user.id, profile)
        return db_profile
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@api_router.get("/profile/me", response_model=UserProfile)
async def get_my_profile(current_user=Depends(get_current_user)):
    """Get current user's profile"""
    profile = profile_service.get_profile_by_user_id(current_user.id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@api_router.put("/profile/me", response_model=UserProfile)
async def update_my_profile(
    profile_update: UserProfileUpdate,
    current_user=Depends(get_current_user)
):
    """Update current user's profile"""
    profile = profile_service.update_profile(current_user.id, profile_update)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@api_router.delete("/profile/me")
async def delete_my_profile(current_user=Depends(get_current_user)):
    """Delete current user's profile"""
    success = profile_service.delete_profile(current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"message": "Profile deleted successfully"} 