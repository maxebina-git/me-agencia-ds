import type { ServiceIconName } from './ServiceIcon';
import type { ServiceDevice } from './ServiceArt';

/**
 * CATÁLOGO DE SERVIÇOS (5 famílias × 3 cards = 15)
 * ================================================
 * Cruza o que a LP vende (6 serviços) com o que o feed já cobre — ver
 * [[lp-maxebina-servicos]]. Cada card tem selo (ícone) + arte (mock) +
 * título + frase. A foto real entra depois, no app social.
 */

export interface ServiceCardData {
  id: string;
  title: string;
  phrase: string;
  icon: ServiceIconName;
  device: ServiceDevice;
}

export interface ServiceFamily {
  id: string;
  title: string;
  cards: ServiceCardData[];
}

export const SERVICE_FAMILIES: ServiceFamily[] = [
  {
    id: 'sites-lps',
    title: 'Sites & LPs',
    cards: [
      { id: 'sites-institucionais', title: 'Sites Institucionais', phrase: 'Sua casa digital própria, no ar em dias.', icon: 'globe', device: 'browser' },
      { id: 'landing-pages', title: 'Landing Pages', phrase: 'Cada clique vira um lead qualificado.', icon: 'layout', device: 'phone' },
      { id: 'saas', title: 'SaaS', phrase: 'Plataforma sob medida que escala com o negócio.', icon: 'code', device: 'dash' },
    ],
  },
  {
    id: 'automacao-ia',
    title: 'Automação & IA',
    cards: [
      { id: 'automacao-whatsapp', title: 'Automação WhatsApp', phrase: 'Atendimento 24h que vende no automático.', icon: 'workflow', device: 'phone' },
      { id: 'crm', title: 'CRM', phrase: 'Funil visual: nenhum lead esquecido.', icon: 'crm', device: 'dash' },
      { id: 'agente-ia', title: 'Agente de IA', phrase: 'Um agente vendendo por você 24h.', icon: 'robot', device: 'phone' },
    ],
  },
  {
    id: 'trafego-performance',
    title: 'Tráfego & Performance',
    cards: [
      { id: 'trafego-pago', title: 'Tráfego Pago', phrase: 'Verba que vira resultado mensurável.', icon: 'megaphone', device: 'browser' },
      { id: 'metricas-relatorios', title: 'Métricas & Relatórios', phrase: 'Relatório automático todo mês.', icon: 'chart', device: 'dash' },
      { id: 'otimizacao-conversao', title: 'Otimização p/ Conversão', phrase: 'Sua página convertendo mais.', icon: 'target', device: 'phone' },
    ],
  },
  {
    id: 'marca-conteudo',
    title: 'Marca & Conteúdo',
    cards: [
      { id: 'branding', title: 'Branding & Imagem', phrase: 'Identidade que o cliente lembra.', icon: 'brand', device: 'browser' },
      { id: 'conteudo-demanda', title: 'Conteúdo & Demanda', phrase: 'Conteúdo que gera demanda real.', icon: 'content', device: 'phone' },
      { id: 'estrategia-posicionamento', title: 'Estratégia & Posicionamento', phrase: 'Posicionamento certo antes de gastar.', icon: 'strategy', device: 'browser' },
    ],
  },
  {
    id: 'consultoria-diagnostico',
    title: 'Consultoria & Diagnóstico',
    cards: [
      { id: 'auditoria-marketing', title: 'Auditoria de Marketing', phrase: 'Raio-x do seu marketing em 48h.', icon: 'audit', device: 'dash' },
      { id: 'precificacao-escopo', title: 'Precificação & Escopo', phrase: 'Preço e escopo que dão lucro.', icon: 'price', device: 'browser' },
      { id: 'manutencao-suporte', title: 'Manutenção & Suporte', phrase: 'Site no ar e seguro, sempre.', icon: 'support', device: 'browser' },
    ],
  },
];
