import json
import os
from datetime import datetime
from typing import List, Optional
from app.models.profile import UserProfile, UserProfileCreate, UserProfileUpdate


class ProfileService:
    def __init__(self, profile_file: str = "user_profile.txt"):
        self.profile_file = profile_file
        self._ensure_file_exists()

    def _ensure_file_exists(self):
        """Create the profile file if it doesn't exist."""
        if not os.path.exists(self.profile_file):
            with open(self.profile_file, 'w') as f:
                json.dump([], f)

    def _load_profiles(self) -> List[dict]:
        """Load all profiles from the file."""
        try:
            with open(self.profile_file, 'r') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return []

    def _save_profiles(self, profiles: List[dict]):
        """Save all profiles to the file."""
        with open(self.profile_file, 'w') as f:
            json.dump(profiles, f, indent=2, default=str)

    def create_profile(self, user_id: str, profile_data: UserProfileCreate) -> UserProfile:
        """Create a new user profile."""
        profiles = self._load_profiles()
        
        # Check if profile already exists
        for profile in profiles:
            if profile.get('user_id') == user_id:
                raise ValueError("Profile already exists for this user")

        # Create new profile
        new_profile = UserProfile(
            user_id=user_id,
            father=profile_data.father,
            mother=profile_data.mother,
            child=profile_data.child,
            pet=profile_data.pet,
            created_at=datetime.now(),
            updated_at=None
        )

        # Convert to dict and save
        profile_dict = new_profile.model_dump()
        profiles.append(profile_dict)
        self._save_profiles(profiles)

        return new_profile

    def get_profile_by_user_id(self, user_id: str) -> Optional[UserProfile]:
        """Get profile by user ID."""
        profiles = self._load_profiles()
        
        for profile in profiles:
            if profile.get('user_id') == user_id:
                return UserProfile(**profile)
        
        return None

    def update_profile(self, user_id: str, profile_update: UserProfileUpdate) -> Optional[UserProfile]:
        """Update an existing user profile."""
        profiles = self._load_profiles()
        
        for i, profile in enumerate(profiles):
            if profile.get('user_id') == user_id:
                # Update fields that are provided
                update_data = profile_update.model_dump(exclude_unset=True)
                
                for field, value in update_data.items():
                    if value is not None:
                        profile[field] = value
                
                profile['updated_at'] = datetime.now().isoformat()
                profiles[i] = profile
                self._save_profiles(profiles)
                
                return UserProfile(**profile)
        
        return None

    def delete_profile(self, user_id: str) -> bool:
        """Delete a user profile."""
        profiles = self._load_profiles()
        
        for i, profile in enumerate(profiles):
            if profile.get('user_id') == user_id:
                del profiles[i]
                self._save_profiles(profiles)
                return True
        
        return False

    def get_all_profiles(self, skip: int = 0, limit: int = 100) -> List[UserProfile]:
        """Get all profiles with pagination."""
        profiles = self._load_profiles()
        paginated_profiles = profiles[skip:skip + limit]
        
        return [UserProfile(**profile) for profile in paginated_profiles]


# Create a global instance
profile_service = ProfileService() 