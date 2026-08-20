# MedCare Plus — Hospital Appointment System

ITUE301 Open-Book Practical Exam — Set A.

## Frontend Setup and Run

```
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173 by default (Vite).

## Backend Setup and Run

```
cd backend
npm install
npm start
```

Runs on http://localhost:5000. Uses in-memory arrays for `/api/v1/doctors`
and `/api/v1/appointments` (Task 3) so the frontend works without MongoDB
running.

## MongoDB Setup (Task 5)

1. Create a free MongoDB Atlas cluster (or use a local MongoDB instance).
2. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI`.
3. Run the schema/validation demo:
   ```
   cd backend
   node mongo-demo/demo.js
   ```
   This connects to MongoDB, creates a Doctor, Patient and Appointment
   (proving the schemas work), then intentionally attempts to create a
   Patient with an invalid blood group to demonstrate a caught validation
   error with a meaningful message.

## Required Environment Variables

`backend/.env` (never committed — see `.env.example`):

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## Notes

- Task 3 (Express API) uses in-memory arrays, per the exam spec.
- Task 5 (MongoDB/Mongoose) is a separate implementation under
  `backend/models/` and `backend/mongo-demo/`, as required by the spec.
- Detailed UI styling was kept minimal on purpose — the focus is on
  component structure, routing, state, and API integration.
