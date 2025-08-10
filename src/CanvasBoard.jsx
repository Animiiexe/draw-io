"use client"

import { useRef, useEffect, useState, useCallback } from "react"

const CanvasBoard = ({ socket }) => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })

  // Canvas settings
  const brushSize = 4
  const brushColor = "#000000"

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Set drawing properties
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.strokeStyle = brushColor
      ctx.lineWidth = brushSize
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Socket event listeners
  useEffect(() => {
    // Listen for drawing events from other users
    socket.on("draw", (data) => {
      drawLine(data.x0, data.y0, data.x1, data.y1, false)
    })

    // Listen for clear events
    socket.on("clear", () => {
      clearCanvas()
    })

    return () => {
      socket.off("draw")
      socket.off("clear")
    }
  }, [socket])

  // Drawing functions
  const drawLine = useCallback(
    (x0, y0, x1, y1, emit = true) => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      ctx.beginPath()
      ctx.moveTo(x0, y0)
      ctx.lineTo(x1, y1)
      ctx.stroke()
      ctx.closePath()

      // Emit drawing data to other users
      if (emit) {
        socket.emit("draw", { x0, y0, x1, y1 })
      }
    },
    [socket],
  )

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  // Get coordinates relative to canvas
  const getCoordinates = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    if (e.touches) {
      // Touch event
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
  }

  // Mouse events
  const handleMouseDown = (e) => {
    setIsDrawing(true)
    const coords = getCoordinates(e)
    setLastPosition(coords)
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return

    const coords = getCoordinates(e)
    drawLine(lastPosition.x, lastPosition.y, coords.x, coords.y)
    setLastPosition(coords)
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  // Touch events
  const handleTouchStart = (e) => {
    e.preventDefault()
    handleMouseDown(e)
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    handleMouseMove(e)
  }

  const handleTouchEnd = (e) => {
    e.preventDefault()
    handleMouseUp()
  }

  // Clear button handler
  const handleClear = () => {
    socket.emit("clear")
  }

  return (
    <div className="canvas-container">
      <div className="toolbar">
        <button className="clear-btn" onClick={handleClear}>
          🗑️ Clear Canvas
        </button>
        <div className="brush-info">
          <span>Brush: {brushSize}px, Black</span>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  )
}

export default CanvasBoard
