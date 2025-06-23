"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Shield, Star, Users, Zap, Coins } from "lucide-react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState(0)

  const messages = [
    "Verificando seu acesso VIP exclusivo...",
    "Conectando com empresas que pagam HOJE...",
    "Carregando tarefas que pagam até R$ 200...",
    "Preparando seus primeiros ganhos...",
  ]

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 1.5
      })
    }, 50)

    const messageTimer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 800)

    return () => {
      clearInterval(progressTimer)
      clearInterval(messageTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
      <div className="max-w-sm w-full text-center space-y-8">
        {/* Logo/Brand */}
        <div className="space-y-4">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
            <Coins className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Avalia & Ganha</h1>
            <p className="text-emerald-300">Avalie e Ganhe Dinheiro</p>
          </div>
        </div>

        {/* Exclusive Access Badge */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Shield className="w-6 h-6 text-amber-400" />
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-sm">
              🔥 ACESSO PREMIUM LIBERADO
            </Badge>
          </div>
          <p className="text-amber-200 text-sm">💰 Você foi selecionado para ganhar até R$ 200/dia</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-3">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl mx-auto flex items-center justify-center">
              <Star className="w-7 h-7 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-300">
              Avaliações
              <br />
              Premium
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl mx-auto flex items-center justify-center">
              <Users className="w-7 h-7 text-blue-400" />
            </div>
            <p className="text-xs text-slate-300">
              Comunidade
              <br />
              Exclusiva
            </p>
          </div>
          <div className="space-y-3">
            <div className="w-14 h-14 bg-purple-500/20 rounded-2xl mx-auto flex items-center justify-center">
              <Zap className="w-7 h-7 text-purple-400" />
            </div>
            <p className="text-xs text-slate-300">
              Pagamentos
              <br />
              Instantâneos
            </p>
          </div>
        </div>

        {/* Loading Progress */}
        <div className="space-y-4">
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all duration-300 shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-slate-400 text-sm animate-pulse">{messages[currentMessage]}</p>
        </div>

        {/* Trust Indicators */}
        <div className="text-xs text-slate-500 space-y-2">
          <p>🔒 Conexão segura SSL</p>
          <p>✅ +100.000 pessoas ganhando</p>
          <p>💸 R$ 2.5 milhões pagos este mês</p>
          <p>⭐ 4.9/5 - App mais confiável</p>
        </div>
      </div>
    </div>
  )
}
