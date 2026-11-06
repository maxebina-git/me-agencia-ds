# DS Social Motion — Plano Maduro

> Objetivo: evoluir o `me-agencia-ds` com biblioteca de animações para vídeos sociais (Instagram primeiro) sem misturar com Motion de Site/LP. Quando este arquivo estiver maduro, começamos a implementar.

## 1. Decisão arquitetural (fechada)

**Pergunta:** Social Motion entra em `📦 Fundações → Motion` ou em `🎬 Social Studio`?

**Decisão:** `🎬 Social Studio → Social Motion` (grupo novo, separado).

**Por quê:**
- `Fundações → Motion` (`src/App.tsx:770`) = tokens + micro-interações web: `Elastic/Smooth/Spring`, `150/300/600/900ms`, `glow/float/pulse-ring/fade-in`, hover/scroll-trigger, responsivo, `transform+opacity` só, respeita `prefers-reduced-motion`.
- Social Motion = timeline determinística, resolução fixa, sem hover/scroll, com safe zone, exportável pra vídeo. Misturar quebra as duas camadas.

| Site/LP | Social / Vídeo |
|---|---|
| Scroll/hover triggered | Timeline fixa (frame-determinístico) |
| Responsivo | Resolução fixa (1080x1350, 1080x1920…) |
| Performance web | Export MP4/Lottie (Remotion) |
| Safe zone irrelevante | Safe zone crítica |

**Alternativas descartadas:**
- `Dentro de Social Studio → Instagram`: mais rápido agora, mas duplica quando abrir IN/X/TikTok/Pinterest.
- `Dentro de Fundações → Motion`: mistura web e vídeo.

## 2. Formato prioritário (fechado)

**IG 4:5 primeiro** — `1080x1350`, aproveita `InstagramSlide` atual (`src/components/ui.tsx:1004`, base `340x425` em `src/index.css:315`).
Depois: `9:16 (Reels/TikTok 1080x1920), 1:1 (IN/X 1080x1080), 16:9 (X/YouTube), 2:3 (Pinterest)`.

## 3. IA da sidebar (alvo)

```text
📦 Fundações
  Logo, Cores, Tipografia, Spacing, Motion (tokens web), GlitchText, Bordas, Ícones, Grid, Acessibilidade, Responsividade

🧩 Componentes
  Button, Badge, ServiceCard, Formulário, Tabela, SectionHeader, AnimatedCounter, WhatsAppFloat, ScrollToTop, Navbar, Hero, FAQ, Depoimentos, Footer, Drawer, Modal

🎬 Social Studio
  Social Motion (novo)
    ├─ Princípios
    ├─ Transições de Tela
    ├─ Textos Animados
    ├─ Cards & Boxes
    ├─ Path Motion
    └─ Numbers & Data
  Instagram (consome Social Motion)
  LinkedIn / X / TikTok / Pinterest (futuro, consomem Social Motion)

📝 Conteúdo
  Brand Voice

🚀 Preview
  LP Preview
```

## 4. Design Atômico (Social Motion)

Atomos → Moléculas → Organismos → Template. Cada molécula = 1 componente com props padronizadas `{ duration, easing, stagger, delay, theme }`, Preview + CodeBlock + PropsTable igual ao resto do DS.

**Átomos:** `Easing` (reusa os 3 do DS), `Duration`, `Theme` (via `data-theme` + `var(--slide-*)`), `SafeZone`.

**Moléculas (catálogo inicial — vamos definindo juntos, evolui sempre):**
- **Transições de tela:** `Fade, Slide, Zoom, Wipe, BlurIn` (`300/600/900ms`)
- **Textos:** `LetterStagger` (30ms/letra), `WordStagger`, `LineReveal` (clip+slide-up), `HighlightSweep`, `GlitchText` (já existe em `ui.tsx:131`)
- **Cards & Boxes:** `CardStagger` (`translateY 30px + opacity`, stagger `60-80ms`, `Smooth 600ms`), `CardStack`, `PopScale` (`Elastic 600ms`), `BorderGlowSweep` (`animate-glow`, `0 0 40px rgba(6,182,212,0.3)`)
- **Path Motion:** `DrawArrow` (SVG `stroke-dashoffset`, equivalente ao AE `Trim Paths`), `FollowPath` (elemento segue o path), `DotPath`, `CircleDraw`
- **Numbers & Data:** `AnimatedCounter` (já existe em `ui.tsx:944`, `end+suffix+label+icon`, 2s/60 steps), `BarGrow`, `ProgressRing`

**Organismos (cenas, IG 4:5):** `Capa / Dica / Serviço / Prova-Social / CTA` animadas — versão animada do `InstagramSlide` atual (`type: capa|dica|servico|prova-social|cta`, props `title, subtitle, body, number, metric, metricLabel`).

