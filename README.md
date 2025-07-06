# Mind & GrowEasy Lab - Web Application

A modern full-stack web application built with FastAPI (Python) backend and React (TypeScript) frontend, designed for family memory preservation and children's growth through personalized storytelling.

## Features

- **Backend (FastAPI + Text File Storage)**
  - RESTful API with automatic OpenAPI documentation
  - User authentication with JWT tokens
  - Password hashing with bcrypt
  - Text file storage for user data
  - Mobile phone number-based authentication
  - CORS configuration for frontend integration
  - Comprehensive error handling
  - Password reset functionality

- **Frontend (React + TypeScript)**
  - Beautiful branded landing page for Mind & GrowEasy Lab
  - Modern React application with TypeScript
  - React Router for navigation
  - React Hook Form for form handling
  - React Query for API state management
  - Tailwind CSS for styling with gradient designs
  - Toast notifications for user feedback
  - Protected routes with authentication
  - Mobile phone number authentication system

- **Authentication System**
  - Registration with mobile phone number, email, and password
  - Login with mobile phone number and password
  - Password requirements: 4-12 characters, letters and numbers only
  - Password reset with mobile phone validation
  - JWT token-based authentication

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Text File Storage** - Simple JSON-based user data storage
- **Pydantic** - Data validation and serialization
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Uvicorn** - ASGI server for FastAPI

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Development Tools
- **Hot Reload** - Development environment with auto-reload
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking

## Project Structure

```
groweasy/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Data models
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── tests/              # Backend tests
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile         # Backend container
│   ├── run.py             # Application entry point
│   └── user_details.txt   # User data storage file
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── lib/           # Utility libraries
│   │   ├── pages/         # Page components
│   │   └── types/         # TypeScript types
│   ├── package.json       # Node.js dependencies
│   └── Dockerfile         # Frontend container
├── docs/                   # Documentation
├── docker-compose.yml      # Docker services
├── SETUP.md               # Setup instructions
└── README.md              # This file
```

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- npm or yarn
- Git

### 1. Clone the repository
```bash
git clone <repository-url>
cd groweasy
```

### 2. Backend Setup (Terminal 1)
```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
cd /Users/mqiao/Documents/Code/groweasy/backend
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### 3. Frontend Setup (Terminal 2)
```bash
# Open a new terminal and navigate to frontend directory
cd /Users/mqiao/Documents/Code/groweasy/frontend

# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
```

### 4. Access the application
- **Frontend (React App):** http://localhost:3000/
- **Backend API:** http://localhost:8000/
- **API Documentation:** http://localhost:8000/docs

## 🚀 **Running the Application Locally**

### **Step 1: Backend Setup (Terminal 1)**

1. **Navigate to the backend directory:**
   ```bash
   cd /Users/mqiao/Documents/Code/groweasy/backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the backend server:**
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

   **Expected output:**
   ```
   INFO:     Will watch for changes in these directories: ['/path/to/backend']
   INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
   INFO:     Started reloader process [xxxxx] using StatReload
   INFO:     Started server process [xxxxx]
   INFO:     Waiting for application startup.
   INFO:     Application startup complete.
   ```

### **Step 2: Frontend Setup (Terminal 2)**

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd /Users/mqiao/Documents/Code/groweasy/frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   **Expected output:**
   ```
   VITE v4.5.0  ready in 1234 ms
   
   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ➜  press h to show help
   ```

### **🎉 What You'll See:**

1. **Home Page:** Beautiful Mind & GrowEasy Lab landing page with:
   - Company mission and vision
   - Core values  
   - Sign up and login buttons

2. **Authentication System:**
   - Register with mobile phone number, email, and password
   - Login with mobile phone number and password
   - Password reset functionality

3. **API Documentation:** Interactive Swagger UI at `/docs`

## Development Setup

### Backend Development
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run development server (from backend directory)
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend Development
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### **🛠 Troubleshooting Tips:**

1. **If backend fails to start with Pydantic error:**
   ```bash
   # Try running from the backend directory
   cd /Users/mqiao/Documents/Code/groweasy/backend
   python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```

2. **If frontend fails to start:**
   ```bash
   # Make sure you're in the frontend directory
   cd /Users/mqiao/Documents/Code/groweasy/frontend
   
   # Try cleaning and reinstalling dependencies
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

3. **If port conflicts occur:**
   - Backend: Change port with `--port 8001`
   - Frontend: Vite will auto-detect and suggest a different port

4. **If you see "ModuleNotFoundError: No module named 'app'":**
   - Make sure you're running uvicorn from the backend directory
   - Check that all Python dependencies are installed

### **📱 Testing the Application:**

1. **Register a new account:**
   - Mobile: `1234567890`
   - Email: `test@example.com`
   - Password: `test123`

2. **Login and explore the interface**

3. **Test password reset functionality**

### Data Storage
Currently, the application uses text file storage (`user_details.txt`) for user data instead of MongoDB. This is a lightweight approach suitable for development and testing.

## API Endpoints

### Authentication
- `POST /api/v1/token` - Login with mobile phone number and password
- `POST /api/v1/users/` - Register new user with mobile phone, email, and password

### Users
- `GET /api/v1/users/me` - Get current user profile
- `GET /api/v1/users/{user_id}` - Get user by ID
- `PUT /api/v1/users/{user_id}` - Update user information
- `DELETE /api/v1/users/{user_id}` - Delete user account
- `GET /api/v1/users/` - List all users

### Password Reset
- `POST /api/v1/users/reset-password` - Reset user password using mobile phone number

### Health Check
- `GET /` - Welcome message
- `GET /health` - Health check endpoint

## Environment Variables

### Backend (.env)
```env
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=True
USER_DATA_FILE=user_details.txt
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Alternative Setup with Docker (Optional)

If you prefer to use Docker, you can use the provided `docker-compose.yml` file:

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

**Note:** The manual setup instructions above are recommended for development.

## Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Production Deployment

1. Update environment variables with production values
2. Set strong passwords and secret keys
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Configure monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please create an issue in the GitHub repository or contact the development team. 