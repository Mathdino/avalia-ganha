"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, Sparkles } from "lucide-react"

interface BonusPopupProps {
  isOpen: boolean
  onClose: () => void
  amount: number
}

export default function BonusPopup({ isOpen, onClose, amount }: BonusPopupProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ["#f59e0b", "#ef4444", "#3b82f6", "#10b981", "#8b5cf6"][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white rounded-3xl p-8 text-center animate-in zoom-in duration-500 shadow-2xl max-w-sm mx-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 opacity-50" />

        <div className="relative z-10">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
            <Gift className="w-10 h-10 text-white" />
          </div>

          <div className="flex items-center justify-center space-x-2 mb-3">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm px-3 py-1">
              BÔNUS ESPECIAL
            </Badge>
            <Sparkles className="w-5 h-5 text-yellow-500" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-2">🎉 Parabéns!</h3>
          <p className="text-slate-600 mb-4">Você desbloqueou um bônus por sua dedicação!</p>

          <div className="bg-gradient-to-r from-emerald-100 to-emerald-200 rounded-2xl p-4 mb-6">
            <div className="text-3xl font-bold text-emerald-700">+R$ {amount.toFixed(2)}</div>
            <div className="text-sm text-emerald-600">Bônus de Performance</div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <p className="text-xs text-slate-600">
              💡 <strong>Dica:</strong> Continue completando tarefas para desbloquear mais bônus exclusivos!
            </p>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white h-12 text-base font-semibold rounded-xl"
          >
            Continuar Ganhando
          </Button>
        </div>
      </div>
    </div>
  )
}
