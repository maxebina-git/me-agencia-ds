import { useState, useEffect } from 'react';
import {
  Palette, Type, Ruler, Sparkles, Box, Layout, Image,
  BookOpen, Moon, Sun, Search, X, Menu, ChevronRight,
  Copy, Check, Eye, TrendingUp, Star, Clock
} from 'lucide-react';
import {
  Button, ServiceCard, SectionHeader, TestimonialCard,
  FAQ, WhatsAppFloat, Navbar, LeadCaptureForm, AnimatedCounter,
  InstagramSlide
} from './components/ui';
import { PhoneMockup } from './components/PhoneMockup';

type Section = 'colors' | 'typography' | 'spacing' | 'motion' | 'buttons' | 'cards' | 'forms' | 'navbar' | 'faq' | 'testimonials' | 'instagram' | 'brand-voice' | 'preview';

interface NavItem {
  id: Section;
  label: string;
  group: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'colors', label: 'Cores', group: '📦 Fundações', icon: <Palette className="w-4 h-4" /> },
  { id: 'typography', label: 'Tipografia', group: '📦 Fundações', icon: <Type className="w-4 h-4" /> },
  { id: 'spacing', label: 'Espaçamento', group: '📦 Fundações', icon: <Ruler className="w-4 h-4" /> },
  { id: 'motion', label: 'Motion', group: '📦 Fundações', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'buttons', label: 'Button', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'cards', label: 'ServiceCard', group: '🧩 Componentes', icon: <Layout className="w-4 h-4" /> },
  { id: 'forms', label: 'Formulário', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'navbar', label: 'Navbar', group: '🧩 Componentes', icon: <Layout className="w-4 h-4" /> },
  { id: 'faq', label: 'FAQ', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'testimonials', label: 'Depoimentos', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'instagram', label: 'Instagram', group: '📱 Templates', icon: <Image className="w-4 h-4" /> },
  { id: 'brand-voice', label: 'Brand Voice', group: '📝 Conteúdo', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'preview', label: 'LP Preview', group: '🚀 Preview', icon: <Eye className="w-4 h-4" /> },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('colors');
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = navItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.group.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(label);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const groups = [...new Set(navItems.map(i => i.group))];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-bg-dark text-[var(--text-on-surface)]' : 'bg-bg-light text-[var(--text-on-surface)]'} transition-colors duration-300`}>
      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 border-b border-[var(--surface-border)] bg-white/80 dark:bg-bg-dark/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 text-[var(--text-on-surface-muted)] hover:text-[var(--text-on-surface)]"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-display font-bold text-xl">
            <span className="gradient-text">MAX</span>
            <span className="text-[var(--text-on-surface-muted)] ml-1">DS</span>
            <span className="text-xs text-tech ml-2 font-normal">v1.0</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] text-[var(--text-on-surface-subtle)] text-sm hover:border-tech/30 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Buscar...</span>
            <kbd className="hidden sm:inline px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-xs">⌘K</kbd>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] text-[var(--text-on-surface-muted)] hover:text-tech hover:border-tech/30 transition-all"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="relative w-full max-w-lg mx-4 rounded-2xl bg-white dark:bg-bg-dark-secondary border border-[var(--surface-border)] shadow-2xl overflow-hidden animate-fade-in">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--surface-border)]">
              <Search className="w-5 h-5 text-tech" />
              <input
                type="text"
                placeholder="Buscar componentes, tokens, seções..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-[var(--text-on-surface)] placeholder-[var(--text-on-surface-subtle)] outline-none text-lg"
                autoFocus
              />
              <button onClick={() => setSearchOpen(false)} className="text-[var(--text-on-surface-subtle)] hover:text-[var(--text-on-surface)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-3">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-[var(--text-on-surface-muted)] hover:bg-tech/5 hover:text-tech transition-colors"
                  onClick={() => { setActiveSection(item.id); setSearchOpen(false); setSearchQuery(''); }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <span className="ml-auto text-xs text-[var(--text-on-surface-subtle)]">{item.group}</span>
                </button>
              ))}
              {filteredItems.length === 0 && (
                <p className="text-center text-[var(--text-on-surface-subtle)] py-8">Nenhum resultado encontrado</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className={`fixed top-16 left-0 bottom-0 w-72 border-r border-[var(--surface-border)] bg-white/95 dark:bg-bg-dark/95 backdrop-blur-xl overflow-y-auto z-40 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="p-4 space-y-6">
          {groups.map(group => (
            <div key={group}>
              <p className="text-xs font-semibold text-[var(--text-on-surface-subtle)] uppercase tracking-wider mb-2 px-3">{group}</p>
              <div className="space-y-1">
                {navItems.filter(i => i.group === group).map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-tech/10 text-tech border border-tech/20'
                        : 'text-[var(--text-on-surface-muted)] hover:text-[var(--text-on-surface)] hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {activeSection === item.id && <ChevronRight className="w-3 h-3 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-72 pt-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="mb-12">
            <p className="text-tech text-sm font-semibold tracking-widest uppercase mb-2">
              {navItems.find(i => i.id === activeSection)?.group}
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-text">
              {navItems.find(i => i.id === activeSection)?.label}
            </h2>
          </div>

          {activeSection === 'colors' && <ColorsSection copiedColor={copiedColor} copyToClipboard={copyToClipboard} />}
          {activeSection === 'typography' && <TypographySection />}
          {activeSection === 'spacing' && <SpacingSection />}
          {activeSection === 'motion' && <MotionSection />}
          {activeSection === 'buttons' && <ButtonsSection />}
          {activeSection === 'cards' && <CardsSection />}
          {activeSection === 'forms' && <FormsSection />}
          {activeSection === 'navbar' && <NavbarSection />}
          {activeSection === 'faq' && <FAQSection />}
          {activeSection === 'testimonials' && <TestimonialsSection />}
          {activeSection === 'instagram' && <InstagramSection />}
          {activeSection === 'brand-voice' && <BrandVoiceSection />}
          {activeSection === 'preview' && <PreviewSection />}
        </div>
      </main>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function ColorsSection({ copiedColor, copyToClipboard }: { copiedColor: string | null; copyToClipboard: (text: string, label: string) => void }) {
  const colorGroups = [
    {
      title: 'Primárias',
      colors: [
        { name: 'Primary', hex: '#8f6424', use: 'CTAs, autoridade' },
        { name: 'Primary Light', hex: '#b8833a', use: 'Hover states' },
        { name: 'Primary Dark', hex: '#6b4a1a', use: 'Active states' },
      ]
    },
    {
      title: 'Tech (Futurista)',
      colors: [
        { name: 'Tech', hex: '#06B6D4', use: 'Acentos, glow, links' },
        { name: 'Tech Light', hex: '#0EA5E9', use: 'Gradientes tech' },
        { name: 'Tech Dark', hex: '#0891B2', use: 'Hover tech' },
      ]
    },
    {
      title: 'Backgrounds',
      colors: [
        { name: 'Background Light', hex: '#F6EEE7', use: 'Fundo modo claro' },
        { name: 'Background Dark', hex: '#17120e', use: 'Fundo modo escuro' },
        { name: 'Muted', hex: '#F0E4D9', use: 'Cards, seções' },
      ]
    },
    {
      title: 'Semânticas',
      colors: [
        { name: 'Success', hex: '#10B981', use: 'Sucesso, confirmação' },
        { name: 'Warning', hex: '#F59E0B', use: 'Alertas, estrelas' },
        { name: 'Error', hex: '#EF4444', use: 'Erros, validação' },
        { name: 'Info', hex: '#3B82F6', use: 'Informação, dicas' },
      ]
    },
  ];

  return (
    <div className="space-y-12">
      {colorGroups.map(group => (
        <div key={group.title}>
          <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">{group.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {group.colors.map(color => (
              <button
                key={color.name}
                onClick={() => copyToClipboard(color.hex, color.name)}
                className="group relative rounded-xl overflow-hidden border border-[var(--surface-border)] hover:border-tech/30 transition-all hover:scale-[1.02] text-left"
              >
                <div className="h-24 w-full" style={{ backgroundColor: color.hex }} />
                <div className="p-4 bg-[var(--surface-card-secondary)]">
                  <p className="font-semibold text-sm text-[var(--text-on-surface)]">{color.name}</p>
                  <p className="text-xs text-[var(--text-on-surface-muted)] font-mono mt-1">{color.hex}</p>
                  <p className="text-xs text-[var(--text-on-surface-subtle)] mt-1">{color.use}</p>
                </div>
                {copiedColor === color.name && (
                  <div className="absolute inset-0 flex items-center justify-center bg-tech/90">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TypographySection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Famílias Tipográficas</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card-secondary)]">
            <p className="text-tech text-sm font-semibold mb-4">Display — Space Grotesk</p>
            <p className="text-4xl font-display font-bold text-[var(--text-on-surface)] mb-2">Aa Bb Cc</p>
            <p className="text-[var(--text-on-surface-muted)] text-sm">Futurista, geométrica, perfeita para títulos.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card-secondary)]">
            <p className="text-tech text-sm font-semibold mb-4">Body — Inter</p>
            <p className="text-4xl font-bold text-[var(--text-on-surface)] mb-2">Aa Bb Cc</p>
            <p className="text-[var(--text-on-surface-muted)] text-sm">Legível, versátil, ideal para corpo de texto.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpacingSection() {
  const spaces = [
    { name: 'space-1', value: '4px' },
    { name: 'space-2', value: '8px' },
    { name: 'space-4', value: '16px' },
    { name: 'space-8', value: '32px' },
    { name: 'space-16', value: '64px' },
  ];

  return (
    <div className="space-y-8">
      <p className="text-[var(--text-on-surface-muted)]">Escala baseada em múltiplos de 8px.</p>
      <div className="space-y-3">
        {spaces.map(space => (
          <div key={space.name} className="flex items-center gap-4">
            <div className="w-28 text-right">
              <span className="text-sm font-mono text-tech">{space.name}</span>
            </div>
            <div className="flex-1 flex items-center gap-3">
              <div
                className="h-8 rounded-md bg-gradient-to-r from-tech to-tech-light opacity-80"
                style={{ width: space.value }}
              />
              <span className="text-sm text-[var(--text-on-surface-subtle)] font-mono">{space.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MotionSection() {
  const [activeEasing, setActiveEasing] = useState<string | null>(null);

  const easings = [
    { name: 'Elastic', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    { name: 'Smooth', value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    { name: 'Spring', value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Easings</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {easings.map(easing => (
            <div key={easing.name} className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)] text-center">
              <button
                onClick={() => { setActiveEasing(easing.name); setTimeout(() => setActiveEasing(null), 1000); }}
                className={`w-16 h-16 rounded-xl bg-gradient-to-br from-tech to-tech-light mb-4 transition-transform ${
                  activeEasing === easing.name ? 'scale-150 rotate-12' : 'scale-100'
                }`}
                style={{ transitionTimingFunction: easing.value, transitionDuration: '600ms' }}
              />
              <p className="font-display font-bold text-[var(--text-on-surface)] mb-1">{easing.name}</p>
              <p className="text-xs text-[var(--text-on-surface-muted)] font-mono">{easing.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ButtonsSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Variantes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Button variant="primary">Primary</Button>
            <p className="text-xs text-[var(--text-on-surface-subtle)] mt-2">CTA principal</p>
          </div>
          <div className="text-center">
            <Button variant="secondary">Secondary</Button>
            <p className="text-xs text-[var(--text-on-surface-subtle)] mt-2">CTA secundário</p>
          </div>
          <div className="text-center">
            <Button variant="ghost">Ghost</Button>
            <p className="text-xs text-[var(--text-on-surface-subtle)] mt-2">Ação terciária</p>
          </div>
          <div className="text-center">
            <Button variant="tech">Tech</Button>
            <p className="text-xs text-[var(--text-on-surface-subtle)] mt-2">Destaque tech</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardsSection() {
  const services = [
    { title: 'Sites Institucionais', description: 'Presença digital profissional que converte visitantes em clientes.', icon: 'Globe', badge: 'Popular' },
    { title: 'Landing Pages', description: 'Páginas de alta conversão para campanhas de tráfego pago.', icon: 'Layout', badge: '+40% leads' },
    { title: 'SaaS', description: 'Plataformas web sob medida para escalar seu modelo de negócio.', icon: 'Code2' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FormsSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="max-w-lg">
          <LeadCaptureForm />
        </div>
      </div>
    </div>
  );
}

function NavbarSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="rounded-xl border border-[var(--surface-border)] overflow-hidden bg-bg-dark relative min-h-[200px]">
          <Navbar
            logo="MAX"
            links={[
              { label: 'Serviços', href: '#servicos' },
              { label: 'Cases', href: '#cases' },
              { label: 'Sobre', href: '#sobre' },
            ]}
            ctaText="Diagnóstico Gratuito"
          />
          <div className="pt-24 pb-12 px-8 text-center">
            <p className="text-white/40 text-sm">Role a página para ver o efeito de scroll</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const items = [
    { question: 'Quanto tempo leva para criar um site?', answer: 'Dependendo da complexidade, um site institucional fica pronto em 2-4 semanas.' },
    { question: 'Vocês fazem manutenção após a entrega?', answer: 'Sim! Oferecemos planos de manutenção mensal com atualizações e suporte.' },
    { question: 'Como funciona o tráfego pago?', answer: 'Criamos campanhas estratégicas no Google Ads e Meta Ads com foco em ROI.' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="max-w-2xl">
          <FAQ items={items} />
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: 'Carlos Mendes', company: 'TechStart', role: 'CEO', rating: 5, testimonial: 'A Max Ebina transformou completamente nossa presença digital.' },
    { name: 'Ana Silva', company: 'ModaFit', role: 'Diretora', rating: 5, testimonial: 'A automação de WhatsApp economiza 4 horas por dia da minha equipe.' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map(t => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function InstagramSection() {
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const slides = [
    { type: 'capa' as const, title: '5 Automações que Toda Empresa Precisa', subtitle: 'Max Ebina — Marketing Digital', caption: '5 automações que toda empresa precisa em 2026 🚀', label: 'Capa' },
    { type: 'dica' as const, title: 'Use gatilhos mentais nos seus CTAs', body: 'Urgência e escassez aumentam conversões.', number: 3, caption: 'Dica #3 — Gatilhos mentais 💡', label: 'Dica' },
    { type: 'servico' as const, title: 'Landing Pages de Alta Conversão', caption: 'Landing Pages que convertem! 📈', label: 'Serviço' },
    { type: 'prova-social' as const, title: '', metric: '+150', metricLabel: 'Projetos entregues', caption: '+150 projetos entregues! 🙏', label: 'Prova Social' },
    { type: 'cta' as const, title: 'Agende seu diagnóstico gratuito', subtitle: 'Vagas limitadas', caption: 'Diagnóstico GRATUITO! 🔗', label: 'CTA' },
  ];

  return (
    <div className="space-y-12">
      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">📸 Como usar os templates</p>
        <ol className="text-sm text-[var(--text-on-surface-muted)] space-y-1 list-decimal list-inside">
          <li>Use "Mostrar no celular" para ver como o slide fica no Instagram</li>
          <li>Ative "Mostrar área de segurança" para posicionar conteúdo</li>
          <li>Texto crítico deve ficar DENTRO da linha tracejada ciano</li>
          <li>Desative safe zone e mockup antes do screenshot final</li>
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input
              type="checkbox"
              checked={showSafeZone}
              onChange={(e) => setShowSafeZone(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech relative"></div>
            <span className="text-sm font-medium text-[var(--text-on-surface)] flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Mostrar área de segurança
            </span>
          </label>
        </div>

        <div className="flex-1 flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input
              type="checkbox"
              checked={showPhone}
              onChange={(e) => setShowPhone(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech relative"></div>
            <span className="text-sm font-medium text-[var(--text-on-surface)] flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="3" />
              </svg>
              Mostrar no celular
            </span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">5 Tipos de Slide</h3>
        <div className="space-y-12">
          {slides.map((slide, index) => (
            <div key={index}>
              <div className="flex flex-wrap gap-8 justify-center">
                <div className="flex flex-col items-center w-[340px]">
                  <InstagramSlide
                    type={slide.type}
                    title={slide.title}
                    subtitle={slide.subtitle}
                    body={slide.body}
                    number={slide.number}
                    metric={slide.metric}
                    metricLabel={slide.metricLabel}
                    showSafeZone={showSafeZone}
                  />
                  <p className="text-center text-sm text-[var(--text-on-surface-subtle)] mt-3 font-medium">{slide.label}</p>
                </div>

                {showPhone && (
                  <div className="flex flex-col items-center animate-fade-in">
                    <PhoneMockup caption={slide.caption}>
                      <InstagramSlide
                        type={slide.type}
                        title={slide.title}
                        subtitle={slide.subtitle}
                        body={slide.body}
                        number={slide.number}
                        metric={slide.metric}
                        metricLabel={slide.metricLabel}
                        showSafeZone={false}
                        isMockup={true}
                      />
                    </PhoneMockup>
                    <p className="text-center text-sm text-[var(--text-on-surface-subtle)] mt-3 font-medium">Preview Instagram</p>
                  </div>
                )}
              </div>

              {index < slides.length - 1 && (
                <div className="border-t border-[var(--surface-border)] mt-12" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandVoiceSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Tom de Voz</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { adj: 'Confiante', desc: 'Fala com segurança sobre resultados.' },
            { adj: 'Visionário', desc: 'Mostra o futuro possível com tecnologia.' },
            { adj: 'Acessível', desc: 'Traduz complexidade em linguagem simples.' },
          ].map(t => (
            <div key={t.adj} className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
              <p className="text-2xl font-display font-bold gradient-text-tech mb-2">{t.adj}</p>
              <p className="text-sm text-[var(--text-on-surface-muted)]">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewSection() {
  return (
    <div className="space-y-12">
      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">🚀 Landing Page Preview</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">Preview da LP completa da Max Ebina.</p>
      </div>

      <div className="rounded-2xl border border-[var(--surface-border)] overflow-hidden bg-bg-dark">
        <Navbar
          logo="MAX"
          links={[
            { label: 'Serviços', href: '#servicos' },
            { label: 'Cases', href: '#cases' },
          ]}
          ctaText="Diagnóstico Gratuito"
        />

        <section className="py-24 px-6 bg-bg-dark">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              eyebrow="Nossos Serviços"
              title="Soluções que Geram Resultado"
              subtitle="Cada serviço é pensado para acelerar o crescimento do seu negócio."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard title="Sites Institucionais" description="Presença digital profissional que converte." icon="Globe" badge="Popular" />
              <ServiceCard title="Landing Pages" description="Páginas de alta conversão para campanhas." icon="Layout" badge="+40% leads" />
              <ServiceCard title="SaaS" description="Plataformas web sob medida." icon="Code2" />
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-bg-dark-secondary">
          <div className="max-w-4xl mx-auto">
            <SectionHeader eyebrow="Prova Social" title="Números que Falam" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <AnimatedCounter end={150} suffix="+" label="Projetos Entregues" icon={<Layout className="w-6 h-6" />} />
              <AnimatedCounter end={40} suffix="%" label="Aumento em Leads" icon={<TrendingUp className="w-6 h-6" />} />
              <AnimatedCounter end={98} suffix="%" label="Satisfação" icon={<Star className="w-6 h-6" />} />
              <AnimatedCounter end={10} suffix="+" label="Anos de Mercado" icon={<Clock className="w-6 h-6" />} />
            </div>
          </div>
        </section>

        <footer className="py-12 px-6 border-t border-white/5 bg-bg-dark">
          <div className="max-w-6xl mx-auto text-center">
            <p className="font-display font-bold text-xl gradient-text">MAX</p>
            <p className="text-sm text-white/40 mt-1">© 2026 Max Ebina. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>

      <WhatsAppFloat />
    </div>
  );
}
