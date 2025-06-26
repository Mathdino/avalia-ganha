// Configuração das URLs dos planos de assinatura
export const subscriptionConfig = {
  // URLs dos planos (substitua pelas suas URLs reais)
  basicPlanUrl: "https://go.tribopay.com.br/rzn24gmwkp",
  vipPlanUrl: "https://go.tribopay.com.br/ypblr", 
  premiumModalUrl: "https://go.tribopay.com.br/vdsjq",
  
  // URLs alternativas (para testes ou diferentes ambientes)
  development: {
    basicPlanUrl: "https://go.tribopay.com.br/rzn24gmwkp",
    vipPlanUrl: "https://go.tribopay.com.br/ypblr",
    premiumModalUrl: "https://go.tribopay.com.br/vdsjq",
  },
  
  // URLs de produção
  production: {
    basicPlanUrl: "https://go.tribopay.com.br/rzn24gmwkp",
    vipPlanUrl: "https://go.tribopay.com.br/ypblr",
    premiumModalUrl: "https://go.tribopay.com.br/vdsjq",
  }
}

// Função para obter as URLs baseada no ambiente
export function getSubscriptionUrls(environment: 'development' | 'production' = 'production') {
  return subscriptionConfig[environment]
} 