"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Plane, Trophy, RotateCcw } from "lucide-react"

interface AviatorGameProps {
  onComplete: (score: number) => void
}

export default function AviatorGame({ onComplete }: AviatorGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [multiplier, setMultiplier] = useState(1.0)
  const [crashed, setCrashed] = useState(false)
  const [cashedOut, setCashedOut] = useState(false)
  const [finalMultiplier, setFinalMultiplier] = useState(0)
  const [gameLoop, setGameLoop] = useState<NodeJS.Timeout | null>(null)
  const [evaluationMade, setEvaluationMade] = useState(false)
  const [bet] = useState(10) // Fixed bet amount
  const [planePosition, setPlanePosition] = useState({ x: 10, y: 80 })

  const startGame = () => {
    setGameStarted(true)
    setGameEnded(false)
    setMultiplier(1.0)
    setCrashed(false)
    setCashedOut(false)
    setFinalMultiplier(0)
    setEvaluationMade(false)
    setPlanePosition({ x: 10, y: 80 })
  }

  const cashOut = useCallback(() => {
    if (gameStarted && !gameEnded && !crashed && !cashedOut) {
      setCashedOut(true)
      setFinalMultiplier(multiplier)
      setGameEnded(true)
      setGameStarted(false)
      if (gameLoop) {
        clearInterval(gameLoop)
        setGameLoop(null)
      }
    }
  }, [gameStarted, gameEnded, crashed, cashedOut, multiplier, gameLoop])

  const resetGame = () => {
    setGameStarted(false)
    setGameEnded(false)
    setMultiplier(1.0)
    setCrashed(false)
    setCashedOut(false)
    setFinalMultiplier(0)
    setEvaluationMade(false)
    setPlanePosition({ x: 10, y: 80 })
    if (gameLoop) {
      clearInterval(gameLoop)
      setGameLoop(null)
    }
  }

  useEffect(() => {
    if (gameStarted && !gameEnded && !crashed && !cashedOut) {
      const interval = setInterval(() => {
        setMultiplier((prev) => {
          const newMultiplier = prev + 0.01

          // Update plane position
          setPlanePosition((prevPos) => ({
            x: Math.min(prevPos.x + 2, 85),
            y: Math.max(prevPos.y - 1, 20),
          }))

          // Random crash chance increases with multiplier
          const crashChance = Math.random()
          const crashThreshold = 0.02 + (newMultiplier - 1) * 0.01

          if (crashChance < crashThreshold) {
            setCrashed(true)
            setGameEnded(true)
            setGameStarted(false)
            setFinalMultiplier(0)
            clearInterval(interval)
            return newMultiplier
          }

          return newMultiplier
        })
      }, 100)

      setGameLoop(interval)
      return () => clearInterval(interval)
    }
  }, [gameStarted, gameEnded, crashed, cashedOut])

  const handleEvaluation = (approved: boolean) => {
    if (!evaluationMade) {
      setEvaluationMade(true)
      const gameReward = Math.max(30, Math.floor(finalMultiplier * 10)) // Minimum 30, +10 per multiplier point
      onComplete(gameReward)
    }
  }

  const getWinnings = () => {
    if (cashedOut) {
      return bet * finalMultiplier
    }
    return 0
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Aviator Challenge</h3>
        <p className="text-sm text-slate-600 mb-3">Retire seus ganhos antes do avião voar para longe!</p>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-blue-900 mb-2">🎯 Como Jogar:</h4>
          <ul className="text-xs text-blue-800 space-y-1 text-left">
            <li>• O avião decola e o multiplicador aumenta</li>
            <li>• Clique em "Retirar" antes do avião voar para longe</li>
            <li>• Quanto maior o multiplicador, maior sua recompensa</li>
            <li>• Se o avião voar antes de retirar, você perde!</li>
          </ul>
        </div>
      </div>

      {/* Game Area */}
      <div className="bg-gradient-to-b from-sky-300 to-sky-500 rounded-2xl overflow-hidden relative h-64">
        {/* Clouds */}
        <div className="absolute top-4 left-8 text-white opacity-60">☁️</div>
        <div className="absolute top-8 right-12 text-white opacity-60">☁️</div>
        <div className="absolute top-16 left-20 text-white opacity-60">☁️</div>

        {/* Plane */}
        {(gameStarted || gameEnded) && (
          <div
            className="absolute transition-all duration-100 text-2xl"
            style={{
              left: `${planePosition.x}%`,
              top: `${planePosition.y}%`,
              transform: crashed ? "rotate(45deg)" : "rotate(-10deg)",
            }}
          >
            {crashed ? "💥" : "✈️"}
          </div>
        )}

        {/* Multiplier Display */}
        {gameStarted && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className={`text-4xl font-bold ${crashed ? "text-red-500" : "text-white"}`}>
              {multiplier.toFixed(2)}x
            </div>
          </div>
        )}

        {/* Game States */}
        {!gameStarted && !gameEnded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <Plane className="w-16 h-16 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Pronto para decolar?</h4>
              <p className="text-sm mb-4">Aposta: R$ {bet.toFixed(2)}</p>
              <Button onClick={startGame} className="bg-white text-sky-600 hover:bg-gray-100">
                🚀 Iniciar Voo
              </Button>
            </div>
          </div>
        )}

        {gameEnded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center text-white">
              {crashed ? (
                <>
                  <div className="text-4xl mb-4">💥</div>
                  <h4 className="text-2xl font-bold mb-2 text-red-400">Crashed!</h4>
                  <p className="text-lg mb-1">Multiplicador: {multiplier.toFixed(2)}x</p>
                  <p className="text-sm opacity-90">O avião voou para longe!</p>
                </>
              ) : (
                <>
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                  <h4 className="text-2xl font-bold mb-2 text-emerald-400">Sucesso!</h4>
                  <p className="text-lg mb-1">Retirado em: {finalMultiplier.toFixed(2)}x</p>
                  <p className="text-sm opacity-90">Ganhos: R$ {getWinnings().toFixed(2)}</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Cash Out Button */}
        {gameStarted && !crashed && !cashedOut && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Button
              onClick={cashOut}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 text-lg font-bold"
            >
              💰 Retirar {(bet * multiplier).toFixed(2)}
            </Button>
          </div>
        )}
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-slate-900">R$ {bet.toFixed(2)}</div>
          <div className="text-xs text-slate-600">Aposta</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-emerald-600">{finalMultiplier.toFixed(2)}x</div>
          <div className="text-xs text-slate-600">Último Multiplicador</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600">R$ {getWinnings().toFixed(2)}</div>
          <div className="text-xs text-slate-600">Ganhos</div>
        </div>
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
              Melhor multiplicador: {finalMultiplier.toFixed(2)}x = R${" "}
              {Math.max(30, Math.floor(finalMultiplier * 10)).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
