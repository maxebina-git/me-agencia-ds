# ADR-005 — Primitivos de movimento social nascem no DS

## Contexto

O app `me-agencia-social` compõe cenas de reel a partir de templates (`src/templates/*.ts`) e precisa de **elementos de apoio visual animados** — carimbo, seta apontando, número contando, texto embaralhando, caixa que se desenha em volta de uma frase.

Cada consumidor precisa dos mesmos movimentos, e cada movimento precisa de três coisas ao mesmo tempo: a animação em si, a paleta do tema e um **estado final estável** (a tela que o usuário aprova é a tela estática; o vídeo precisa terminar exatamente nela).

Se o app escrever o CSS da animação, cada reel sai com um estilo próprio, a paleta se duplica em cada projeto e o estado final raramente bate com a tela estática aprovada — porque "tela estática aprovada" e "frame final do vídeo" são mantidos em lugares diferentes.

## Decisão

**Todo elemento animado de social nasce no DS (`me-agencia-ds/src/components/social-motion/`) e o app apenas escolhe, mede e posiciona.**

O app `me-agencia-social` **não** escreve animação: ele consome o primitivo publicado pelo DS, passa o tamanho medido e escolhe o bloco que vai receber o elemento.

### Os três eixos — quem decide o quê

| Eixo | Quem decide | Onde mora | Exemplo |
|------|-------------|-----------|---------|
| **Como se move** | **DS** | primitivo + CSS em `src/index.css` (prefixo `fx-`) | a caixa "se desenha" com `stroke-dashoffset` |
| **Onde fica e quão grande** | **Consumidor** | o app mede o texto/elemento e passa `width`/`height`/`style` | `DecoBox` recebe `width`/`height` em px |
| **De que cor é** | **Tema** | variáveis CSS do tema (`--slide-accent`, `--slide-text`, …) | trocar `[data-theme]` muda o box sem tocar no componente |

O primitivo **nunca** mede o conteúdo nem fixa posição: isso é do consumidor, que é quem conhece o layout da cena. O primitivo também **nunca** fixa cor: ele lê a variável de tema, e o DS já define os temas (`[data-theme="midnight|sunrise|neon|minimal"]` em `src/index.css`).

### Estado assentado é obrigatório

Todo primitivo com animação expõe `settled?: boolean` (ou já renderiza o frame final quando não há animação a rodar). Com `settled` ligado:

- o traço da caixa aparece desenhado, sem animação;
- o preenchimento aparece opaco;
- o carimbo está batido;
- a seta está no fim do caminho.

Isso garante a regra de produção do app social: **a tela estática aprovada tem que ser igual ao último frame do vídeo**. O app passa `settled` no modo estático (`?static=1`) e no modo de exportação de frames.

### Tema

O DS define a paleta por tema em `src/index.css`:

```css
[data-theme="midnight"] { --slide-bg: …; --slide-text: …; --slide-accent: …; }
```

Os primitivos de social leem `var(--slide-accent)` (e `--slide-text` quando necessário). Consequência prática: **trocar de tema no app não exige nenhuma alteração no primitivo** — basta trocar o atributo `data-theme` do slide.

### Checklist para criar um novo primitivo

1. **Arquivo** em `src/components/social-motion/<Pasta>/<Nome>.tsx` (`Text/`, `Path/`, `Deco/`, `Scene/` ou `Services/`).
2. **Props em camelCase**, com `delayMs` (atraso) e `durationMs`/`duration` (duração) quando faz sentido; nada de cor fixa — só `var(--slide-*)`.
3. **CSS da animação** em `src/index.css`, com prefixo `fx-` e o override de estado assentado (`.fx-<nome>.is-settled …`).
4. **Estado assentado** exposto via prop `settled` (ver acima).
5. **Export** em `src/index.ts` (componente + tipos + constantes públicas).
6. **JSDoc** no componente explicando o contrato (o que o consumidor precisa passar).
7. **Demo no DS**: o primitivo entra na seção correspondente do demo (`npm run dev` → **🎬 Social Studio**), com as variações, o estado assentado e o seletor de tema — o demo é a especificação viva.
8. **Validar** no `dev` do DS (`npm run dev`) antes de qualquer `npm publish` (ver ADR-001) e, se for primitivo de apoio de bloco, no app social pelo modo estático (`npm run export:static -- <slug>`).

