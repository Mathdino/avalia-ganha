# Configuração dos Links de Assinatura

## 📋 Visão Geral

Este projeto agora inclui links configuráveis para os botões de assinatura na landing page. Os links podem ser facilmente personalizados através do arquivo de configuração.

## 🔗 Links Implementados

### Botões Principais:
1. **"Escolher Básico"** - Abre o modal de upgrade
2. **"Escolher VIP"** - Link direto para o plano VIP
3. **"Sim, quero o Premium com desconto!"** - Link para oferta especial
4. **"Continuar com o Básico"** - Link para plano básico (no modal)
5. **"Não, obrigado. Quero apenas o Básico"** - Link para plano básico (no modal)

## ⚙️ Como Configurar

### 1. Editar URLs no arquivo `lib/config.ts`

```typescript
export const subscriptionConfig = {
  // URLs principais (padrão)
  basicPlanUrl: "https://pay.hotmart.com/SEU-LINK-BASICO",
  vipPlanUrl: "https://pay.hotmart.com/SEU-LINK-VIP", 
  premiumModalUrl: "https://pay.hotmart.com/SEU-LINK-PREMIUM",
  
  // URLs de desenvolvimento (para testes)
  development: {
    basicPlanUrl: "https://teste.hotmart.com/SEU-LINK-BASICO",
    vipPlanUrl: "https://teste.hotmart.com/SEU-LINK-VIP",
    premiumModalUrl: "https://teste.hotmart.com/SEU-LINK-PREMIUM",
  },
  
  // URLs de produção
  production: {
    basicPlanUrl: "https://pay.hotmart.com/SEU-LINK-BASICO",
    vipPlanUrl: "https://pay.hotmart.com/SEU-LINK-VIP",
    premiumModalUrl: "https://pay.hotmart.com/SEU-LINK-PREMIUM",
  }
}
```

### 2. Usar URLs Personalizadas no Componente

```typescript
// No arquivo app/page.tsx
const urls = getSubscriptionUrls('production') // ou 'development'

<LandingPage 
  totalEarned={balance}
  basicPlanUrl={urls.basicPlanUrl}
  vipPlanUrl={urls.vipPlanUrl}
  premiumModalUrl={urls.premiumModalUrl}
/>
```

### 3. Passar URLs Diretamente (Alternativo)

```typescript
<LandingPage 
  totalEarned={balance}
  basicPlanUrl="https://seu-link-personalizado.com"
  vipPlanUrl="https://seu-link-vip.com"
  premiumModalUrl="https://seu-link-premium.com"
/>
```

## 🎯 Plataformas Suportadas

Os links funcionam com qualquer plataforma de pagamento:

- **Hotmart**
- **Monetizze**
- **PayPal**
- **Stripe**
- **Pix**
- **Cartão de Crédito**
- **Boleto**

## 🔧 Personalização Avançada

### Adicionar Novos Planos

1. Adicione novas props na interface `LandingPageProps`:

```typescript
interface LandingPageProps {
  totalEarned: number
  basicPlanUrl?: string
  vipPlanUrl?: string
  premiumModalUrl?: string
  // Novos planos
  starterPlanUrl?: string
  proPlanUrl?: string
}
```

2. Adicione os novos botões no componente:

```typescript
<Button 
  onClick={() => window.open(starterPlanUrl, '_blank')}
  className="..."
>
  Escolher Starter
</Button>
```

### Adicionar Tracking

Para rastrear cliques nos botões, você pode adicionar analytics:

```typescript
const handlePlanClick = (planType: string, url: string) => {
  // Google Analytics
  gtag('event', 'click', {
    'event_category': 'subscription',
    'event_label': planType
  })
  
  // Facebook Pixel
  fbq('track', 'Lead', { value: planType })
  
  // Abrir link
  window.open(url, '_blank')
}
```

## 📱 Comportamento dos Links

- **Abertura em nova aba**: Todos os links abrem em `_blank`
- **Fallback**: Se uma URL não for fornecida, usa as URLs padrão
- **Responsivo**: Funciona em desktop e mobile
- **Acessibilidade**: Mantém a acessibilidade dos botões

## 🚀 Exemplo de Implementação Completa

```typescript
// lib/config.ts
export const subscriptionConfig = {
  basicPlanUrl: "https://pay.hotmart.com/avalia-ganha-basic-2025",
  vipPlanUrl: "https://pay.hotmart.com/avalia-ganha-vip-2025", 
  premiumModalUrl: "https://pay.hotmart.com/avalia-ganha-premium-2025",
}

// app/page.tsx
import { getSubscriptionUrls } from "@/lib/config"

const urls = getSubscriptionUrls()
return (
  <LandingPage 
    totalEarned={balance}
    basicPlanUrl={urls.basicPlanUrl}
    vipPlanUrl={urls.vipPlanUrl}
    premiumModalUrl={urls.premiumModalUrl}
  />
)
```

## ✅ Checklist de Configuração

- [ ] Substituir URLs no `lib/config.ts`
- [ ] Testar links em ambiente de desenvolvimento
- [ ] Verificar se os links abrem corretamente
- [ ] Testar em diferentes dispositivos
- [ ] Configurar tracking (opcional)
- [ ] Validar URLs de produção

## 🆘 Suporte

Se precisar de ajuda para configurar os links ou tiver dúvidas, consulte:

1. A documentação da sua plataforma de pagamento
2. Os exemplos no arquivo `lib/config.ts`
3. A implementação no componente `LandingPage` 