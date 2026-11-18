# Primitivos de Movimento Social — catálogo e uso

Referência dos primitivos animados que o DS publica para o app social (`me-agencia-social`) e para qualquer outro consumidor.

O **porquê** do contrato (quem decide o como se move, o onde e a cor, e por que o estado assentado é obrigatório) está em [`ADR-005-primitivos-social-motion.md`](./ADR-005-primitivos-social-motion.md). Este documento é o **catálogo**: o que existe hoje, com que props e como usar.

## Importação

```tsx
import { DecoBox, DecoPointer, DecoStamp, DecoCounter, RubberStamp, TextScramble } from '@maxebina/max-ds';
import '@maxebina/max-ds/styles.css';
```

## Demo vivo

O primitivo roda no demo do DS: `npm run dev` → **🎬 Social Studio → Cards & Boxes** (seção *DecoBox — a caixa que se desenha*), com as três variantes, a variação de tamanho, o botão de estado assentado e o seletor de tema (trocar o tema troca a cor do box na hora, sem tocar no componente).

## Resumo do catálogo

| Primitivo | Pasta | O que faz | Props principais |
|-----------|-------|-----------|------------------|
| `DecoBox` | `Deco/` | Caixa de cantos arredondados que **se desenha** em volta de um texto | `width`, `height`, `variant`, `radius`, `strokeWidth`, `delayMs`, `durationMs`, `settled` |
| `DecoPointer` | `Deco/` | Seta que percorre um caminho e aponta para o texto | `width`, `height`, `d`, `delayMs`, `duration`, `settled` |
| `DecoStamp` | `Deco/` | Carimbo (etiqueta) que bate no lugar | `text`, `delayMs`, `durationMs`, `fontSize`, `settled` |
| `DecoCounter` | `Deco/` | Número que conta até o valor (progress-driven) | `value`, `prefix`, `suffix`, `label`, `decimals`, `progress`, `durationMs`, `startMs`, `countMs`, `fontSize`, `variant` (`'count'` padrão / `'odometer'`) |
| `RubberStamp` | `Text/` | Texto carimbado (rotaciona e bate) | `children`, `as`, `delayMs`, `durationMs`, `settled` |
| `TextScramble` | `Text/` | Texto que embaralha até se formar | `text`, `charset`, `tickMs`, `staggerMs`, `delay`, `onComplete` |
| `AppleTitle` | `Text/` | Título em linhas com divisória animada | `top`, `bottom`, `dividerDuration`, `lineDuration`, `lineHold`, `bottomDuration`, `animate`, `autoFit` |
| `StrokeText` | `Text/` | Texto com contorno desenhado | `text`, `fontSize`, `duration` |
| `PewPewText` | `Text/` | Texto com efeito de digitação | `text`, `fontSize`, `start`, `loop`, `staggerMs` |
| `TipsyFrame` | `Text/` | Texto que balança e se firma | `text`, `duration`, `easing`, `delay`, `animate` |
| `PathRun` | `Path/` | Elemento que percorre um caminho SVG | `variant`, `d`, `duration`, `text`, `fontSize`, `once` |
| `PathPointer` | `Path/` | Traço desenhado + seta que viaja nele | `d`, `viewBox`, `duration`, `className` |
| `PathPulse` | `Path/` | Linha de batimento (ECG) que se desenha e emolda um título | `width`, `height`, `d`, `durationMs`, `delayMs`, `strokeWidth`, `settled` |
| `ReelTimeline` | `Scene/` | Orquestra de cenas/transições de um reel | `scenes`, `renderScene`, `holdMs`, `autoPlay`, `loop`, `startAtMs`, `onProgress`, `onComplete` |
| `SceneBackdrop` | `Scene/` | Fundo de cena em motion (6 presets, 1ª camada da cena) | `preset`, `delayMs`, `durationMs`, `settled` |
| `BG_PRESETS` | `Scene/` | Catálogo de dados dos 6 presets de fundo | — (dados puros) |
| `CtaButton` | `Deco/` | Pílula de CTA: pop + anel pulsante + flutuação | `label`, `href`, `delayMs`, `durationMs`, `settled` |
| `StickerPop` | `Deco/` | Sticker/emoji com spring elástico + wiggle | `text`, `size`, `delayMs`, `durationMs`, `settled` |
| `ConfettiBurst` | `Deco/` | Explosão de confete com **seed fixa** (determinística p/ export) | `count` (8..80), `seed`, `originX/Y`, `delayMs`, `durationMs`, `settled` |
| `DecoProgressRing` | `Deco/` | Anel de progresso que se desenha (`pathLength=100`) | `value`, `max`, `size`, `strokeWidth`, `label`, `delayMs`, `durationMs`, `settled` |
| `LottieDeco` | `Deco/` | Animação Lottie (.json) via **import dinâmico** (lottie-web = peer opcional) | `src`, `data`, `autoplay`, `loop`, `settled`, `delayMs` |
| `StepsList` | `Scene/` | Lista de passos em cascata (stagger) com badge numerado | `steps`, `delayMs`, `staggerMs`, `durationMs`, `settled` |
| `ReelProgress` | `Scene/` | Barra de progresso do reel no topo (progress-driven, liga no `onProgress`) | `progress`, `height` |
| `MarqueeTape` | `Scene/` | Fita de texto em loop contínuo (2 cópias, `translateX(-50%)`) | `items`, `separator`, `durationMs`, `delayMs`, `settled` |
| `SceneOverlay` | `Scene/` | Overlay estático de cena: vinheta e/ou grão (SVG feTurbulence) | `preset` (`vignette`/`grain`/`grain-vignette`), `opacity` |
| `ServiceIcon` | `Services/` | Ícone linear do set de serviços (15 ícones, `currentColor`) | `name`, `size`, `strokeWidth` |
| `ServiceArt` | `Services/` | Arte de serviço: `flat` (fundo abstrato) ou `mock` (browser/phone/dash) | `icon`, `variant`, `device` |
| `SocialServiceCard` | `Services/` | Card de serviço IG (selo + flat + mock + título/frase), 4:5 ou 9:16 | `title`, `phrase`, `icon`, `device`, `aspect`, `showSafeZone`, `settled` |
| `SERVICE_FAMILIES` | `Services/` | Catálogo de dados: 5 famílias × 3 cards (15 serviços) | — (dados puros) |

