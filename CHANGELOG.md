# Changelog — Max DS

Todas as mudanças notáveis no Design System Max DS serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-01-XX

### Adicionado

#### 📦 Fundações
- **Logo**: Componente de logo com variações (claro/escuro, tamanhos, com texto)
- **Cores**: Sistema completo de cores com tokens CSS
  - Primárias (laranja-terra #8f6424)
  - Tech (ciano #06B6D4)
  - Backgrounds (claro/escuro)
  - Semânticas (success, warning, error, info)
  - Gradientes (primary, tech, dark)
- **Tipografia**: Escala fluida com clamp()
  - Space Grotesk (display)
  - Inter (body)
  - 9 tamanhos responsivos (xs a 5xl)
- **Espaçamento**: Escala de 8px (1 a 32)
- **Motion**: Sistema de animações
  - 3 easings (elastic, smooth, spring)
  - 4 durations (fast, normal, slow, slower)
  - 4 animações predefinidas (glow, float, pulse-ring, fade-in)
- **Bordas & Radius**: 5 tamanhos (sm, md, lg, xl, full)
- **Ícones**: Integração com Lucide React
- **Grid & Layout**: Sistema de grid responsivo com breakpoints
- **Acessibilidade**: Guidelines WCAG AA, focus states, checklist
- **Responsividade**: Breakpoints, mobile-first, tipografia fluida

#### 🧩 Componentes
- **Button**: 4 variantes (primary, secondary, ghost, tech), 3 tamanhos
- **ServiceCard**: Card de serviço com ícone, badge, hover effects
- **Formulário**: LeadCaptureForm com validação e estados
- **Tabela**: Componente Table com striped, hover, compact
- **SectionHeader**: Cabeçalho de seção com eyebrow, título, subtítulo
- **AnimatedCounter**: Contador animado com IntersectionObserver
- **WhatsAppFloat**: Botão flutuante do WhatsApp com pulse animation
- **Navbar**: Navegação fixa com glassmorphism e scroll progress bar
- **HeroSection**: Hero com partículas, stagger animation, blur effect
- **FAQ**: Accordion com easing elástico
- **Depoimentos**: TestimonialCard com avatar, estrelas, hover
- **Footer**: Footer completo com links, redes sociais, copyright

#### 📱 Templates
- **Instagram**: 5 tipos de slides (capa, dica, serviço, prova-social, cta)
  - Safe zone visualizável
  - Mockup de celular com UI do Instagram
  - Instruções de screenshot

#### 📝 Conteúdo
- **Brand Voice**: Tom de voz, personalidade, gatilhos mentais, micro-copy

#### 🚀 Preview
- **LP Preview**: Landing page completa com todos os componentes integrados

### Documentação
- **README.md**: Instalação, estrutura, tokens, componentes, deploy
- **CUSTOMIZATION.md**: Guia completo de customização
- **DEPLOYMENT.md**: Guia de deploy (Vercel, Netlify, GitHub Pages, Docker)
- **CHANGELOG.md**: Este arquivo

### Técnico
- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Lucide React (ícones)
- Canvas API (partículas)
- IntersectionObserver (contadores)

---

## [0.9.0] - 2025-12-XX (Beta)

### Adicionado
- Componentes básicos (Button, Card, Form)
- Sistema de cores inicial
- Tipografia básica
- Storybook simples

### Mudanças
- Testes iniciais com clientes
- Feedback da equipe de design
- Ajustes de contraste e acessibilidade

---

## [0.8.0] - 2025-11-XX (Alpha)

### Adicionado
- Estrutura inicial do projeto
- Configuração do Tailwind CSS
- Primeiros tokens de design
- Componentes experimentais

---

## Tipos de Mudanças

- **Adicionado**: Novas funcionalidades
- **Mudanças**: Alterações em funcionalidades existentes
- **Depreciado**: Funcionalidades que serão removidas
- **Removido**: Funcionalidades removidas
- **Corrigido**: Correções de bugs
- **Segurança**: Correções de vulnerabilidades

---

## Versionamento

Este projeto segue o [Semantic Versioning](https://semver.org/lang/pt-BR/):

- **MAJOR** (X.0.0): Mudanças incompatíveis com versões anteriores
- **MINOR** (0.X.0): Adição de funcionalidades compatíveis
- **PATCH** (0.0.X): Correções de bugs compatíveis

---

## Como Atualizar

### De 0.9.0 para 1.0.0

1. Atualize as dependências:
```bash
npm install
```

2. Verifique se há mudanças breaking nos componentes
3. Teste sua aplicação
4. Atualize imports se necessário

### De 0.8.0 para 0.9.0

1. Atualize as dependências
2. Revise os novos componentes adicionados
3. Teste a compatibilidade

---

## Roadmap

### Próximas Versões

#### [1.1.0] - Q1 2026
- [ ] Dark mode toggle global
- [ ] Mais componentes (Modal, Dropdown, Tabs)
- [ ] Animações avançadas com Framer Motion
- [ ] Testes automatizados

#### [1.2.0] - Q2 2026
- [ ] Sistema de temas customizáveis
- [ ] Documentação interativa
- [ ] Exportação de tokens para Figma
- [ ] CLI para scaffolding de projetos

#### [2.0.0] - Q3 2026
- [ ] Migração para React 19
- [ ] Suporte a View Transitions API
- [ ] Server Components
- [ ] Edge runtime support

---

## Contribuindo

Para sugestões de novas funcionalidades ou melhorias:

1. Abra uma issue no repositório
2. Descreva a funcionalidade desejada
3. Discuta com a equipe de design
4. Implemente e abra um pull request

---

## Contato

Para dúvidas sobre o changelog ou roadmap:
- Email: design@maxebina.com
- Slack: #max-ds-support

---

Mantido com ❤️ pela equipe de design da Max Ebina
