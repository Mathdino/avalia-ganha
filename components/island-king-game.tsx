"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, RotateCcw, Coins, Hammer } from "lucide-react"

interface IslandKingGameProps {
  onComplete: (score: number) => void
}

interface Building {
  id: number
  type: "house" | "tree" | "decoration"
  x: number
  y: number
  emoji: string
  cost: number
}

export default function IslandKingGame({ onComplete }: IslandKingGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [coins, setCoins] = useState(100)
  const [buildings, setBuildings] = useState<Building[]>([])
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [evaluationMade, setEvaluationMade] = useState(false)
  const [gameTime, setGameTime] = useState(60) // 60 seconds to play
  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null)

  const buildingTypes = [
    { type: "house", emoji: "🏠", cost: 20, points: 10 },
    { type: "house", emoji: "🏡", cost: 30, points: 15 },
    { type: "tree", emoji: "🌳", cost: 15, points: 8 },
    { type: "tree", emoji: "🌲", cost: 18, points: 10 },
    { type: "decoration", emoji: "⛲", cost: 25, points: 12 },
    { type: "decoration", emoji: "🗿", cost: 35, points: 18 },
  ]

  const startGame = () => {
    setGameStarted(true)
    setGameEnded(false)
    setCoins(100)
    setBuildings([])
    setScore(0)
    setGameTime(60)
    setEvaluationMade(false)
    setSelectedBuilding(null)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameEnded(false)
    setCoins(100)
    setBuildings([])
    setScore(0)
    setGameTime(60)
    setEvaluationMade(false)
    setSelectedBuilding(null)
    if (gameTimer) {
      clearInterval(gameTimer)
      setGameTimer(null)
    }
  }

  const endGame = () => {
    setGameEnded(true)
    setGameStarted(false)
    if (gameTimer) {
      clearInterval(gameTimer)
      setGameTimer(null)
    }
  }

  useEffect(() => {
    if (gameStarted && !gameEnded && gameTime > 0) {
      const timer = setInterval(() => {
        setGameTime((prev) => {
          if (prev <= 1) {
            endGame()
            return 0
          }
          return prev - 1
        })

        // Generate coins over time
        setCoins((prev) => prev + Math.floor(buildings.length / 2) + 1)
      }, 1000)

      setGameTimer(timer)
      return () => clearInterval(timer)
    }
  }, [gameStarted, gameEnded, gameTime, buildings.length])

  const placeBuilding = (x: number, y: number) => {
    if (!selectedBuilding || !gameStarted || gameEnded) return

    const buildingType = buildingTypes.find((b) => b.emoji === selectedBuilding)
    if (!buildingType || coins < buildingType.cost) return

    // Check if position is already occupied
    const isOccupied = buildings.some((building) => Math.abs(building.x - x) < 30 && Math.abs(building.y - y) < 30)
    if (isOccupied) return

    const newBuilding: Building = {
      id: Date.now(),
      type: buildingType.type as "house" | "tree" | "decoration",
      x,
      y,
      emoji: buildingType.emoji,
      cost: buildingType.cost,
    }

    setBuildings((prev) => [...prev, newBuilding])
    setCoins((prev) => prev - buildingType.cost)
    setScore((prev) => prev + buildingType.points)
    setSelectedBuilding(null)
  }

  const handleIslandClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    placeBuilding(x, y)
  }

  const handleEvaluation = (approved: boolean) => {
    if (!evaluationMade) {
      setEvaluationMade(true)
      const gameReward = Math.max(30, score * 2) // Minimum 30, +2 per point
      onComplete(gameReward)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Island King Challenge</h3>
        <p className="text-sm text-slate-600 mb-3">Construa sua ilha paradisíaca em 60 segundos!</p>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <h4 className="font-medium text-blue-900 mb-2">🏝️ Como Jogar:</h4>
          <ul className="text-xs text-blue-800 space-y-1 text-left">
            <li>• Escolha um prédio/decoração na loja</li>
            <li>• Clique na ilha para construir</li>
            <li>• Ganhe moedas automaticamente</li>
            <li>• Quanto mais construir, maior sua pontuação!</li>
          </ul>
        </div>
      </div>

      {/* Game Stats */}
      {gameStarted && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-yellow-100 rounded-lg p-2 text-center">
            <div className="flex items-center justify-center space-x-1">
              <Coins className="w-4 h-4 text-yellow-600" />
              <span className="font-bold text-yellow-800">{coins}</span>
            </div>
            <div className="text-xs text-yellow-700">Moedas</div>
          </div>
          <div className="bg-purple-100 rounded-lg p-2 text-center">
            <div className="font-bold text-purple-800">{score}</div>
            <div className="text-xs text-purple-700">Pontos</div>
          </div>
          <div className="bg-red-100 rounded-lg p-2 text-center">
            <div className="font-bold text-red-800">{gameTime}s</div>
            <div className="text-xs text-red-700">Tempo</div>
          </div>
        </div>
      )}

      {/* Game Area */}
      <div className="bg-gradient-to-b from-sky-300 to-emerald-400 rounded-2xl overflow-hidden relative h-64 border-4 border-blue-200">
        {!gameStarted && !gameEnded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="text-center text-white">
              <div className="text-4xl mb-4">🏝️</div>
              <h4 className="text-xl font-bold mb-2">Construa sua Ilha!</h4>
              <p className="text-sm mb-4">Você tem 60 segundos para criar a melhor ilha</p>
              <Button onClick={startGame} className="bg-white text-emerald-600 hover:bg-gray-100">
                🚀 Começar Construção
              </Button>
            </div>
          </div>
        )}

        {gameStarted && !gameEnded && (
          <div
            className="absolute inset-0 cursor-crosshair"
            onClick={handleIslandClick}
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)
              `,
            }}
          >
            {/* Island Base */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-24 bg-yellow-600 rounded-full opacity-80" />
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-20 bg-yellow-500 rounded-full opacity-90" />

            {/* Buildings */}
            {buildings.map((building) => (
              <div
                key={building.id}
                className="absolute text-2xl animate-in zoom-in duration-300"
                style={{
                  left: `${building.x - 15}px`,
                  top: `${building.y - 15}px`,
                }}
              >
                {building.emoji}
              </div>
            ))}

            {/* Selected building preview */}
            {selectedBuilding && (
              <div className="absolute top-2 left-2 bg-white/90 rounded-lg p-2 text-sm">
                <span className="text-lg mr-2">{selectedBuilding}</span>
                <span className="text-emerald-600 font-semibold">Clique para construir</span>
              </div>
            )}
          </div>
        )}

        {gameEnded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-center text-white">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
              <h4 className="text-2xl font-bold mb-2">Ilha Completa!</h4>
              <p className="text-lg mb-1">Pontuação: {score}</p>
              <p className="text-sm opacity-90">Construções: {buildings.length}</p>
              <div className="mt-2">
                <Badge className="bg-emerald-500/20 text-emerald-200">
                  Recompensa: R$ {Math.max(30, score * 2).toFixed(2)}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Building Shop */}
      {gameStarted && !gameEnded && (
        <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
            <Hammer className="w-5 h-5" />
            <span>Loja de Construção</span>
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {buildingTypes.map((building, index) => (
              <Button
                key={index}
                variant={selectedBuilding === building.emoji ? "default" : "outline"}
                className={`h-16 flex flex-col items-center justify-center space-y-1 ${
                  coins < building.cost ? "opacity-50 cursor-not-allowed" : ""
                } ${selectedBuilding === building.emoji ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}
                onClick={() => setSelectedBuilding(building.emoji)}
                disabled={coins < building.cost}
              >
                <span className="text-lg">{building.emoji}</span>
                <span className="text-xs flex items-center space-x-1">
                  <Coins className="w-3 h-3" />
                  <span>{building.cost}</span>
                </span>
              </Button>
            ))}
          </div>
        </div>
      )}

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
              <span>Construir Nova Ilha</span>
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
              Sua pontuação: {score} pontos = R$ {Math.max(30, score * 2).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
