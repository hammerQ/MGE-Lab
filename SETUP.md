# Mind & GrowEasy Lab - Quick Setup Guide

## 🚀 Quick Start (Recommended)

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

## 🛠 Manual Development Setup

### Backend Setup (Python)
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

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

## 📱 Features

### Authentication System
- **Registration**: Mobile phone number, email, and password (4-12 characters, letters and numbers only)
- **Login**: Mobile phone number and password
- **Password Reset**: Simple reset using mobile phone number validation

### User Data Storage
- Currently uses text file storage (`user_details.txt`)
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

## 🗂 File Structure
```
groweasy/
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── api/          # API routes
│   │   │   ├── core/         # Configuration
│   │   │   ├── models/       # Data models
│   │   │   ├── services/     # Business logic
│   │   │   └── utils/        # Utilities
│   │   ├── requirements.txt  # Dependencies
│   │   └── user_details.txt  # User data storage
│   ├── frontend/             # React frontend
│   │   ├── src/
│   │   │   ├── components/   # React components
│   │   │   ├── pages/        # Page components
│   │   │   ├── contexts/     # Auth context
│   │   │   └── types/        # TypeScript types
│   │   └── package.json      # Dependencies
│   └── docker-compose.yml    # Docker configuration
```

## 🔧 Troubleshooting

### Backend Issues
- Ensure Python 3.11+ is installed
- Check if port 8000 is available
- Verify `user_details.txt` file is created in backend directory

### Frontend Issues
- Ensure Node.js 18+ is installed
- Check if port 3000 is available
- Run `npm install` if dependencies are missing

### Docker Issues
- Ensure Docker is running
- Check if ports 3000 and 8000 are available
- Run `docker-compose logs -f` to see logs

## 📞 Support
For issues or questions, check the main README.md or create an issue in the repository. 