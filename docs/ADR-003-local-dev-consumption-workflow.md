# ADR-003 — Consumo local do DS em desenvolvimento (consumidor + futuros consumidores)

## Contexto
O DS (`me-agencia-ds`) é publicado no npm como `@maxebina/max-ds` e consumido pela LP (`me-agencia-lp`) e, possivelmente, por outros projetos no futuro. Durante o desenvolvimento ativo do DS, não é viável publicar no npm a cada alteração para validar no consumidor.

## Decisão
O consumidor (LP e futuros) reaproveita os componentes do DS em **dev local** sem publicar no npm, através de:

1. **DS expõe `watch:lib`** (`vite build --mode lib --watch`) que reconstrói `dist/` automaticamente a cada salvamento em `src/`.
2. **O consumidor usa alias condicional no `vite.config.ts`** (`command === 'serve'`), resolvendo `@maxebina/max-ds` e `@maxebina/max-ds/styles.css` para o `dist/` local do DS apenas em modo `serve`. Em build/produção, usa o pacote publicado no npm.
3. **O DS mantém o `watch:lib` como script oficial de dev** para que qualquer consumidor futuro possa replicar o mesmo padrão.

## Fluxo de dev local (3 terminais)
| Terminal | Comando | Para que serve |
|----------|---------|----------------|
| A (DS) | `npm run watch:lib` | Reconstrói `dist/` a cada save no DS |
| B (DS) | `npm run dev -- --port 5175` | Valida componentes no demo próprio do DS |
| C (LP/consumidor) | `npm run dev` | Valida integração real com o DS local (`localhost:5173`) |

Se houver conflito de porta 5173 entre DS e LP, o DS usa porta automática (Vite sobe em 5174 ou outra).

## Validação obrigatória antes de qualquer `npm publish` (ADR-001)
O consumidor **não** pode publicar uma versão do DS sem validar previamente:

- [ ] Hero com glitch e `Badge` com contraste verificados no **demo do DS** (`npm run dev` do DS).
- [ ] Mesmos componentes verificados no **consumidor local** (LP) usando o `dist/` via alias.
- [ ] `npm run lint && npm run build` verdes no consumidor.
- [ ] Aprovação visual explícita do usuário antes de `npm version patch` + `npm publish`.

## Futuros consumidores
Se outro projeto consumir o DS, o padrão deve ser o mesmo:
- Usar `@maxebina/max-ds` + `@maxebina/max-ds/styles.css` via npm em produção.
- Em dev, replicar o alias condicional no `vite.config.ts` do consumidor apontando para o `dist/` do DS clonado localmente.
- O DS documenta `watch:lib` no seu `package.json` e neste ADR para que novos consumidores descubram o fluxo sem contato com o mantenedor.

## Consequências
- **Prós:** iteração <1s sem `npm link`/`yalc`; testa exports reais do `dist/`; não polui `node_modules` do consumidor; aplicável a qualquer futuro consumidor.
- **Contras:** exige múltiplos terminais; o alias condicional é "magia de build" que novos desenvolvedores precisam conhecer (documentado aqui).
- **Risco mitigado:** o consumidor valida exatamente o que o usuário final recebe (mesmo `dist/` que será publicado).

## Relacionado
- `docs/ADR-001.md` — regra de aprovação visual antes de `npm publish`.
- `docs/ADR-002-pipeline-ds-lp.md` — pipeline DS → LP via npm release.