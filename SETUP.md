# Mind & GrowEasy Lab - Quick Setup Guide

## 🚀 Quick Start (Recommended)

### Prerequisites
- Python 3.10+ installed (currently using 3.10.4)
- Node.js 18+ installed
- Git

**Note**: Docker setup is available but manual setup is more reliable and easier to troubleshoot.

## 🛠 Manual Development Setup (Recommended)

### Backend Setup (Python)
```bash
cd backend

# Install core dependencies (handles version conflicts better than requirements.txt)
pip install fastapi uvicorn python-multipart bcrypt passlib python-jose pydantic-settings email-validator

# Alternative: Try full requirements (may have version conflicts)
# pip install -r requirements.txt

# Run the backend
python run.py
```
Backend will be available at: http://localhost:8000

### Frontend Setup (React)
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend will be available at: http://localhost:3000

## 🐳 Docker Setup (Alternative)

### Prerequisites
- Docker and Docker Compose installed
- Git

### 1. Clone and Start
```bash
git clone <repository-url>
cd groweasy

# Start all services with Docker
docker-compose up -d
```

### 2. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📱 Features

### Authentication System
- **Registration**: Mobile phone number, email, and password (4-12 characters, letters and numbers only)
- **Login**: Mobile phone number and password
- **Password Reset**: Simple reset using mobile phone number validation

### User Data Storage
- Currently uses text file storage (`user_details.txt`, `user_profile.txt`)
- Easily upgradeable to MongoDB later

### Password Requirements
- Length: 4-12 characters
- Characters: Letters and numbers only
- No special characters required

## 🧪 Testing the Application

### 1. Register a New Account
- Go to http://localhost:3000/register
- Fill in: Name, Mobile Phone (e.g., 1234567890), Email, Password
- Submit to create account

### 2. Login
- Go to http://localhost:3000/login
- Use your mobile phone number and password
- Access your dashboard

### 3. Reset Password
- Go to http://localhost:3000/reset-password
- Enter your mobile phone number
- Set a new password

## 📄 API Endpoints

### Authentication
- `POST /api/v1/token` - Login (username = mobile phone)
- `POST /api/v1/users/` - Register new user
- `POST /api/v1/reset-password` - Reset password
- `POST /api/v1/check-user` - Check if user exists

### User Management
- `GET /api/v1/users/me` - Get current user
- `GET /api/v1/users/{mobile_phone}` - Get user by phone
- `PUT /api/v1/users/{mobile_phone}` - Update user
- `DELETE /api/v1/users/{mobile_phone}` - Delete user

### Profile Management
- `GET /api/v1/profile/me` - Get current user profile
- `POST /api/v1/profile/` - Create user profile
- `PUT /api/v1/profile/me` - Update user profile

## 🗂 File Structure
```
groweasy/
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Configuration
│   │   ├── models/       # Data models
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utilities
│   ├── requirements.txt  # Dependencies
│   ├── run.py           # Backend entry point
│   ├── user_details.txt # User data storage
│   └── user_profile.txt # Profile data storage
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── contexts/     # Auth context
│   │   ├── lib/         # API configuration
│   │   └── types/        # TypeScript types
│   └── package.json      # Dependencies
└── docker-compose.yml    # Docker configuration
```

## 🔧 Troubleshooting

### Backend Issues
- **Python Version**: Ensure Python 3.10+ is installed (currently using 3.10.4)
- **Port Conflict**: Check if port 8000 is available (`lsof -i :8000`)
- **Dependencies**: If `pip install -r requirements.txt` fails due to version conflicts, use the core dependencies command instead
- **Missing Modules**: If you get `ModuleNotFoundError`, install the specific missing packages:
  ```bash
  pip install pydantic-settings email-validator
  ```
- **File Storage**: Verify `user_details.txt` and `user_profile.txt` files are created in backend directory

### Frontend Issues
- **Node Version**: Ensure Node.js 18+ is installed
- **Port Conflict**: Check if port 3000 is available (`lsof -i :3000`)
- **Dependencies**: Run `npm install` if dependencies are missing
- **API Connection**: Ensure backend is running on port 8000 before starting frontend

### Docker Issues
- **Docker Installation**: Ensure Docker and Docker Compose are installed and running
- **Port Conflicts**: Check if ports 3000, 8000, and 27017 are available
- **Logs**: Run `docker-compose logs -f` to see detailed logs
- **Alternative**: Use manual setup if Docker issues persist

### Common Solutions
1. **Start Backend First**: Always start the backend before the frontend
2. **Check Ports**: Ensure no other services are using ports 3000 and 8000
3. **Manual Dependencies**: If automated dependency installation fails, install core packages manually
4. **Background Process**: Run backend with `python run.py &` to keep it running in background

## 📞 Support
For issues or questions, check the main README.md or create an issue in the repository. 