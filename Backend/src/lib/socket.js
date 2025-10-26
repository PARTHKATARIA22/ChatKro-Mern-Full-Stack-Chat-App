import express from 'express';
import { Server } from 'socket.io'
import http from 'http';


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
    }
})
// used to store onlie users
const userSocketMap = {};//{userId: socketId}

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("A user has connected", socket.id);
    //hand shake automatically created by socket to store query parameters
    const userId = socket.handshake.query.userId //query.userId meine pass ki h useAuthStore from io.on("connection.....")
    if (userId) userSocketMap[userId] = socket.id;

    //io.emit() will send the events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("message", (message) => {
        console.log("I have recieved a message haha 😊");
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.it);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export { io, app, server };