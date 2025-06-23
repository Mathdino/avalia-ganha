"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Trophy, Activity } from "lucide-react"

interface FitnessAppProps {
  onEvaluation: (approved: boolean) => void
}

export default function FitnessApp({ onEvaluation }: FitnessAppProps) {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [testProgress, setTestProgress] = useState(0)
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null)
  const [showWorkoutDetails, setShowWorkoutDetails] = useState(false)

  const screens = ["dashboard", "workouts", "exercise", "progress"]

  useEffect(() => {
    const timer = setInterval(() => {
      setTestProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 2
      })
    }, 100)
    return () => clearInterval(timer)
  }, [])

  // Corrigir a função nextScreen para garantir que avance corretamente
  const nextScreen = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1)
    }
  }

  const workouts = [
    { name: "Treino de Peito", duration: "45 min", exercises: 8, difficulty: "Intermediário", image: "💪" },
    { name: "Cardio HIIT", duration: "20 min", exercises: 6, difficulty: "Avançado", image: "🏃" },
    { name: "Yoga Matinal", duration: "30 min", exercises: 12, difficulty: "Iniciante", image: "🧘" },
    { name: "Treino de Pernas", duration: "50 min", exercises: 10, difficulty: "Intermediário", image: "🦵" },
  ]

  const workoutExercises = {
    "Treino de Peito": [
      { name: "Supino Reto", sets: "3x12", rest: "60s", image: "🏋️" },
      { name: "Flexão de Braço", sets: "3x15", rest: "45s", image: "💪" },
      { name: "Crucifixo", sets: "3x10", rest: "60s", image: "🤸" },
      { name: "Mergulho", sets: "3x12", rest: "45s", image: "🏊" },
    ],
    "Cardio HIIT": [
      { name: "Burpees", sets: "4x30s", rest: "15s", image: "🏃" },
      { name: "Mountain Climbers", sets: "4x30s", rest: "15s", image: "🧗" },
      { name: "Jumping Jacks", sets: "4x30s", rest: "15s", image: "🤸" },
      { name: "High Knees", sets: "4x30s", rest: "15s", image: "🏃" },
    ],
    "Yoga Matinal": [
      { name: "Saudação ao Sol", sets: "5 ciclos", rest: "30s", image: "🧘" },
      { name: "Postura do Guerreiro", sets: "2x30s cada lado", rest: "30s", image: "🧘" },
      { name: "Postura da Árvore", sets: "2x30s cada lado", rest: "30s", image: "🧘" },
      { name: "Postura do Cachorro", sets: "3x30s", rest: "30s", image: "🧘" },
    ],
    "Treino de Pernas": [
      { name: "Agachamento", sets: "4x12", rest: "60s", image: "🏋️" },
      { name: "Leg Press", sets: "3x15", rest: "60s", image: "🏋️" },
      { name: "Cadeira Extensora", sets: "3x12", rest: "45s", image: "🏋️" },
      { name: "Cadeira Flexora", sets: "3x12", rest: "45s", image: "🏋️" },
    ],
  }

  const handleWorkoutClick = (workoutName: string) => {
    setSelectedWorkout(workoutName)
    if (currentScreen === 0) {
      // From dashboard, go to workouts screen first
      setCurrentScreen(1)
      setShowWorkoutDetails(true)
    } else if (currentScreen === 1) {
      // From workouts list, show workout details
      setShowWorkoutDetails(true)
    }
  }

  const handleStartWorkout = () => {
    setShowWorkoutDetails(false)
    setCurrentScreen(2)
  }

  const handleBackToWorkouts = () => {
    setShowWorkoutDetails(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-slate-900 mb-2">FitLife Pro - App de Fitness</h3>
        <p className="text-sm text-slate-600">Explore as funcionalidades do aplicativo</p>
        <div className="mt-2">
          <div className="bg-slate-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${testProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">Testando funcionalidades... {Math.floor(testProgress)}%</p>
        </div>
      </div>

      {/* App Interface */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
        {/* App Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-6 h-6" />
              <span className="font-bold text-lg">FitLife Pro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span className="text-sm">Nível 12</span>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="h-80 overflow-y-auto">
          {/* Dashboard */}
          {currentScreen === 0 && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-3 rounded-lg">
                  <div className="text-2xl font-bold">127</div>
                  <div className="text-xs opacity-90">Treinos Completos</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg">
                  <div className="text-2xl font-bold">2.4k</div>
                  <div className="text-xs opacity-90">Calorias Queimadas</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-900 mb-3">Treino de Hoje</h4>
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">💪</div>
                  <div className="flex-1">
                    <h5 className="font-medium text-slate-900">Treino de Peito</h5>
                    <p className="text-sm text-slate-600">8 exercícios • 45 minutos</p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-600"
                    onClick={() => handleWorkoutClick("Treino de Peito")}
                  >
                    Iniciar
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900">Progresso Semanal</h4>
                <div className="grid grid-cols-7 gap-1">
                  {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-slate-600 mb-1">{day}</div>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                          index < 4 ? "bg-purple-500 text-white" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {index < 4 ? "✓" : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {currentScreen === 0 && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => setCurrentScreen(1)} className="bg-purple-500 hover:bg-purple-600">
                Ver Todos os Treinos
              </Button>
            </div>
          )}

          {/* Workouts */}
          {currentScreen === 1 && !showWorkoutDetails && (
            <div className="p-4 space-y-4">
              <h4 className="font-semibold text-slate-900">Treinos Disponíveis</h4>

              {workouts.map((workout, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
                  onClick={() => handleWorkoutClick(workout.name)}
                >
                  <div className="text-3xl">{workout.image}</div>
                  <div className="flex-1">
                    <h5 className="font-medium text-slate-900">{workout.name}</h5>
                    <p className="text-xs text-slate-600">
                      {workout.exercises} exercícios • {workout.duration}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-xs mt-1 ${
                        workout.difficulty === "Iniciante"
                          ? "border-green-300 text-green-700"
                          : workout.difficulty === "Intermediário"
                            ? "border-yellow-300 text-yellow-700"
                            : "border-red-300 text-red-700"
                      }`}
                    >
                      {workout.difficulty}
                    </Badge>
                  </div>
                  <Play className="w-5 h-5 text-purple-500" />
                </div>
              ))}
            </div>
          )}

          {/* Workout Details */}
          {currentScreen === 1 && showWorkoutDetails && selectedWorkout && (
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between mb-3">
                <Button variant="ghost" size="sm" onClick={handleBackToWorkouts}>
                  ← Voltar
                </Button>
                <h4 className="font-semibold text-slate-900">{selectedWorkout}</h4>
                <div className="w-8"></div> {/* Spacer for alignment */}
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-3xl">
                    {selectedWorkout === "Treino de Peito"
                      ? "💪"
                      : selectedWorkout === "Cardio HIIT"
                        ? "🏃"
                        : selectedWorkout === "Yoga Matinal"
                          ? "🧘"
                          : "🦵"}
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-900">{selectedWorkout}</h5>
                    <p className="text-xs text-slate-600">
                      {selectedWorkout === "Treino de Peito"
                        ? "8 exercícios • 45 min"
                        : selectedWorkout === "Cardio HIIT"
                          ? "6 exercícios • 20 min"
                          : selectedWorkout === "Yoga Matinal"
                            ? "12 exercícios • 30 min"
                            : "10 exercícios • 50 min"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-white rounded p-2 text-center">
                    <div className="text-sm font-medium text-purple-700">Dificuldade</div>
                    <div className="text-xs">
                      {selectedWorkout === "Treino de Peito" || selectedWorkout === "Treino de Pernas"
                        ? "Intermediário"
                        : selectedWorkout === "Cardio HIIT"
                          ? "Avançado"
                          : "Iniciante"}
                    </div>
                  </div>
                  <div className="bg-white rounded p-2 text-center">
                    <div className="text-sm font-medium text-purple-700">Calorias</div>
                    <div className="text-xs">
                      {selectedWorkout === "Treino de Peito"
                        ? "~320 kcal"
                        : selectedWorkout === "Cardio HIIT"
                          ? "~450 kcal"
                          : selectedWorkout === "Yoga Matinal"
                            ? "~180 kcal"
                            : "~380 kcal"}
                    </div>
                  </div>
                </div>

                <Button onClick={handleStartWorkout} className="w-full bg-purple-600 hover:bg-purple-700">
                  Iniciar Treino
                </Button>
              </div>

              <div className="space-y-3">
                <h5 className="font-medium text-slate-900">Exercícios</h5>
                {workoutExercises[selectedWorkout as keyof typeof workoutExercises].map((exercise, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                    <div className="text-2xl">{exercise.image}</div>
                    <div>
                      <h6 className="font-medium text-slate-900">{exercise.name}</h6>
                      <p className="text-xs text-slate-600">
                        {exercise.sets} • Descanso: {exercise.rest}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exercise */}
          {currentScreen === 2 && selectedWorkout && (
            <div className="p-4 space-y-4">
              <h4 className="font-semibold text-slate-900">Executando: {selectedWorkout}</h4>
              <p className="text-sm text-slate-600">Siga as instruções para cada exercício.</p>

              {workoutExercises[selectedWorkout as keyof typeof workoutExercises].map((exercise, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{exercise.image}</div>
                    <div>
                      <h5 className="font-medium text-slate-900">{exercise.name}</h5>
                      <p className="text-sm text-slate-600">
                        {exercise.sets} • Descanso: {exercise.rest}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="space-y-3">
                <Button className="w-full bg-purple-500 hover:bg-purple-600 h-12" onClick={nextScreen}>
                  Concluir Exercício
                </Button>
                <Button variant="outline" className="w-full h-10" onClick={() => setCurrentScreen(1)}>
                  Voltar aos Treinos
                </Button>
              </div>
            </div>
          )}

          {/* Progress */}
          {currentScreen === 3 && (
            <div className="p-4 space-y-4">
              <h4 className="font-semibold text-slate-900">Progresso do Treino</h4>
              <p className="text-sm text-slate-600">Seu progresso está ótimo!</p>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-purple-700 font-medium">Total de Exercícios:</div>
                  <div className="text-sm">
                    {workoutExercises[selectedWorkout as keyof typeof workoutExercises].length}
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-purple-700 font-medium">Tempo Total:</div>
                  <div className="text-sm">
                    {selectedWorkout === "Treino de Peito"
                      ? "45 minutos"
                      : selectedWorkout === "Cardio HIIT"
                        ? "20 minutos"
                        : selectedWorkout === "Yoga Matinal"
                          ? "30 minutos"
                          : "50 minutos"}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-purple-700 font-medium">Dificuldade:</div>
                  <div className="text-sm">
                    {selectedWorkout === "Treino de Peito" || selectedWorkout === "Treino de Pernas"
                      ? "Intermediário"
                      : selectedWorkout === "Cardio HIIT"
                        ? "Avançado"
                        : "Iniciante"}
                  </div>
                </div>
              </div>
              <Button onClick={() => setCurrentScreen(0)} className="w-full bg-purple-500 hover:bg-purple-600 mt-4">
                Voltar ao Início
              </Button>
            </div>
          )}
        </div>

        {/* App Footer */}
        <div className="bg-slate-100 p-3 text-center">
          <Button onClick={() => onEvaluation(true)} className="bg-green-500 hover:bg-green-600 text-white">
            Aprovar
          </Button>
          <Button onClick={() => onEvaluation(false)} className="bg-red-500 hover:bg-red-600 text-white ml-2">
            Reprovar
          </Button>
        </div>
      </div>
    </div>
  )
}