Todos os primitivos de `Deco/` e `Text/` que animam leem a cor do tema (`var(--slide-accent)`) e não recebem cor fixa.

## Detalhes

### `DecoBox` — caixa que se desenha

Caixa em volta de um texto, com preenchimento translúcido atrás e traço desenhando (o traço usa `pathLength={100}` + `stroke-dashoffset` de 100 → 0; o preenchimento aparece a partir de 55% do tempo).

```tsx
<DecoBox
  width={320}                 // px — quem mede é o consumidor
  height={64}
  variant="highlight"         // 'highlight' | 'frame' | 'chip'
  radius={10}                 // opcional, sobrepõe o preset
  strokeWidth={2.5}           // opcional
  delayMs={700}
  durationMs={800}
  settled={false}             // true = já desenhado, sem animação
  style={{ inset: 0 }}        // posicionamento é do consumidor
/>
```

| Variante | Raio | Preenchimento | Traço |
|----------|------|---------------|-------|
| `highlight` | 10 | sim (12% do accent) | 2,5 |
| `frame` | 12 | não | 2 |
| `chip` | 999 | sim | 2 |

No app social, quem mede e posiciona é o `BoxedText` (`src/components/ReelSlide.tsx`): ele mede o texto com `ResizeObserver`, soma o padding e renderiza o `DecoBox` com `inset: 0` no wrapper — o texto fica com `zIndex: 1` para pintar sobre o preenchimento.

- `loop` (só para ilustração no demo): o box se desenha, segura e some no fim do ciclo, repetindo. O ciclo dura 8× a duração do traço (700ms → 5,6s). No conteúdo final o box é desenhado uma vez só.

