# Deployment Guide

## 1. Push to GitHub

1.  **Initialize Git**:
    ```bash
    git init
    ```
2.  **Add files**:
    ```bash
    git add .
    ```
3.  **Commit**:
    ```bash
    git commit -m "Ready for deployment"
    ```
4.  **Push** (Replace `YOUR_REPO_URL`):
    ```bash
    git remote add origin YOUR_REPO_URL
    git branch -M main
    git push -u origin main
    ```

## 2. Deploy Database (Render PostgreSQL)

1.  Log in to [Render.com](https://render.com).
2.  Click **New +** -> **PostgreSQL**.
3.  **Name**: `task-tracker-db`.
4.  **Region**: Choose one close to you.
5.  **Plan**: Select **Free**.
6.  Click **Create Database**.
7.  **Copy the "Internal DB URL"** (starts with `postgres://...`). You will need this for the Backend.

## 3. Deploy Backend (Render Web Service)

1.  Click **New +** -> **Web Service**.
2.  Connect your GitHub repository.
3.  **Root Directory**: `backend`
4.  **Runtime**: `Node`
5.  **Build Command**:
    ```bash
    npm install && npm run build && npx prisma generate --schema=../database/schema.prisma
    ```
    *(Note: We point to `../database/schema.prisma` because your schema is in the root `database` folder)*
6.  **Start Command**:
    ```bash
    npm run start:prod
    ```
7.  **Environment Variables**:
    *   `DATABASE_URL`: Paste the **Internal DB URL** from step 2.
    *   `JWT_SECRET`: `d87b5d1244d9fa5c2e3a811cab5b9af4255f25033a1a278a26b35` (or your own secret).
8.  Click **Create Web Service**.

## 4. Deploy Frontend (Vercel)

1.  Log in to [Vercel.com](https://vercel.com).
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository.
4.  **Root Directory**: Click "Edit" and select `frontend`.
5.  **Build Command**: `npm run build` (Default).
6.  **Output Directory**: `dist` (Default).
7.  **Environment Variables**:
    *   `VITE_API_URL`: Paste the **Render Backend URL** (e.g., `https://your-app.onrender.com`).
8.  Click **Deploy**.
