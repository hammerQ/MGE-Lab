from typing import Optional, List
import os
import json
from datetime import datetime

from app.models.user import UserCreate, UserUpdate, UserInDB, PasswordReset
from app.utils.security import get_password_hash, verify_password


class UserService:
    def __init__(self):
        self.file_path = "user_details.txt"
        self.ensure_file_exists()

    def ensure_file_exists(self):
        """Create the user details file if it doesn't exist"""
        if not os.path.exists(self.file_path):
            with open(self.file_path, 'w') as f:
                f.write("[]")

    def _read_users(self) -> List[dict]:
        """Read all users from the text file"""
        try:
            with open(self.file_path, 'r') as f:
                content = f.read().strip()
                if not content:
                    return []
                return json.loads(content)
        except (FileNotFoundError, json.JSONDecodeError):
            return []

    def _write_users(self, users: List[dict]):
        """Write all users to the text file"""
        with open(self.file_path, 'w') as f:
            json.dump(users, f, indent=2, default=str)

    def create_user(self, user_data: UserCreate) -> UserInDB:
        """Create a new user"""
        users = self._read_users()
        
        # Check if user with this mobile phone already exists
        if any(user['mobile_phone'] == user_data.mobile_phone for user in users):
            raise ValueError("User with this mobile phone already exists")
        
        # Check if user with this email already exists
        if any(user['email'] == user_data.email for user in users):
            raise ValueError("User with this email already exists")
        
        # Hash the password
        hashed_password = get_password_hash(user_data.password)
        
        # Create user document
        user_dict = user_data.dict()
        user_dict["hashed_password"] = hashed_password
        del user_dict["password"]
        user_dict["created_at"] = datetime.utcnow()
        user_dict["updated_at"] = None
        
        user_doc = UserInDB(**user_dict)
        
        # Add to users list
        users.append(user_doc.dict())
        
        # Write back to file
        self._write_users(users)
        
        return user_doc

    def get_user_by_mobile_phone(self, mobile_phone: str) -> Optional[UserInDB]:
        """Get user by mobile phone number"""
        users = self._read_users()
        for user_data in users:
            if user_data['mobile_phone'] == mobile_phone:
                return UserInDB(**user_data)
        return None

    def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        """Get user by email"""
        users = self._read_users()
        for user_data in users:
            if user_data['email'] == email:
                return UserInDB(**user_data)
        return None

    def update_user(self, mobile_phone: str, user_data: UserUpdate) -> Optional[UserInDB]:
        """Update user by mobile phone"""
        users = self._read_users()
        
        for i, user in enumerate(users):
            if user['mobile_phone'] == mobile_phone:
                # Only update fields that are provided
                update_data = {k: v for k, v in user_data.dict().items() if v is not None}
                
                if not update_data:
                    return UserInDB(**user)
                
                # Update the user data
                user.update(update_data)
                user['updated_at'] = datetime.utcnow()
                
                # Write back to file
                self._write_users(users)
                
                return UserInDB(**user)
        
        return None

    def delete_user(self, mobile_phone: str) -> bool:
        """Delete user by mobile phone"""
        users = self._read_users()
        
        for i, user in enumerate(users):
            if user['mobile_phone'] == mobile_phone:
                users.pop(i)
                self._write_users(users)
                return True
        
        return False

    def get_all_users(self, skip: int = 0, limit: int = 100) -> List[UserInDB]:
        """Get all users with pagination"""
        users = self._read_users()
        paginated_users = users[skip:skip + limit]
        return [UserInDB(**user) for user in paginated_users]

    def authenticate_user(self, mobile_phone: str, password: str) -> Optional[UserInDB]:
        """Authenticate user with mobile phone and password"""
        user = self.get_user_by_mobile_phone(mobile_phone)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def reset_password(self, reset_data: PasswordReset) -> bool:
        """Reset user password"""
        users = self._read_users()
        
        for i, user in enumerate(users):
            if user['mobile_phone'] == reset_data.mobile_phone:
                # Hash the new password
                hashed_password = get_password_hash(reset_data.new_password)
                
                # Update the password
                user['hashed_password'] = hashed_password
                user['updated_at'] = datetime.utcnow()
                
                # Write back to file
                self._write_users(users)
                
                return True
        
        return False

    def user_exists(self, mobile_phone: str) -> bool:
        """Check if user exists by mobile phone"""
        return self.get_user_by_mobile_phone(mobile_phone) is not None


user_service = UserService() 