### `DecoPointer` — seta apontando

A seta percorre um caminho SVG (bico via `offsetPath`) e termina apontando para o texto.

```tsx
<DecoPointer width={61} height={96} delayMs={600} duration="3s" settled={false} />
```

- `width`/`height` (opcionais): o tamanho da caixa da seta, em px. Sem `d`, o caminho é gerado em `buildPointerPath(width, height)` **no espaço de px da caixa** — o `offsetPath` do bico é interpretado em px do elemento, então o caminho e o `viewBox` precisam estar no mesmo espaço (por isso o `PathPointer` aceita `viewBox`).
- `POINTER_TIP_RATIO` (`{ x: 0.16, y: 0.13 }`) diz onde está a ponta do bico dentro da caixa: o consumidor usa esse ratio para ancorar a seta no texto.

### `DecoStamp` — carimbo

Etiqueta que entra girando e batendo no lugar. `text` é obrigatório; `fontSize` opcional (o app usa 15 para não colidir com o rótulo do bloco).

### `DecoCounter` — número contando

Conta de 0 até `value`. `startMs` (padrão 600) e `countMs` (padrão 900) controlam quando começa e quão rápido. `progress` (0..1) permite fixar a posição do frame.

### `TextScramble` — texto embaralhando

Fornece `getScrambleFrame(text, tick)` para renderizar quadro a quadro, além do componente React com `onComplete`. É usado no modo estático do app social para **desenhar o texto já formado** (sem animação) na tela aprovada.

### `PathPulse` — separador de batimento (ECG)

Linha horizontal que entra, dá um bico de batimento cardíaco no meio e sai. É o separador que enquadra um título: uma linha em cima e outra embaixo.

```tsx
<PathPulse width={208} height={40} delayMs={150} durationMs={1500} settled={false} />
```

- Traço padrão: `M 0 24 L 80 24 L 104 0 L 104 40 L 128 16 L 208 16` (viewBox 208×40) — o mesmo formato do `DecoPulseLine` que existia só no app social.
- O desenho usa `pathLength={100}` + `stroke-dashoffset` de 100 → 0 (1,5s, `cubic-bezier(0.22,1,0.36,1)`), então a linha "se escreve" da esquerda para a direita.
- `delayMs` é o que escalona as duas linhas: 150ms na de cima, 900ms na de baixo.
- `settled` deixa a linha já desenhada (tela estática).
- `loop` (só para ilustração no demo): a linha se desenha, segura e some no fim do ciclo, repetindo. O ciclo dura 4× a duração do traço (1,5s → 6s, o mesmo compasso do Path Text).
- Demo: `npm run dev` → **🎬 Social Studio → Path Motion → Path aplicado ao elemento**, card "Path Pulse", ao lado do "Path Text".

### `SceneBackdrop` — fundo de cena em motion

Primeira camada da orquestração: o fundo entra/transiciona **antes** dos elementos (texto, cards, CTA). Seis presets prontos em `BG_PRESETS`, todos com cor do tema (`--slide-*`) e entrada por keyframes determinística.

```tsx
<SceneBackdrop preset="accent-glow" delayMs={0} durationMs={1200} settled={modoEstatico} />
```

- `preset`: `'solid' | 'gradient-shift' | 'accent-glow' | 'shape-float' | 'wipe-reveal' | 'zoom-bg'` — o catálogo `BG_PRESETS` traz `name`/`durationMs`/`entry`/`desc` de cada um para o consumidor montar UI;
- o componente ocupa a cena inteira (`position: absolute; inset: 0`) — o consumidor só posiciona o slide relativo em volta;
- `delayMs`/`durationMs` alimentam as CSS vars `--fx-bg-delay`/`--fx-bg-dur`, então a entrada é função do tempo (frame a frame no export de vídeo); `durationMs` omitido = o padrão do preset;
- `settled` desliga as animações e mostra o frame final (tela estática). No preset `shape-float` o loop infinito também para no assentado;
- `prefers-reduced-motion` reduz tudo para ~200ms sem loop.
- Demo: `npm run dev` → **🎬 Social Studio → Fundos em Motion** — o demo consome o próprio primitivo: parado o card está `settled` (frame final visível); clicar remonta sem `settled` e a entrada anima do zero.

