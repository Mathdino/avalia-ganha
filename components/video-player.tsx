"use client"

import { useState, useRef } from "react"
import { Play } from "lucide-react"

interface VideoPlayerProps {
  videoId: string
  title: string
  onComplete: () => void
}

export default function VideoPlayer({ videoId, title, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Função para iniciar o vídeo
  const startVideo = () => {
    setShowThumbnail(false)
    setIsPlaying(true)
    // Chamar onComplete assim que o vídeo começar a ser reproduzido
    onComplete()
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden aspect-video bg-black">
        {/* Thumbnail com botão de play */}
        {showThumbnail ? (
          <div className="absolute inset-0">
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback para thumbnail padrão se a de alta resolução falhar
                ;(e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/0.jpg`
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={startVideo}
                className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-700 transition-colors"
              >
                <Play className="w-10 h-10 text-white ml-1" />
              </button>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded text-sm max-w-[80%]">
              {title}
            </div>
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">15:30</div>
          </div>
        ) : (
          // YouTube iframe quando o vídeo está sendo reproduzido
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        )}
      </div>

      {/* Video Info */}
      <div className="space-y-2">
        <h4 className="font-medium text-slate-900">{title}</h4>
        <div className="flex items-center space-x-4 text-sm text-slate-600">
          <span>👁️ 1,2M visualizações</span>
          <span>👍 45 mil</span>
          <span>📅 há 2 dias</span>
        </div>
      </div>
    </div>
  )
}
