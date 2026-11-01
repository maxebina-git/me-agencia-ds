# Guia de Deploy — Max DS

Este guia explica como fazer deploy do Design System Max DS em diferentes plataformas.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conta em uma das plataformas de deploy (Vercel, Netlify, etc)

## 🏗️ Build para Produção

```bash
# Instale as dependências
npm install

# Execute o build
npm run build

# O output estará em dist/
```

## 🚀 Vercel (Recomendado)

### Deploy via CLI

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Login na Vercel
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Deploy via Git

1. Conecte seu repositório GitHub/GitLab/Bitbucket na Vercel
2. A Vercel detecta automaticamente o framework (Vite)
3. Configure as variáveis de ambiente (se necessário)
4. Clique em "Deploy"

### Configurações Recomendadas

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

## 🌐 Netlify

### Deploy via CLI

```bash
# Instale a CLI do Netlify
npm i -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy via Git

1. Conecte seu repositório no Netlify
2. Configure o build command: `npm run build`
3. Configure o publish directory: `dist`
4. Clique em "Deploy site"

### netlify.toml

Crie `netlify.toml` na raiz:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🐙 GitHub Pages

### Configuração

1. Atualize `vite.config.js`:

```js
export default defineConfig({
  base: '/repository-name/', // Nome do seu repositório
  // ...
})
```

2. Adicione script de deploy em `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. Instale gh-pages:

```bash
npm install --save-dev gh-pages
```

4. Deploy:

```bash
npm run deploy
```

### GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📦 Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build e Run

```bash
# Build da imagem
docker build -t max-ds .

# Run
docker run -p 80:80 max-ds
```

## 🔧 Variáveis de Ambiente

### .env.production

```env
VITE_API_URL=https://api.example.com
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

### Usando no código

```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🌍 Domínio Customizado

### Vercel

1. Vá em Settings → Domains
2. Adicione seu domínio
3. Configure os DNS conforme instruções

### Netlify

1. Vá em Domain settings
2. Adicione domínio customizado
3. Configure DNS ou use Netlify DNS

### GitHub Pages

1. Crie arquivo `CNAME` na raiz com seu domínio
2. Configure DNS do domínio para apontar para GitHub Pages

## 📊 Monitoramento

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```tsx
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Analytics />
      {/* ... */}
    </>
  );
}
```

### Netlify Analytics

Ative em Site settings → Analytics

## 🔄 CI/CD

### GitHub Actions

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main'
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 🚨 Troubleshooting

### Build falha

```bash
# Limpe o cache
rm -rf node_modules dist
npm install
npm run build
```

### 404 em rotas

Adicione configuração de redirect:

**Vercel (vercel.json):**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Netlify (_redirects):**
```
/*    /index.html   200
```

### Assets não carregam

Verifique se `base` está configurado corretamente em `vite.config.js`:

```js
export default defineConfig({
  base: './', // Para deploy em subdiretório
  // ou
  base: '/', // Para deploy na raiz
})
```

## 📞 Suporte

Para problemas de deploy, entre em contato com a equipe de desenvolvimento da Max Ebina.
