"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gamepad2, Trophy, RotateCcw } from "lucide-react"

interface MiniGameProps {
  onComplete: (score: number) => void
}

export default function MiniGame({ onComplete }: MiniGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [score, setScore] = useState(0)
  const [birdY, setBirdY] = useState(150)
  const [birdVelocity, setBirdVelocity] = useState(0)
  const [pipes, setPipes] = useState<Array<{ x: number; gap: number; passed: boolean }>>([])
  const [gameLoop, setGameLoop] = useState<NodeJS.Timeout | null>(null)
  const [evaluationMade, setEvaluationMade] = useState(false)

  const GRAVITY = 0.6
  const JUMP_FORCE = -12
  const PIPE_WIDTH = 60
  const PIPE_GAP = 120
  const BIRD_SIZE = 20
  const GAME_HEIGHT = 300
  const GAME_WIDTH = 320

  const jump = useCallback(() => {
    if (gameStarted && !gameEnded) {
      setBirdVelocity(JUMP_FORCE)
    }
  }, [gameStarted, gameEnded])

  const startGame = () => {
    setGameStarted(true)
    setGameEnded(false)
    setScore(0)
    setBirdY(150)
    setBirdVelocity(0)
    setPipes([{ x: GAME_WIDTH, gap: 100, passed: false }])
    setEvaluationMade(false)
  }

  const endGame = () => {
    setGameEnded(true)
    setGameStarted(false)
    if (gameLoop) {
      clearInterval(gameLoop)
      setGameLoop(null)
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameEnded(false)
    setScore(0)
    setBirdY(150)
    setBirdVelocity(0)
    setPipes([])
    setEvaluationMade(false)
    if (gameLoop) {
      clearInterval(gameLoop)
      setGameLoop(null)
    }
  }

  useEffect(() => {
    if (gameStarted && !gameEnded) {
      const interval = setInterval(() => {
        // Update bird physics
        setBirdY((prev) => {
          const newY = prev + birdVelocity
          if (newY <= 0 || newY >= GAME_HEIGHT - BIRD_SIZE) {
            endGame()
            return prev
          }
          return newY
        })

        setBirdVelocity((prev) => prev + GRAVITY)

        // Update pipes
        setPipes((prev) => {
          const newPipes = prev.map((pipe) => ({ ...pipe, x: pipe.x - 3 }))

          // Add new pipe
          if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 200) {
            newPipes.push({
              x: GAME_WIDTH,
              gap: 80 + Math.random() * 100,
              passed: false,
            })
          }

          // Remove off-screen pipes and update score
          return newPipes.filter((pipe) => {
            if (pipe.x + PIPE_WIDTH < 0) return false

            // Check if bird passed pipe
            if (!pipe.passed && pipe.x + PIPE_WIDTH < 50) {
              pipe.passed = true
              setScore((s) => s + 1)
            }

            // Check collision
            const birdLeft = 50
            const birdRight = 50 + BIRD_SIZE
            const birdTop = birdY
            const birdBottom = birdY + BIRD_SIZE

            if (birdRight > pipe.x && birdLeft < pipe.x + PIPE_WIDTH) {
              if (birdTop < pipe.gap || birdBottom > pipe.gap + PIPE_GAP) {
                endGame()
              }
            }

            return true
          })
        })
      }, 20)

      setGameLoop(interval)
      return () => clearInterval(interval)
    }
  }, [gameStarted, gameEnded, birdVelocity, birdY])

  const handleEvaluation = (approved: boolean) => {
    if (!evaluationMade) {
      setEvaluationMade(true)
      const gameReward = Math.max(30, score * 5) // Minimum 30, +5 per point
      onComplete(gameReward)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Flappy Bird Challenge</h3>
        <p className="text-sm text-slate-600 mb-3">Desvie dos obstáculos tocando na tela para fazer o pássaro voar!</p>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-blue-900 mb-2">📋 Como Jogar:</h4>
          <ul className="text-xs text-blue-800 space-y-1 text-left">
            <li>• Toque na tela para fazer o pássaro voar</li>
            <li>• Passe pelos obstáculos verdes sem bater</li>
            <li>• Cada obstáculo passado = +1 ponto</li>
            <li>• Quanto mais pontos, maior sua recompensa!</li>
          </ul>
        </div>
      </div>

      {/* Game Area */}
      <div
        className="bg-gradient-to-b from-sky-400 to-sky-600 rounded-2xl overflow-hidden relative"
        style={{ height: GAME_HEIGHT }}
      >
        {!gameStarted && !gameEnded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="text-center text-white">
              <Gamepad2 className="w-16 h-16 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Pronto para voar?</h4>
              <p className="text-sm mb-4">Toque na tela para fazer o pássaro voar!</p>
              <Button onClick={startGame} className="bg-white text-sky-600 hover:bg-gray-100">
                🚀 Iniciar Jogo
              </Button>
            </div>
          </div>
        )}

        {gameStarted && !gameEnded && (
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={jump}
            onTouchStart={(e) => {
              e.preventDefault()
              jump()
            }}
          >
            {/* Bird */}
            <div
              className="absolute w-5 h-5 bg-yellow-400 rounded-full border-2 border-orange-400 transition-all duration-75"
              style={{
                left: "50px",
                top: `${birdY}px`,
                transform: `rotate(${Math.min(Math.max(birdVelocity * 3, -30), 30)}deg)`,
              }}
            >
              <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full"></div>
            </div>

            {/* Pipes */}
            {pipes.map((pipe, index) => (
              <div key={index}>
                {/* Top pipe */}
                <div
                  className="absolute bg-green-500 border-2 border-green-600"
                  style={{
                    left: `${pipe.x}px`,
                    top: "0px",
                    width: `${PIPE_WIDTH}px`,
                    height: `${pipe.gap}px`,
                  }}
                />
                {/* Bottom pipe */}
                <div
                  className="absolute bg-green-500 border-2 border-green-600"
                  style={{
                    left: `${pipe.x}px`,
                    top: `${pipe.gap + PIPE_GAP}px`,
                    width: `${PIPE_WIDTH}px`,
                    height: `${GAME_HEIGHT - pipe.gap - PIPE_GAP}px`,
                  }}
                />
              </div>
            ))}

            {/* Score */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-white/90 text-sky-800 text-lg font-bold">{score}</Badge>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <p className="text-white text-xs bg-black/30 px-2 py-1 rounded">👆 Toque para voar</p>
            </div>
          </div>
        )}

        {gameEnded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center text-white">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
              <h4 className="text-2xl font-bold mb-2">Game Over!</h4>
              <p className="text-lg mb-1">Pontuação: {score}</p>
              <p className="text-sm opacity-90 mb-4">
                {score === 0 ? "Tente novamente!" : score < 5 ? "Bom começo!" : score < 10 ? "Muito bem!" : "Incrível!"}
              </p>
              <div className="space-y-2">
                <p className="text-xs bg-emerald-500/20 text-emerald-200 px-3 py-1 rounded-full">
                  Recompensa: R$ {Math.max(30, score * 5).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Game Controls */}
      {gameEnded && !evaluationMade && (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button
              onClick={resetGame}
              variant="outline"
              className="flex items-center space-x-2 border-blue-200 hover:bg-blue-50"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jogar Novamente</span>
            </Button>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <h4 className="font-medium text-slate-900 mb-3">Avalie este jogo:</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleEvaluation(true)}
                className="h-12 bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                ✅ Aprovar
              </Button>
              <Button onClick={() => handleEvaluation(false)} className="h-12 bg-red-500 hover:bg-red-600 text-white">
                ❌ Reprovar
              </Button>
            </div>
            <p className="text-xs text-slate-600 mt-2 text-center">
              Sua pontuação: {score} pontos = R$ {Math.max(30, score * 5).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
