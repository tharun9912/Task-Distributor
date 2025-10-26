MERN TASK DISTRIBUTOR

    This is a MERN stack application that allows an admin to log in, create agents, and upload CSV or Excel files to distribute tasks equally among agents.

Features

    Admin Login
         Admin can log in using email and password.
        Authentication is done using JWT (JSON Web Token).
    Agent Management
        Admin can add, view, and delete agents.
        Agent data is stored in MongoDB.
    File Upload & Distribution
        Admin can upload CSV or Excel files (.csv, .xlsx, .xls).
        The uploaded list is automatically divided equally among all agents.
        Each task contains:
            FirstName
            Phone
            Notes

Tech Stack

    Frontend: React.js, Axios, Tailwind CSS
    Backend: Node.js, Express.js    
    Database: MongoDB with Mongoose
    Libraries: Multer, csvtojson, xlsx, JWT

Installation steps :

    clone the repository
        git clone https://github.com/tharun9912/Task-Distributor.git
        cd Task-Distributor
    Backend Setup
        cd backend
        npm install
        create .env fiel inside backend folder
            PORT=8000
            MONGO_URI=your_mongodb_connection_string
            JWT_SECRET=your_secret_key
        Run the backend server
            npm start
    Frontend setup
        cd ../frontend
        npm install
        npm run dev

Folder structure

    MERN-Task-Distributor
        backend/
            controllers/
                taskController.js
            middlewares/
                authMiddleware.js 
            models/
                agents.js
                tasks.js
                user.js
            routes/
                agentRoutes.js
                authRoutes.js
                taskRoutes.js
            index.js
        frontend
            src/
                components/
                    AddAgent.jsx
                    Dashboard.jsx
                    Login.jsx
                    Register.jsx
                    UploadFile.jsx
                app.jsx
API Endpoints

    Method       Endpoint               Description

    POST         /auth/login            Admin Login

    POST         /auth/                 Admin register

    GET          /files/distributed     get distributed list along with agent

    POST         /api/agents            get agents dta 

    POST         /files/upload          upload file and distribute



