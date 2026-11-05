# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Corrigido
- **HeroSection**: `@keyframes slide-up` passa a ser sempre emitido no CSS final (movido para fora de `@theme`) — CTAs e subheadline (que dependiam de `animation` inline com `opacity-0`) não ficam mais invisíveis no pacote publicado
- **Live Preview**: badge (`eyebrow`) alinhado entre docs e Live Preview — ambos exibem "Tecnologia que gera resultado" (removido `eyebrow=""` que escondia a badge na LP)

### Alterado
- **ServiceCard**: nova prop opcional `onClick?: () => void` — quando presente renderiza `<button>` em vez de `<a href>` (retrocompatível); export `Modal` disponível no pacote
- **Modal**: ações aceitam `target?: '_blank' | '_self'` — com `rel="noopener noreferrer"` quando `_blank` (permite CTA externo como WhatsApp sem sair da LP); ações sem `href` renderizam `<button>` (fecha como o X, sem navegar/scroll)
- **Footer**: nova prop opcional `linksClassName?: string` — classe aplicada a cada coluna de links (ex. `lg:col-start-5` para alinhar à direita)
- **Drawer**: nova prop opcional `children?: ReactNode` (conteúdo rico abaixo da descrição) e `target?: '_blank' | '_self'` nas ações; ações sem `href` renderizam `<button>` (fecha como o overlay/drag, sem navegar/scroll); export `Drawer` disponível no pacote
- **Navbar**: links mobile com URL limpa (`#x` → `/x`) + scroll suave + `pushState` + link ativo (igual ao desktop); logo vai para `/` com scroll ao topo; rola via `pushState` sem recarregar; scroll sincroniza URL (`replaceState`) + link ativo via `IntersectionObserver` (com lock de 700ms durante scroll por clique); inclui seção do CTA (`ctaHref`, ex. `contato`) ao rolar; no topo sem seção visível volta para `/`
- **HeroSection**: SVG do `logo` escondido no mobile (`hidden md:inline-flex`) para não duplicar a marca do `Navbar` fixo — `logoText` permanece visível em todos os tamanhos
- **ScrollToTop**: novo componente `ScrollToTop` (fixo `bottom-6 right-24`, `bg-tech`, ícone `ArrowUp`) — aparece quando o scroll passa da seção `targetId` (ou `showAfter` px) e some no topo; clique desliza ao topo com `pushState("/")`; exportado no pacote
- **WhatsAppFloat**: props opcionais `phone?: string` e `message?: string` — monta `wa.me/<phone>` com `?text=` pré-preenchido (retrocompatível)
- **HeroSection**: conteúdo empilhado em container `flex flex-col` com `gap` via `clamp(1.25rem, calc(3vh + 8px), 2.5rem)` (proporcional à altura da viewport); margens `mb-*` manuais removidas; scroll indicator (mouse) movido para filho direto da `<section>` (posição visual mantida) com `z-10`
- **HeroSection**: `subheadline` e `ctaSecondary` agora são opcionais — não renderizam quando omitidos (hero com CTA único); previews da LP e docs (`HeroSectionDocs`, EXAMPLES.md) atualizados

## [1.0.11] - 2026-11-04

