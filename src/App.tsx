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
import { CodeBlock, PropsTable } from './components/DocsComponents';

type Section = 'logo' | 'colors' | 'typography' | 'spacing' | 'motion' | 'buttons' | 'cards' | 'forms' | 'navbar' | 'faq' | 'testimonials' | 'instagram' | 'brand-voice' | 'preview';

interface NavItem {
  id: Section;
  label: string;
  group: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'logo', label: 'Logo', group: '📦 Fundações', icon: <Box className="w-4 h-4" /> },
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

          {activeSection === 'logo' && <LogoSection />}
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

function LogoSection() {
  const [copiedSvg, setCopiedSvg] = useState(false);

  const logoSvg = `<svg width="182" height="87" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"/>
<path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"/>
</svg>`;

  const handleCopySvg = () => {
    navigator.clipboard.writeText(logoSvg);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Logo Principal */}
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Logo Principal</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Fundo Claro */}
          <div className="rounded-xl border border-[var(--surface-border)] p-12 bg-[var(--surface-card)] flex items-center justify-center">
            <svg width="182" height="87" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"/>
              <path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"/>
            </svg>
          </div>

          {/* Fundo Escuro */}
          <div className="rounded-xl border border-[var(--surface-border)] p-12 bg-bg-dark flex items-center justify-center">
            <svg width="182" height="87" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"/>
              <path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"/>
            </svg>
          </div>
        </div>
        <p className="text-sm text-[var(--text-on-surface-muted)] mt-4">
          O logo usa a cor primária do DS (#8f6424) em ambos os fundos para manter consistência da marca.
        </p>
      </div>

      {/* Variações de Tamanho */}
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Tamanhos</h3>
        <div className="space-y-6">
          {/* Grande */}
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card)]">
            <p className="text-xs text-[var(--text-on-surface-subtle)] mb-4">Grande (182x87)</p>
            <svg width="182" height="87" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"/>
              <path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"/>
            </svg>
          </div>

          {/* Médio */}
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card)]">
            <p className="text-xs text-[var(--text-on-surface-subtle)] mb-4">Médio (136x65)</p>
            <svg width="136" height="65" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"/>
              <path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"/>
            </svg>
          </div>

          {/* Pequeno */}
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card)]">
            <p className="text-xs text-[var(--text-on-surface-subtle)] mb-4">Pequeno (91x43)</p>
            <svg width="91" height="43" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"/>
              <path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Versão com Texto */}
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Logo + Texto</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Fundo Claro */}
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card)] flex items-center gap-4">
            <svg width="60" height="29" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"/>
              <path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"/>
            </svg>
            <div>
              <p className="font-display font-bold text-2xl text-[var(--text-on-surface)]">Max Ebina</p>
              <p className="text-xs text-[var(--text-on-surface-muted)]">Marketing Digital</p>
            </div>
          </div>

          {/* Fundo Escuro */}
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-bg-dark flex items-center gap-4">
            <svg width="60" height="29" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"/>
              <path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"/>
            </svg>
            <div>
              <p className="font-display font-bold text-2xl text-bg-light">Max Ebina</p>
              <p className="text-xs text-bg-light/60">Marketing Digital</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Guidelines de Uso</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-success/20 bg-success/5 p-6">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[var(--text-on-surface)] mb-2">✅ Use assim</p>
                <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-1">
                  <li>• Mantenha a proporção original (2.09:1)</li>
                  <li>• Use em fundos claros ou escuros</li>
                  <li>• Respeite a área de proteção</li>
                  <li>• Tamanho mínimo: 91px de largura</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-error/20 bg-error/5 p-6">
            <div className="flex items-start gap-3">
              <X className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[var(--text-on-surface)] mb-2">❌ Evite isso</p>
                <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-1">
                  <li>• Alterar as cores do logo</li>
                  <li>• Distorcer a proporção</li>
                  <li>• Adicionar efeitos (sombra, brilho)</li>
                  <li>• Usar em fundos com pouco contraste</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Área de Proteção */}
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Área de Proteção</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-12 bg-[var(--surface-card)] flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 border-2 border-dashed border-tech/30 -m-8 rounded-lg" />
            <svg width="182" height="87" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"/>
              <path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"/>
            </svg>
            <p className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-tech font-mono">32px</p>
            <p className="absolute top-1/2 -right-10 -translate-y-1/2 text-xs text-tech font-mono">32px</p>
          </div>
        </div>
        <p className="text-sm text-[var(--text-on-surface-muted)] mt-4">
          Mantenha uma margem mínima de 32px ao redor do logo para garantir legibilidade.
        </p>
      </div>

      {/* Download */}
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Download</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
          <p className="text-sm text-[var(--text-on-surface-muted)] mb-4">
            Copie o código SVG do logo para usar em seus projetos:
          </p>
          <button
            onClick={handleCopySvg}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-tech/10 border border-tech/20 text-tech hover:bg-tech/20 transition-all"
          >
            {copiedSvg ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedSvg ? 'Copiado!' : 'Copiar SVG'}
          </button>
        </div>
      </div>
    </div>
  );
}

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

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Gradientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Primary', css: 'linear-gradient(135deg, #8f6424 0%, #06B6D4 100%)' },
            { name: 'Tech', css: 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)' },
            { name: 'Dark', css: 'linear-gradient(180deg, #17120e 0%, #1f1a16 100%)' },
          ].map(g => (
            <div key={g.name} className="rounded-xl overflow-hidden border border-[var(--surface-border)]">
              <div className="h-24 w-full" style={{ background: g.css }} />
              <div className="p-4 bg-[var(--surface-card-secondary)]">
                <p className="font-semibold text-sm text-[var(--text-on-surface)]">{g.name}</p>
                <p className="text-xs text-[var(--text-on-surface-muted)] font-mono mt-1 truncate">{g.css}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Sombras e Efeitos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <div className="w-full h-20 rounded-xl bg-tech mb-4" style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }} />
            <p className="font-semibold text-sm text-[var(--text-on-surface)]">Glow Tech</p>
            <p className="text-xs text-[var(--text-on-surface-muted)] font-mono mt-1">0 0 40px rgba(6,182,212,0.3)</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <div className="w-full h-20 rounded-xl bg-tech mb-4" style={{ boxShadow: '0 0 60px rgba(6, 182, 212, 0.5)' }} />
            <p className="font-semibold text-sm text-[var(--text-on-surface)]">Glow Tech Strong</p>
            <p className="text-xs text-[var(--text-on-surface-muted)] font-mono mt-1">0 0 60px rgba(6,182,212,0.5)</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <div className="w-full h-20 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 mb-4" />
            <p className="font-semibold text-sm text-[var(--text-on-surface)]">Glassmorphism</p>
            <p className="text-xs text-[var(--text-on-surface-muted)] font-mono mt-1">backdrop-blur(12px)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypographySection() {
  const scale = [
    { name: 'text-xs', value: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', size: '0.75rem' },
    { name: 'text-sm', value: 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)', size: '0.875rem' },
    { name: 'text-base', value: 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', size: '1rem' },
    { name: 'text-lg', value: 'clamp(1.125rem, 1rem + 0.6vw, 1.25rem)', size: '1.125rem' },
    { name: 'text-xl', value: 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', size: '1.25rem' },
    { name: 'text-2xl', value: 'clamp(1.5rem, 1.3rem + 1vw, 2rem)', size: '1.5rem' },
    { name: 'text-3xl', value: 'clamp(1.875rem, 1.5rem + 1.8vw, 2.5rem)', size: '1.875rem' },
    { name: 'text-4xl', value: 'clamp(2.25rem, 1.8rem + 2.2vw, 3.5rem)', size: '2.25rem' },
    { name: 'text-5xl', value: 'clamp(3rem, 2.2rem + 4vw, 5rem)', size: '3rem' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Famílias Tipográficas</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card-secondary)]">
            <p className="text-tech text-sm font-semibold mb-4">Display — Space Grotesk</p>
            <p className="text-4xl font-display font-bold text-[var(--text-on-surface)] mb-2">Aa Bb Cc</p>
            <p className="text-[var(--text-on-surface-muted)] text-sm mb-4">Futurista, geométrica, perfeita para títulos e headlines que transmitem inovação.</p>
            <p className="text-[var(--text-on-surface-subtle)] text-xs font-mono">font-family: 'Space Grotesk', sans-serif;</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card-secondary)]">
            <p className="text-tech text-sm font-semibold mb-4">Body — Inter</p>
            <p className="text-4xl font-bold text-[var(--text-on-surface)] mb-2">Aa Bb Cc</p>
            <p className="text-[var(--text-on-surface-muted)] text-sm mb-4">Legível, versátil, ideal para corpo de texto e UI que precisa de clareza.</p>
            <p className="text-[var(--text-on-surface-subtle)] text-xs font-mono">font-family: 'Inter', sans-serif;</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Escala Tipográfica (Fluid com clamp)</h3>
        <p className="text-[var(--text-on-surface-muted)] mb-6">
          A escala usa <code className="text-tech">clamp()</code> para ser responsiva automaticamente, adaptando-se ao tamanho da tela.
        </p>
        <div className="space-y-4">
          {scale.map(item => (
            <div key={item.name} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card-secondary)]">
              <div className="md:w-24 flex-shrink-0">
                <span className="text-xs font-mono text-tech">{item.name}</span>
              </div>
              <div className="flex-1">
                <p style={{ fontSize: item.size }} className="font-display font-bold text-[var(--text-on-surface)]">
                  Transforme Sua Empresa
                </p>
              </div>
              <div className="md:w-64 flex-shrink-0">
                <code className="text-xs text-[var(--text-on-surface-subtle)] font-mono">{item.value}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Uso Recomendado</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-success/20 bg-success/5 p-6">
            <p className="font-semibold text-[var(--text-on-surface)] mb-3">✅ Use Space Grotesk para:</p>
            <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
              <li>• Headlines e títulos principais</li>
              <li>• Nomes de seções</li>
              <li>• CTAs de botões</li>
              <li>• Números de métricas</li>
            </ul>
          </div>
          <div className="rounded-xl border border-success/20 bg-success/5 p-6">
            <p className="font-semibold text-[var(--text-on-surface)] mb-3">✅ Use Inter para:</p>
            <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
              <li>• Corpo de texto</li>
              <li>• Labels de formulários</li>
              <li>• Descrições e parágrafos</li>
              <li>• UI elements (botões, links)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpacingSection() {
  const spaces = [
    { name: 'space-1', value: '4px', use: 'Detalhes mínimos, ícones pequenos' },
    { name: 'space-2', value: '8px', use: 'Espaçamento entre ícones e texto' },
    { name: 'space-3', value: '12px', use: 'Padding interno de badges' },
    { name: 'space-4', value: '16px', use: 'Padding de botões, gaps pequenos' },
    { name: 'space-6', value: '24px', use: 'Padding de cards, margens entre elementos' },
    { name: 'space-8', value: '32px', use: 'Margens entre seções, padding de containers' },
    { name: 'space-12', value: '48px', use: 'Espaçamento entre seções grandes' },
    { name: 'space-16', value: '64px', use: 'Padding de seções hero' },
    { name: 'space-24', value: '96px', use: 'Margens de seções principais' },
    { name: 'space-32', value: '128px', use: 'Espaçamento de hero sections' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Escala de Espaçamento</h3>
        <p className="text-[var(--text-on-surface-muted)] mb-6">
          Baseada em múltiplos de 8px para consistência visual e harmonia em todos os componentes.
        </p>
        <div className="space-y-3">
          {spaces.map(space => (
            <div key={space.name} className="flex items-center gap-4 p-3 rounded-lg bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
              <div className="w-28 flex-shrink-0">
                <span className="text-sm font-mono text-tech">{space.name}</span>
              </div>
              <div className="flex-1 flex items-center gap-3">
                <div
                  className="h-8 rounded-md bg-gradient-to-r from-tech to-tech-light opacity-80"
                  style={{ width: space.value }}
                />
                <span className="text-sm text-[var(--text-on-surface-muted)] font-mono">{space.value}</span>
              </div>
              <div className="hidden md:block w-64 text-sm text-[var(--text-on-surface-subtle)]">
                {space.use}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Princípios</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">Consistência</p>
            <p className="text-sm text-[var(--text-on-surface-muted)]">
              Use apenas valores da escala. Evite valores arbitrários como 13px ou 27px.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">Hierarquia</p>
            <p className="text-sm text-[var(--text-on-surface-muted)]">
              Espaços maiores para separar seções, menores para elementos relacionados.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">Respiração</p>
            <p className="text-sm text-[var(--text-on-surface-muted)]">
              Não tenha medo de espaço em branco. Ele melhora a legibilidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MotionSection() {
  const [activeEasing, setActiveEasing] = useState<string | null>(null);

  const easings = [
    { name: 'Elastic', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', desc: 'Efeito bounce/elástico — ideal para botões e CTAs' },
    { name: 'Smooth', value: 'cubic-bezier(0.16, 1, 0.3, 1)', desc: 'Entrada suave — ideal para reveals e transições de página' },
    { name: 'Spring', value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', desc: 'Spring leve — ideal para hovers e micro-interações' },
  ];

  const durations = [
    { name: 'fast', value: '150ms', use: 'Micro-interações, toggles' },
    { name: 'normal', value: '300ms', use: 'Transições padrão' },
    { name: 'slow', value: '600ms', use: 'Reveals, animações de entrada' },
    { name: 'slower', value: '900ms', use: 'Transições dramáticas' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Easings (Curvas de Animação)</h3>
        <p className="text-[var(--text-on-surface-muted)] mb-8">Clique nos botões para ver cada easing em ação:</p>
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
              <p className="text-xs text-[var(--text-on-surface-muted)] font-mono mb-2">{easing.value}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{easing.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Durations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {durations.map(d => (
            <div key={d.name} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)] text-center">
              <p className="text-2xl font-display font-bold gradient-text-tech">{d.value}</p>
              <p className="text-sm text-tech font-mono mt-1">{d.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)] mt-2">{d.use}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Animações Predefinidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'glow', class: 'animate-glow', desc: 'Brilho pulsante' },
            { name: 'float', class: 'animate-float', desc: 'Flutuação suave' },
            { name: 'pulse-ring', class: 'animate-pulse-ring', desc: 'Anel expansivo' },
            { name: 'fade-in', class: 'animate-fade-in', desc: 'Aparecimento suave' },
          ].map(anim => (
            <div key={anim.name} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)] text-center">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-tech to-primary mx-auto mb-3 ${anim.class}`} />
              <p className="text-sm font-mono text-tech">{anim.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)] mt-1">{anim.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Princípios de Motion</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">⚡ Performance</p>
            <p className="text-sm text-[var(--text-on-surface-muted)]">
              Use apenas <code className="text-tech">transform</code> e <code className="text-tech">opacity</code> para animações. Evite animar width, height ou position.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">🎯 Propósito</p>
            <p className="text-sm text-[var(--text-on-surface-muted)]">
              Toda animação deve ter um propósito: guiar atenção, confirmar ação ou criar delight. Nunca anime por animar.
            </p>
          </div>
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

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Tamanhos</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="tech" size="sm">Small</Button>
          <Button variant="tech" size="md">Medium</Button>
          <Button variant="tech" size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'tech'", default: "'primary'", description: 'Estilo visual do botão' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamanho do botão' },
          { name: 'icon', type: 'boolean', default: 'false', description: 'Mostra ícone de seta animado' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Estado de carregamento com spinner' },
          { name: 'href', type: 'string', default: 'undefined', description: 'Se definido, renderiza como <a>' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Desabilita o botão' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplos de Uso</h3>
        <CodeBlock code={`<Button variant="tech" size="lg" icon>
  Quero Escalar Meu Negócio
</Button>

<Button variant="ghost" href="/cases">
  Ver Cases
</Button>

<Button variant="primary" loading>
  Enviando...
</Button>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Micro-copy para CTAs</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech text-sm font-semibold mb-3">Primário (Tech)</p>
            <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
              <li>• "Quero Escalar Meu Negócio"</li>
              <li>• "Agendar Diagnóstico Gratuito"</li>
              <li>• "Começar Agora"</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech text-sm font-semibold mb-3">Secundário (Ghost)</p>
            <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
              <li>• "Ver Cases"</li>
              <li>• "Conhecer Soluções"</li>
              <li>• "Saiba Mais"</li>
            </ul>
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
    { title: 'CRM', description: 'Gestão inteligente de clientes e automação de vendas.', icon: 'Bot' },
    { title: 'Tráfego Pago', description: 'Investimento estratégico em mídia com ROI mensurável.', icon: 'Megaphone' },
    { title: 'Automação WhatsApp', description: 'Fluxos inteligentes que vendem 24h por dia.', icon: 'Workflow', badge: 'Novo' },
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

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'title', type: 'string', default: '—', description: 'Título do serviço' },
          { name: 'description', type: 'string', default: '—', description: 'Descrição do serviço' },
          { name: 'icon', type: 'string', default: '—', description: 'Nome do ícone Lucide (Globe, Layout, Code2, Bot, Megaphone, Workflow)' },
          { name: 'badge', type: 'string', default: 'undefined', description: 'Badge opcional no canto superior (ex: "Popular", "+40% leads")' },
          { name: 'ctaText', type: 'string', default: "'Saiba mais'", description: 'Texto do link CTA' },
          { name: 'href', type: 'string', default: "'#'", description: 'URL do link' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<ServiceCard
  title="Sites Institucionais"
  description="Presença digital profissional que converte visitantes em clientes."
  icon="Globe"
  badge="Popular"
  ctaText="Saiba mais"
  href="/servicos/sites"
/>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Borda com gradiente animado (ciano→laranja)',
            'Lift no hover (translateY -8px)',
            'Ícone com scale e rotação no hover',
            'Badge opcional no canto superior direito',
            'Glassmorphism background',
            '100% responsivo',
          ].map(f => (
            <div key={f} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
              <Check className="w-4 h-4 text-tech flex-shrink-0" />
              <span className="text-sm text-[var(--text-on-surface-muted)]">{f}</span>
            </div>
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

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'title', type: 'string', default: "'Vamos conversar sobre seu projeto'", description: 'Título do formulário' },
          { name: 'subtitle', type: 'string', default: "'Preencha o formulário e receba um diagnóstico gratuito em até 2h.'", description: 'Subtítulo do formulário' },
          { name: 'action', type: 'string', default: "'#'", description: 'URL de ação do formulário (Formspree)' },
          { name: 'onSubmit', type: 'function', default: 'undefined', description: 'Callback após submissão' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Campos do Formulário</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Nome', type: 'text', required: true, placeholder: 'Seu nome completo' },
            { name: 'Email', type: 'email', required: true, placeholder: 'seu@email.com' },
            { name: 'WhatsApp', type: 'tel', required: true, placeholder: '(11) 99999-9999' },
            { name: 'Serviço', type: 'select', required: true, placeholder: 'Selecione um serviço' },
            { name: 'Mensagem', type: 'textarea', required: false, placeholder: 'Conte-nos sobre seu projeto...' },
          ].map(field => (
            <div key={field.name} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm text-[var(--text-on-surface)]">{field.name}</p>
                {field.required && <span className="text-xs text-error">Obrigatório</span>}
              </div>
              <p className="text-xs text-[var(--text-on-surface-subtle)] font-mono mb-1">type: {field.type}</p>
              <p className="text-xs text-[var(--text-on-surface-muted)]">placeholder: "{field.placeholder}"</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<LeadCaptureForm
  title="Vamos conversar sobre seu projeto"
  subtitle="Preencha o formulário e receba um diagnóstico gratuito em até 2h."
  action="https://formspree.io/f/your-form-id"
/>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Validação em tempo real (email, telefone)',
            'Máscara automática para telefone',
            'Estados: idle, submitting, success, error',
            'Integração com Formspree (AJAX)',
            'Mensagem de sucesso animada',
            'Privacy note com ícone de cadeado',
            '100% responsivo',
            'Acessível (labels, focus states)',
          ].map(f => (
            <div key={f} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
              <Check className="w-4 h-4 text-tech flex-shrink-0" />
              <span className="text-sm text-[var(--text-on-surface-muted)]">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Estados</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { state: 'Idle', desc: 'Formulário pronto para preencher', color: 'bg-info/10 border-info/20' },
            { state: 'Submitting', desc: 'Enviando dados (spinner)', color: 'bg-warning/10 border-warning/20' },
            { state: 'Success', desc: 'Enviado com sucesso (checkmark)', color: 'bg-success/10 border-success/20' },
            { state: 'Error', desc: 'Erro no envio (retry)', color: 'bg-error/10 border-error/20' },
          ].map(s => (
            <div key={s.state} className={`rounded-xl border p-4 ${s.color}`}>
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{s.state}</p>
              <p className="text-xs text-[var(--text-on-surface-muted)]">{s.desc}</p>
            </div>
          ))}
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

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'logo', type: 'string', default: "'MAX'", description: 'Texto do logo' },
          { name: 'links', type: 'Array<{label: string, href: string}>', default: '[]', description: 'Links de navegação' },
          { name: 'ctaText', type: 'string', default: "'Diagnóstico Gratuito'", description: 'Texto do botão CTA' },
          { name: 'ctaHref', type: 'string', default: "'#'", description: 'URL do botão CTA' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<Navbar
  logo="MAX"
  links={[
    { label: 'Serviços', href: '#servicos' },
    { label: 'Cases', href: '#cases' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ]}
  ctaText="Diagnóstico Gratuito"
  ctaHref="#contato"
/>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Fixa no topo com glassmorphism',
            'Scroll progress bar (linha ciano no topo)',
            'Sombra e opacidade aumentam ao scrollar',
            'Links com underline animado (cresce da esquerda)',
            'Menu mobile com hamburger animado',
            'CTA sempre visível',
            'Backdrop blur no scroll',
            '100% responsivo',
          ].map(f => (
            <div key={f} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
              <Check className="w-4 h-4 text-tech flex-shrink-0" />
              <span className="text-sm text-[var(--text-on-surface-muted)]">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Comportamento de Scroll</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">📍 Topo da página</p>
            <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-1">
              <li>• Background transparente</li>
              <li>• Padding maior (py-4)</li>
              <li>• Sem sombra</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">📍 Após scroll (50px+)</p>
            <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-1">
              <li>• Glassmorphism (backdrop-blur)</li>
              <li>• Padding menor (py-2)</li>
              <li>• Sombra e borda</li>
            </ul>
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
    { question: 'A automação de WhatsApp substitui atendentes?', answer: 'Não substitui — potencializa! A automação cuida do primeiro contato e qualificação.' },
    { question: 'Preciso ter conhecimento técnico?', answer: 'Absolutamente não! Nós cuidamos de toda a parte técnica. Você foca no seu negócio.' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="max-w-2xl">
          <FAQ items={items} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'items', type: 'Array<{question: string, answer: string}>', default: '—', description: 'Array de perguntas e respostas' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<FAQ items={[
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
]} />`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Accordion — um aberto por vez',
            'Ícone + que rotaciona com easing elástico',
            'Altura animada com max-height transition',
            'Glassmorphism background',
            'Acessível (aria-expanded, keyboard navigation)',
            'Borda sutil entre itens',
            'Hover state nos botões',
            '100% responsivo',
          ].map(f => (
            <div key={f} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
              <Check className="w-4 h-4 text-tech flex-shrink-0" />
              <span className="text-sm text-[var(--text-on-surface-muted)]">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Dicas de Conteúdo</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
          <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
            <li>✅ <strong>Seja direto:</strong> Responda a pergunta nos primeiros 10-15 palavras</li>
            <li>✅ <strong>Use números:</strong> "2-4 semanas" é melhor que "algum tempo"</li>
            <li>✅ <strong>Foque em benefícios:</strong> "economiza 4h por dia" em vez de "automação inteligente"</li>
            <li>✅ <strong>Limite a 5-7 perguntas:</strong> Mais que isso sobrecarrega o usuário</li>
            <li>❌ <strong>Evite jargões técnicos:</strong> "API REST" → "integração com sistemas"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: 'Carlos Mendes', company: 'TechStart', role: 'CEO', rating: 5, testimonial: 'A Max Ebina transformou completamente nossa presença digital. Em 3 meses, triplicamos os leads qualificados.' },
    { name: 'Ana Silva', company: 'ModaFit', role: 'Diretora', rating: 5, testimonial: 'A automação de WhatsApp economiza 4 horas por dia da minha equipe. Resultado incrível!' },
    { name: 'Roberto Lima', company: 'Construmax', role: 'Gerente', rating: 4, testimonial: 'O CRM que desenvolveram é intuitivo e poderoso. Nossa taxa de conversão subiu 60%.' },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'name', type: 'string', default: '—', description: 'Nome da pessoa' },
          { name: 'company', type: 'string', default: '—', description: 'Empresa' },
          { name: 'role', type: 'string', default: '—', description: 'Cargo' },
          { name: 'rating', type: 'number (1-5)', default: '5', description: 'Nota em estrelas' },
          { name: 'testimonial', type: 'string', default: '—', description: 'Texto do depoimento' },
          { name: 'photo', type: 'string (URL)', default: 'undefined', description: 'URL da foto (se não fornecida, mostra iniciais)' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<TestimonialCard
  name="Carlos Mendes"
  company="TechStart"
  role="CEO"
  rating={5}
  testimonial="A Max Ebina transformou completamente nossa presença digital. Em 3 meses, triplicamos os leads qualificados."
/>

// Com foto personalizada
<TestimonialCard
  name="Ana Silva"
  company="ModaFit"
  role="Diretora"
  rating={5}
  testimonial="A automação de WhatsApp economiza 4 horas por dia da minha equipe."
  photo="/photos/ana-silva.jpg"
/>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Avatar com iniciais (gradiente tech→primary)',
            'Foto opcional (circular com ring)',
            'Estrelas de rating (1-5)',
            'Hover com scale suave (1.02)',
            'Glassmorphism background',
            'Aspas decorativas no texto',
            '100% responsivo',
            'Acessível (semântica correta)',
          ].map(f => (
            <div key={f} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
              <Check className="w-4 h-4 text-tech flex-shrink-0" />
              <span className="text-sm text-[var(--text-on-surface-muted)]">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Dicas para Depoimentos Eficazes</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
          <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
            <li>✅ <strong>Use números concretos:</strong> "triplicamos os leads" é melhor que "aumentamos muito"</li>
            <li>✅ <strong>Mencione tempo:</strong> "Em 3 meses" dá credibilidade</li>
            <li>✅ <strong>Foque em resultados:</strong> "economiza 4h por dia" mostra valor real</li>
            <li>✅ <strong>Inclua cargo e empresa:</strong> Aumenta autoridade do depoimento</li>
            <li>✅ <strong>Mantenha conciso:</strong> 2-3 frases são ideais</li>
            <li>❌ <strong>Evite genéricos:</strong> "Ótimo serviço" não convence ninguém</li>
          </ul>
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
        <ol className="text-sm text-[var(--text-on-surface-muted)] space-y-2 list-decimal list-inside">
          <li>Use o toggle "Mostrar no celular" para ver como o slide fica no Instagram real</li>
          <li>Ative "Mostrar área de segurança" para posicionar conteúdo importante</li>
          <li>Todo texto crítico deve ficar DENTRO da linha tracejada ciano</li>
          <li>As bordas (fora da safe zone) são apenas para elementos decorativos</li>
          <li>Abra o slide em nova aba (zoom 100%)</li>
          <li>DevTools → Clique direito no elemento → "Capture node screenshot"</li>
          <li>Dimensão final: 1080x1350px (proporção 4:5)</li>
          <li>Desative safe zone e mockup antes do screenshot final</li>
        </ol>
      </div>

      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-3">📐 Especificações da Safe Zone</p>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-[var(--text-on-surface-subtle)]">Topo</p>
            <p className="text-[var(--text-on-surface)] font-mono">180px (13.3%)</p>
          </div>
          <div>
            <p className="text-[var(--text-on-surface-subtle)]">Base</p>
            <p className="text-[var(--text-on-surface)] font-mono">200px (14.8%)</p>
          </div>
          <div>
            <p className="text-[var(--text-on-surface-subtle)]">Laterais</p>
            <p className="text-[var(--text-on-surface)] font-mono">140px (13%)</p>
          </div>
          <div>
            <p className="text-[var(--text-on-surface-subtle)]">Safe Zone</p>
            <p className="text-[var(--text-on-surface)] font-mono">800x970px</p>
          </div>
        </div>
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
            { adj: 'Confiante', desc: 'Fala com segurança sobre resultados e transformação.' },
            { adj: 'Visionário', desc: 'Mostra o futuro possível com tecnologia e automação.' },
            { adj: 'Acessível', desc: 'Traduz complexidade técnica em linguagem de resultado.' },
          ].map(t => (
            <div key={t.adj} className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
              <p className="text-2xl font-display font-bold gradient-text-tech mb-2">{t.adj}</p>
              <p className="text-sm text-[var(--text-on-surface-muted)]">{t.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--text-on-surface-muted)] mt-4">
          <strong>Personalidade da marca:</strong> O Mago + O Sábio. Transforma complexidade técnica em simplicidade estratégica. Fala de resultado, não de ferramenta.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">✅ Fale Assim</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'Headline', text: '"Transforme Sua Empresa com Tecnologia e Automação"' },
            { label: 'Benefício', text: '"Economize 4h por dia com automação inteligente"' },
            { label: 'Prova Social', text: '"+150 empresas já escalaram com a gente"' },
            { label: 'CTA', text: '"Quero Escalar Meu Negócio"' },
            { label: 'Urgência', text: '"Vagas limitadas para diagnóstico gratuito este mês"' },
            { label: 'Resultado', text: '"+40% mais leads qualificados em 90 dias"' },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-success/5 border border-success/20">
              <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-success font-semibold mb-1">{item.label}</p>
                <p className="text-sm text-[var(--text-on-surface)]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">❌ Evite Isso</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'Jargão técnico', text: '"Nossa API REST com webhooks e deploy CI/CD"' },
            { label: 'Vago', text: '"O melhor do mercado em soluções digitais"' },
            { label: 'Foco em ferramenta', text: '"Usamos React, Node.js e PostgreSQL"' },
            { label: 'Promessa vazia', text: '"Resultados garantidos em 24h"' },
            { label: 'Técnico demais', text: '"Arquitetura escalável com microserviços"' },
            { label: 'Genérico', text: '"Código limpo e boas práticas"' },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-3 p-4 rounded-xl bg-error/5 border border-error/20">
              <X className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-error font-semibold mb-1">{item.label}</p>
                <p className="text-sm text-[var(--text-on-surface)]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Gatilhos Mentais</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Autoridade', desc: 'Números, cases, anos de experiência', example: '"+10 anos transformando negócios"' },
            { name: 'Prova Social', desc: 'Depoimentos, logos, métricas', example: '"+150 empresas satisfeitas"' },
            { name: 'Urgência', desc: 'Vagas limitadas, bônus por tempo', example: '"Apenas 5 vagas para diagnóstico"' },
            { name: 'Reciprocidade', desc: 'Iscas digitais, diagnósticos gratuitos', example: '"Diagnóstico gratuito sem compromisso"' },
          ].map(g => (
            <div key={g.name} className="rounded-xl border border-[var(--surface-border)] p-5 bg-[var(--surface-card-secondary)]">
              <p className="font-display font-bold text-tech mb-1">{g.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)] mb-3">{g.desc}</p>
              <p className="text-sm text-[var(--text-on-surface-muted)] italic">"{g.example}"</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Micro-copy</h3>
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech text-sm font-semibold mb-3">Formulários</p>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-[var(--text-on-surface-subtle)]">Label:</span>{' '}
                <span className="text-[var(--text-on-surface)]">"Vamos conversar sobre seu projeto"</span>
              </div>
              <div>
                <span className="text-[var(--text-on-surface-subtle)]">Placeholder email:</span>{' '}
                <span className="text-[var(--text-on-surface)] font-mono">seu@email.com</span>
              </div>
              <div>
                <span className="text-[var(--text-on-surface-subtle)]">Placeholder telefone:</span>{' '}
                <span className="text-[var(--text-on-surface)] font-mono">(11) 99999-9999</span>
              </div>
              <div>
                <span className="text-[var(--text-on-surface-subtle)]">Sucesso:</span>{' '}
                <span className="text-[var(--text-on-surface)]">"Recebemos seus dados! Em até 2h úteis entraremos em contato. 🚀"</span>
              </div>
              <div>
                <span className="text-[var(--text-on-surface-subtle)]">Privacy note:</span>{' '}
                <span className="text-[var(--text-on-surface)]">"🔒 Seus dados estão seguros. Não enviamos spam."</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech text-sm font-semibold mb-3">Headlines de Exemplo</p>
            <ul className="space-y-2 text-sm text-[var(--text-on-surface)]">
              <li>• "Transforme Sua Empresa com Tecnologia e Automação"</li>
              <li>• "Sites, LPs e CRM que geram resultados reais"</li>
              <li>• "5 Automações que Toda Empresa Precisa em 2026"</li>
              <li>• "Escale seu negócio com inteligência digital"</li>
            </ul>
          </div>
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
        <p className="text-sm text-[var(--text-on-surface-muted)]">Preview da LP completa da Max Ebina, montada com todos os componentes do Design System.</p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Estrutura da Landing Page</h3>
        <div className="rounded-xl border border-[var(--surface-border)] overflow-hidden">
          <div className="bg-[var(--surface-card-secondary)] p-4 border-b border-[var(--surface-border)]">
            <p className="text-sm font-semibold text-[var(--text-on-surface)]">Seções da LP</p>
          </div>
          <div className="divide-y divide-[var(--surface-border)]">
            {[
              { name: 'Navbar', component: 'Navbar', desc: 'Fixa no topo, glassmorphism, scroll progress bar' },
              { name: 'Hero Section', component: 'HeroSection', desc: 'Headline com stagger animation, partículas, 2 CTAs' },
              { name: 'Serviços', component: 'ServiceCard x6', desc: 'Grid 3x2 com todos os serviços da agência' },
              { name: 'Prova Social', component: 'AnimatedCounter x4', desc: 'Números animados: +150 projetos, +40% leads, 98% satisfação' },
              { name: 'Depoimentos', component: 'TestimonialCard x3', desc: 'Cards com avatar, estrelas e texto do depoimento' },
              { name: 'Lead Magnet', component: 'LeadCaptureForm', desc: 'Formulário de captura com gradiente de fundo' },
              { name: 'FAQ', component: 'FAQ', desc: '5 perguntas frequentes em accordion' },
              { name: 'Footer', component: 'Footer', desc: 'Links, redes sociais, copyright' },
              { name: 'WhatsApp Float', component: 'WhatsAppFloat', desc: 'Botão flutuante fixo no canto inferior direito' },
            ].map((section, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-[var(--surface-card)]">
                <div className="w-8 h-8 rounded-lg bg-tech/10 flex items-center justify-center text-tech font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-[var(--text-on-surface)]">{section.name}</p>
                  <p className="text-xs text-[var(--text-on-surface-muted)]">{section.desc}</p>
                </div>
                <code className="text-xs text-tech font-mono hidden md:block">{section.component}</code>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Preview Visual</h3>
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
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Animações e Interações</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Scroll Progress Bar', desc: 'Linha ciano no topo que preenche conforme scroll' },
            { name: 'Navbar Glassmorphism', desc: 'Background blur e sombra ao scrollar 50px+' },
            { name: 'Animated Counters', desc: 'Números animam de 0 até valor final em 2s' },
            { name: 'ServiceCard Hover', desc: 'Lift -8px + gradiente animado na borda' },
            { name: 'FAQ Accordion', desc: 'Abre/fecha com easing elástico' },
            { name: 'WhatsApp Pulse', desc: 'Anel expansivo no botão flutuante' },
          ].map(anim => (
            <div key={anim.name} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{anim.name}</p>
              <p className="text-xs text-[var(--text-on-surface-muted)]">{anim.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Performance</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
          <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
            <li>✅ <strong>Lazy loading:</strong> Imagens carregam apenas quando visíveis</li>
            <li>✅ <strong>Partículas otimizadas:</strong> Reduzidas em mobile (30 vs 60)</li>
            <li>✅ <strong>will-change:</strong> Apenas no hover para economizar memória</li>
            <li>✅ <strong>IntersectionObserver:</strong> Contadores animam apenas ao entrar no viewport</li>
            <li>✅ <strong>Fontes otimizadas:</strong> Preconnect + display swap</li>
          </ul>
        </div>
      </div>

      <WhatsAppFloat />
    </div>
  );
}
