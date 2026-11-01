# Max DS — Design System da Agência Max Ebina

Design System completo e documentado para a agência de marketing digital Max Ebina.

## 🚀 Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd max-ds

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura de Pastas

```
max-ds/
├── src/
│   ├── components/
│   │   ├── ui.tsx              # Componentes principais (Button, Card, Form, etc)
│   │   ├── HeroSection.tsx     # Hero Section com partículas
│   │   ├── ParticlesBackground.tsx  # Background de partículas
│   │   ├── PhoneMockup.tsx     # Mockup de celular para Instagram
│   │   └── DocsComponents.tsx  # Componentes de documentação (CodeBlock, PropsTable)
│   ├── App.tsx                 # Aplicação principal (Storybook)
│   ├── main.tsx                # Entry point
│   └── index.css               # Estilos globais e tokens
├── public/                     # Assets estáticos
├── index.html                  # HTML base
├── package.json                # Dependências
├── tailwind.config.js          # Configuração do Tailwind
├── tsconfig.json               # Configuração do TypeScript
└── vite.config.js              # Configuração do Vite
```

## 🎨 Tokens de Design

### Cores

```css
/* Primárias */
--color-primary: #8f6424;        /* Laranja-terra */
--color-primary-foreground: #f8fafc;

/* Tech (Futurista) */
--color-tech: #06B6D4;           /* Ciano neon */
--color-tech-light: #0EA5E9;

/* Backgrounds */
--color-bg-light: #F6EEE7;       /* Modo claro */
--color-bg-dark: #17120e;        /* Modo escuro */

/* Semânticas */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-info: #3B82F6;
```

### Tipografia

```css
/* Fontes */
--font-display: 'Space Grotesk', sans-serif;  /* Títulos */
--font-body: 'Inter', sans-serif;              /* Corpo */

/* Escala fluida com clamp() */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
--text-3xl: clamp(1.875rem, 1.5rem + 1.8vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.8rem + 2.2vw, 3.5rem);
--text-5xl: clamp(3rem, 2.2rem + 4vw, 5rem);
```

### Espaçamento

```css
/* Escala de 8px */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
--space-32: 128px;
```

### Motion

```css
/* Easings */
--ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

/* Durations */
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 600ms;
--duration-slower: 900ms;
```

## 🧩 Componentes

### Button

```tsx
import { Button } from './components/ui';

<Button variant="tech" size="lg" icon>
  Quero Escalar Meu Negócio
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'tech'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: boolean
- `loading`: boolean
- `href`: string
- `disabled`: boolean

### ServiceCard

```tsx
<ServiceCard
  title="Sites Institucionais"
  description="Presença digital profissional que converte."
  icon="Globe"
  badge="Popular"
/>
```

### LeadCaptureForm

```tsx
<LeadCaptureForm
  title="Vamos conversar sobre seu projeto"
  subtitle="Preencha o formulário e receba um diagnóstico gratuito."
/>
```

### Table

```tsx
<Table
  columns={[
    { key: 'plan', label: 'Plano' },
    { key: 'price', label: 'Preço', align: 'right' },
  ]}
  data={[
    { plan: 'Starter', price: 'R$ 97/mês' },
    { plan: 'Pro', price: 'R$ 297/mês' },
  ]}
  hover
  striped
/>
```

### HeroSection

```tsx
<HeroSection
  headline={<>Transforme Sua Empresa com <span className="gradient-text-tech">Tecnologia</span></>}
  subheadline="Sites, LPs e CRM que geram resultados reais."
  ctaPrimary="Quero Escalar Meu Negócio"
  ctaSecondary="Ver Cases"
/>
```

## 📱 Instagram Templates

O Design System inclui templates para carrosséis do Instagram com safe zone:

```tsx
<InstagramSlide
  type="capa"
  title="5 Automações que Toda Empresa Precisa"
  subtitle="Max Ebina — Marketing Digital"
  showSafeZone={true}
/>
```

**Tipos disponíveis:**
- `capa` - Capa do carrossel
- `dica` - Dica rápida
- `servico` - Apresentação de serviço
- `prova-social` - Métricas e números
- `cta` - Call to action

## 🚀 Deploy

### Vercel

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
npm run build

# Arraste a pasta dist/ para o Netlify
```

### GitHub Pages

```bash
# Adicione ao vite.config.js
export default defineConfig({
  base: '/repository-name/',
})

# Build e deploy
npm run build
# Envie a pasta dist/ para a branch gh-pages
```

## 📚 Documentação

Acesse o Storybook completo em:

```bash
npm run dev
# Abra http://localhost:5173
```

O Storybook inclui:
- 📦 **Fundações**: Logo, Cores, Tipografia, Espaçamento, Motion, Bordas, Ícones, Grid, Acessibilidade, Responsividade
- 🧩 **Componentes**: Button, ServiceCard, Formulário, Tabela, SectionHeader, AnimatedCounter, WhatsAppFloat, Navbar, Hero, FAQ, Depoimentos, Footer
- 📱 **Templates**: Instagram
- 📝 **Conteúdo**: Brand Voice
- 🚀 **Preview**: Landing Page completa

## 🎯 Brand Voice

**Tom de voz:**
- Confiante
- Visionário
- Acessível

**Personalidade:** O Mago + O Sábio

**Regras:**
- ✅ Fale sobre resultados, não ferramentas
- ✅ Use números e casos concretos
- ✅ Traduza técnico em benefícios
- ❌ Evite jargões técnicos
- ❌ Não seja genérico

## 📄 Licença

© 2026 Max Ebina. Todos os direitos reservados.

## 🤝 Contribuindo

Este é um projeto interno da agência Max Ebina. Para sugestões ou melhorias, entre em contato com a equipe de design.
