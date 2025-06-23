"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Coins, Zap, Flame } from "lucide-react"

interface TigrinhoGameProps {
  onComplete: (score: number) => void
}

export default function TigrinhoGame({ onComplete }: TigrinhoGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameEnded, setGameEnded] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [reels, setReels] = useState([
    ["🐅", "🐅", "🐅"],
    ["🐅", "🐅", "🐅"],
    ["🐅", "🐅", "🐅"],
  ])
  const [credits, setCredits] = useState(100)
  const [bet] = useState(10)
  const [totalWinnings, setTotalWinnings] = useState(0)
  const [lastWin, setLastWin] = useState(0)
  const [evaluationMade, setEvaluationMade] = useState(false)
  const [spinsCount, setSpinsCount] = useState(0)
  const [multiplier, setMultiplier] = useState(1)

  const symbols = ["🐅", "🦁", "🐆", "🐯", "💎", "👑", "🔥", "⚡"]
  const payouts = {
    "🐅🐅🐅": 1000, // Tigrinho triplo - jackpot!
    "🦁🦁🦁": 500,
    "🐆🐆🐆": 300,
    "🐯🐯🐯": 200,
    "💎💎💎": 400,
    "👑👑👑": 600,
    "🔥🔥🔥": 350,
    "⚡⚡⚡": 250,
    // Duas combinações
    "🐅🐅": 50,
    "🦁🦁": 30,
    "🐆🐆": 25,
    "🐯🐯": 20,
    "💎💎": 40,
    "👑👑": 60,
    "🔥🔥": 35,
    "⚡⚡": 25,
  }

  const playWinSound = () => {
    const winSound = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    )
    winSound.volume = 0.4
    winSound.play().catch(() => {})
  }

  const playNotificationSound = () => {
    const notificationSound = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWTwwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    )
    notificationSound.volume = 0.2
    notificationSound.play().catch(() => {})
  }

  const startGame = () => {
    setGameStarted(true)
    setGameEnded(false)
    setCredits(100)
    setTotalWinnings(0)
    setLastWin(0)
    setSpinsCount(0)
    setMultiplier(1)
    setEvaluationMade(false)
    setReels([
      ["🐅", "🐅", "🐅"],
      ["🐅", "🐅", "🐅"],
      ["🐅", "🐅", "🐅"],
    ])
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameEnded(false)
    setIsSpinning(false)
    setCredits(100)
    setTotalWinnings(0)
    setLastWin(0)
    setSpinsCount(0)
    setMultiplier(1)
    setEvaluationMade(false)
    setReels([
      ["🐅", "🐅", "🐅"],
      ["🐅", "🐅", "🐅"],
      ["🐅", "🐅", "🐅"],
    ])
  }

  const spin = useCallback(() => {
    if (isSpinning || credits < bet || gameEnded) return

    setIsSpinning(true)
    setCredits((prev) => prev - bet)
    setSpinsCount((prev) => prev + 1)
    setLastWin(0)

    // Aumentar multiplicador a cada rodada
    setMultiplier((prev) => Math.min(prev + 0.5, 5))

    let spinDuration = 0
    const maxSpinDuration = 2500
    const spinInterval = 80

    const spinTimer = setInterval(() => {
      setReels((prev) => prev.map((column) => column.map(() => symbols[Math.floor(Math.random() * symbols.length)])))

      spinDuration += spinInterval

      if (spinDuration >= maxSpinDuration) {
        clearInterval(spinTimer)

        // Resultado final com chance maior de ganhar
        const result = [
          [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
          ],
          [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
          ],
          [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
          ],
        ]

        // Chance especial de tigrinho triplo (10% de chance)
        if (Math.random() < 0.1) {
          result[0][1] = "🐅"
          result[1][1] = "🐅"
          result[2][1] = "🐅"
        }

        setReels(result)

        // Calcular ganhos
        let winAmount = 0

        // Verificar linhas horizontais
        for (let row = 0; row < 3; row++) {
          const horizontalLine = [result[0][row], result[1][row], result[2][row]]
          if (horizontalLine[0] === horizontalLine[1] && horizontalLine[1] === horizontalLine[2]) {
            const lineKey = `${horizontalLine[0]}${horizontalLine[0]}${horizontalLine[0]}` as keyof typeof payouts
            winAmount += (payouts[lineKey] || 0) * multiplier
          } else if (horizontalLine[0] === horizontalLine[1] || horizontalLine[1] === horizontalLine[2]) {
            const matchingSymbol = horizontalLine[0] === horizontalLine[1] ? horizontalLine[0] : horizontalLine[1]
            const twoMatchKey = `${matchingSymbol}${matchingSymbol}` as keyof typeof payouts
            winAmount += (payouts[twoMatchKey] || 0) * multiplier
          }
        }

        // Linha do meio vale dobrado
        const middleRow = [result[0][1], result[1][1], result[2][1]]
        if (middleRow[0] === middleRow[1] && middleRow[1] === middleRow[2]) {
          const lineKey = `${middleRow[0]}${middleRow[0]}${middleRow[0]}` as keyof typeof payouts
          winAmount += (payouts[lineKey] || 0) * multiplier
        }

        if (winAmount > 0) {
          setCredits((prev) => prev + winAmount)
          setTotalWinnings((prev) => {
            const newTotal = prev + winAmount
            // Som de notificação quando acumular ganhos
            setTimeout(() => {
              playNotificationSound()
            }, 300)
            return newTotal
          })
          setLastWin(winAmount)
          playWinSound()
        }

        setIsSpinning(false)

        // Fim do jogo após 5 rodadas
        if (spinsCount >= 4 || credits - bet < bet) {
          setTimeout(() => {
            setGameEnded(true)
            setGameStarted(false)
          }, 2000)
        }
      }
    }, spinInterval)
  }, [isSpinning, credits, bet, gameEnded, spinsCount, symbols, multiplier])

  const handleEvaluation = (approved: boolean) => {
    if (!evaluationMade) {
      setEvaluationMade(true)
      const gameReward = Math.max(50, Math.floor(totalWinnings / 8))
      onComplete(gameReward)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900 mb-2">🐅 JOGO DO TIGRINHO 🐅</h3>

        {/* Urgency Banner - Menor */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-2 mb-3">
          <div className="flex items-center justify-center space-x-2">
            <Flame className="w-4 h-4" />
            <span className="font-bold text-xs">🔥 DESBLOQUEIE SEU BÔNUS AGORA!</span>
            <Flame className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Game Stats - Compacto */}
      {gameStarted && (
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="bg-yellow-100 rounded-lg p-2 text-center">
            <div className="font-bold text-yellow-800 text-sm">{credits}</div>
            <div className="text-xs text-yellow-700">Créditos</div>
          </div>
          <div className="bg-green-100 rounded-lg p-2 text-center">
            <div className="font-bold text-green-800 text-sm">{totalWinnings}</div>
            <div className="text-xs text-green-700">Ganhos</div>
          </div>
          <div className="bg-blue-100 rounded-lg p-2 text-center">
            <div className="font-bold text-blue-800 text-sm">{5 - spinsCount}</div>
            <div className="text-xs text-blue-700">Rodadas</div>
          </div>
          <div className="bg-purple-100 rounded-lg p-2 text-center">
            <div className="font-bold text-purple-800 text-sm">{multiplier.toFixed(1)}x</div>
            <div className="text-xs text-purple-700">Multi</div>
          </div>
        </div>
      )}

      {/* Tigrinho Game - Compacto */}
      <div className="bg-gradient-to-b from-orange-600 to-red-700 rounded-2xl p-4 text-center shadow-2xl border-4 border-yellow-400">
        <div className="bg-black rounded-lg p-3 mb-3">
          <div className="flex justify-center space-x-2">
            {reels.map((column, colIndex) => (
              <div key={colIndex} className="space-y-1">
                {column.map((symbol, rowIndex) => (
                  <div
                    key={`${colIndex}-${rowIndex}`}
                    className={`w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-lg border-2 border-yellow-300 ${
                      isSpinning ? "animate-spin" : ""
                    } ${rowIndex === 1 ? "ring-2 ring-yellow-400 ring-offset-1" : ""}`}
                    style={{
                      animationDelay: `${colIndex * 0.1 + rowIndex * 0.05}s`,
                    }}
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {lastWin > 0 && !isSpinning && (
            <div className="mt-3">
              <Badge className="bg-yellow-500 text-black text-sm px-3 py-1 animate-bounce">
                <Coins className="w-3 h-3 mr-1" />🐅 +{lastWin} CRÉDITOS! 🐅
              </Badge>
            </div>
          )}
        </div>

        {!gameStarted && !gameEnded && (
          <div className="space-y-3">
            <div className="text-white">
              <div className="text-4xl mb-2">🐅</div>
              <h4 className="text-lg font-bold mb-1">JOGO DO TIGRINHO</h4>
              <p className="text-xs opacity-90">🔥 Desbloqueie bônus de até R$ 200!</p>
            </div>
            <Button onClick={startGame} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-2">
              🚀 JOGAR AGORA
            </Button>
          </div>
        )}

        {gameStarted && !gameEnded && (
          <div className="space-y-2">
            <div className="text-white text-xs">
              <p>🎯 Multi: {multiplier.toFixed(1)}x • ⚡ Próxima pode ser a grande!</p>
            </div>
            <Button
              onClick={spin}
              disabled={isSpinning || credits < bet}
              className={`bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-2 ${
                isSpinning ? "opacity-50" : ""
              }`}
            >
              {isSpinning ? (
                <>
                  <Zap className="w-4 h-4 mr-1 animate-spin" />🐅 GIRANDO...
                </>
              ) : (
                <>
                  <Coins className="w-4 h-4 mr-1" />🐅 GIRAR ({bet})
                </>
              )}
            </Button>
          </div>
        )}

        {gameEnded && (
          <div className="text-white space-y-3">
            <div className="text-4xl mb-2">{totalWinnings > 200 ? "🏆" : totalWinnings > 100 ? "🎉" : "🐅"}</div>
            <h4 className="text-lg font-bold">
              {totalWinnings > 200 ? "JACKPOT!" : totalWinnings > 100 ? "GRANDE VITÓRIA!" : "Finalizado!"}
            </h4>
            <div className="space-y-1 text-sm">
              <p>
                💰 Créditos: {credits} | 🎯 Ganhos: {totalWinnings}
              </p>
              <Badge className="bg-emerald-500/20 text-emerald-200 px-3 py-1">
                💸 Bônus: R$ {Math.max(50, Math.floor(totalWinnings / 8)).toFixed(2)}
              </Badge>
            </div>
          </div>
        )}
      </div>

      {/* Paytable - Compacto */}
      <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
        <h4 className="font-medium text-orange-900 mb-2 text-center text-sm">🏆 PRÊMIOS</h4>
        <div className="grid grid-cols-4 gap-1 text-xs">
          <div className="flex justify-between bg-white p-1 rounded text-xs">
            <span>🐅🐅🐅</span>
            <span className="font-bold text-orange-600">1000</span>
          </div>
          <div className="flex justify-between bg-white p-1 rounded text-xs">
            <span>👑👑👑</span>
            <span className="font-bold text-orange-600">600</span>
          </div>
          <div className="flex justify-between bg-white p-1 rounded text-xs">
            <span>🦁🦁🦁</span>
            <span className="font-bold text-orange-600">500</span>
          </div>
          <div className="flex justify-between bg-white p-1 rounded text-xs">
            <span>💎💎💎</span>
            <span className="font-bold text-orange-600">400</span>
          </div>
        </div>
        <p className="text-xs text-orange-700 mt-1 text-center">🎯 Linha do meio = DOBRO!</p>
      </div>

      {/* Game Controls - Compacto */}
      {gameEnded && !evaluationMade && (
        <div className="space-y-3">
          <div className="flex justify-center">
            <Button
              onClick={resetGame}
              variant="outline"
              className="flex items-center space-x-2 border-orange-200 hover:bg-orange-50 text-sm"
            >
              <RotateCcw className="w-3 h-3" />
              <span>🐅 Jogar Novamente</span>
            </Button>
          </div>

          <div className="bg-orange-50 rounded-xl p-3 border border-orange-200">
            <h4 className="font-medium text-orange-900 mb-2 text-sm">⭐ Avalie para desbloquear seu bônus:</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => handleEvaluation(true)}
                className="h-10 bg-emerald-500 hover:bg-emerald-600 text-white text-sm"
              >
                ✅ APROVAR
              </Button>
              <Button
                onClick={() => handleEvaluation(false)}
                className="h-10 bg-red-500 hover:bg-red-600 text-white text-sm"
              >
                ❌ REPROVAR
              </Button>
            </div>
            <p className="text-xs text-orange-700 mt-1 text-center">
              🐅 Bônus: R$ {Math.max(50, Math.floor(totalWinnings / 8)).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
