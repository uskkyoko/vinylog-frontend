# Vinylog

A modern music discovery and review platform built with FastAPI, where music enthusiasts can discover albums, write reviews, create custom lists, and get AI-powered music recommendations.

## Project Description

Vinylog is a full-stack web application that combines music discovery with social features. Users can:

- **Discover Music**: Browse albums and artists, search through Spotify's catalog, and explore community-curated lists
- **Write Reviews**: Share thoughts and ratings on albums with detailed reviews
- **Create Lists**: Build custom collections of favorite albums
- **AI Recommendations**: Get personalized album recommendations based on mood, preferences, or favorite genres
- **Social Features**: Follow other users, view profiles, and discover what the community is listening to

The application integrates with Spotify's API for music data and uses AI (via LangChain/OpenRouter) to generate personalized recommendations.

## Tech Stack

- **Backend**: FastAPI (Python)
- **Database**: PostgreSQL (with SQLAlchemy ORM)
- **Authentication**: JWT tokens with bcrypt password hashing
- **Templates**: Jinja2
- **External APIs**: Spotify API, OpenRouter AI API
- **Testing**: pytest with monkeypatching

## Setup Instructions for Local Development

### Prerequisites

- Python 3.11 or higher
- PostgreSQL database
- Spotify API credentials (Client ID and Client Secret)
- OpenRouter API key (for AI recommendations)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd vinylog
```

### Step 2: Create a Virtual Environment

```bash
# Using venv
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Set Up Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/vinylog

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15

# Spotify API
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret

# AI/OpenRouter API
MY_API_KEY=your-openrouter-api-key
```

**Note**: Replace all placeholder values with your actual credentials.

### Step 5: Set Up the Database

1. Create a PostgreSQL database:
```bash
createdb vinylog
```

2. Run database migrations:
```bash
alembic upgrade head
```

### Step 6: Run the Application

```bash
# From the project root
uvicorn app.main:app --reload
```

The application will be available at `http://localhost:8000`

### Step 7: Access the Application

Open your browser and navigate to:
- **Home**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (FastAPI automatic documentation)

## How to Run the Test Suite

The project includes a comprehensive test suite using pytest with monkeypatching for external dependencies.

### Run All Tests

```bash
pytest
```

### Run Tests with Verbose Output

```bash
pytest -v
```

### Run Specific Test Files

```bash
# Run authentication tests
pytest test/test_auth.py

# Run album tests
pytest test/test_albums.py

# Run review tests
pytest test/test_reviews.py
```

### Test Structure

The test suite includes:
- **14 tests** covering core functionality
- **Monkeypatching** for external APIs (Spotify, AI recommendations)
- **In-memory SQLite** database for fast, isolated tests

See `test/README.md` for more details about the test suite.

## Project Structure

```
vinylog/
├── app/
│   ├── database/          # Database models and configuration
│   ├── routers/           # API route handlers
│   ├── services/          # Business logic and CRUD operations
│   ├── schemas/           # Pydantic models for validation
│   ├── static/            # CSS and uploaded files
│   └── templates/         # Jinja2 HTML templates
├── alembic/               # Database migrations
├── test/                  # Test suite
├── requirements.txt       # Python dependencies
├── alembic.ini            # Alembic configuration
├── pytest.ini             # Pytest configuration
└── README.md              # This file
```

## Deployment Notes

### Environment Setup

For production deployment, ensure:

1. **Environment Variables**: All required environment variables are set in your deployment environment
2. **Database**: PostgreSQL database is accessible and migrations have been run
3. **Static Files**: The `app/static/` directory is properly served
4. **Uploads Directory**: The `app/static/uploads/` directory exists and is writable

### Production Considerations

- **SECRET_KEY**: Use a strong, randomly generated secret key
- **Database**: Use connection pooling for better performance
- **HTTPS**: Always use HTTPS in production
- **CORS**: Configure CORS settings if serving a separate frontend
- **Logging**: Set up proper logging and monitoring
- **Error Handling**: The application includes custom error pages (400, 403, 404, 500)

### Database Migrations

Create a new migration:
```bash
alembic revision --autogenerate -m "description"
```

Apply migrations:
```bash
alembic upgrade head
```

Rollback:
```bash
alembic downgrade -1
```

