# 🗨️ CHATKRO — Real-Time MERN Chat App

**CHATKRO** is a full-stack real-time chat application built with the **MERN Stack**, powered by **Socket.io** for instant communication and **MongoDB Atlas** for cloud storage.  
It supports **image sharing**, **dynamic themes** via **DaisyUI**, and uses **Zustand** for smooth, minimal state management.  
Deployed on **Render** for reliable hosting and scalability.

---

## 🚀 Features
- ⚡ Real-time messaging with Socket.io  
- 🖼️ Image sharing support  
- 🎨 Multiple themes using DaisyUI  
- 🧠 Global state handled by Zustand  
- ☁️ MongoDB Atlas cloud database  
- 🌐 Fully responsive & hosted on Render  

---

## 🧰 Tech Stack
**Frontend:** React, TailwindCSS, DaisyUI, Zustand  
**Backend:** Node.js, Express.js, Socket.io  
**Database:** MongoDB Atlas  
**Hosting:** Render  

---

## ⚙️ Setup Instructions

```bash
# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/CHATKRO.git
cd CHATKRO

# 2️⃣ Install dependencies
cd server && npm install
cd ../client && npm install

# 3️⃣ Create .env in server folder
MONGO_URI=your_mongodb_atlas_uri
PORT=5000

# 4️⃣ Run the app
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm start
