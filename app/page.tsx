"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Coins, Star } from "lucide-react"
import LoadingScreen from "@/components/loading-screen"
import LandingPage from "@/components/landing-page"
import BonusPopup from "@/components/bonus-popup"
import DeliveryApp from "@/components/delivery-app"
import FitnessApp from "@/components/fitness-app"
import TigrinhoGame from "@/components/tigrinho-game"
import VideoPlayer from "@/components/video-player"
import { getSubscriptionUrls } from "@/lib/config"

interface Task {
  id: number
  title: string
  description: string
  reward: number
  type: "video" | "app" | "game"
  completed: boolean
  platform: string
  videoId?: string
  videoTitle?: string
}

export default function TaskApp() {
  const [isLoading, setIsLoading] = useState(true)
  const [showLanding, setShowLanding] = useState(false)
  const [currentTask, setCurrentTask] = useState(0)
  const [balance, setBalance] = useState(0)
  const [showBonus, setShowBonus] = useState(false)
  const [bonusAmount, setBonusAmount] = useState(0)
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "💰 GANHE R$ 28 Assistindo Receita de Bolo",
      description: "Assista esta receita incrível de bolo de chocolate e ganhe dinheiro agora!",
      reward: 28,
      type: "video",
      completed: false,
      platform: "YouTube",
      videoId: "jadYjKjPonE", // Vídeo específico do usuário - QUICK AND EASY CHOCOLATE CAKE
      videoTitle: "BOLO DE CHOCOLATE RÁPIDO E FÁCIL | Bolo de Nescau | O Mais Fácil do Mundo",
    },
    {
      id: 2,
      title: "🚀 TESTE App e GANHE R$ 35 Agora",
      description: "Teste a interface de um novo aplicativo de delivery e dê sua opinião",
      reward: 35,
      type: "app",
      completed: false,
      platform: "FoodExpress",
    },
    {
      id: 3,
      title: "⚡ R$ 32 por 5 Minutos de Vídeo",
      description: "Assista um vídeo com 5 dicas práticas de organização e avalie o conteúdo",
      reward: 32,
      type: "video",
      completed: false,
      platform: "YouTube",
      videoId: "6CMqQ8Iz-_Q", // Vídeo específico do usuário - 5 DICAS DE ORGANIZAÇÃO
      videoTitle: "5 DICAS DE ORGANIZAÇÃO QUE VÃO MUDAR SUA VIDA",
    },
    {
      id: 4,
      title: "💪 App Fitness = R$ 42 Garantidos",
      description: "Explore um aplicativo de exercícios e avalie a experiência do usuário",
      reward: 42,
      type: "app",
      completed: false,
      platform: "FitLife Pro",
    },
    {
      id: 5,
      title: "🐅 JOGO DO TIGRINHO - Desbloqueie seu Bônus!",
      description: "Jogue o famoso Tigrinho e desbloqueie bônus exclusivos de até R$ 200!",
      reward: 0,
      type: "game",
      completed: false,
      platform: "GameHub",
    },
  ])
  const [showReward, setShowReward] = useState(false)
  const [rewardAmount, setRewardAmount] = useState(0)
  const [videoCompleted, setVideoCompleted] = useState(false)

  // Audio elements
  const [cashRegisterSound, setCashRegisterSound] = useState<HTMLAudioElement | null>(null)
  const [bonusSound, setBonusSound] = useState<HTMLAudioElement | null>(null)
  const [achievementSound, setAchievementSound] = useState<HTMLAudioElement | null>(null)
  const [notificationSound, setNotificationSound] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio
    const cashSound = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    )

    const bonusAudio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    )

    // Som de conquista/achievement - mais longo e triunfante
    const achievementAudio = new Audio(
      "data:audio/wav;base64,UklGRvIGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWTwwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWTwwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWTwwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    )

    // Som de notificação - curto e agradável
    const notificationAudio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWTwwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
    )

    setCashRegisterSound(cashSound)
    setBonusSound(bonusAudio)
    setAchievementSound(achievementAudio)
    setNotificationSound(notificationAudio)

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  const playSound = (sound: HTMLAudioElement | null, volume = 0.3) => {
    if (sound) {
      sound.currentTime = 0
      sound.volume = volume
      sound.play().catch(() => {
        // Ignore audio play errors
      })
    }
  }

  const completeTask = (taskId: number, earnedAmount?: number) => {
    const reward = earnedAmount || tasks[taskId - 1].reward

    // Som de conquista quando completar uma fase
    playSound(achievementSound, 0.4)

    // Limitar o saldo máximo a R$ 200
    setBalance((prev) => {
      const newBalance = Math.min(prev + reward, 200)
      // Som de notificação quando o saldo acumular
      setTimeout(() => {
        playSound(notificationSound, 0.2)
      }, 500)
      return newBalance
    })

    setRewardAmount(reward)
    setShowReward(true)

    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: true } : task)))

    setTimeout(() => {
      setShowReward(false)

      // Show bonus after certain tasks
      if (taskId === 2 || taskId === 4) {
        const bonusValue = taskId === 2 ? 15 : 25
        setBonusAmount(bonusValue)
        setShowBonus(true)
        playSound(bonusSound, 0.4)

        setTimeout(() => {
          // Limitar o saldo máximo a R$ 200 também no bônus
          setBalance((prev) => {
            const newBalance = Math.min(prev + bonusValue, 200)
            // Som de notificação para o bônus também
            playSound(notificationSound, 0.2)
            return newBalance
          })
        }, 1000)
      }

      if (taskId < tasks.length) {
        setCurrentTask(taskId)
        setVideoCompleted(false)
      } else {
        setShowLanding(true)
      }
    }, 2000)
  }

  const handleEvaluation = (approved: boolean) => {
    completeTask(currentTask + 1)
  }

  const handleAppEvaluation = (approved: boolean) => {
    completeTask(currentTask + 1)
  }

  const handleGameComplete = (score: number) => {
    const gameReward = Math.max(30, Math.floor(score / 10)) // Minimum 30, based on winnings
    completeTask(5, gameReward)
  }

  const handleVideoComplete = () => {
    setVideoCompleted(true)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (showLanding) {
    const urls = getSubscriptionUrls()
    return (
      <LandingPage 
        totalEarned={balance}
        basicPlanUrl={urls.basicPlanUrl}
        vipPlanUrl={urls.vipPlanUrl}
        premiumModalUrl={urls.premiumModalUrl}
      />
    )
  }

  const currentTaskData = tasks[currentTask]
  const progressPercentage = (currentTask / tasks.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200/50 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Coins className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900">Avalia & Ganha</h1>
                <p className="text-xs text-slate-600">Avalie e ganhe dinheiro</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
              R$ {balance.toFixed(2)}
            </div>
          </div>
          <Progress value={progressPercentage} className="mt-2 h-1" />
        </div>
      </div>

      {/* Bonus Popup */}
      <BonusPopup isOpen={showBonus} onClose={() => setShowBonus(false)} amount={bonusAmount} />

      {/* Reward Animation */}
      {showReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 text-center animate-in zoom-in duration-500 shadow-2xl max-w-sm mx-4">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Fase Conquistada!</h3>
            <p className="text-emerald-600 font-bold text-xl">+R$ {rewardAmount.toFixed(2)}</p>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-20 pb-6 px-3 max-w-md mx-auto">
        {/* Current Task */}
        <Card className="p-4 mb-4 border-0 shadow-xl bg-white rounded-2xl">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline" className="text-xs font-medium px-2 py-1">
                  {currentTaskData?.platform}
                </Badge>
                <Badge className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-1">
                  +R$ {currentTaskData?.reward || 0}
                </Badge>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">{currentTaskData?.title}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{currentTaskData?.description}</p>
            </div>
          </div>

          {/* Task Content */}
          {currentTask === 0 && (
            <div className="space-y-4">
              <VideoPlayer
                videoId={currentTaskData.videoId || "jadYjKjPonE"}
                title={
                  currentTaskData.videoTitle || "QUICK AND EASY CHOCOLATE CAKE | Nescau Cake | The Easiest in the World"
                }
                onComplete={handleVideoComplete}
              />

              {videoCompleted && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-3">Sua Avaliação:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleEvaluation(true)}
                      className="h-12 bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      ✅ Aprovar
                    </Button>
                    <Button
                      onClick={() => handleEvaluation(false)}
                      className="h-12 bg-red-500 hover:bg-red-600 text-white"
                    >
                      ❌ Reprovar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentTask === 2 && (
            <div className="space-y-4">
              <VideoPlayer
                videoId={currentTaskData.videoId || "6CMqQ8Iz-_Q"}
                title={currentTaskData.videoTitle || "5 DICAS DE ORGANIZAÇÃO QUE VÃO MUDAR SUA VIDA"}
                onComplete={handleVideoComplete}
              />

              {videoCompleted && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-3">Sua Avaliação:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleEvaluation(true)}
                      className="h-12 bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      ✅ Aprovar
                    </Button>
                    <Button
                      onClick={() => handleEvaluation(false)}
                      className="h-12 bg-red-500 hover:bg-red-600 text-white"
                    >
                      ❌ Reprovar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentTask === 1 && <DeliveryApp onEvaluation={handleAppEvaluation} />}
          {currentTask === 3 && <FitnessApp onEvaluation={handleAppEvaluation} />}
          {currentTask === 4 && <TigrinhoGame onComplete={handleGameComplete} />}
        </Card>

        {/* Progress Indicators */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                index < currentTask ? "bg-emerald-500" : index === currentTask ? "bg-emerald-300" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
