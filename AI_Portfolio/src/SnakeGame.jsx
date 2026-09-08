import { useEffect, useRef, useState } from 'react'
import './SnakeGame.css'

const GRID = 20
const CELLS = 20
const CANVAS_SIZE = GRID * CELLS
const STORAGE_KEY = 'rashid-portfolio-snake-best'

function SnakeGame() {
  const canvasRef = useRef(null)
  const gameApiRef = useRef(null)

  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [overlayVisible, setOverlayVisible] = useState(true)
  const [overlayText, setOverlayText] = useState(
    'Use the arrows / WASD or the pad below to start'
  )

  useEffect(() => {
    const storedBest = Number(localStorage.getItem(STORAGE_KEY)) || 0
    setBest(storedBest)

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const state = {
      snake: [],
      direction: { x: 1, y: 0 },
      nextDirection: { x: 1, y: 0 },
      food: { x: 0, y: 0 },
      running: false,
      speedMs: 130,
      timeoutId: null,
      bestScore: storedBest
    }

    function resetState() {
      state.snake = [
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 }
      ]

      state.direction = { x: 1, y: 0 }
      state.nextDirection = { x: 1, y: 0 }
      state.speedMs = 130

      setScore(0)
      placeFood()
    }

    function placeFood() {
      let valid = false
      let food

      while (!valid) {
        food = {
          x: Math.floor(Math.random() * CELLS),
          y: Math.floor(Math.random() * CELLS)
        }

        valid = !state.snake.some(
          (segment) => segment.x === food.x && segment.y === food.y
        )
      }

      state.food = food
    }

    function draw() {
      ctx.fillStyle = '#080808'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // subtle grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 1

      for (let i = 0; i <= CELLS; i++) {
        ctx.beginPath()
        ctx.moveTo(i * GRID, 0)
        ctx.lineTo(i * GRID, canvas.height)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, i * GRID)
        ctx.lineTo(canvas.width, i * GRID)
        ctx.stroke()
      }

      // food — python yellow, glowing
      ctx.fillStyle = '#ffd43b'
      ctx.shadowColor = '#ffe873'
      ctx.shadowBlur = 12

      ctx.beginPath()
      ctx.arc(
        state.food.x * GRID + GRID / 2,
        state.food.y * GRID + GRID / 2,
        GRID / 3.2,
        0,
        Math.PI * 2
      )
      ctx.fill()

      ctx.shadowBlur = 0

      // snake — python blue body, yellow head
      state.snake.forEach((segment, index) => {
        ctx.fillStyle =
          index === 0
            ? '#ffd43b'
            : index % 2 === 0
            ? '#306998'
            : '#4b8bbe'

        const pad = 2

        ctx.fillRect(
          segment.x * GRID + pad,
          segment.y * GRID + pad,
          GRID - pad * 2,
          GRID - pad * 2
        )
      })
    }

    function gameOver() {
      state.running = false
      clearTimeout(state.timeoutId)

      setScore((currentScore) => {
        if (currentScore > state.bestScore) {
          state.bestScore = currentScore
          setBest(currentScore)
          localStorage.setItem(STORAGE_KEY, String(currentScore))
          setOverlayText(
            `New best: ${currentScore}! Press Restart to play again`
          )
        } else {
          setOverlayText(
            `Game over — score ${currentScore}. Press Restart to try again`
          )
        }

        return currentScore
      })

      setOverlayVisible(true)
    }

    function step() {
      state.direction = state.nextDirection

      const head = {
        x: state.snake[0].x + state.direction.x,
        y: state.snake[0].y + state.direction.y
      }

      if (head.x < 0 || head.y < 0 || head.x >= CELLS || head.y >= CELLS) {
        return gameOver()
      }

      const hitSelf = state.snake.some(
        (segment) => segment.x === head.x && segment.y === head.y
      )

      if (hitSelf) {
        return gameOver()
      }

      state.snake.unshift(head)

      if (head.x === state.food.x && head.y === state.food.y) {
        setScore((s) => s + 10)

        if (state.speedMs > 70) {
          state.speedMs -= 3
        }

        placeFood()
      } else {
        state.snake.pop()
      }

      draw()
    }

    function loopTick() {
      step()

      if (state.running) {
        state.timeoutId = setTimeout(loopTick, state.speedMs)
      }
    }

    function startGame() {
      if (state.running) {
        return
      }

      resetState()
      draw()

      state.running = true
      setOverlayVisible(false)

      clearTimeout(state.timeoutId)
      state.timeoutId = setTimeout(loopTick, state.speedMs)
    }

    function restartGame() {
      state.running = false
      clearTimeout(state.timeoutId)
      startGame()
    }

    function setDirection(x, y) {
      if (state.direction.x === -x && state.direction.y === -y) {
        return
      }

      state.nextDirection = { x, y }

      if (!state.running) {
        startGame()
      }
    }

    function handleKeyDown(event) {
      const targetTag = event.target.tagName

      const isTypingInField =
        targetTag === 'INPUT' ||
        targetTag === 'TEXTAREA' ||
        event.target.isContentEditable

      if (isTypingInField) {
        return
      }

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault()
          setDirection(0, -1)
          break

        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault()
          setDirection(0, 1)
          break

        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault()
          setDirection(-1, 0)
          break

        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault()
          setDirection(1, 0)
          break

        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // expose controls to the JSX buttons below
    gameApiRef.current = { setDirection, restartGame }

    // idle render before the first move
    resetState()
    draw()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      clearTimeout(state.timeoutId)
    }
  }, [])

  return (
    <div className="snake-game">
      <div className="snake-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="snake-canvas"
        />

        {overlayVisible && (
          <div className="snake-overlay">
            <span className="snake-overlay-emoji">🐍</span>
            <p>{overlayText}</p>

            <button
              className="snake-restart-button"
              onClick={() => gameApiRef.current?.restartGame()}
            >
              {score > 0 || best > 0 ? 'Restart' : 'Start Game'}
            </button>
          </div>
        )}
      </div>

      <div className="snake-panel">
        <div className="snake-tag">🐍 PYTHON SNAKE</div>

        <p className="snake-blurb">
          I write Python most days, so I figured it should slither
          around my portfolio too. Blue &amp; yellow, just like the logo.
        </p>

        <div className="snake-scoreboard">
          <div className="snake-score-card">
            <strong>{score}</strong>
            <span>Score</span>
          </div>

          <div className="snake-score-card">
            <strong>{best}</strong>
            <span>Best</span>
          </div>
        </div>

        <div className="snake-controls">
          <div className="snake-dpad">
            <button
              className="snake-dpad-btn snake-dpad-up"
              onClick={() => gameApiRef.current?.setDirection(0, -1)}
              aria-label="Move up"
            >
              ↑
            </button>

            <button
              className="snake-dpad-btn snake-dpad-left"
              onClick={() => gameApiRef.current?.setDirection(-1, 0)}
              aria-label="Move left"
            >
              ←
            </button>

            <button
              className="snake-dpad-btn snake-dpad-down"
              onClick={() => gameApiRef.current?.setDirection(0, 1)}
              aria-label="Move down"
            >
              ↓
            </button>

            <button
              className="snake-dpad-btn snake-dpad-right"
              onClick={() => gameApiRef.current?.setDirection(1, 0)}
              aria-label="Move right"
            >
              →
            </button>
          </div>

          <button
            className="snake-restart-button snake-restart-secondary"
            onClick={() => gameApiRef.current?.restartGame()}
          >
            Restart
          </button>
        </div>

        <p className="snake-hint">
          Keyboard: Arrow keys or W A S D
        </p>
      </div>
    </div>
  )
}

export default SnakeGame