# HANDOFF — me-agencia-ds (Design System)

Se você é um agente começando neste projeto, **invoque primeiro a skill `agencia-maxebina-handoff`** (salva no app) — ela tem o handoff completo e auto-contido da Agência Max Ebina. Este arquivo é só o ponteiro para quando a pasta é aberta sem o app.

## O que este projeto é

Design System da Agência Max Ebina (React + Vite + TS), publicado como `@maxebina/max-ds`. O consumidor (`me-agencia-social`) usa via `"@maxebina/max-ds": "file:../me-agencia-ds"` → consome `dist/index.mjs` + `dist/max-ds.css`.

## Contrato dos primitivos (obrigatório — ADR-005)

Docs canônicos:
- `docs/ADR-005-primitivos-social-motion.md` — contrato e regras de breaking
- `docs/PRIMITIVOS-SOCIAL-MOTION.md` — catálogo de todos os primitivos e props

Resumo: primitivo novo nasce em `src/components/social-motion/<Pasta>/` com props `delayMs`/`durationMs`/`settled`/`className`/`style`, **sem cor fixa** (usa `var(--slide-*)` dos temas `[data-theme="midnight|sunrise|neon|minimal"]`), CSS em `src/index.css` prefixo `fx-` com animações só sob `:not(.is-settled)` + `prefers-reduced-motion`, export em `src/index.ts`, JSDoc sem `{/* */}` dentro, demo na seção 🎬 Social Studio do `App.tsx`. `settled` = frame final = tela estática aprovada. Adicionar prop nova é seguro; mudar o movimento de um primitivo existente é breaking.

## Build e verificação

- Typecheck direto aqui: `node node_modules/typescript/bin/tsc --noEmit` (o node_modules montado só tem binários Windows, mas o tsc roda).
- Build completo SÓ em `/tmp/work/me-agencia-ds`: rsync excluindo `node_modules`/`dist`/`.git`, `npm install`, `npm install --no-save lottie-web` (pro LottieDeco no dev), `npm run build:lib`; copiar `dist/` de volta e re-copiar `public/favicon.svg` + `public/ocean-static.png` (emptyOutDir apaga). O dist embute o lottie-web num chunk `lottie-*.js` separado (peer opcional).
- Verificação visual no sandbox Linux: chromium em `/sessions/<sessao>/tmp/chromium` + playwright-core (`--no-sandbox --disable-dev-shm-usage`), dev server `npm run dev -- --port 5199 --strictPort` em `/tmp/work/me-agencia-ds`, screenshots em `outputs/shots-*`. Nos cards de demo, clicar via `xpath=ancestor::button[1]` (o nome fica fora do `<button>`). O `/tmp` reseta quando o sandbox reinicia.
- Regra de ouro: elemento animado nasce aqui no DS; o app social só consome. E na produção de conteúdo: roteiro → telas estáticas → aprovação → só então animações.

## Pendências (revisado em 2026-11-18)

- **Trabalho grande sem commit.** O commit `1.0.17` (07/11) só sobe a versão; todos os primitivos de social motion (≈9,7 mil linhas em `src/`, mais `HANDOFF.md` e ADR-005) estão só na working tree. Commitar antes de qualquer outra mudança grande, e publicar como nova versão (não como 1.0.17) — ver `[Unreleased]` no `CHANGELOG.md`.
- **Skill `agencia-maxebina-handoff` nem sempre está disponível.** Em sessões sem o app ela não aparece; o que for essencial dela deveria estar copiado em `docs/`.
- **Migração do `DecoPulseLine` no app social.** O `me-agencia-social` ainda mantém a cópia local (`src/components/ReelSlide.tsx` + `.me-deco-pulse-line`) em vez de consumir o `PathPulse` do DS — viola a regra de ouro acima.
- **`PROXIMOS-PASSOS.md` está desatualizado.** É o plano de 06/11 (nomes como `LetterStagger`, `CardStagger`, `VideoComposition`); o que existe de fato está em `docs/PRIMITIVOS-SOCIAL-MOTION.md`. Atualizar ou marcar como histórico.
- **Dependências pesadas no pacote.** `@supabase/supabase-js`, `three`, `recharts`, `react-router-dom` e `@dnd-kit/*` são `dependencies` obrigatórias e o `dist/index.mjs` tem ~1 MB. Avaliar mover para peer/opcional ou separar entry points — decisão ainda não registrada em ADR.
- **Build no Windows.** As instruções acima valem para o sandbox Linux; no Windows o caminho direto é `npm run build:lib` na própria pasta (lembrando de recolocar `public/favicon.svg` e `public/ocean-static.png` no `dist/` se o build os apagar).