**Template:** `VideoComposition` (JSON) = juntar peças. Ex:
```tsx
<VideoComposition format="ig-4x5" theme="midnight">
  <SceneText variant="LetterStagger" text="5 Automações" />
  <SceneCards items={[...]} stagger />
  <ScenePathArrow d="M140 900 C 400 700, 600 1100, 940 900" />
  <SceneBigNumber value={150} suffix="+" />
</VideoComposition>
```

**Regras obrigatórias (herdadas do DS):**
- Só `transform + opacity` (MotionSection).
- Texto crítico dentro da Safe Zone: `13.3% top, 13% left, 74% width, 71.9% height` (`src/index.css:322`). Em 1080x1350: `180px top, 200px bottom, 140px laterais, 800x970 safe`.
- Logo: `bottom 16%, right 14%, 60x29px, 85%, var(--slide-accent)`, ausente em `dica` (já documentado em `InstagramSection`).
- Temas via `data-theme` (nunca hard-code hex): `midnight (#0a0a0f/#06B6D4)`, `sunrise (#FFF5E6/#FF6B35)`, `neon (#000000/#FF006E→#00F0FF)`, `minimal (#FAFAFA/#1A1A1A)` — vars `--slide-bg/--slide-text/--slide-accent/--slide-primary/--slide-gradient/--slide-border` (`src/index.css:111`).
- Tipografia: `Space Grotesk` (headline/números), `Inter` (body). `radius: 8/12/16/24px`.
- Brand Voice (`App.tsx:2325`): Confiante + Visionário + Acessível (Mago+Sábio). Fala de resultado, não de ferramenta. Gatilhos: autoridade, prova social, urgência, reciprocidade.

## 5. Estrutura de pastas (alvo, sem implementar ainda)

```text
src/
  components/
    social-motion/
      tokens.ts        # easings, durations, safe zones por formato
      Text/
        LetterStagger.tsx
        WordStagger.tsx
        LineReveal.tsx
      Cards/
        CardStagger.tsx
      Path/
        DrawArrow.tsx  # dashoffset + arrowhead opcional
      Transitions/
        FadeSlide.tsx
    templates/
      instagram/
        scenes/CapaScene.tsx, DicaScene.tsx, ...
        VideoComposition.tsx  # JSON → árvore de cenas
```

## 6. Roadmap (ordem de execução)

- [ ] **Fase 0 — Docs/IA:** sidebar `Social Motion` + página `Princípios` (safe zone, timeline, diferença web vs vídeo)
- [ ] **Fase 1 — Tokens:** `tokens.ts` (format 4:5, safe zone, easings reuso)
- [ ] **Fase 2 — Moléculas MVP (IG 4:5):** 6-8 primeiros (`LetterStagger`, `WordStagger`, `CardStagger`, `PopScale`, `DrawArrow`, `FadeSlide`, `BarGrow`, `AnimatedCounter-video`)
- [ ] **Fase 3 — Cenas IG:** 5 organismos animados baseados no `InstagramSlide` atual
- [ ] **Fase 4 — Renderer:** `VideoComposition` + motor JSON, pronto pra Remotion exportar MP4
- [ ] **Fase 5 — Expansão:** 9:16, 1:1, 16:9, 2:3 + LinkedIn/X/TikTok/Pinterest (só mudam `format + safe zone`)

## 7. Critérios de aceite

- Preview clicável em cada molécula (igual ao padrão dos easings de hoje).
- Cada molécula exporta props documentadas + CodeBlock copiável.
- Troca de `data-theme` troca identidade inteira sem tocar código da cena.
- Nada fora da Safe Zone em texto crítico; logo dentro (exceto `dica`).
- Só `transform+opacity`; stagger `60-80ms` em listas; `Elastic` só pra CTA/pop.

## 8. Pendências / pontos a definir juntos

- [ ] Engine final: Remotion (React, exporta MP4 direto) vs Playwright capturando DOM
- [ ] Catálogo final das moléculas — lista acima é ponto de partida, não fechamento
- [ ] Voz/caption e trilha/áudio (fora deste plano inicial)
- [ ] Quando começar Fase 2 (aguarda ok: "este .md maduro, começamos")

---

# Publicação no npm (registro anterior, mantido)

## ✅ O que foi feito:
- ✅ `package.json` configurado como biblioteca
- ✅ `vite.config.js` com build de biblioteca
- ✅ `src/index.ts` criado com todos os exports
- ✅ `README.md` atualizado para npm
- ✅ `PUBLISH.md` com guia completo
- ✅ `EXAMPLES.md` com exemplos de uso
- ✅ `CHANGELOG.md` com histórico

## 📦 Para publicar no npm:
```bash
npm run build:lib
# verificar dist/: index.js, index.mjs, index.d.ts, styles.css
npm publish --access public
# verificar: https://www.npmjs.com/package/@maxebina/max-ds
```

## 🎯 Projetos consumidores
- `me-agencia-lp`: `npm install @maxebina/max-ds`
- `me-agencia-instagram`: `npm install @maxebina/max-ds`

## 🔗 Links
- Docs: https://maxebina.github.io/max-ds
