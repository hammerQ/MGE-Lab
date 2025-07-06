# Development Guide

## Getting Started

This guide will help you set up the development environment for the Groweasy web application.

## Prerequisites

- Python 3.11+
- Node.js 18+
- MongoDB 7.0+
- Docker & Docker Compose

## Local Development Setup

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Start MongoDB (if not using Docker)
# mongod --port 27017

# Run the application
python run.py
```

The backend will be available at `http://localhost:8000`.

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### 3. Database Setup

#### Using Docker
```bash
# Start MongoDB container
docker run -d \
  --name groweasy-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:7.0
```

#### Manual Installation
Install MongoDB locally and start the service:
```bash
# macOS with Homebrew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## Development Workflow

### Making Changes

1. **Backend Changes:**
   - The FastAPI server supports hot reload
   - Changes to Python files will automatically restart the server
   - API documentation is available at `http://localhost:8000/docs`

2. **Frontend Changes:**
   - Vite provides hot module replacement
   - Changes to React components will be reflected immediately
   - TypeScript errors will be shown in the console

### Testing

#### Backend Tests
```bash
cd backend
pytest
```

#### Frontend Tests
```bash
cd frontend
npm test
```

### Code Quality

#### Backend
```bash
# Formatting
black .

# Linting
flake8 .

# Import sorting
isort .
```

#### Frontend
```bash
# Linting
npm run lint

# Type checking
npm run type-check
```

## API Development

### Adding New Endpoints

1. Create a new route in `backend/app/api/routes.py`
2. Add corresponding models in `backend/app/models/`
3. Implement business logic in `backend/app/services/`
4. Update API documentation

### Database Models

When adding new models:
1. Create Pydantic models in `backend/app/models/`
2. Add corresponding services in `backend/app/services/`
3. Update database indexes if needed

## Frontend Development

### Adding New Components

1. Create component in `frontend/src/components/`
2. Add TypeScript interfaces in `frontend/src/types/`
3. Update routing in `frontend/src/App.tsx`
4. Add corresponding API calls in context or hooks

### State Management

- Use React Context for global state
- React Query for server state
- Local component state for UI state

## Debugging

### Backend Debugging
- Use the FastAPI interactive docs at `/docs`
- Enable debug mode in `.env` file
- Use Python debugger with `breakpoint()`

### Frontend Debugging
- Use React Developer Tools
- Check browser console for errors
- Use network tab to inspect API calls

## Environment Configuration

### Backend Environment Variables
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=groweasy
SECRET_KEY=your-secret-key-here
DEBUG=True
```

### Frontend Environment Variables
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## Common Issues

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify database permissions

### CORS Issues
- Check `CORS_ORIGINS` in backend configuration
- Ensure frontend URL is included in allowed origins

### Port Conflicts
- Check if ports 3000, 8000, or 27017 are already in use
- Update port configurations if needed

## Docker Development

### Using Docker Compose
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Rebuild after changes
docker-compose build
```

### Individual Container Development
```bash
# Backend only
docker-compose up backend mongodb

# Frontend only
docker-compose up frontend
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Add tests
4. Ensure code quality checks pass
5. Submit a pull request

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Docker Documentation](https://docs.docker.com/) 