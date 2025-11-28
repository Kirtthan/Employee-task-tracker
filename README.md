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
<img width="2666" height="1510" alt="image" src="https://github.com/user-attachments/assets/ea71fbd6-3be3-466f-a69e-e0770e7b9aa4" />
<img width="1511" height="1330" alt="image-1" src="https://github.com/user-attachments/assets/caa225e8-bf5b-405b-bd2c-3842c195d6e2" />
<img width="1519" height="1286" alt="image" src="https://github.com/user-attachments/assets/382f25fc-1ba2-4516-b9d9-4947d9649b1a" />
<img width="2871" height="1619" alt="image" src="https://github.com/user-attachments/assets/8c7626c2-b555-4273-9764-5988ddbf299e" />
<img width="1566" height="1184" alt="image" src="https://github.com/user-attachments/assets/14254c86-935e-4d2a-a07d-37841754eb4e" />
<img width="2851" height="1454" alt="image" src="https://github.com/user-attachments/assets/d697573a-65ab-4f3e-8122-de46b81b6a80" />
![Uploading image.png…]()