### Adicionado
- **Badge**: pill rounded-full com tint tech (bg-tech/20 + border-tech/30), sizes `sm`/`md`, prop `pulseDot`; exportado no pacote
- **GlitchText**: headline com RGB split (camadas error + tech), auto-glitch com hover intensificado e burst no clique/tap; `as` (h1–h6/span), prop `text` para children JSX, camadas `aria-hidden`, guard de `prefers-reduced-motion`; exportado no pacote
- **SectionHeader**: prop `glitch?: boolean` (default `true`) — título renderizado via GlitchText (desliga via `glitch={false}`)
- **HeroSection**: prop `headlineText?: string` — texto plano para as camadas do glitch quando o headline é JSX ("Tecnologia" mantém o azul via `gradient-text-tech`)
- **Favicon**: tile da cor primária (#8f6424) com o monograma (#F6EEE7) — `public/favicon.svg`; ativado no preview via `<link rel="icon">`
- Pacote publica **`index.d.ts`** de verdade (declarations geradas no `build:lib` via `tsconfig.lib.json`) — 1.0.10 saiu sem types
- `prepublishOnly`: typecheck + build:lib antes de qualquer publish
- Seções Badge e GlitchText no preview (Componentes / Fundações) + props/snippets/features atualizados

### Corrigido
- **Exports apontando para arquivos inexistentes** (`dist/index.js`/`styles.css` → `index.mjs`/`index.cjs`/`max-ds.css`) — o 1.0.10 estava quebrado para `require` e para `styles.css`
- **typecheck: 0 erros** — stub `src/types/three.d.ts` para `three` e anotação `any` no callback do TextureLoader
- Glitch alinhado em qualquer viewport (palavras do Hero com espaçamento de texto real, não `mr-3`)

### Alterado
- **Logo + Texto** no preview: "Marketing Digital" substitui "Max Ebina" no estilo display
- Subseção **Favicon** na seção de Logo (preview 16/32/48px claro/escuro + snippet `<link rel="icon">` + copy SVG)

### Documentação
- ADR-001 movido para `docs/`; ADR-002 adicionado (pipeline DS → LP via npm)

### Build
- `build:lib` limpa `dist/` (`emptyOutDir`) e gera declarations (`tsc -p tsconfig.lib.json`) — modo lib determinístico, `dist/` sem vazamento do app de preview

## [1.0.0] - 2026-01-XX

### Adicionado
- **Componentes UI**
  - Button com 4 variantes (primary, secondary, ghost, tech)
  - ServiceCard com ícones e badges
  - LeadCaptureForm com validação completa
  - FAQ com accordion
  - TestimonialCard com avatares
  - WhatsAppFloat com animação
  - Navbar responsiva com glassmorphism
  - Footer completo com links e redes sociais
  - Table com estilos customizáveis
  - SectionHeader com gradientes
  - AnimatedCounter com IntersectionObserver

- **Templates Instagram**
  - InstagramSlide com 5 tipos (capa, dica, serviço, prova-social, CTA)
  - 4 temas visuais (midnight, sunrise, neon, minimal)
  - Safe zone com margens corretas (180/200/140px)
  - Logo Max Ebina integrado
  - Mockup de celular (PhoneMockup)

- **Componentes de Seção**
  - HeroSection com partículas e stagger animation
  - ParticlesBackground com canvas

- **Sistema de Temas**
  - 4 temas para Instagram (midnight, sunrise, neon, minimal)
  - Variáveis CSS para cores de slide
  - Transições suaves entre temas

- **Documentação**
  - Storybook interativo completo
  - Guia de customização
  - Guia de deploy
  - Exemplos de uso
  - Especificações de safe zone

### Documentação
- README.md com instruções de instalação e uso
- PUBLISH.md com guia de publicação no npm
- EXAMPLES.md com exemplos práticos
- CHANGELOG.md (este arquivo)

## [0.1.0] - 2026-01-XX (Beta)

### Adicionado
- Estrutura inicial do Design System
- Componentes básicos
- Sistema de cores e tipografia
- Storybook para documentação visual

---

## Tipos de Mudanças

- **Adicionado** - Novas funcionalidades
- **Modificado** - Mudanças em funcionalidades existentes
- **Depreciado** - Funcionalidades que serão removidas
- **Removido** - Funcionalidades removidas
- **Corrigido** - Correções de bugs
- **Segurança** - Correções de vulnerabilidades

## Versionamento

- **MAJOR** (X.0.0) - Mudanças incompatíveis com versões anteriores
- **MINOR** (0.X.0) - Novas funcionalidades compatíveis
- **PATCH** (0.0.X) - Correções de bugs compatíveis
