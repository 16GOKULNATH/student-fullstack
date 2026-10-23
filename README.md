# Student Full Stack

A full-stack Student Management application using React, Vite, Spring Boot, and MySQL.

## Project Structure

- `frontend/` — React application
- `backend/` — Spring Boot REST API

## Requirements

- Java 17 or later
- Node.js and npm
- MySQL
- Maven

## Backend Setup

1. Create a MySQL database named `student_db`.
2. Configure database credentials in `application.properties`.
3. Open a terminal inside the `backend` directory.
4. Run `mvn spring-boot:run`.

Backend URL: `http://localhost:8080`

## Frontend Setup

1. Open a terminal inside the `frontend` directory.
2. Run `npm install`.
3. Create a `.env` file containing `VITE_API_URL=http://localhost:8080`.
4. Run `npm run dev`.

Frontend URL: `http://localhost:5173`

## API Endpoints

- `GET /api/students` — List students
- `GET /api/students/{id}` — Get a student by ID
- `GET /api/students/search?name=ar` — Search students
- `POST /api/students` — Add a student
- `PUT /api/students/{id}` — Update a student
- `DELETE /api/students/{id}` — Delete a student

## Security

Never commit real passwords or secret environment files. Use example configuration files with placeholders.