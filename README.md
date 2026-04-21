# Feature Request Tracker

A production-style full-stack web application for managing product feature requests. Users can create, edit, delete, update status, and filter requests by status.

## Tech Stack

- Frontend: React.js (Vite)
- Backend: Node.js + Express.js
- Database: MySQL
- HTTP Client: Axios
- Version Control: Git

## Project Structure

```bash
feature-request-tracker/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── sql/
│   └── feature_request_tracker.sql
├── .gitignore
└── README.md
```

## Features

- View all feature requests
- Add a new feature request
- Edit an existing feature request
- Delete a feature request
- Update feature status
- Filter requests by status

## Backend Setup

1. Open a terminal in the project root.
2. Move into the backend folder:

```bash
cd backend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

5. Update the database credentials in `.env`.
6. Start the backend server:

```bash
npm run dev
```

The backend runs at `http://localhost:5000`.

## Frontend Setup

1. Open a second terminal.
2. Move into the frontend folder:

```bash
cd frontend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```

5. Start the frontend:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Database Setup

1. Open MySQL Workbench or your MySQL terminal.
2. Open the SQL file in `sql/feature_request_tracker.sql`.
3. Run the script.

This will:
- create the database
- create the `feature_requests` table
- insert sample records

## API Endpoints

### GET `/api/health`
Check whether the API is running.

### GET `/api/features`
Fetch all feature requests.

### GET `/api/features?status=Open`
Fetch feature requests by status.

### GET `/api/features/:id`
Fetch a single feature request by ID.

### POST `/api/features`
Create a new feature request.

Request body:

```json
{
  "title": "Add search bar",
  "description": "Allow users to search for requests",
  "priority": "High",
  "status": "Open"
}
```

### PUT `/api/features/:id`
Update an existing feature request.

### PATCH `/api/features/:id/status`
Update only the status of a feature request.

Request body:

```json
{
  "status": "Completed"
}
```

### DELETE `/api/features/:id`
Delete a feature request.

## Validation Rules

- title is required
- priority must be one of `Low`, `Medium`, `High`
- status must be one of `Open`, `In Progress`, `Completed`
- feature ID must be a positive integer

## Suggested Git Commit Flow

```bash
git init
git add .
git commit -m "Initialize Feature Request Tracker project"

git add backend
git commit -m "Set up Express backend structure"

git add sql
git commit -m "Add MySQL schema and seed data"

git add backend/src/models backend/src/controllers backend/src/routes
git commit -m "Implement feature request API"

git add backend/src/middlewares backend/src/utils
git commit -m "Add validation and sanitization to backend"

git add frontend
git commit -m "Set up React frontend with feature tracker UI"

git add README.md
git commit -m "Write project README and setup guide"
```

## Demo Checklist

Before recording your demo, confirm:

- backend server starts successfully
- frontend loads successfully
- sample data displays correctly
- add request works
- edit request works
- delete request works
- status update works
- filtering works
- invalid title is rejected

## Submission Tips

- Push your code to GitHub
- Keep commit history clean and meaningful
- Add screenshots to your repository if requested
- Include a short demo video link in your submission
