# ADR-002 — Pipeline DS → LP: consumo via npm, release automatizado

## Status
Aceito. Execução adiada a pedido do usuário — a LP segue, por ora, consumindo o DS como está hoje (alias no `vite.config.ts` + CSS vendored). Nenhum publish foi feito ainda.

## Contexto
- A LP (`me-agencia-lp`) vai para produção em `www.maxebina.com.br` e hoje não é um repositório git.
- O DS (`me-agencia-ds`) é e continuará sendo versionado no GitHub (`maxebina-git/me-agencia-ds`) e publicado no npm como `@maxebina/max-ds` (pacote público).
- Na prática, a LP mantinha um snapshot manual do CSS do DS (`src/styles/max-ds.css`) + alias no `vite.config.ts` para `dist/index.es.js`, porque o `package.json` do DS apontava para arquivos inexistentes (`dist/index.mjs`, `dist/styles.css`). Resultado real: a Navbar do DS ficou sem estilos no topo da LP (faltavam `bg-white/20`, `dark:bg-bg-dark/20`, `backdrop-blur-md`).
- Objetivo do usuário: menos passos manuais entre "alterei no DS" e "está no ar na LP"; aprender e consolidar o fluxo build → publish → consumo.

## Decisão
- A LP consome o DS **exclusivamente** via pacote npm publicado: `import { Navbar } from '@maxebina/max-ds'` + `import '@maxebina/max-ds/styles.css'`. **Nunca** copiar CSS/JS à mão.
- O DS passa a ter um fluxo de release de 1 comando, preservando o ADR-001: aprovação visual explícita do usuário antes de qualquer publish. **Nenhuma publicação automática.**
- A LP vira repositório git próprio no GitHub e ganha deploy automático (Vercel/Netlify, a decidir) em `www.maxebina.com.br`.
- Durante desenvolvimento (antes de publicar), itera-se no DS local e o consumo na LP só muda quando há versão publicada — o fluxo aceita patch releases frequentes.

## Pré-requisito já atendido (sem publish)
- Exports do DS corrigidos para os arquivos reais gerados pelo build: `index.mjs` + `index.cjs`; `./styles.css` passa a apontar para `./dist/max-ds.css`; removidos `types` inexistentes. Build da lib e build da LP validados. Publish NÃO foi feito (ADR-001).

## Passo a passo (quando a execução for autorizada)

### No DS (`me-agencia-ds`)
1. `prepublishOnly`: rodar `npm run build:lib && npm run typecheck` antes de qualquer publish.
2. Gerar `dist/index.d.ts` de verdade (via `vite-plugin-dts` ou `tsc --emitDeclarationOnly`) → a LP apaga o `max-ds.d.ts` artesanal.
3. Script único de release: `npm run release:patch` (e `:minor` / `:major`) → typecheck + build + `npm version` + `npm publish`. Sem etapas manuais soltas.
4. GitHub Actions de CI: em push/PR, roda typecheck + build. Publish **somente** por botão manual (`workflow_dispatch` + secret `NPM_TOKEN`). Nunca em push/merge.
5. Corrigir os erros pré-existentes de `typecheck` (falta `src/types/three.d.ts`, como existe na LP).
6. Commit + tag `v1.0.11` após aprovação do usuário.

### Na LP (`me-agencia-lp`)
7. `git init` + repo no GitHub; deploy automático com build `npm run build` (Vercel/Netlify) apontado para `www.maxebina.com.br` quando o DNS for configurado.
8. Remover: alias `@maxebina/max-ds` no `vite.config.ts`, CSS vendored (`src/styles/max-ds.css`) e `src/max-ds.d.ts` (substituído pelo `index.d.ts` do pacote).
9. Importar o CSS oficial no `src/index.css`: `@import '@maxebina/max-ds/styles.css';`
10. Script `ds:sync`: `npm update @maxebina/max-ds && npm run build` — 1 comando para puxar a versão publicada mais nova.

## Fluxo do dia a dia
DS: edita componente → valida no `npm run dev` do DS → `npm run release:patch` → LP: `npm run ds:sync` → commit → push → deploy automático.

## Alternativas consideradas e rejeitadas
- **Monorepo (npm workspaces)**: simplifica o DX, mas contraria a decisão de DS como pacote público independente e LP como site de produção separado. Reavaliar se o time crescer.
- **Alias sempre para o source do DS na LP**: esconde bugs de publicação/exports (foi o que permitiu a navbar quebrar sem ninguém ver). A LP deve validar exatamente o que o usuário final recebe.
- **GitHub Action publicando automaticamente em push/tag**: viola o ADR-001. Publish é sempre decisão explícita do usuário.

## Consequências
- Toda mudança no DS visível na LP exige publicar uma versão — aceito por ser o comportamento correto de um pacote público.
- Custo: patch releases frequentes durante desenvolvimento ativo do DS.
- Ganho: o bug "LP consome coisa errada" torna-se estruturalmente impossível; o consumo passa a ser testado pelo próprio uso em produção.
- Risco residual: sem `index.d.ts` publicado, a LP ainda mantém declarações manuais — resolvido no item 2.

## Registro
- `2026-11-03`: decisão tomada após incidente da Navbar não estilizada na LP (CSS vendored desatualizado). Exports do DS corrigidos localmente; **nenhuma publicação feita**. Execução adiada a pedido do usuário; LP segue no formato atual (alias + CSS vendored).
- Relacionado: `docs/ADR-001.md` (regra de aprovação visual antes do publish — segue válida e não é alterada por este ADR).
