# Guia de Customização — Max DS

Este guia explica como personalizar o Design System Max DS para atender às necessidades do seu projeto.

## 🎨 Cores

### Alterando Cores Primárias

Edite `src/index.css`:

```css
:root {
  /* Cor primária (laranja-terra) */
  --color-primary: #8f6424;
  --color-primary-foreground: #f8fafc;
  
  /* Cor tech (ciano) */
  --color-tech: #06B6D4;
  --color-tech-light: #0EA5E9;
}
```

### Adicionando Novas Cores

```css
:root {
  /* Nova cor personalizada */
  --color-brand: #FF6B35;
  --color-brand-light: #FF8C61;
  --color-brand-dark: #E55A2B;
}
```

### Usando no Tailwind

Atualize `tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand)',
          light: 'var(--color-brand-light)',
          dark: 'var(--color-brand-dark)',
        },
      },
    },
  },
}
```

### Uso em Componentes

```tsx
<div className="bg-brand text-white">
  Conteúdo com cor personalizada
</div>
```

## 🔤 Tipografia

### Alterando Fontes

Edite `src/index.css`:

```css
:root {
  /* Fonte para títulos */
  --font-display: 'Poppins', sans-serif;
  
  /* Fonte para corpo */
  --font-body: 'Roboto', sans-serif;
}
```

### Importando Fontes

Atualize `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
```

### Ajustando Escala Tipográfica

```css
:root {
  /* Escala maior */
  --text-base: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
  --text-lg: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-2xl: clamp(1.875rem, 1.5rem + 1.8vw, 2.5rem);
  --text-3xl: clamp(2.25rem, 1.8rem + 2.2vw, 3.5rem);
  --text-4xl: clamp(3rem, 2.2rem + 4vw, 5rem);
  --text-5xl: clamp(3.5rem, 2.5rem + 5vw, 6rem);
}
```

## 📏 Espaçamento

### Alterando Escala de Espaçamento

```css
:root {
  /* Escala de 10px */
  --space-1: 5px;
  --space-2: 10px;
  --space-3: 15px;
  --space-4: 20px;
  --space-6: 30px;
  --space-8: 40px;
  --space-12: 60px;
  --space-16: 80px;
}
```

## 🎭 Motion

### Alterando Easings

```css
:root {
  /* Easing mais suave */
  --ease-elastic: cubic-bezier(0.25, 1.5, 0.5, 1);
  
  /* Easing mais rápido */
  --ease-smooth: cubic-bezier(0.1, 1, 0.2, 1);
}
```

### Alterando Durations

```css
:root {
  /* Animações mais rápidas */
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
}
```

## 🎨 Bordas e Radius

### Alterando Border Radius

```css
:root {
  /* Bordas mais arredondadas */
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 20px;
  --radius-xl: 28px;
  --radius-full: 9999px;
}
```

## 🌓 Modo Escuro/Claro

### Personalizando Cores por Tema

```css
/* Modo claro */
:root {
  --text-on-surface: #17120e;
  --text-on-surface-muted: rgba(23, 18, 14, 0.7);
  --text-on-surface-subtle: rgba(23, 18, 14, 0.5);
  --surface-card: #ffffff;
  --surface-card-secondary: #f8f4f0;
  --surface-border: rgba(23, 18, 14, 0.1);
}

/* Modo escuro */
html.dark {
  --text-on-surface: #F6EEE7;
  --text-on-surface-muted: rgba(246, 238, 231, 0.7);
  --text-on-surface-subtle: rgba(246, 238, 231, 0.5);
  --surface-card: rgba(31, 26, 22, 0.9);
  --surface-card-secondary: #1f1a16;
  --surface-border: rgba(246, 238, 231, 0.1);
}
```

## 🧩 Componentes

### Customizando um Componente

Exemplo: Alterando o Button

```tsx
// src/components/ui.tsx
export function Button({ variant = 'primary', ...props }) {
  const variantClasses = {
    primary: 'bg-brand text-white hover:bg-brand-dark', // Alterado
    secondary: 'bg-tech text-bg-dark hover:bg-tech-light',
    ghost: 'border border-tech/50 text-tech hover:bg-tech/10',
    tech: 'bg-gradient-to-r from-brand to-tech text-white',
  };
  
  // ... resto do componente
}
```

### Criando um Novo Componente

1. Crie o arquivo em `src/components/`:

