const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const cors = require("cors")

const app = express()
const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

app.use(cors())
app.use(express.json())

// Store connected users count
let connectedUsers = new Set();

io.on("connection", (socket) => {
  connectedUsers.add(socket.id);
  
  // Detailed logging
  console.log(`\n=== NEW CONNECTION ===`);
  console.log(`Socket ID: ${socket.id}`);
  console.log(`Total connections: ${connectedUsers.size}`);
  console.log(`All socket IDs:`, Array.from(connectedUsers));
  console.log(`Server socket count: ${io.engine.clientsCount}`);
  console.log(`========================\n`);
  
  // Broadcast user count to all clients
  io.emit("userCount", connectedUsers.size)
  
  // Handle drawing events
  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data)
  })
  
  // Handle clear canvas events
  socket.on("clear", () => {
    io.emit("clear")
  })
  
  // Handle ping check
  socket.on("pongCheck", () => {
    console.log(`Pong received from: ${socket.id}`);
  })
  
  // Handle user disconnect
  socket.on("disconnect", (reason) => {
    connectedUsers.delete(socket.id);
    
    // Detailed logging
    console.log(`\n=== DISCONNECTION ===`);
    console.log(`Socket ID: ${socket.id}`);
    console.log(`Reason: ${reason}`);
    console.log(`Remaining connections: ${connectedUsers.size}`);
    console.log(`Remaining socket IDs:`, Array.from(connectedUsers));
    console.log(`Server socket count: ${io.engine.clientsCount}`);
    console.log(`=====================\n`);
    
    io.emit("userCount", connectedUsers.size)
  })
})

// Add periodic cleanup (optional)
setInterval(() => {
  const actualSockets = Array.from(io.sockets.sockets.keys());
  const trackedSockets = Array.from(connectedUsers);
  
  // Check for mismatches
  if (actualSockets.length !== trackedSockets.length) {
    console.log(`\n⚠️  MISMATCH DETECTED:`);
    console.log(`Actual sockets: ${actualSockets.length}`, actualSockets);
    console.log(`Tracked sockets: ${trackedSockets.length}`, trackedSockets);
    
    // Sync the sets
    connectedUsers = new Set(actualSockets);
    io.emit("userCount", connectedUsers.size);
    console.log(`Synced to: ${connectedUsers.size} users\n`);
  }
}, 10000); // Check every 10 seconds

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})