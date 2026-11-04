# @maxebina/max-ds

Design System da Agência Max Ebina - Templates Instagram, Landing Pages e componentes reutilizáveis.

## 📦 Instalação

```bash
npm install @maxebina/max-ds
```

## 🚀 Uso

### Importar componentes

```tsx
import { Button, Navbar, HeroSection } from '@maxebina/max-ds'
import '@maxebina/max-ds/styles.css'

function App() {
  return (
    <>
      <Navbar logo="MAX" links={[...]} />
      <HeroSection headline="Transforme Sua Empresa" />
      <Button variant="tech">Começar</Button>
    </>
  )
}
```

### Templates Instagram

```tsx
import { InstagramSlide } from '@maxebina/max-ds'

function Post() {
  return (
    <InstagramSlide
      type="dica"
      title="5 Automações Essenciais"
      theme="midnight"
    />
  )
}
```

## 📚 Componentes Disponíveis

### UI Components
- `Button` - Botões com variantes (primary, secondary, ghost, tech)
- `ServiceCard` - Cards de serviço com ícones e badges
- `LeadCaptureForm` - Formulário de captura com validação
- `FAQ` - Accordion de perguntas frequentes
- `TestimonialCard` - Cards de depoimentos
- `WhatsAppFloat` - Botão flutuante do WhatsApp
- `Navbar` - Navegação responsiva
- `Footer` - Rodapé completo
- `Table` - Tabelas com estilos
- `SectionHeader` - Cabeçalhos de seção
- `AnimatedCounter` - Contadores animados

### Section Components
- `HeroSection` - Seção hero com partículas
- `InstagramSlide` - Templates de slides Instagram

### Template Components
- `PhoneMockup` - Mockup de celular para Instagram

### Background Components
- `ParticlesBackground` - Background com partículas

## 🎨 Temas Instagram

O componente `InstagramSlide` suporta 4 temas:

- `midnight` - Escuro com ciano (padrão)
- `sunrise` - Claro com laranja
- `neon` - Preto com neon
- `minimal` - Off-white minimalista

## 📖 Documentação Completa

Acesse a documentação visual completa em: [max-ds docs](https://maxebina.github.io/max-ds)

## 🔧 Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar Storybook (documentação visual)
npm run dev

# Build da biblioteca
npm run build:lib

# Publicar no npm
npm publish --access public
```

## 🔗 Desenvolvimento com a Landing Page (LP)

O LP consome o DS de duas formas:

- **Produção:** `npm install @maxebina/max-ds` (pacote publicado no npm)
- **Desenvolvimento local:** se o DS estiver clonado ao lado (`../me-agencia-ds`), o Vite da LP resolve o `dist/` automaticamente. Cada salvamento no DS recarrega a LP sem alterar o `package-lock.json`.

```bash
# No repositório me-agencia-ds
npm run watch:lib
```

Em seguida, na LP, `npm run dev` reflete as alterações instantaneamente.


## 📝 Licença

MIT © Max Ebina
