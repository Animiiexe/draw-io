const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const cors = require("cors")

const app = express()
const server = http.createServer(app)

// Enable CORS for all origins in development
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

app.use(cors())
app.use(express.json())

// Store connected users count
let connectedUsers = 0

io.on("connection", (socket) => {
  connectedUsers++
  console.log(`User connected. Total users: ${connectedUsers}`)

  // Broadcast user count to all clients
  io.emit("userCount", connectedUsers)

  // Handle drawing events
  socket.on("draw", (data) => {
    // Broadcast drawing data to all other users
    socket.broadcast.emit("draw", data)
  })

  // Handle clear canvas events
  socket.on("clear", () => {
    // Broadcast clear event to all users including sender
    io.emit("clear")
  })

  // Handle user disconnect
  socket.on("disconnect", () => {
    connectedUsers--
    console.log(`User disconnected. Total users: ${connectedUsers}`)
    io.emit("userCount", connectedUsers)
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
