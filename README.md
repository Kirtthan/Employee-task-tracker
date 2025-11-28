# Employee Task Tracker - Internship Challenge Submission

## 1. Overview
This is a full-stack web application developed for the **Internship Coding Challenge - Track 3: Fullstack**. It is a comprehensive tool for managing employees and tracking their tasks, featuring a modern glassmorphic UI and a robust RESTful backend.

**Bonus Challenge Completed**: Role-Based Access Control (RBAC) is implemented.
- **Admins**: Can manage all employees and tasks.
- **Regular Users**: Can only view tasks assigned to them.

## 2. Tech Stack & Architecture

### Architecture
The application follows a standard **Client-Server** architecture:
- **Frontend**: Single Page Application (SPA) communicating via REST API.
- **Backend**: Modular API server handling business logic and database operations.
- **Database**: Relational database for persistent storage.

### Technologies
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Material UI, Framer Motion, React Query, Zustand.
- **Backend**: NestJS (Node.js), TypeScript, Prisma ORM, Passport (JWT Auth).
- **Database**: PostgreSQL.

## 3. Setup & Run Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

### Installation

1.  **Clone/Unzip the repository**.
2.  **Install Backend Dependencies**:
    ```bash
    cd backend
    npm install
    ```
3.  **Install Frontend Dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```

### Database Setup
1.  Ensure PostgreSQL is running.
2.  Configure `.env` in `backend/` with your database URL:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/task_tracker?schema=public"
    ```
3.  Run Migrations:
    ```bash
    cd backend
    npx prisma generate
    npx prisma db push
    ```

### Running the App
1.  **Start Backend** (http://localhost:3000):
    ```bash
    cd backend
    npm run start:dev
    ```
2.  **Start Frontend** (http://localhost:5173):
    ```bash
    cd frontend
    npm run dev
    ```

## 4. API Documentation
The backend includes Swagger documentation available at: `http://localhost:3000/api`

### Key Endpoints
- **Auth**: `POST /auth/login`, `POST /auth/register`
- **Employees**: `GET /employees`, `POST /employees` (Admin only)
- **Tasks**: `GET /tasks`, `POST /tasks` (Admin only), `PATCH /tasks/:id`
- **Dashboard**: `GET /dashboard`

## 5. Assumptions & Limitations
- **User-Employee Link**: For RBAC to work for a regular user, their User account must be linked to an Employee profile via the `employeeId` field. Currently, this link is created manually or assumed to be handled by an admin.
- **Email Service**: No real email service is integrated; "emails" are just database fields.

## 6. Screenshots
(Please refer to the `images/` folder or the running application for visual verification of the glassmorphic design.)
