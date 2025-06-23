"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Star, Users, Shield, Clock, TrendingUp, Award, Coins, Smartphone } from "lucide-react"

interface LandingPageProps {
  totalEarned: number
}

export default function LandingPage({ totalEarned }: LandingPageProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Avaliações Mobile",
      description: "Avalie apps, vídeos e jogos direto do seu celular",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Ganhos Crescentes",
      description: "Quanto mais você avalia, mais você ganha",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Pagamentos Seguros",
      description: "Receba seus ganhos de forma rápida e segura",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Comunidade Ativa",
      description: "Mais de 50.000 avaliadores ativos",
    },
  ]

  const testimonials = [
    {
      name: "Ana Carolina",
      text: "Testei 3 plataformas e saquei R$48 no meu segundo dia. Agora faço isso todo dia depois do trabalho!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      earnings: "R$ 1.200/mês",
    },
    {
      name: "Carlos Mendes",
      text: "Em uma semana, consegui acumular R$173 avaliando apps — usando só meu celular nos intervalos.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      earnings: "R$ 890/mês",
    },
    {
      name: "Mariana Silva",
      text: "Comecei devagar, mas já consegui juntar o dinheiro para trocar meu celular em 2 meses!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      earnings: "R$ 650/mês",
    },
    {
      name: "Roberto Santos",
      text: "Processo simples e os pagamentos chegam certinho. Ótima forma de complementar a renda!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      earnings: "R$ 420/mês",
    },
  ]

  const stats = [
    { number: "15.000+", label: "Usuários Ativos" },
    { number: "850K+", label: "Avaliações Realizadas" },
    { number: "R$ 2.8M+", label: "Pagos aos Usuários" },
    { number: "4.7★", label: "Avaliação da Plataforma" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Coins className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Avalia & Ganha</h1>
                <p className="text-sm text-slate-600">Avalie e Ganhe Dinheiro</p>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 text-lg px-4 py-2">
              Você ganhou R$ {totalEarned.toFixed(2)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Award className="w-5 h-5" />
            <span>Parabéns! Você completou sua primeira sessão</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Transforme Seu Tempo Livre em
            <br />
            <span className="text-emerald-600">Renda Extra Real</span>
          </h1>

          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Uma forma prática de gerar renda extra no seu tempo livre, usando apenas o celular. A maioria dos usuários
            começa com R$20 a R$50 por dia, podendo chegar até R$200 dependendo do tempo disponível e dedicação.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{stat.number}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Como Funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Receba Tarefas</h3>
              <p className="text-slate-600">Acesse plataformas verificadas com tarefas de avaliação disponíveis</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Avalie Conteúdo</h3>
              <p className="text-slate-600">
                Teste apps, assista vídeos ou jogue games e compartilhe sua opinião honesta
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Receba Pagamento</h3>
              <p className="text-slate-600">Os valores variam conforme a tarefa e frequência de uso</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            O que nossos avaliadores estão dizendo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <Badge className="bg-emerald-100 text-emerald-800 text-xs">{testimonial.earnings}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm italic">"{testimonial.text}"</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Acesse as Plataformas que Estão Pagando</h2>
          <p className="text-xl text-slate-600 mb-12">
            Desbloqueie a lista completa com as 7 plataformas verificadas que estão pagando usuários reais em 2024
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <Card className="p-8 border-2 border-slate-200 relative">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Acesso Básico</h3>
                <div className="text-3xl font-bold text-slate-900 mb-2">R$ 19,90</div>
                <div className="text-slate-600 mb-6">/mês</div>

                <ul className="space-y-4 mb-6 text-left">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>5 avaliações por dia</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Suporte por email</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Pagamentos semanais</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Acesso a vídeos e apps</span>
                  </li>
                </ul>

                <Button
                  onClick={() => setShowUpgradeModal(true)}
                  variant="outline"
                  className="w-full h-12 text-base font-semibold"
                >
                  Escolher Básico
                </Button>
                <p className="text-sm text-red-500 mt-2">🚨 ÚLTIMAS VAGAS HOJE!</p>
              </div>
            </Card>

            {/* VIP Plan */}
            <Card className="p-8 border-2 border-emerald-500 relative bg-emerald-50">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-emerald-500 text-white px-4 py-2">MAIS POPULAR</Badge>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">Acesso VIP</h3>
                <div className="text-4xl font-bold text-slate-900 mb-2">R$ 97,00</div>
                <div className="text-slate-600 mb-8">/mês</div>

                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Avaliações ilimitadas</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Suporte prioritário 24/7</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Pagamentos diários</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Acesso a jogos premium</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Bônus exclusivos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span>Grupo VIP no Telegram</span>
                  </li>
                </ul>

                <Button className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700">
                  Escolher VIP
                </Button>
                <p className="text-sm text-green-500 mt-2">💰 Usuários relatam até R$ 200+ por dia com dedicação</p>
                <p className="text-sm text-red-500">⏰ Lista atualizada mensalmente</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Urgency */}
        <div className="text-center bg-amber-50 border border-amber-200 rounded-2xl p-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="w-6 h-6 text-amber-600" />
            <span className="font-semibold text-amber-800 text-lg">Acesso por tempo limitado</span>
          </div>
          <p className="text-amber-700 text-lg">
            As plataformas listadas estão pagando usuários reais em 2024. Acesso limitado para manter a qualidade das
            oportunidades.
          </p>
        </div>
      </div>

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">🎉 Oferta Especial!</DialogTitle>
          </DialogHeader>

          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4">
              <p className="text-emerald-800 font-semibold mb-3 text-base">
                Acesso completo às 7 plataformas com 30% de desconto!
              </p>
              <div className="space-y-1">
                <div className="text-base text-slate-500 line-through">De R$ 62,67</div>
                <div className="text-3xl font-bold text-emerald-600">Por R$ 47,00</div>
                <div className="text-sm text-emerald-700">Economia de R$ 15,67</div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-3 text-base">Acesso Premium inclui:</h4>
              <ul className="space-y-2 text-left text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>15 avaliações por dia</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Pagamentos a cada 3 dias</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Acesso a jogos premium</span>
                </li>
              </ul>
            </div>

            <p className="text-slate-600 text-sm">
              Com um investimento simbólico de R$27, você tem acesso ao material completo que já ajudou centenas de
              pessoas a começarem sua renda extra!
            </p>

            <div className="space-y-3">
              <Button className="w-full h-11 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700">
                🚀 Sim, quero o Premium com desconto!
              </Button>
              <Button
                variant="outline"
                className="w-full h-11 text-sm border-slate-300 hover:bg-slate-50"
                onClick={() => setShowUpgradeModal(false)}
              >
                Continuar com o Básico
              </Button>
              <Button
                variant="ghost"
                className="w-full h-9 text-xs text-slate-500 hover:text-slate-700"
                onClick={() => setShowUpgradeModal(false)}
              >
                Não, obrigado. Quero apenas o Básico por R$ 19,90
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
