# 🧪 Exemplos de Uso

Exemplos de como usar o @maxebina/max-ds em seus projetos.

## 📱 Projeto Instagram (me-agencia-instagram)

### Instalação

```bash
npm install @maxebina/max-ds
```

### Criar um Post

```tsx
// src/pages/Post001.tsx
import { InstagramSlide } from '@maxebina/max-ds'
import '@maxebina/max-ds/styles.css'

export function Post001() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      background: '#1a1a1a'
    }}>
      <InstagramSlide
        type="dica"
        title="5 Automações que Toda Empresa Precisa"
        subtitle="Max Ebina — Marketing Digital"
        theme="midnight"
      />
    </div>
  )
}
```

### Criar Carrossel

```tsx
// src/pages/Carrossel001.tsx
import { InstagramSlide } from '@maxebina/max-ds'
import '@maxebina/max-ds/styles.css'

export function Carrossel001() {
  return (
    <div className="carousel-container">
      <InstagramSlide type="capa" title="5 Dicas de Marketing" theme="sunrise" />
      <InstagramSlide type="dica" title="Use gatilhos mentais" number={1} theme="sunrise" />
      <InstagramSlide type="dica" title="Crie urgência" number={2} theme="sunrise" />
      <InstagramSlide type="dica" title="Mostre resultados" number={3} theme="sunrise" />
      <InstagramSlide type="cta" title="Agende seu diagnóstico" theme="sunrise" />
    </div>
  )
}
```

### Workflow de Captura

```bash
# 1. Rodar localmente
npm run dev

# 2. Abrir http://localhost:5173

# 3. DevTools (F12) → Inspecionar elemento

# 4. Clique direito → "Capture node screenshot"

# 5. Imagem salva em 1080x1350px

# 6. Upload no Instagram!
```

---

## 🌐 Projeto Landing Page (me-agencia-lp)

### Instalação

```bash
npm install @maxebina/max-ds
```

### Criar Landing Page Completa

```tsx
// src/pages/Home.tsx
import {
  Navbar,
  HeroSection,
  ServiceCard,
  TestimonialCard,
  FAQ,
  Footer,
  LeadCaptureForm
} from '@maxebina/max-ds'
import '@maxebina/max-ds/styles.css'

export function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar
        logo="MAX"
        links={[
          { label: 'Serviços', href: '#servicos' },
          { label: 'Cases', href: '#cases' },
          { label: 'Depoimentos', href: '#depoimentos' },
          { label: 'FAQ', href: '#faq' },
        ]}
        ctaText="Diagnóstico Gratuito"
      />

      {/* Hero */}
      <HeroSection
        headline="Transforme Sua Empresa com Tecnologia"
        subheadline="Sites, LPs e CRM que geram resultados reais"
        ctaPrimary="Quero Escalar Meu Negócio"
        ctaSecondary="Ver Cases"
      />

      {/* Serviços */}
      <section id="servicos" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Nossos Serviços
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard
              title="Sites Institucionais"
              description="Presença digital profissional"
              icon="Globe"
              badge="Popular"
            />
            <ServiceCard
              title="Landing Pages"
              description="Páginas de alta conversão"
              icon="Layout"
              badge="+40% leads"
            />
            <ServiceCard
              title="Automação WhatsApp"
              description="Fluxos inteligentes 24/7"
              icon="Workflow"
              badge="Novo"
            />
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            O que Nossos Clientes Dizem
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Carlos Mendes"
              company="TechStart"
              role="CEO"
              rating={5}
              testimonial="A Max Ebina transformou nossa presença digital. Triplicamos os leads em 3 meses!"
            />
            <TestimonialCard
              name="Ana Silva"
              company="ModaFit"
              role="Diretora"
              rating={5}
              testimonial="A automação de WhatsApp economiza 4 horas por dia da minha equipe."
            />
            <TestimonialCard
              name="Roberto Lima"
              company="Construmax"
              role="Gerente"
              rating={4}
              testimonial="O CRM que desenvolveram é intuitivo e poderoso. Conversão subiu 60%."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>
          <FAQ
            items={[
              {
                question: 'Quanto tempo leva para criar um site?',
                answer: 'Dependendo da complexidade, um site institucional fica pronto em 2-4 semanas.'
              },
              {
                question: 'Vocês fazem manutenção após a entrega?',
                answer: 'Sim! Oferecemos planos de manutenção mensal com atualizações e suporte.'
              },
              {
                question: 'Como funciona o tráfego pago?',
                answer: 'Criamos campanhas estratégicas no Google Ads e Meta Ads com foco em ROI.'
              },
            ]}
          />
        </div>
      </section>

      {/* Formulário */}
      <section id="contato" className="py-24 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-lg mx-auto">
          <LeadCaptureForm />
        </div>
      </section>

      {/* Footer */}
      <Footer
        logo="MAX"
        links={[
          {
            title: 'Serviços',
            items: [
              { label: 'Sites', href: '#sites' },
              { label: 'Landing Pages', href: '#landing-pages' },
              { label: 'Automação', href: '#automacao' },
            ]
          },
          {
            title: 'Empresa',
            items: [
              { label: 'Sobre', href: '#sobre' },
              { label: 'Cases', href: '#cases' },
              { label: 'Contato', href: '#contato' },
            ]
          },
        ]}
        social={[
          { platform: 'Instagram', href: 'https://instagram.com/maxebina' },
          { platform: 'LinkedIn', href: 'https://linkedin.com/company/maxebina' },
        ]}
      />
    </>
  )
}
```

---

## 🎨 Usando Temas

### Instagram com Temas

```tsx
import { InstagramSlide } from '@maxebina/max-ds'

// Tema Midnight (padrão)
<InstagramSlide type="dica" title="..." theme="midnight" />

// Tema Sunrise
<InstagramSlide type="servico" title="..." theme="sunrise" />

// Tema Neon
<InstagramSlide type="cta" title="..." theme="neon" />

// Tema Minimal
<InstagramSlide type="prova-social" title="..." theme="minimal" />
```

---

## 🔧 Componentes Individuais

### Button

```tsx
import { Button } from '@maxebina/max-ds'

// Variantes
<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="tech">Tech</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Com ícone
<Button icon>Com Ícone</Button>

// Loading
<Button loading>Carregando...</Button>

// Como link
<Button href="/contato">Ir para Contato</Button>
```

### Table

```tsx
import { Table } from '@maxebina/max-ds'

<Table
  columns={[
    { key: 'plan', label: 'Plano' },
    { key: 'price', label: 'Preço', align: 'right' },
    { key: 'features', label: 'Recursos' },
  ]}
  data={[
    { plan: 'Starter', price: 'R$ 97', features: '1 site' },
    { plan: 'Pro', price: 'R$ 297', features: '5 sites' },
    { plan: 'Enterprise', price: 'R$ 997', features: 'Ilimitado' },
  ]}
  hover
  striped
/>
```

### AnimatedCounter

```tsx
import { AnimatedCounter } from '@maxebina/max-ds'
import { TrendingUp } from 'lucide-react'

<AnimatedCounter
  end={150}
  suffix="+"
  label="Projetos Entregues"
  icon={<TrendingUp />}
/>
```

---

## 📝 Próximos Passos

1. ✅ Instalar: `npm install @maxebina/max-ds`
2. ✅ Importar: `import { Component } from '@maxebina/max-ds'`
3. ✅ Importar estilos: `import '@maxebina/max-ds/styles.css'`
4. ✅ Usar componentes no seu projeto
5. ✅ Customizar conforme necessário

Mais exemplos em: [Documentação Completa](https://maxebina.github.io/max-ds)