### Lote "Extras" (2026-11-17) — `Deco/` + `Scene/`

Nove primitivos novos, todos com o contrato ADR-005 (cor só do tema, entrada por `delayMs`/`durationMs`, `settled` = frame final). Agrupados no demo **🎬 Social Studio → Extras** (parado = `settled`; "Animar" remonta com `key` e anima do zero; os progress-driven acompanham um `progress` 0→1):

- **`CtaButton`** (`Deco/`): `<CtaButton label="Segue pra mais" settled={modoEstatico} />` — pop elástico de entrada, anel pulsante e flutuação em loop enquanto não assentado.
- **`StepsList`** (`Scene/`): `<StepsList steps={[{ title, desc }]} delayMs={0} staggerMs={500} settled />` — itens entram em cascata (delay inline por item).
- **`StickerPop`** (`Deco/`): `<StickerPop text="🔥" size={40} settled />` — spring + wiggle.
- **`ReelProgress`** (`Scene/`): `<ReelProgress progress={p} />` — barra fixa no topo da cena; **progress-driven** (vem do `onProgress` da `ReelTimeline`), sem animação própria, não precisa de `settled`.
- **`MarqueeTape`** (`Scene/`): `<MarqueeTape items={[...]} settled />` — loop perfeito com 2 cópias e `translateX(0 → -50%)`; posicionada por padrão em `bottom: 0`.
- **`SceneOverlay`** (`Scene/`): `<SceneOverlay preset="grain-vignette" />` — **estático por natureza** (vinheta radial + grão SVG `feTurbulence` em data-URI com `mix-blend-mode: overlay`), seguro para export frame a frame.
- **`ConfettiBurst`** (`Deco/`): `<ConfettiBurst count={48} seed={7} settled />` — DOM puro (spans) com RNG `mulberry32(seed)`: trajetórias determinísticas, então o export bate com a tela estática. `settled` = frame final (opacidade 0). `count` limitado a 8..80.
- **`DecoProgressRing`** (`Deco/`): `<DecoProgressRing value={72} label="72%" settled />` — círculo com `pathLength={100}`, `stroke-dashoffset` animado de 100 até o offset final (CSS var `--fx-ring-off`).
- **`DecoCounter variant="odometer"`** (`Deco/`): prop nova **opcional**, padrão `'count'` (render atual preservado). No modo odometer cada dígito vira uma coluna `overflow: hidden` com os dígitos 0–9 empilhados e `translateY(-d em)` — ainda progress-driven, determinístico.
- **`LottieDeco`** (`Deco/`): `<LottieDeco src="https://.../anim.json" settled />` ou `data={animationData}`. O `lottie-web` entra por **import dinâmico** (specifier em variável + `@vite-ignore`) → chunk separado, só baixa/instala quem usa; declarado como peer **opcional** no `package.json`. `settled` = `goToAndStop(totalFrames - 1)`. Cor/forma vêm do `.json` (dado do designer). Sem lottie-web instalado, renderiza vazio sem quebrar.

Transições novas na `ReelTimeline` (`Scene/timeline.ts`): `'glitch'` (fragmentada 6×4, jitter por célula com delay determinístico `(row*7 + col*13) % 5`) e `'rgb-split'` (incoming entra com `drop-shadow` cromático accent/primary + `translateX` que se anulam). A seção **Transições de Tela** ganhou os dois previews e a nota de engine agora lista paridade total.

### `SocialServiceCard` — card de serviço (Social Studio)

Um serviço representado como card de Instagram, com as 3 camadas da "Direção D": **selo** (círculo com o `ServiceIcon`, topo direito), **flat** atrás com bleed (`ServiceArt variant="flat"`, fundo opaco) e o **mock** na frente (`ServiceArt variant="mock"`, foco — é nesse lugar que a foto real entra depois, no app social). Embaixo, título + frase sobre um gradiente do fundo do tema.

