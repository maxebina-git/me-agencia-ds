# ADR-004 — Pipeline de deploy: DS → npm → LP via GitHub Actions + FTP

## Contexto
LP e DS são repositórios separados. A LP (`me-agencia-lp`) é publicada em produção via FTPS em `maxebina.com.br`. O DS (`me-agencia-ds`) é publicado no npm como `@maxebina/max-ds` e consumido pela LP (e possivelmente por outros projetos). Sem um ADR, o fluxo de release dependia de memória do mantenedor.

## Decisão

### 1. Pipeline da LP → Produção
Avanço da LP é feito exclusivamente via GitHub Actions (workflow `deploy.yml`) com `on: push` na branch `main`:

1. `checkout` → `setup-node` 22 (cache npm)
2. `npm ci` → `npm run lint` → `npm run build`
3. `SamKirkland/FTP-Deploy-Action@v4.3.5` (`protocol: ftps`, `server-dir: /maxebina.com.br/www/`, `local-dir: ./dist/`)
4. Todo push/merge na `main` dispara deploy automático.

### 2. Pipeline do DS → npm → LP (release do DS)
O DS segue um ciclo controlado de release:

1. **Editar** componentes no DS (`src/components/...`).
2. **Validar em dev** localmente (conforme ADR-003): `watch:lib` no DS + `dev` na LP, via alias condicional no `vite.config.ts`.
3. **Validar visualmente** (ADR-001): aprovação explícita do usuário antes de qualquer `npm publish`. Nenhuma publicação automática.
4. **Publicar no DS**: `npm version patch` (ou `:minor`/`:major`) → `npm run typecheck && npm run build:lib` → `npm publish`.
5. **PR manual de bump**: o agente cria a PR de bump na LP (`https://github.com/maxebina-git/me-agencia-lp/pulls`) logo após a publicação, sem esperar detecção automática. Branch `chore/bump-max-ds-<versao>` com `package.json`/`package-lock.json` atualizados para a nova versão. Sem Dependabot — `.github/dependabot.yml` removido (a regra `interval: daily` causava espera de até 24h; bumps agora são manuais e imediatos).
6. **Merge da PR de bump na LP** → GitHub Actions `deploy.yml` → FTP → `maxebina.com.br` com o novo DS.

#### Comando contingente (dor de barriga)

Se o agente travar, cola este comando (troca a versão):

```
/ds-bump 1.0.17
Publica o DS 1.0.17 no npm e cria a PR manual de bump na LP (branch chore/bump-max-ds-1.0.17, sem Dependabot). Para antes do merge (ADR-004).
```

#### 2.1 Checkpoint de aprovação humana (obrigatório)

O assistente **não pode** concluir sozinho as etapas 5–6. Após o `npm publish` e a abertura da PR na LP, ele **para**, envia o link da PR (`https://github.com/maxebina-git/me-agencia-lp/pulls`) e aguarda o usuário:

1.  Usuário clica no link da PR.
2.  Usuário revisa, resolve conflitos (ex.: versão do pacote em `package.json`/`package-lock.json` — manter `1.0.15` novo, nunca `1.0.14` antigo), depois executa o merge (qualquer botão: *Commit merge*, *Squash and merge* ou *Rebase and merge*).
3.  Após o merge, o deploy da LP com GitHub Actions + FTP é de **responsabilidade do agente** (não do usuário): monitorar `deploy.yml` (lint → build → FTP), confirmar sucesso e validar o site em produção (`maxebina.com.br`).

Sem a ação humana no merge, nenhum deploy da LP acontece — automatizar o merge violaria o ADR-001 (aprovação visual antes de publicar).

### 3. Rollback
Se um deploy na LP quebrar:
1. `git revert <commit-do-deploy>` na `main` da LP.
2. Push da reversão → GitHub Actions dispara novo FTP deploy com o `dist` anterior.
3. Se necessário, `npm deprecate` a versão publicada do DS.

### 4. Sincronização local
Na LP, fluxo local é sempre manual:
```bash
npm run sync   # git pull --ff-only && npm ci
```

---

## Consequências
- **Prós:** Publish do DS é o primeiro passo explícito de todo deploy; PRs manuais são imediatas (sem espera do Dependabot diário); o consumidor valida exatamente o `dist/` publicado; rollback rápido via `git revert`.
- **Contras:** Patch releases frequentes durante desenvolvimento ativo do DS; o bump exige ação do agente (sem automação de detecção no npm).
- **Risco:** publish manual depende da presença do mantenedor e do token `NPM_TOKEN` nas secrets do DS.

### Links de referência
- Repo DS: https://github.com/maxebina-git/me-agencia-ds
- npm público: https://www.npmjs.com/package/@maxebina/max-ds
- Produção: https://maxebina.com.br/

---

## Relacionado
- `docs/ADR-001.md` — aprovação visual antes de `npm publish`.
- `docs/ADR-002-pipeline-ds-lp.md` — pipeline DS → LP via npm release.
- `docs/ADR-003-local-dev-consumption-workflow.md` — consumo local do DS em desenvolvimento.
