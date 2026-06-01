# IMAGIFY

Monorepo for the IMAGIFY app.

## Structure

- `client/` — React + Vite frontend
- `server/` — Node backend

## Running locally

1. Install dependencies in each package:
   - `cd client && npm install`
   - `cd server && npm install`

2. Start the frontend:
   - `cd client && npm run dev`

3. Start the backend:
   - `cd server && npm start`

## Notes

This repository keeps frontend and backend in separate folders to avoid mixing old root-level Vite app files with the current monorepo layout.
