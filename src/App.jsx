"use client"

import { useState, useEffect } from "react"
import CanvasBoard from "./CanvasBoard"
import io from "socket.io-client"
import "./App.css"

const socket = io("http://localhost:5000")

function App() {
  const [userCount, setUserCount] = useState(0)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Connection status
    socket.on("connect", () => {
      setIsConnected(true)
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })

    // Listen for user count updates
    socket.on("userCount", (count) => {
      setUserCount(count)
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("userCount")
    }
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>Couples Drawing Board 🎨</h1>
        <div className="status">
          <span className={`connection-status ${isConnected ? "connected" : "disconnected"}`}>
            {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
          </span>
          <span className="user-count">
            👥 {userCount} user{userCount !== 1 ? "s" : ""} online
          </span>
        </div>
      </header>
      <CanvasBoard socket={socket} />
    </div>
  )
}

export default App
