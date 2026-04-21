# Git Workflow Guide

## Step 1: Initialize Repository

```bash
git init
git branch -M main
```

## Step 2: First Commit

```bash
git add .
git commit -m "Initialize Feature Request Tracker project"
```

## Recommended Commit Sequence

```bash
git add backend/package.json backend/.env.example backend/src/app.js backend/src/server.js
git commit -m "Initialize backend project"

git add backend/src/config backend/src/models
git commit -m "Create database configuration and feature model"

git add backend/src/controllers backend/src/routes
git commit -m "Add feature request API routes and controllers"

git add backend/src/middlewares backend/src/utils
git commit -m "Add backend validation and sanitization"

git add sql/feature_request_tracker.sql
git commit -m "Add MySQL schema and seed data"

git add frontend/package.json frontend/.env.example frontend/vite.config.js frontend/index.html frontend/src/main.jsx frontend/src/App.jsx
git commit -m "Initialize React frontend project"

git add frontend/src/components frontend/src/pages frontend/src/services frontend/src/index.css
git commit -m "Build feature tracker user interface"

git add README.md docs/
git commit -m "Add project documentation and demo guide"
```

## Optional Branching Strategy

```bash
git checkout -b feature/backend-api
git checkout -b feature/frontend-ui
git checkout -b docs/readme
```

Then merge back into `main` when each part is complete.

## Good Commit Message Rules

- Start with a verb
- Be specific
- Keep it professional

Examples:
- `Initialize backend project`
- `Create feature model`
- `Add status filter to frontend`
- `Write project README`
