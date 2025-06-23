"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, Zap } from "lucide-react"

interface SlotMachineProps {
  onComplete: (amount: number) => void
}

export default function SlotMachine({ onComplete }: SlotMachineProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [reels, setReels] = useState(["💰", "💎", "⭐"])

  const symbols = ["💰", "💎", "⭐", "🎯", "🔥", "💸"]
  const rewards = [70, 50, 40, 60, 45, 55]

  const spin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    // Animate reels
    let spinCount = 0
    const maxSpins = 20

    const spinInterval = setInterval(() => {
      setReels((prev) => prev.map(() => symbols[Math.floor(Math.random() * symbols.length)]))
      spinCount++

      if (spinCount >= maxSpins) {
        clearInterval(spinInterval)

        // Determine final result
        const finalSymbol = symbols[Math.floor(Math.random() * symbols.length)]
        const symbolIndex = symbols.indexOf(finalSymbol)
        const reward = rewards[symbolIndex]

        setReels([finalSymbol, finalSymbol, finalSymbol])
        setResult(reward)
        setIsSpinning(false)

        setTimeout(() => {
          onComplete(reward)
        }, 2000)
      }
    }, 100)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Máquina de Prêmios</h3>
        <p className="text-sm text-slate-600">Gire e ganhe seu bônus especial!</p>
      </div>

      {/* Slot Machine */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 text-center">
        <div className="flex justify-center space-x-2 mb-6">
          {reels.map((symbol, index) => (
            <div
              key={index}
              className={`w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl border-2 border-slate-300 ${
                isSpinning ? "animate-bounce" : ""
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {symbol}
            </div>
          ))}
        </div>

        {result && (
          <div className="mb-4">
            <Badge className="bg-emerald-500 text-white text-lg px-4 py-2">
              <Coins className="w-4 h-4 mr-2" />
              +R$ {result.toFixed(2)}
            </Badge>
          </div>
        )}

        <Button
          onClick={spin}
          disabled={isSpinning || result !== null}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3"
        >
          {isSpinning ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-spin" />
              Girando...
            </>
          ) : result ? (
            "Parabéns!"
          ) : (
            "Girar Máquina"
          )}
        </Button>
      </div>

      {/* Prize Table */}
      <div className="bg-slate-50 rounded-lg p-4">
        <h4 className="font-medium text-slate-900 mb-3 text-center">Tabela de Prêmios</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {symbols.map((symbol, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
              <span className="text-lg">{symbol}</span>
              <span className="font-medium text-emerald-600">R$ {rewards[index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
