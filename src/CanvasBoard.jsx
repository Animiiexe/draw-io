"use client"
import { useRef, useEffect, useState, useCallback } from "react"

const CanvasBoard = ({ socket }) => {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  
  // Canvas settings - now as state
  const [brushSize, setBrushSize] = useState(4)
  const [brushColor, setBrushColor] = useState("#000000")
  const [tool, setTool] = useState("brush") // brush, eraser
  const [isEraserMode, setIsEraserMode] = useState(false)
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [toolbarPosition, setToolbarPosition] = useState(-256) // -w-64 in pixels

  // Predefined colors
  const colors = [
    "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
    "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
    "#FFC0CB", "#A52A2A", "#808080", "#90EE90", "#FFB6C1"
  ]

  // Brush sizes
  const brushSizes = [2, 4, 8, 12, 20, 30]

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      updateCanvasSettings(ctx)
    }
    
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Update canvas settings when brush properties change
  const updateCanvasSettings = useCallback((ctx) => {
    if (!ctx) {
      const canvas = canvasRef.current
      ctx = canvas.getContext("2d")
    }
    
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    
    if (isEraserMode) {
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineWidth = brushSize
    } else {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = brushColor
      ctx.lineWidth = brushSize
    }
  }, [brushColor, brushSize, isEraserMode])

  // Update canvas when settings change
  useEffect(() => {
    updateCanvasSettings()
  }, [updateCanvasSettings])

  const drawLine = useCallback(
    (x0, y0, x1, y1, emit = true, remoteSettings = null) => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      
      // Save current settings
      const currentComposite = ctx.globalCompositeOperation
      const currentStroke = ctx.strokeStyle
      const currentWidth = ctx.lineWidth
      
      // Apply settings (either remote or current)
      if (remoteSettings) {
        ctx.globalCompositeOperation = remoteSettings.isEraser ? "destination-out" : "source-over"
        if (!remoteSettings.isEraser) {
          ctx.strokeStyle = remoteSettings.color
        }
        ctx.lineWidth = remoteSettings.size
      } else {
        updateCanvasSettings(ctx)
      }
      
      ctx.beginPath()
      ctx.moveTo(x0, y0)
      ctx.lineTo(x1, y1)
      ctx.stroke()
      ctx.closePath()
      
      // Restore settings
      ctx.globalCompositeOperation = currentComposite
      ctx.strokeStyle = currentStroke
      ctx.lineWidth = currentWidth
      
      // Emit drawing data to other users
      if (emit && socket) {
        socket.emit("draw", { 
          x0, y0, x1, y1,
          color: brushColor,
          size: brushSize,
          isEraser: isEraserMode
        })
      }
    },
    [socket, brushColor, brushSize, isEraserMode, updateCanvasSettings],
  )

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  // Socket event listeners
  useEffect(() => {
    if (!socket) return

    const handleDraw = (data) => {
      drawLine(data.x0, data.y0, data.x1, data.y1, false, {
        color: data.color,
        size: data.size,
        isEraser: data.isEraser
      });
    };

    const handleClear = () => {
      clearCanvas();
    };

    socket.on("draw", handleDraw);
    socket.on("clear", handleClear);

    return () => {
      socket.off("draw", handleDraw);
      socket.off("clear", handleClear);
    };
  }, [socket, drawLine, clearCanvas]);

  // Get coordinates relative to canvas
  const getCoordinates = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    } else {
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

  // Tool handlers
  const handleClear = () => {
    if (socket) {
      socket.emit("clear")
    } else {
      clearCanvas()
    }
  }

  const selectTool = (selectedTool) => {
    setTool(selectedTool)
    setIsEraserMode(selectedTool === "eraser")
  }

  // Toolbar drag handlers
  const handleToolbarDragStart = (e) => {
    setIsDragging(true)
    setDragStartX(e.clientX || e.touches[0].clientX)
  }

  const handleToolbarDrag = (e) => {
    if (!isDragging) return
    e.preventDefault()
    
    const currentX = e.clientX || e.touches[0].clientX
    const deltaX = currentX - dragStartX
    const newPosition = Math.max(-256, Math.min(0, toolbarPosition + deltaX))
    
    setToolbarPosition(newPosition)
    setDragStartX(currentX)
  }

  const handleToolbarDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    // Snap to open or closed based on position
    const threshold = -128 // Half of toolbar width
    if (toolbarPosition > threshold) {
      setToolbarPosition(0)
      setIsToolbarOpen(true)
    } else {
      setToolbarPosition(-256)
      setIsToolbarOpen(false)
    }
  }

  const toggleToolbar = () => {
    if (isToolbarOpen) {
      setToolbarPosition(-256)
      setIsToolbarOpen(false)
    } else {
      setToolbarPosition(0)
      setIsToolbarOpen(true)
    }
  }

  return (
    <div className="relative h-screen bg-gray-100 overflow-hidden">
      {/* Floating Toolbar */}
      <div 
        className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 z-50 transition-transform duration-300 ease-out"
        style={{ 
          transform: `translateX(${toolbarPosition}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {/* Drag Handle */}
        <div 
          className="absolute -right-12 top-1/2 transform -translate-y-1/2 w-12 h-20 bg-white rounded-r-xl shadow-lg border border-l-0 border-gray-200 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleToolbarDragStart}
          onTouchStart={handleToolbarDragStart}
          onClick={toggleToolbar}
        >
          <div className="flex flex-col gap-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
        </div>

        {/* Toolbar Content */}
        <div className="p-4 h-full overflow-y-auto">
          {/* Tools Section */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Tools</h4>
            <div className="flex gap-2">
              <button 
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  tool === "brush" 
                    ? "border-blue-500 bg-blue-50 text-blue-600" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => selectTool("brush")}
                title="Brush"
              >
                <span className="text-xl">🖌️</span>
              </button>
              <button 
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  tool === "eraser" 
                    ? "border-blue-500 bg-blue-50 text-blue-600" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => selectTool("eraser")}
                title="Eraser"
              >
                <span className="text-xl">🧽</span>
              </button>
            </div>
          </div>

          {/* Colors Section */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Colors</h4>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                    brushColor === color && !isEraserMode 
                      ? "border-blue-500 scale-110 shadow-md" 
                      : "border-gray-300 hover:scale-105 hover:shadow-sm"
                  } ${color === "#FFFFFF" ? "border-gray-400" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setBrushColor(color)
                    setIsEraserMode(false)
                    setTool("brush")
                  }}
                  title={color}
                />
              ))}
              <input
                type="color"
                value={brushColor}
                onChange={(e) => {
                  setBrushColor(e.target.value)
                  setIsEraserMode(false)
                  setTool("brush")
                }}
                className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-gray-400 cursor-pointer"
                title="Custom color"
              />
            </div>
          </div>

          {/* Brush Size Section */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Size: {brushSize}px</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {brushSizes.map((size) => (
                  <button
                    key={size}
                    className={`p-2 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                      brushSize === size 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => setBrushSize(size)}
                    title={`${size}px`}
                  >
                    <div 
                      className="rounded-full"
                      style={{
                        width: `${Math.min(size, 20)}px`,
                        height: `${Math.min(size, 20)}px`,
                        backgroundColor: isEraserMode ? "#9ca3af" : brushColor
                      }}
                    />
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider:bg-blue-500"
              />
            </div>
          </div>

          {/* Actions Section */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Actions</h4>
            <button 
              className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={handleClear}
            >
              <span className="text-lg">🗑️</span>
              Clear Canvas
            </button>
          </div>
        </div>
      </div>

      {/* Global mouse/touch handlers for dragging */}
      {isDragging && (
        <div 
          className="fixed inset-0 z-40"
          onMouseMove={handleToolbarDrag}
          onMouseUp={handleToolbarDragEnd}
          onTouchMove={handleToolbarDrag}
          onTouchEnd={handleToolbarDragEnd}
        />
      )}

      {/* Canvas Area - now full width */}
      <div className="w-full h-full relative">
        <canvas
          ref={canvasRef}
          className={`w-full h-full bg-white ${
            isEraserMode 
              ? "cursor-crosshair" 
              : "cursor-crosshair"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'none' }}
        />
        
        {/* Canvas Info Overlay */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-sm border border-gray-200">
          <div className="text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className={isEraserMode ? "text-orange-600" : "text-blue-600"}>
                {isEraserMode ? "🧽" : "🖌️"}
              </span>
              <span>{tool === "eraser" ? "Eraser" : "Brush"}</span>
              <span className="text-gray-400">•</span>
              <span>{brushSize}px</span>
              {!isEraserMode && (
                <>
                  <span className="text-gray-400">•</span>
                  <div 
                    className="w-3 h-3 rounded-full border border-gray-300" 
                    style={{ backgroundColor: brushColor }}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick Tool Toggle (when toolbar is closed) */}
        {!isToolbarOpen && (
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <button
              onClick={toggleToolbar}
              className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
              title="Open Toolbar"
            >
              <span className="text-xl">🎨</span>
            </button>
            {/* Quick tool buttons */}
            <button
              onClick={() => selectTool(tool === "brush" ? "eraser" : "brush")}
              className={`w-12 h-12 bg-white rounded-full shadow-lg border-2 flex items-center justify-center transition-all duration-200 ${
                tool === "eraser" ? "border-orange-400 bg-orange-50" : "border-blue-400 bg-blue-50"
              }`}
              title={tool === "brush" ? "Switch to Eraser" : "Switch to Brush"}
            >
              <span className="text-xl">{tool === "brush" ? "🧽" : "🖌️"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CanvasBoard