```tsx
// src/components/CustomCard.tsx
import React from 'react';

interface CustomCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function CustomCard({ title, description, icon }: CustomCardProps) {
  return (
    <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card)]">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--text-on-surface-muted)]">
        {description}
      </p>
    </div>
  );
}
```

2. Exporte no `ui.tsx`:

```tsx
export { CustomCard } from './CustomCard';
```

3. Use no seu projeto:

```tsx
import { CustomCard } from './components/ui';

<CustomCard
  title="Meu Card Customizado"
  description="Descrição do card"
  icon={<Star className="w-6 h-6 text-tech" />}
/>
```

## 📱 Instagram Templates

### Alterando Safe Zone

Edite `src/components/ui.tsx` no componente `InstagramSlide`:

```tsx
// Safe zone customizada
<div 
  className="absolute flex flex-col" 
  style={{ 
    top: '15%',      // Aumentar para mais margem no topo
    left: '15%',     // Aumentar para mais margem lateral
    width: '70%',    // Ajustar largura
    height: '70%',   // Ajustar altura
  }}
>
```

### Alterando Cores dos Slides

```tsx
const slideStyles: Record<string, string> = {
  capa: 'bg-gradient-to-br from-brand via-brand-dark to-bg-dark',
  dica: 'bg-gradient-to-br from-tech/20 to-bg-dark',
  servico: 'bg-gradient-to-br from-primary/20 to-bg-dark',
  'prova-social': 'bg-gradient-to-br from-tech/10 via-bg-dark to-primary/10',
  cta: 'bg-gradient-to-br from-brand to-tech',
};
```

## 🎯 Brand Voice

### Editando Textos

Edite `src/App.tsx` na seção `BrandVoiceSection`:

```tsx
const brandVoice = {
  tone: ['Confiante', 'Visionário', 'Acessível'],
  personality: 'O Mago + O Sábio',
  do: [
    'Fale sobre resultados, não ferramentas',
    'Use números e casos concretos',
    'Traduza técnico em benefícios',
  ],
  dont: [
    'Evite jargões técnicos',
    'Não seja genérico',
    'Não prometa o impossível',
  ],
};
```

## 🌐 Responsividade

### Alterando Breakpoints

Edite `tailwind.config.js`:

```js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // Adicionar breakpoint customizado
      '3xl': '1920px',
    },
  },
}
```

## 🎨 Gradientes

### Criando Novos Gradientes

```css
:root {
  /* Gradiente personalizado */
  --gradient-brand: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
  --gradient-premium: linear-gradient(135deg, #8f6424 0%, #06B6D4 50%, #0EA5E9 100%);
}
```

### Usando Gradientes

```tsx
<div className="bg-[var(--gradient-brand)] text-white p-8 rounded-xl">
  Conteúdo com gradiente personalizado
</div>
```

## 🎭 Animações

### Criando Animações Customizadas

```css
@keyframes bounce-custom {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

.animate-bounce-custom {
  animation: bounce-custom 2s ease-in-out infinite;
}
```

### Uso

```tsx
<div className="animate-bounce-custom">
  Elemento com animação customizada
</div>
```

## 📦 Ícones

### Adicionando Novos Ícones

1. Instale o pacote Lucide:

```bash
npm install lucide-react
```

2. Importe e use:

```tsx
import { Rocket, Target, Zap } from 'lucide-react';

<Rocket className="w-6 h-6 text-tech" />
```

## 🎯 Dicas de Customização

### ✅ Boas Práticas

- **Use variáveis CSS**: Facilita manutenção e consistência
- **Teste em ambos os temas**: Claro e escuro
- **Mantenha a escala**: Respeite os sistemas de espaçamento e tipografia
- **Documente mudanças**: Atualize o Storybook ao customizar
- **Teste responsividade**: Verifique em todos os breakpoints

### ❌ Evite

- **Não hardcode cores**: Use variáveis CSS
- **Não quebre a escala**: Mantenha consistência visual
- **Não ignore acessibilidade**: Mantenha contraste WCAG AA
- **Não remova animações**: Elas melhoram a experiência do usuário

## 🚀 Próximos Passos

1. Explore o Storybook: `npm run dev`
2. Teste as customizações em um ambiente de desenvolvimento
3. Documente suas mudanças no README
4. Compartilhe com a equipe para feedback

## 📞 Suporte

Para dúvidas sobre customização, entre em contato com a equipe de design da Max Ebina.
