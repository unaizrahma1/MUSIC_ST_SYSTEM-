  MUSIC_ST_SYSTEM-

A compact full-stack app to manage clients, rooms, instructors, and bookings for a music studio.

Tech: Node.js (Express), MongoDB (Mongoose), React, Axios.

Purpose: CRUD for clients/rooms/instructors and booking management linking them.

Key features:
- Clients, Rooms, Instructors: create, read, update, delete.
- Bookings: reference client/room/instructor, date and time, populated responses.

Structure:
- `server/`: Express API, models, controllers, routes.
- `client/`: React SPA, pages and API helpers (`client/src/api.js`).

Quick start:
1. Install server deps: `cd server && npm install`
2. Add `server/.env` with `MONGO_URI` and optional `PORT`
3. Run server: `npm run dev` (nodemon) or `npm start`
4. Start client: `cd client && npm install && npm start`

Environment:
- `MONGO_URI` (MongoDB connection string)
- `PORT` (optional, defaults to 5000)

API summary (base `/api`):
- `/clients`, `/rooms`, `/instructors`, `/bookings`
- Standard REST methods: GET, POST, PUT, DELETE
- Bookings endpoints return populated client/room/instructor data

Example requests:
- Create client: POST `/api/clients` `{ "name","email","phone" }`
- Create booking: POST `/api/bookings` `{ "clientId","roomId","instructorId","date","time" }`

Notes for devs:
- Add validation and auth (JWT) for production
- Use Postman/Insomnia or curl for testing

Contributing:
- Open issues or PRs. Suggested improvements: tests, CI, input validation.

Files to check first:
- `server/server.js`, `server/db.js`, `server/models/`, `server/controllers/`, `server/routes/`
- `client/src/api.js`, `client/src/pages/`

License: Add a LICENSE file (MIT suggested)

Maintainer: repo owner (update README with contact or project links)

Thanks!

(The file `/workspaces/MUSIC_ST_SYSTEM-/README.md` exists, but contains only whitespace)
  Music Studio Information System 🎵

> A simple full-stack application to manage clients, rooms, instructors, and bookings for a music studio. This repository contains a Node.js/Express backend with MongoDB and a React frontend.

Features
- Manage clients (CRUD)
- Manage rooms (CRUD)
- Manage instructors (CRUD)
- Create and manage bookings that reference clients, rooms, and instructors

Tech stack
- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React (Create React App), Axios
- Dev tools: nodemon (server)

 Project structure

Top-level folders:

- `server/` — Express API, Mongoose models, routes, controllers
- `client/` — React single-page app

Key server files:

- `server/server.js` — app entry
- `server/db.js` — MongoDB connection helper
- `server/models/` — Mongoose schemas (`Client`, `Room`, `Instructor`, `Booking`)
- `server/routes/` & `server/controllers/` — REST endpoints and handlers

Key client files:

- `client/src/api.js` — Axios wrappers for backend endpoints
- `client/src/pages/` — UI pages (Clients, Rooms, Instructors, Bookings, Home)

Getting started

Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB Atlas account or local MongoDB instance

Setup

1. Server

cd server
npm install
npm start

2. Client

cd client
npm install
npm start
Client runs on http://localhost:3000 by default and expects API at http://localhost:5000/api


Environment variables

Create a `server/.env` file with:

MONGO_URI=<your-mongodb-connection-string>
PORT=5000        
 optional

API Endpoints

Base URL: `http://localhost:5000/api`

Clients
- GET `/clients` — list clients
- GET `/clients/:id` — get single client
- POST `/clients` — create client
- PUT `/clients/:id` — update client
- DELETE `/clients/:id` — delete client

Rooms
- GET `/rooms`
- GET `/rooms/:id`
- POST `/rooms`
- PUT `/rooms/:id`
- DELETE `/rooms/:id`

Instructors
- GET `/instructors`
- GET `/instructors/:id`
- POST `/instructors`
- PUT `/instructors/:id`
- DELETE `/instructors/:id`

Bookings
- GET `/bookings` — lists bookings (populates client, room, instructor)
- GET `/bookings/:id`
- POST `/bookings` — create booking (requires `clientId`, `roomId`, `instructorId`, `date`, `time`)
- PUT `/bookings/:id`
- DELETE `/bookings/:id`

Contributing

Feel free to open issues or PRs. Small suggestions:

- Add input validation and better error handling
- Add authentication (JWT) for protected actions
- Add unit or integration tests

License

This project is provided as-is. Add a license file if you plan to publish it.

If you want, I can also:

- add a `server/.env.example` and update `.gitignore`
- add a single top-level `package.json` to run both server and client together

Let me know which of these you'd like me to implement next.