### Consequências

- **Positivo:** um movimento escrito uma vez serve LP, social e qualquer consumidor futuro; a paleta é resolvida pelo tema; o vídeo e a tela estática não divergem.
- **Custo:** o app precisa de uma camada de medição (o `ResizeObserver` que mede o texto e passa `width`/`height` ao primitivo) — isso é do consumidor, por desenho.
- **Custo:** mudar o "como se move" de um primitivo é breaking change para todo consumidor. Mudar só props novas é seguro.

## Registro

- `2026-11-17` — decisão tomada ao implementar o `DecoBox` (caixa que se desenha em volta da frase). O primitivo nasceu no DS, com `variant` (`highlight`/`frame`/`chip`), tamanho vindo do consumidor e cor vinda do tema. O app social só mede o texto e posiciona.
- `2026-11-17` — `PathPulse` (linha ECG que emoldura o título) nasceu no DS a partir do `DecoPulseLine` que existia **só no app social**. O app ainda mantém a cópia local (`src/components/ReelSlide.tsx` + `.me-deco-pulse-line` no `src/index.css`): a migração para consumir o primitivo do DS está pendente.
- `2026-11-17` — `SocialServiceCard` + `ServiceIcon` + `ServiceArt` + `SERVICE_FAMILIES` nasceram em `social-motion/Services/`. O nome `ServiceCard` já era usado em `components/ui` (card da LP), então o primitivo novo chama-se `SocialServiceCard`. O catálogo (5 famílias × 3 cards) cruza os 6 serviços da LP com o que o feed cobre; a arte entra como **mock vetorial** e a foto real só no app social. A safe zone ganhou a variante 9:16 (`.safe-zone-overlay--916`).
- `2026-11-17` — `SceneBackdrop` + `BG_PRESETS` nasceram em `social-motion/Scene/`, tirando do demo **Fundos** os 6 presets que estavam inline no `App.tsx` (`solid`, `gradient-shift`, `accent-glow`, `shape-float`, `wipe-reveal`, `zoom-bg`). O componente é `absolute inset-0`, cor só do tema, entrada por keyframes com `delayMs`/`durationMs` via CSS vars (`--fx-bg-delay`/`--fx-bg-dur`) — determinística no export — e `settled` mostra o frame final. O demo da seção Fundos passou a consumir o próprio primitivo (parado = `settled`, clique remonta e anima). Isso fecha o backlog que a seção listava ("implementar primitivo de BG exportável").
- `2026-11-17` — lote "Extras": `CtaButton`, `StickerPop`, `ConfettiBurst`, `DecoProgressRing`, `LottieDeco` (em `Deco/`) e `StepsList`, `ReelProgress`, `MarqueeTape`, `SceneOverlay` (em `Scene/`), todos aditivos (nenhum primitivo existente mudou de movimento). `DecoCounter` ganhou `variant?: 'count' | 'odometer'` com padrão `'count'` — prop nova é seguro segundo a regra do contrato; mudar o movimento é que seria breaking. `ConfettiBurst` usa RNG com seed fixa (mulberry32) e DOM puro (sem canvas) para o export frame a frame ser determinístico. `LottieDeco` carrega `lottie-web` por import dinâmico → peer opcional, fora do bundle de quem não usa. `SceneTransitionType` ganhou `'glitch'` (fragmentada, jitter determinístico) e `'rgb-split'` (drop-shadow cromático) — união ampliada, tipos antigos intactos. Demo novo: 🎬 Social Studio → **Extras**.
- Catálogo dos primitivos e suas props: [`PRIMITIVOS-SOCIAL-MOTION.md`](./PRIMITIVOS-SOCIAL-MOTION.md).
