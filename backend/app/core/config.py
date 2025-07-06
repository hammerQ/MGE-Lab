from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    secret_key: str = "your-secret-key-change-this-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    cors_origins: List[str] = ["http://localhost:3000", "http://localhost:8080"]
    debug: bool = True

    class Config:
        env_file = ".env"


settings = Settings() 