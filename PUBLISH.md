# 📦 Guia de Publicação no npm

Este guia explica como publicar o @maxebina/max-ds no npm.

## ✅ Pré-requisitos

- [x] Conta no npm (https://www.npmjs.com)
- [x] Node.js instalado
- [x] npm CLI instalado
- [x] Login no npm (`npm login`)

## 🚀 Passo a Passo

### 1. Testar o Build Localmente

Antes de publicar, teste se o build funciona:

```bash
# Build da biblioteca
npm run build:lib

# Verificar se gerou os arquivos:
ls dist/
# Deve conter:
# - index.js (CommonJS)
# - index.mjs (ES Module)
# - index.d.ts (TypeScript types)
# - styles.css
```

### 2. Verificar package.json

Confirme que o package.json está correto:

```bash
cat package.json | grep name
# Deve mostrar: "@maxebina/max-ds"

cat package.json | grep version
# Deve mostrar: "1.0.0"
```

### 3. Login no npm (se ainda não fez)

```bash
npm login
```

Digite suas credenciais quando solicitado.

### 4. Publicar o Pacote

```bash
# Publicar como público
npm publish --access public
```

### 5. Verificar no npm

Acesse: https://www.npmjs.com/package/@maxebina/max-ds

Seu pacote deve estar disponível!

## 🔄 Próximas Versões

### Patch (correção de bugs)
```bash
npm version patch  # 1.0.0 → 1.0.1
npm publish
```

### Minor (novas features)
```bash
npm version minor  # 1.0.0 → 1.1.0
npm publish
```

### Major (breaking changes)
```bash
npm version major  # 1.0.0 → 2.0.0
npm publish
```

## 📝 Checklist Antes de Publicar

- [ ] Build funciona sem erros (`npm run build:lib`)
- [ ] package.json com nome correto (@maxebina/max-ds)
- [ ] Versão atualizada
- [ ] README.md atualizado
- [ ] Todos os componentes exportados em src/index.ts
- [ ] Testado localmente em um projeto de teste

## 🧪 Testar Antes de Publicar

Crie um projeto de teste:

```bash
# Criar projeto teste
mkdir test-ds
cd test-ds
npm init -y
npm install react react-dom
npm install ../max-ds  # Instala localmente

# Criar arquivo de teste
cat > test.tsx << 'EOF'
import { Button } from '@maxebina/max-ds'

console.log(Button)
EOF

# Compilar
npx tsc test.tsx --jsx react --esModuleInterop
```

Se compilar sem erros, está pronto para publicar!

## ❌ Problemas Comuns

### "You must be logged in to publish"
```bash
npm login
```

### "Cannot publish over previously published version"
```bash
npm version patch
npm publish
```

### "403 Forbidden - you cannot publish over the previously published versions"
Atualize a versão no package.json:
```json
{
  "version": "1.0.1"
}
```

### "Package name too similar to existing package"
Use um nome único com scope:
```json
{
  "name": "@maxebina/max-ds"
}
```

## 📚 Recursos

- [npm Docs](https://docs.npmjs.com)
- [npm Publishing](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [Semantic Versioning](https://semver.org)

## 🆘 Suporte

Se tiver problemas, abra uma issue no GitHub:
https://github.com/maxebina/max-ds/issues