```tsx
<SocialServiceCard
  title="Sites Institucionais"
  phrase="Sua casa digital própria, no ar em dias."
  icon="globe"
  device="browser"     // 'browser' | 'phone' | 'dash'
  aspect="9:16"        // '4:5' = 340×425 (feed) · '9:16' = 340×604 (reels)
  showSafeZone         // overlay da área de segurança (variante 9:16 inclusa)
  settled              // frame final = tela estática
/>
```

- Cores vêm do tema (`--slide-*`); a largura máxima vem de `aspect` (`SOCIAL_SERVICE_CARD_SIZES`: 340px) e o card encolhe proporcionalmente (`aspect-ratio`) se a célula for menor — texto quebra, nunca corta.
- `SERVICE_FAMILIES` traz o catálogo pronto: 5 famílias × 3 cards, cruzando os 6 serviços da LP com o que o feed do Instagram já cobre.
- A safe zone tem variante própria para 9:16: `.safe-zone-overlay--916` (14% topo, 6% laterais, 88% × 63%).
- O nome `ServiceCard` já existia em `components/ui` (card da LP) — por isso o primitivo novo é `SocialServiceCard`.
- Demo: `npm run dev` → **🎬 Social Studio → Serviços** (seletor de tema + toggle de safe zone + toggle 4:5/9:16 + título por família + 3 cards por família).

## Como o app social mapeia os decos

O app declara, por bloco, o que ele quer (`BlockDeco` em `src/types.ts`) e o `ReelSlide.tsx` traduz para o primitivo do DS:

| `deco.kind` | Primitivo | Bloco típico |
|--------------|-----------|--------------|
| `stamp` | `DecoStamp` | rótulo (`labelDeco`) |
| `pointer` | `DecoPointer` | título (`titleDeco`) |
| `box` | `DecoBox` | título (`titleDeco`) |
| `counter` | `DecoCounter` | corpo (`bodyDeco`) |
| `scramble` | `TextScramble` | título (`titleDeco`) |

Exemplo de declaração (num arquivo de conteúdo do app social):

```ts
cta: {
  title: 'Qual dos 3 é o seu?',
  titleDeco: { kind: 'box', variant: 'highlight', delayMs: 700, durationMs: 800 },
},
```

## Receita: criar um novo primitivo

1. **Componente** em `src/components/social-motion/<Pasta>/<Nome>.tsx`.
2. **Props**: `delayMs`, `durationMs`/`duration`, `settled`, `className`, `style`. Sem cor fixa — só `var(--slide-*)`.
3. **CSS** em `src/index.css` com prefixo `fx-` e o estado assentado:

   ```css
   .fx-meu-primitivo { animation: fx-meu-primitivo-kf 700ms ease forwards; }
   .fx-meu-primitivo.is-settled { animation: none; /* estado final */ }
   ```

4. **Export** em `src/index.ts` (componente + tipos).
5. **JSDoc** no componente com o contrato (o que o consumidor precisa passar).
6. **Validar** no `dev` do DS (`npm run dev`) antes de `npm publish` (ADR-001) e no app social pelo modo estático (`npm run export:static -- <slug>`), conferindo que a tela estática e o último frame do vídeo são iguais.

## Armadilhas conhecidas

- **`offsetPath` é interpretado em px do elemento**, não em unidades do `viewBox`. O caminho desenhado e o `offsetPath` da seta precisam estar no mesmo espaço — gere o `d` em px e passe o `viewBox` correspondente (`0 0 width height`).
- **Medir texto pela caixa do elemento não funciona**: o span pode ocupar a coluna inteira e a ponta da seta sai do lugar. Meça a **primeira linha** com `document.createRange().selectNodeContents(el)` + `getClientRects()[0]`.
- **Estado assentado não é opcional**: sem ele, a tela estática aprovada e o vídeo divergem.
- **Cor do tema**: não passe cor por prop; use `var(--slide-accent)`.
