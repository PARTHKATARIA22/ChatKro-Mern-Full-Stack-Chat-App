# CHATKRO — Real-Time MERN Chat Application

CHATKRO is a full-stack real-time chat application built using the MERN stack and powered by Socket.io for instant communication.  
It supports image sharing, multiple themes through DaisyUI, and uses Zustand for efficient state management.  
The application is deployed on Render and uses MongoDB Atlas for cloud storage.

---

## Features

- Real-time messaging with Socket.io  
- Image sharing functionality  
- Multiple themes powered by DaisyUI  
- Global state management with Zustand  
- MongoDB Atlas for secure cloud database  
- Fully responsive design hosted on Render  

---

## Tech Stack

**Frontend:** React, TailwindCSS, DaisyUI, Zustand  
**Backend:** Node.js, Express.js, Socket.io  
**Database:** MongoDB Atlas  
**Hosting:** Render  

---

## Setup Instructions

```bash
# Clone the repository
git clone https://github.com/<your-username>/CHATKRO.git
cd CHATKRO

# Install dependencies
cd server && npm install
cd ../client && npm install

# Create .env file inside the server directory
MONGO_URI=your_mongodb_atlas_uri
PORT=5000

# Run the backend
cd server
npm run dev

# Run the frontend
cd ../client
npm start
