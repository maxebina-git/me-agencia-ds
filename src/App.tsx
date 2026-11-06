import { useState, useEffect } from 'react';
import {
  Palette, Type, Ruler, Sparkles, Box, Layout, Image,
  BookOpen, Moon, Sun, Search, X, Menu, ChevronRight,
  Copy, Check, Eye, TrendingUp, Star, Clock
} from 'lucide-react';
import {
  Badge, Button, ServiceCard, SectionHeader, TestimonialCard, GlitchText,
  FAQ, WhatsAppFloat, ScrollToTop, Navbar, LeadCaptureForm, AnimatedCounter,
  InstagramSlide, Footer, Table, Drawer, Modal
} from './components/ui';
import { PhoneMockup } from './components/PhoneMockup';
import { CodeBlock, PropsTable } from './components/DocsComponents';
import { HeroSection } from './components/HeroSection';

type Section = 'logo' | 'colors' | 'typography' | 'spacing' | 'motion' | 'glitch-text' | 'buttons' | 'badge' | 'cards' | 'forms' | 'table' | 'section-header' | 'animated-counter' | 'whatsapp-float' | 'scroll-to-top' | 'navbar' | 'hero' | 'faq' | 'testimonials' | 'footer' | 'social-motion' | 'social-motion-principios' | 'social-motion-transicoes' | 'social-motion-textos' | 'social-motion-cards' | 'social-motion-path' | 'social-motion-numbers' | 'instagram' | 'brand-voice' | 'preview' | 'accessibility' | 'responsiveness' | 'icons' | 'borders' | 'grid' | 'drawer' | 'modal';

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
  { id: 'glitch-text', label: 'GlitchText', group: '📦 Fundações', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'borders', label: 'Bordas & Radius', group: '📦 Fundações', icon: <Box className="w-4 h-4" /> },
  { id: 'icons', label: 'Ícones', group: '📦 Fundações', icon: <Box className="w-4 h-4" /> },
  { id: 'grid', label: 'Grid & Layout', group: '📦 Fundações', icon: <Layout className="w-4 h-4" /> },
  { id: 'accessibility', label: 'Acessibilidade', group: '📦 Fundações', icon: <Eye className="w-4 h-4" /> },
  { id: 'responsiveness', label: 'Responsividade', group: '📦 Fundações', icon: <Layout className="w-4 h-4" /> },
  { id: 'buttons', label: 'Button', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'badge', label: 'Badge', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'cards', label: 'ServiceCard', group: '🧩 Componentes', icon: <Layout className="w-4 h-4" /> },
  { id: 'forms', label: 'Formulário', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'table', label: 'Tabela', group: '🧩 Componentes', icon: <Layout className="w-4 h-4" /> },
  { id: 'section-header', label: 'SectionHeader', group: '🧩 Componentes', icon: <Layout className="w-4 h-4" /> },
  { id: 'animated-counter', label: 'AnimatedCounter', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'whatsapp-float', label: 'WhatsAppFloat', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'scroll-to-top', label: 'ScrollToTop', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'navbar', label: 'Navbar', group: '🧩 Componentes', icon: <Layout className="w-4 h-4" /> },
  { id: 'hero', label: 'Hero Section', group: '🧩 Componentes', icon: <Layout className="w-4 h-4" /> },
  { id: 'faq', label: 'FAQ', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'testimonials', label: 'Depoimentos', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'footer', label: 'Footer', group: '🧩 Componentes', icon: <Layout className="w-4 h-4" /> },
  { id: 'drawer', label: 'Drawer', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'modal', label: 'Modal', group: '🧩 Componentes', icon: <Box className="w-4 h-4" /> },
  { id: 'social-motion', label: 'Social Motion', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-principios', label: 'Princípios', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-transicoes', label: 'Transições de Tela', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-textos', label: 'Textos Animados', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-cards', label: 'Cards & Boxes', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-path', label: 'Path Motion', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-numbers', label: 'Numbers & Data', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'instagram', label: 'Instagram', group: '🎬 Social Studio', icon: <Image className="w-4 h-4" /> },
  { id: 'brand-voice', label: 'Brand Voice', group: '📝 Conteúdo', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'preview', label: 'LP Preview', group: '🚀 Preview', icon: <Eye className="w-4 h-4" /> },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('colors');
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [socialMotionOpen, setSocialMotionOpen] = useState(true);
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
                  onClick={() => { setActiveSection(item.id); if (item.id === 'social-motion' || item.id.startsWith('social-motion-')) setSocialMotionOpen(true); setSearchOpen(false); setSearchQuery(''); }}
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
              {group === '🎬 Social Studio' ? (
                <div className="space-y-1">
                  <div className={`flex items-center rounded-xl text-sm transition-all duration-200 ${
                      activeSection === 'social-motion' || activeSection.startsWith('social-motion-')
                        ? 'bg-tech/10 text-tech border border-tech/20'
                        : 'text-[var(--text-on-surface-muted)] hover:text-[var(--text-on-surface)] hover:bg-black/5 dark:hover:bg-white/5'
                    }`}>
                    <button
                      onClick={() => { setActiveSection('social-motion'); setSocialMotionOpen(true); setSidebarOpen(false); }}
                      className="flex-1 flex items-center gap-3 px-3 py-2.5 text-left"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Social Motion</span>
                      <span className="px-2 py-0.5 text-[10px] leading-4 font-semibold rounded-full bg-tech/20 text-tech border border-tech/30">novo</span>
                    </button>
                    <button
                      onClick={() => setSocialMotionOpen(!socialMotionOpen)}
                      aria-expanded={socialMotionOpen}
                      aria-label={socialMotionOpen ? 'Fechar Social Motion' : 'Abrir Social Motion'}
                      className="p-2.5 shrink-0"
                    >
                      <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${socialMotionOpen ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                  {socialMotionOpen && (
                    <div className="ml-4 space-y-1">
                      {navItems.filter(i => i.group === group && i.id.startsWith('social-motion-')).map(item => (
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
                  )}
                  {navItems.filter(i => i.group === group && !i.id.startsWith('social-motion') ).map(item => (
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
              ) : (
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
              )}
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
          {activeSection === 'glitch-text' && <GlitchTextSection />}
          {activeSection === 'borders' && <BordersSection />}
          {activeSection === 'icons' && <IconsSection />}
          {activeSection === 'grid' && <GridSection />}
          {activeSection === 'accessibility' && <AccessibilitySection />}
          {activeSection === 'responsiveness' && <ResponsivenessSection />}
          {activeSection === 'buttons' && <ButtonsSection />}
          {activeSection === 'badge' && <BadgeSection />}
          {activeSection === 'cards' && <CardsSection />}
          {activeSection === 'forms' && <FormsSection />}
          {activeSection === 'table' && <TableSection />}
          {activeSection === 'section-header' && <SectionHeaderSection />}
          {activeSection === 'animated-counter' && <AnimatedCounterSection />}
          {activeSection === 'whatsapp-float' && <WhatsAppFloatSection />}
          {activeSection === 'scroll-to-top' && <ScrollToTopSection />}
          {activeSection === 'navbar' && <NavbarSection />}
          {activeSection === 'hero' && <HeroSectionDocs />}
          {activeSection === 'faq' && <FAQSection />}
          {activeSection === 'testimonials' && <TestimonialsSection />}
          {activeSection === 'footer' && <FooterSection />}
          {activeSection === 'drawer' && <DrawerSection />}
          {activeSection === 'modal' && <ModalSection />}
          {activeSection === 'social-motion' && <SocialMotionOverviewSection onNavigate={(id) => { setActiveSection(id); setSocialMotionOpen(true); }} />}
          {activeSection === 'social-motion-principios' && <SocialMotionPrincipiosSection />}
          {activeSection === 'social-motion-transicoes' && <SocialMotionTransicoesSection />}
          {activeSection === 'social-motion-textos' && <SocialMotionTextosSection />}
          {activeSection === 'social-motion-cards' && <SocialMotionCardsSection />}
          {activeSection === 'social-motion-path' && <SocialMotionPathSection />}
          {activeSection === 'social-motion-numbers' && <SocialMotionNumbersSection />}
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

function SocialMotionOverviewSection({ onNavigate }: { onNavigate: (id: Section) => void }) {
  const subpages: { id: Section; label: string; desc: string }[] = [
    { id: 'social-motion-principios', label: 'Princípios', desc: 'Safe zone, timeline fixa e regras do vídeo social.' },
    { id: 'social-motion-transicoes', label: 'Transições de Tela', desc: 'Fade, slide, zoom e wipe entre cenas.' },
    { id: 'social-motion-textos', label: 'Textos Animados', desc: 'Letras, palavras e linhas com stagger.' },
    { id: 'social-motion-cards', label: 'Cards & Boxes', desc: 'Cards com entrada escalonada e pop.' },
    { id: 'social-motion-path', label: 'Path Motion', desc: 'Setas e elementos seguindo um caminho.' },
    { id: 'social-motion-numbers', label: 'Numbers & Data', desc: 'Big numbers, barras e contadores.' },
  ];
  return (
    <div className="space-y-12">
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-sm text-[var(--text-on-surface-muted)]">
          Biblioteca de animações para vídeos sociais — timeline determinística, resolução fixa e safe zone. Diferente do Motion de Site/LP (scroll/hover, responsivo).
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {subpages.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="text-left rounded-xl border border-[var(--surface-border)] p-5 bg-[var(--surface-card-secondary)] hover:border-tech/40 transition-colors"
          >
            <p className="font-display font-bold text-tech mb-1">{item.label}</p>
            <p className="text-sm text-[var(--text-on-surface-muted)]">{item.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function SocialMotionPrincipiosSection() {
  const [showSafeZone, setShowSafeZone] = useState(false);
  return (
    <div className="space-y-12">
      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">🎬 Contrato do Social Motion</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">
          Timeline determinística, resolução fixa e safe zone obrigatória. Diferente do Motion de Site/LP (scroll/hover, responsivo) — aqui nada depende de hover, scroll ou viewport.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Site/LP vs Social</h3>
        <Table
          columns={[
            { key: 'aspect', label: 'Aspecto' },
            { key: 'web', label: 'Site/LP (Fundações → Motion)' },
            { key: 'social', label: 'Social Motion' },
          ]}
          data={[
            { aspect: 'Disparo', web: 'Scroll / hover', social: 'Timeline fixa' },
            { aspect: 'Layout', web: 'Responsivo', social: 'Resolução fixa (1080x1350)' },
            { aspect: 'Performance', web: 'Web / mobile', social: 'Export MP4/Lottie (Remotion)' },
            { aspect: 'Safe zone', web: 'Irrelevante', social: 'Crítica — texto dentro' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Formato IG 4:5 + Safe Zone</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)] mb-4">
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-[var(--text-on-surface-subtle)]">Canvas</p>
              <p className="text-[var(--text-on-surface)] font-mono">1080x1350px</p>
            </div>
            <div>
              <p className="text-[var(--text-on-surface-subtle)]">Base no DS</p>
              <p className="text-[var(--text-on-surface)] font-mono">340x425px</p>
            </div>
            <div>
              <p className="text-[var(--text-on-surface-subtle)]">Safe Zone</p>
              <p className="text-[var(--text-on-surface)] font-mono">800x970px</p>
            </div>
            <div>
              <p className="text-[var(--text-on-surface-subtle)]">Margens</p>
              <p className="text-[var(--text-on-surface)] font-mono">140px / 180px / 200px</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] mb-6">
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
        <div className="flex justify-center" data-theme="midnight">
          <InstagramSlide type="capa" title="5 Automações" subtitle="Max Ebina — Marketing Digital" showSafeZone={showSafeZone} />
        </div>
        <p className="text-sm text-[var(--text-on-surface-muted)] mt-4">
          Texto crítico (`title`, `metric`, `body`) vive **dentro** da linha tracejada (`13.3%` topo, `13%` laterais, `74%` × `71.9%`). Fora é só decorativo (blur + logo).
        </p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Timing (reuso dos tokens)</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {[
            { name: 'Smooth', value: 'cubic-bezier(0.16, 1, 0.3, 1)', desc: 'Reveals e entradas' },
            { name: 'Elastic', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', desc: 'CTA, pop e cards' },
            { name: 'Spring', value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', desc: 'Micro-interações' },
          ].map(e => (
            <div key={e.name} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)] text-center">
              <p className="font-display font-bold text-[var(--text-on-surface)] mb-1">{e.name}</p>
              <p className="text-xs font-mono text-tech mb-1">{e.value}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{e.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '300ms', name: 'padrão', use: 'Transições' },
            { value: '600ms', name: 'reveals', use: 'Entradas' },
            { value: '900ms', name: 'dramático', use: 'Lançamento' },
            { value: '60-80ms', name: 'stagger', use: 'Listas/cards' },
          ].map(d => (
            <div key={d.name} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)] text-center">
              <p className="text-2xl font-display font-bold gradient-text-tech">{d.value}</p>
              <p className="text-sm text-tech font-mono mt-1">{d.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)] mt-2">{d.use}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Regras técnicas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Performance', desc: 'Só transform + opacity. Nada de width/height/position.' },
            { title: 'Tema', desc: 'Sempre via data-theme + var(--slide-*). Nunca hard-code hex.' },
            { title: 'Tipografia', desc: 'Space Grotesk (headline/números), Inter (body). Radius 8/12/16/24px.' },
            { title: 'Acessibilidade', desc: 'Respeitar prefers-reduced-motion. Sem hover/scroll.' },
          ].map(r => (
            <div key={r.title} className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
              <p className="text-tech font-semibold mb-2">{r.title}</p>
              <p className="text-sm text-[var(--text-on-surface-muted)]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Brand</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">Logo</p>
            <p className="text-sm text-[var(--text-on-surface-muted)]">60x29px, 85%, bottom 16% / right 14% (dentro da safe zone), cor `var(--slide-accent)`. Ausente em `dica` para não poluir.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">Voz: Confiante · Visionário · Acessível</p>
            <p className="text-sm text-[var(--text-on-surface-muted)]">Mago + Sábio: traduz técnico em resultado. Evite jargão e promessa vaga.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialMotionTransicoesSection() {
  const [active, setActive] = useState<string | null>(null);
  const [showSafeZone, setShowSafeZone] = useState(false);

  const trigger = (id: string) => {
    setActive(id);
    const long = id === 'grid' || id === 'flip' || id === 'curtain' || id === 'diagonal' || id === 'iris' || id === 'venetian' || id === 'diamond' || id === 'checkerboard';
    setTimeout(() => setActive(null), long ? 1400 : 800);
  };

  const transitions = [
    { id: 'fade', name: 'Fade', dur: '300ms', ease: 'Smooth', desc: 'Só opacity. Corte suave Dica → Dica.' },
    { id: 'slide', name: 'Slide', dur: '600ms', ease: 'Smooth', desc: 'translateX + opacity. Mudança de ideia.' },
    { id: 'zoom', name: 'Zoom', dur: '600ms', ease: 'Elastic', desc: 'scale 1.05 → 1. Highlight de CTA/big number.' },
    { id: 'wipe', name: 'Wipe', dur: '600ms', ease: 'Smooth', desc: 'clip-path com gradiente. Troca de tema.' },
    { id: 'blur', name: 'BlurIn', dur: '600ms', ease: 'Smooth', desc: 'blur 8px → 0. Entrada dramática de título.' },
    { id: 'push', name: 'Push/Cover', dur: '600ms', ease: 'Smooth (travado)', desc: 'Nova cena empurra/cobre. Seção nova ou CTA.' },
    { id: 'curtain', name: 'Cortina Faixas', dur: '600ms', ease: 'Smooth (travado)', desc: '4 faixas verticais com stagger 60ms. Cortina ilustrada.' },
    { id: 'grid', name: 'Grid 4x3', dur: '600ms', ease: 'Smooth (travado)', desc: '12 fragmentos com flip rotateX/Y. Insp. CodePen. Em 4:5 os fragmentos ficam retrato — manter 4x3 fiel ao original.' },
    { id: 'flip', name: 'Flip 3D', dur: '600ms', ease: 'Smooth (travado)', desc: '4 quadrantes alternando rotateX/Y. Reveal de CTA.' },
    { id: 'diagonal', name: 'Diagonal', dur: '600ms', ease: 'Smooth (travado)', desc: '2 painéis clip-path skew, stagger 80ms. Editorial.' },
    { id: 'iris', name: 'Círculo Iris', dur: '600ms', ease: 'Smooth (travado)', desc: 'clip-path circle 0% → 100% no centro. Capa → CTA.' },
    { id: 'venetian', name: 'Venetian', dur: '600ms', ease: 'Smooth (travado)', desc: '6 faixas horizontais scaleY, stagger 50ms. Variação 9:16.' },
    { id: 'diamond', name: 'Diamond', dur: '600ms', ease: 'Smooth (travado)', desc: 'Grid 4x3 delay centro → fora. Mais dinâmico. Em 4:5 os fragmentos ficam retrato.' },
    { id: 'checkerboard', name: 'Checkerboard', dur: '600ms', ease: 'Smooth (travado)', desc: 'Grid 4x3 só pares com rotateY. Efeito xadrez. Em 4:5 os fragmentos ficam retrato.' },
  ];

  const getPreview = (id: string, isActive: boolean) => {
    const base = 'absolute inset-0 flex items-center justify-center';
    const smooth = 'cubic-bezier(0.16, 1, 0.3, 1)';
    const elastic = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
    if (id === 'curtain') {
      return (
        <>
          <span className={base}><span className="font-display font-bold text-white/70">Dica #1</span></span>
          <div className="absolute inset-0 grid grid-cols-4">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="h-full origin-left" style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #8f6424 100%)', backgroundSize: '400% 100%', backgroundPosition: `${i * 33.33}% 0%`, transform: isActive ? 'scaleX(1)' : 'scaleX(0)', transition: `transform 600ms ${smooth} ${i * 60}ms` }} />
            ))}
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-white" style={{ opacity: isActive ? 1 : 0, transition: `opacity 300ms ${smooth} 400ms`, pointerEvents: 'none' }}>Tema novo</span>
        </>
      );
    }
    if (id === 'grid') {
      const items = Array.from({ length: 12 });
      return (
        <>
          <span className={base}><span className="font-display font-bold text-white/70">Dica #1</span></span>
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3" style={{ perspective: '600px' }}>
            {items.map((_, idx) => {
              const row = Math.floor(idx / 4);
              const col = idx % 4;
              const odd = (row + col) % 2 === 0;
              return (
                <div key={idx} className="w-full h-full" style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #8f6424 100%)', backgroundSize: '400% 300%', backgroundPosition: `${col * 33.33}% ${row * 50}%`, transform: isActive ? 'rotateX(0deg) rotateY(0deg) scale(1)' : `rotateX(${odd ? '-180deg' : '0deg'}) rotateY(${odd ? '0deg' : '-180deg'}) scale(0.8)`, opacity: isActive ? 1 : 0, transition: `all 600ms ${smooth} ${(row + col) * 50}ms`, backfaceVisibility: 'hidden' }} />
              );
            })}
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-white" style={{ opacity: isActive ? 1 : 0, transition: `opacity 300ms ${smooth} 500ms`, pointerEvents: 'none' }}>Grid 4x3</span>
        </>
      );
    }
    if (id === 'flip') {
      return (
        <>
          <span className={base}><span className="font-display font-bold text-white/70">Dica #1</span></span>
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2" style={{ perspective: '600px' }}>
            {[0, 1, 2, 3].map(i => {
              const odd = i % 2 === 0;
              return (
                <div key={i} className="w-full h-full" style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)', backgroundSize: '200% 200%', backgroundPosition: `${(i % 2) * 100}% ${Math.floor(i / 2) * 100}%`, transform: isActive ? 'rotateX(0deg) rotateY(0deg)' : `rotateX(${odd ? '-180deg' : '0deg'}) rotateY(${odd ? '0deg' : '-180deg'})`, opacity: isActive ? 1 : 0, transition: `all 600ms ${smooth} ${i * 70}ms`, backfaceVisibility: 'hidden' }} />
              );
            })}
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-white" style={{ opacity: isActive ? 1 : 0, transition: `opacity 300ms ${smooth} 400ms`, pointerEvents: 'none' }}>CTA →</span>
        </>
      );
    }
    if (id === 'diagonal') {
      return (
        <>
          <span className={base}><span className="font-display font-bold text-white/70">Dica #1</span></span>
          <div className="absolute inset-0" style={{ perspective: '600px' }}>
            {[0, 1].map(i => (
              <div key={i} className="absolute top-0 h-full" style={{ left: i === 0 ? '0%' : '45%', width: '55%', background: 'linear-gradient(135deg, #06B6D4 0%, #8f6424 100%)', clipPath: i === 0 ? 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' : 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)', transform: isActive ? 'translateX(0)' : i === 0 ? 'translateX(-120%)' : 'translateX(120%)', transition: `transform 600ms ${smooth} ${i * 80}ms` }} />
            ))}
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-white" style={{ opacity: isActive ? 1 : 0, transition: `opacity 300ms ${smooth} 400ms`, pointerEvents: 'none' }}>Diagonal</span>
        </>
      );
    }
    if (id === 'iris') {
      return (
        <>
          <span className={base}><span className="font-display font-bold text-white/70">Dica #1</span></span>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #8f6424 100%)', clipPath: isActive ? 'circle(100% at 50% 50%)' : 'circle(0% at 50% 50%)', transition: `clip-path 600ms ${smooth}` }} />
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-white" style={{ opacity: isActive ? 1 : 0, transition: `opacity 300ms ${smooth} 400ms`, pointerEvents: 'none' }}>CTA →</span>
        </>
      );
    }
    if (id === 'venetian') {
      return (
        <>
          <span className={base}><span className="font-display font-bold text-white/70">Dica #1</span></span>
          <div className="absolute inset-0 grid grid-rows-6">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-full origin-top" style={{ background: 'linear-gradient(135deg, #06B6D4 0%, #8f6424 100%)', backgroundSize: '100% 600%', backgroundPosition: `0% ${i * 20}%`, transform: isActive ? 'scaleY(1)' : 'scaleY(0)', transition: `transform 600ms ${smooth} ${i * 50}ms` }} />
            ))}
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-white" style={{ opacity: isActive ? 1 : 0, transition: `opacity 300ms ${smooth} 450ms`, pointerEvents: 'none' }}>Venetian</span>
        </>
      );
    }
    if (id === 'diamond') {
      const items = Array.from({ length: 12 });
      return (
        <>
          <span className={base}><span className="font-display font-bold text-white/70">Dica #1</span></span>
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3" style={{ perspective: '600px' }}>
            {items.map((_, idx) => {
              const row = Math.floor(idx / 4);
              const col = idx % 4;
              const odd = (row + col) % 2 === 0;
              const delay = (Math.abs(col - 1.5) + Math.abs(row - 1)) * 70;
              return (
                <div key={idx} className="w-full h-full" style={{ width: '103%', height: '102%', marginLeft: '-1.5%', marginTop: '-1%', background: 'linear-gradient(135deg, #06B6D4 0%, #8f6424 100%)', backgroundSize: '400% 300%', backgroundPosition: `${col * 33.33}% ${row * 50}%`, transform: isActive ? 'rotateX(0deg) rotateY(0deg) scale(1)' : `rotateX(${odd ? '-180deg' : '0deg'}) rotateY(${odd ? '0deg' : '-180deg'}) scale(0.8)`, opacity: isActive ? 1 : 0, transition: `all 600ms ${smooth} ${delay}ms`, backfaceVisibility: 'hidden' }} />
              );
            })}
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-white" style={{ opacity: isActive ? 1 : 0, transition: `opacity 300ms ${smooth} 500ms`, pointerEvents: 'none' }}>Diamond</span>
        </>
      );
    }
    if (id === 'checkerboard') {
      const items = Array.from({ length: 12 });
      return (
        <>
          <span className={base}><span className="font-display font-bold text-white/70">Dica #1</span></span>
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3" style={{ perspective: '600px' }}>
            {items.map((_, idx) => {
              const row = Math.floor(idx / 4);
              const col = idx % 4;
              const even = (row + col) % 2 === 0;
              return (
                <div key={idx} className="w-full h-full" style={{ width: '101%', background: 'linear-gradient(135deg, #06B6D4 0%, #8f6424 100%)', backgroundSize: '400% 300%', backgroundPosition: `${col * 33.33}% ${row * 50}%`, transform: even ? (isActive ? 'rotateY(0deg)' : 'rotateY(-180deg)') : (isActive ? 'translateX(0)' : 'translateX(8px)'), opacity: isActive ? 1 : 0, transition: `all 600ms ${smooth} ${(row + col) * 40}ms`, backfaceVisibility: 'hidden' }} />
              );
            })}
          </div>
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-white" style={{ opacity: isActive ? 1 : 0, transition: `opacity 300ms ${smooth} 500ms`, pointerEvents: 'none' }}>Checkerboard</span>
        </>
      );
    }
    if (id === 'push') {
      return (
        <>
          <div className={base} style={{ transform: isActive ? 'translateX(-100%)' : 'translateX(0)', transition: `transform 600ms ${smooth}` }}>
            <span className="font-display font-bold text-white/70">Dica #1</span>
          </div>
          <div className={base} style={{ transform: isActive ? 'translateX(0)' : 'translateX(100%)', transition: `transform 600ms ${smooth}` }}>
            <span className="font-display font-bold text-white">CTA →</span>
          </div>
        </>
      );
    }
    if (id === 'fade') {
      return (
        <>
          <div className={base} style={{ opacity: isActive ? 0 : 1, transition: `opacity 300ms ${smooth}` }}><span className="font-display font-bold text-white/70">Dica #1</span></div>
          <div className={base} style={{ opacity: isActive ? 1 : 0, transition: `opacity 300ms ${smooth} ${isActive ? '150ms' : '0ms'}` }}><span className="font-display font-bold text-white">Dica #2 → fade-in</span></div>
        </>
      );
    }
    if (id === 'slide') return (
      <>
        <div className={base}><span className="font-display font-bold text-white/70">Dica #1</span></div>
        <div className={base} style={{ transform: isActive ? 'translateX(0)' : 'translateX(100%)', transition: `transform 600ms ${smooth}`, opacity: isActive ? 1 : 0 }}><span className="font-display font-bold text-white">Dica #2 → slide</span></div>
      </>
    );
    if (id === 'zoom') return (
      <>
        <div className={base} style={{ opacity: isActive ? 0 : 1, transition: `opacity 300ms ${smooth}` }}><span className="font-display font-bold text-white/70">Dica #1</span></div>
        <div className={base} style={{ transform: isActive ? 'scale(1)' : 'scale(1.08)', opacity: isActive ? 1 : 0, transition: `all 600ms ${elastic}` }}><span className="font-display font-bold text-white">Big number +150</span></div>
      </>
    );
    if (id === 'wipe') return (
      <>
        <div className={base}><span className="font-display font-bold text-white/70">Dica #1</span></div>
        <div className={base} style={{ clipPath: isActive ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)', transition: `clip-path 600ms ${smooth}` }}><span className="font-display font-bold text-white">Tema novo → wipe</span></div>
      </>
    );
    return (
      <>
        <div className={base} style={{ opacity: isActive ? 0 : 1, transition: `opacity 300ms ${smooth}` }}><span className="font-display font-bold text-white/70">Dica #1</span></div>
        <div className={base} style={{ opacity: isActive ? 1 : 0, filter: isActive ? 'blur(0px)' : 'blur(8px)', transition: `all 600ms ${smooth}` }}><span className="font-display font-bold text-white">Título → blur in</span></div>
      </>
    );
  };

  return (
    <div className="space-y-12">
      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">🎬 Troca de cena sem quebrar a timeline</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">Toque no preview para ver a animação. Texto crítico mantém legível durante a transição — nada sai da Safe Zone. Push/Cover e Fragment travados em 600ms Smooth.</p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Previews (clique para testar) — IG 4:5 · 340×425</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] mb-6">
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
              Mostrar área de segurança (13.3% topo · 13% laterais · 74% × 71.9%)
            </span>
          </label>
          <span className="text-xs font-mono text-tech hidden sm:block">1080×1350 · safe 800×970</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {transitions.map(t => (
            <div key={t.id} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
              <button onClick={() => trigger(t.id)} className="w-full text-left">
                <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] border border-[var(--surface-border)]">
                  {getPreview(t.id, active === t.id)}
                  {showSafeZone && (
                    <>
                      <div className="absolute pointer-events-none border-2 border-dashed border-[rgba(6,182,212,0.6)] bg-[rgba(6,182,212,0.03)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                      <div className="absolute pointer-events-none bg-[rgba(6,182,212,0.9)] text-white px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                    </>
                  )}
                </div>
              </button>
              <div className="flex items-center gap-2 mt-3">
                <p className="font-display font-bold text-[var(--text-on-surface)]">{t.name}</p>
                <span className="text-xs font-mono text-tech">{t.dur} · {t.ease}</span>
              </div>
              <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Quando usar</h3>
        <Table
          columns={[
            { key: 'name', label: 'Transição' },
            { key: 'when', label: 'Quando usar' },
            { key: 'dur', label: 'Duração' },
          ]}
          data={[
            { name: 'Fade', when: 'Sequência longa, mesma ideia', dur: '300ms Smooth' },
            { name: 'Slide', when: 'Mudança de seção, direção = avançar', dur: '600ms Smooth' },
            { name: 'Zoom', when: 'Highlight, CTA, big number', dur: '600ms Elastic' },
            { name: 'Wipe', when: 'Troca de tema / cor', dur: '600ms Smooth' },
            { name: 'BlurIn', when: 'Entrada de título/logo', dur: '600ms Smooth' },
            { name: 'Push/Cover', when: 'Seção nova (push) ou reveal de CTA (cover)', dur: '600ms Smooth (travado)' },
            { name: 'Cortina Faixas', when: 'Troca de tema com cortina ilustrada', dur: '600ms Smooth + stagger 60ms' },
            { name: 'Grid 4x3', when: 'Troca de cena com grid fragmentado (insp. CodePen)', dur: '600ms Smooth + delay (i+j)*50ms' },
            { name: 'Flip 3D', when: 'Reveal de CTA/big number com quadrantes', dur: '600ms Smooth + delay 70ms' },
            { name: 'Diagonal', when: 'Troca editorial, 2 painéis skew', dur: '600ms Smooth + stagger 80ms' },
            { name: 'Círculo Iris', when: 'Reveal central Capa → CTA', dur: '600ms Smooth' },
            { name: 'Venetian', when: 'Variação horizontal pra 9:16', dur: '600ms Smooth + stagger 50ms' },
            { name: 'Diamond', when: 'Grid centro → fora, mais dinâmico', dur: '600ms Smooth + delay centro' },
            { name: 'Checkerboard', when: 'Metade dos fragmentos (xadrez) volteia', dur: '600ms Smooth + delay (i+j)*40ms' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'duration', type: "300 | 600 | 900", default: "600", description: 'Push/Cover e Fragment sempre 600' },
          { name: 'easing', type: "'Smooth' | 'Elastic' | 'Spring'", default: "'Smooth'", description: 'Curva — Push/Cover e Fragment sempre Smooth' },
          { name: 'direction', type: "'left' | 'right' | 'up'", default: "'left'", description: 'Direção da entrada' },
          { name: 'mode', type: "'push' | 'cover'", default: "'push'", description: 'Push empurra cena antiga; Cover cobre por cima' },
          { name: 'grid', type: "'4x3' | '4x2'", default: "'4x3'", description: 'Grid do Fragment (12 fragmentos, otimizado vs 13x9 do CodePen)' },
          { name: 'stagger', type: 'number (ms)', default: "60", description: 'Delay entre fragmentos/faixas' },
          { name: 'variant', type: "'curtain' | 'grid' | 'flip' | 'diagonal' | 'iris' | 'venetian' | 'diamond' | 'checkerboard'", default: "'grid'", description: 'Variante Fragment/Curtina (9 presets de cortina)' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo</h3>
        <CodeBlock code={'<FragmentReveal variant="grid" grid="4x3" stagger={60} duration={600} easing="Smooth">\n  <SceneCTA />\n</FragmentReveal>'} />
      </div>
    </div>
  );
}

function SocialMotionTextosSection() {
  return null;
}

function SocialMotionCardsSection() {
  return null;
}

function SocialMotionPathSection() {
  return null;
}

function SocialMotionNumbersSection() {
  return null;
}

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

  const faviconSvg = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" rx="14" fill="#8f6424"/>
<g transform="translate(9.25 21.1) scale(0.25)" fill="#F6EEE7">
<path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z"/>
<path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z"/>
</g>
</svg>`;

  const [copiedFavicon, setCopiedFavicon] = useState(false);

  const handleCopyFavicon = () => {
    navigator.clipboard.writeText(faviconSvg);
    setCopiedFavicon(true);
    setTimeout(() => setCopiedFavicon(false), 2000);
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
              <p className="font-display font-bold text-2xl text-[var(--text-on-surface)]">Marketing Digital</p>
            </div>
          </div>

          {/* Fundo Escuro */}
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-bg-dark flex items-center gap-4">
            <svg width="60" height="29" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"/>
              <path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"/>
            </svg>
            <div>
              <p className="font-display font-bold text-2xl text-bg-light">Marketing Digital</p>
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

      {/* Favicon */}
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Favicon</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card)] space-y-6">
          <div className="flex flex-wrap items-end gap-8">
            {([16, 32, 48] as const).map(size => (
              <div key={size}>
                <p className="text-xs text-[var(--text-on-surface-subtle)] mb-2">{size}x{size}</p>
                <img src="/favicon.svg" width={size} height={size} alt={`Favicon ${size}x${size}`} />
              </div>
            ))}
            <div className="bg-bg-dark rounded-xl p-4 flex items-end gap-6">
              {([16, 32, 48] as const).map(size => (
                <div key={size}>
                  <p className="text-xs text-white/40 mb-2">{size}x{size}</p>
                  <img src="/favicon.svg" width={size} height={size} alt={`Favicon ${size}x${size} em fundo escuro`} />
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-[var(--text-on-surface-muted)]">
            Tile da cor primária (#8f6424) com o monograma na cor clara (#F6EEE7) — contraste garantido em abas claras e escuras. Adicione no <code className="text-tech">&lt;head&gt;</code>:
          </p>
          <CodeBlock code={`<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`} />
          <button
            onClick={handleCopyFavicon}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-tech/10 border border-tech/20 text-tech hover:bg-tech/20 transition-all"
          >
            {copiedFavicon ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedFavicon ? 'Copiado!' : 'Copiar SVG do favicon'}
          </button>
        </div>
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
    {
      title: 'Neutras (Minimal)',
      colors: [
        { name: 'Neutral Black', hex: '#0A0A0A', use: 'Preto puro, fundos Minimal' },
        { name: 'Neutral Gray 900', hex: '#171717', use: 'Quase preto, textos fortes' },
        { name: 'Neutral Gray 700', hex: '#404040', use: 'Textos terciários' },
        { name: 'Neutral Gray 500', hex: '#737373', use: 'Textos secundários' },
        { name: 'Neutral Gray 300', hex: '#D4D4D4', use: 'Bordas sutis' },
        { name: 'Neutral Gray 100', hex: '#F5F5F5', use: 'Off-white, fundos claros' },
      ]
    },
    {
      title: 'Neon',
      colors: [
        { name: 'Neon Pink', hex: '#FF006E', use: 'Rosa vibrante, destaque principal' },
        { name: 'Neon Pink Light', hex: '#FF4D94', use: 'Hover/gradiente' },
        { name: 'Neon Purple', hex: '#8338EC', use: 'Roxo neon, secundário' },
        { name: 'Neon Cyan', hex: '#00F0FF', use: 'Ciano ultra vibrante' },
        { name: 'Neon Cyan Light', hex: '#7FF7FF', use: 'Hover/gradiente' },
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
            { name: 'Primary (Midnight)', css: 'linear-gradient(135deg, #06B6D4 0%, #8f6424 100%)' },
            { name: 'Sunrise', css: 'linear-gradient(135deg, #8f6424 0%, #06B6D4 100%)' },
            { name: 'Neon', css: 'linear-gradient(135deg, #FF006E 0%, #00F0FF 100%)' },
            { name: 'Minimal', css: 'linear-gradient(135deg, #0A0A0A 0%, #404040 100%)' },
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
            { name: 'Nome', type: 'text', required: true, placeholder: 'Seu nome completo', validation: 'Mínimo 3 caracteres, apenas letras' },
            { name: 'Email', type: 'email', required: true, placeholder: 'seu@email.com', validation: 'Regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/' },
            { name: 'WhatsApp', type: 'tel', required: true, placeholder: '(11) 99999-9999', validation: 'Máscara automática: (XX) XXXXX-XXXX' },
            { name: 'Serviço', type: 'select', required: true, placeholder: 'Selecione um serviço', validation: 'Deve selecionar uma opção' },
            { name: 'Mensagem', type: 'textarea', required: false, placeholder: 'Conte-nos sobre seu projeto...', validation: 'Opcional' },
          ].map(field => (
            <div key={field.name} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-sm text-[var(--text-on-surface)]">{field.name}</p>
                {field.required && <span className="text-xs text-error">Obrigatório</span>}
              </div>
              <p className="text-xs text-[var(--text-on-surface-subtle)] font-mono mb-1">type: {field.type}</p>
              <p className="text-xs text-[var(--text-on-surface-muted)] mb-1">placeholder: "{field.placeholder}"</p>
              <p className="text-xs text-tech">✓ {field.validation}</p>
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
            'Validação em tempo real (email, telefone, nome)',
            'Máscara automática para telefone: (XX) XXXXX-XXXX',
            'Regex para email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/',
            'Regex para telefone: /^\\(\\d{2}\\) \\d{5}-\\d{4}$/',
            'Regex para nome: /^[a-zA-ZÀ-ÿ\\s]{3,}$/',
            'Botão desabilitado até todos os campos válidos',
            'Estados: idle, submitting, success, error',
            'Mensagens de erro personalizadas',
            'Validação ao perder foco (onBlur)',
            'Validação em tempo real após primeira interação',
            'Integração com Formspree (AJAX)',
            'Mensagem de sucesso animada',
            'Privacy note com ícone de cadeado',
            '100% responsivo',
            'Acessível (labels, aria-invalid, aria-describedby)',
          ].map(f => (
            <div key={f} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
              <Check className="w-4 h-4 text-tech flex-shrink-0" />
              <span className="text-sm text-[var(--text-on-surface-muted)]">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Validações e Máscaras</h3>
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <h4 className="font-semibold text-[var(--text-on-surface)] mb-3">📧 Validação de Email</h4>
            <CodeBlock code={`// Regex para validação de email
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

// Exemplos válidos:
// - usuario@dominio.com
// - usuario.sobrenome@dominio.com.br
// - usuario+tag@dominio.com

// Exemplos inválidos:
// - usuario@dominio
// - @dominio.com
// - usuario@.com`} />
          </div>

          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <h4 className="font-semibold text-[var(--text-on-surface)] mb-3">📱 Máscara de Telefone</h4>
            <CodeBlock code={`// Função de máscara para telefone brasileiro
const formatPhone = (value: string): string => {
  const numbers = value.replace(/\\D/g, '');
  
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 7) {
    return \`(\${numbers.slice(0, 2)}) \${numbers.slice(2)}\`;
  } else {
    return \`(\${numbers.slice(0, 2)}) \${numbers.slice(2, 7)}-\${numbers.slice(7, 11)}\`;
  }
};

// Exemplos:
// Input: "11999999999" → Output: "(11) 99999-9999"
// Input: "2188888888"  → Output: "(21) 8888-8888"
// Input: "11"          → Output: "(11)"`} />
          </div>

          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <h4 className="font-semibold text-[var(--text-on-surface)] mb-3">👤 Validação de Nome</h4>
            <CodeBlock code={`// Regex para validação de nome (mínimo 3 caracteres)
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\\s]{3,}$/;

// Aceita:
// - Letras (A-Z, a-z)
// - Caracteres acentuados (À-ÿ)
// - Espaços
// - Mínimo 3 caracteres

// Exemplos válidos:
// - João Silva
// - María García
// - Ana

// Exemplos inválidos:
// - Jo (menos de 3 caracteres)
// - João123 (números não permitidos)
// - João@ (caracteres especiais não permitidos)`} />
          </div>

          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <h4 className="font-semibold text-[var(--text-on-surface)] mb-3">✅ Validação em Tempo Real</h4>
            <CodeBlock code={`// Validação ocorre em dois momentos:

// 1. Ao perder foco (onBlur)
const handleBlur = (e) => {
  const { name, value } = e.target;
  setTouched(prev => ({ ...prev, [name]: true }));
  const error = validateField(name, value);
  setErrors(prev => ({ ...prev, [name]: error }));
};

// 2. Em tempo real (após primeira interação)
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  if (touched[name]) {
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }
};

// Botão só é habilitado quando todos os campos são válidos
const isFormValid = () => {
  return (
    NAME_REGEX.test(formData.name) &&
    EMAIL_REGEX.test(formData.email) &&
    PHONE_REGEX.test(formData.whatsapp) &&
    formData.service !== ''
  );
};`} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Mensagens de Erro</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { field: 'Nome', error: 'Nome é obrigatório', condition: 'Campo vazio' },
            { field: 'Nome', error: 'Nome deve ter pelo menos 3 caracteres', condition: 'Menos de 3 caracteres' },
            { field: 'Email', error: 'Email é obrigatório', condition: 'Campo vazio' },
            { field: 'Email', error: 'Email inválido. Exemplo: seu@email.com', condition: 'Formato incorreto' },
            { field: 'WhatsApp', error: 'WhatsApp é obrigatório', condition: 'Campo vazio' },
            { field: 'WhatsApp', error: 'Telefone inválido. Formato: (11) 99999-9999', condition: 'Formato incorreto' },
            { field: 'Serviço', error: 'Selecione um serviço', condition: 'Nenhuma opção selecionada' },
          ].map((item, i) => (
            <div key={i} className="rounded-lg border border-error/20 bg-error/5 p-3">
              <p className="text-xs text-error font-semibold mb-1">{item.field}</p>
              <p className="text-sm text-[var(--text-on-surface)] mb-1">"{item.error}"</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">Condição: {item.condition}</p>
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

function TableSection() {
  const pricingColumns = [
    { key: 'plan', label: 'Plano' },
    { key: 'price', label: 'Preço', align: 'right' as const },
    { key: 'features', label: 'Recursos' },
    { key: 'cta', label: 'Ação', align: 'center' as const },
  ];

  const pricingData = [
    {
      plan: 'Starter',
      price: 'R$ 97/mês',
      features: '1 site, 5 páginas, SEO básico',
      cta: <Button variant="ghost" size="sm">Escolher</Button>,
    },
    {
      plan: 'Professional',
      price: 'R$ 297/mês',
      features: '3 sites, páginas ilimitadas, SEO avançado',
      cta: <Button variant="tech" size="sm">Escolher</Button>,
    },
    {
      plan: 'Enterprise',
      price: 'R$ 997/mês',
      features: 'Sites ilimitados, suporte prioritário, API',
      cta: <Button variant="primary" size="sm">Escolher</Button>,
    },
  ];

  const metricsColumns = [
    { key: 'metric', label: 'Métrica' },
    { key: 'value', label: 'Valor', align: 'right' as const },
    { key: 'change', label: 'Variação', align: 'right' as const },
  ];

  const metricsData = [
    { metric: 'Leads gerados', value: '1.247', change: <span className="text-success">+23%</span> },
    { metric: 'Taxa de conversão', value: '4.8%', change: <span className="text-success">+12%</span> },
    { metric: 'Tempo médio de resposta', value: '2.3h', change: <span className="text-success">-45%</span> },
    { metric: 'Satisfação do cliente', value: '98%', change: <span className="text-success">+5%</span> },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        
        <div className="space-y-8">
          <div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-3">Tabela de Preços (com hover e botões)</p>
            <Table columns={pricingColumns} data={pricingData} hover />
          </div>

          <div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-3">Tabela de Métricas (com variação colorida)</p>
            <Table columns={metricsColumns} data={metricsData} striped hover />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'columns', type: 'Array<{key: string, label: string, align?: "left" | "center" | "right"}>', default: '—', description: 'Definição das colunas da tabela' },
          { name: 'data', type: 'Array<Record<string, ReactNode>>', default: '—', description: 'Dados da tabela (array de objetos)' },
          { name: 'striped', type: 'boolean', default: 'false', description: 'Linhas alternadas com fundo sutil' },
          { name: 'hover', type: 'boolean', default: 'true', description: 'Destaque na linha ao passar o mouse' },
          { name: 'bordered', type: 'boolean', default: 'false', description: 'Bordas em todas as células' },
          { name: 'compact', type: 'boolean', default: 'false', description: 'Padding reduzido para tabelas densas' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<Table
  columns={[
    { key: 'plan', label: 'Plano' },
    { key: 'price', label: 'Preço', align: 'right' },
    { key: 'features', label: 'Recursos' },
    { key: 'cta', label: 'Ação', align: 'center' },
  ]}
  data={[
    {
      plan: 'Starter',
      price: 'R$ 97/mês',
      features: '1 site, 5 páginas, SEO básico',
      cta: <Button variant="ghost" size="sm">Escolher</Button>,
    },
    {
      plan: 'Professional',
      price: 'R$ 297/mês',
      features: '3 sites, páginas ilimitadas, SEO avançado',
      cta: <Button variant="tech" size="sm">Escolher</Button>,
    },
  ]}
  hover
  striped
/>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Colunas com alinhamento configurável (left, center, right)',
            'Linhas com hover effect (tech/5)',
            'Modo striped (linhas alternadas)',
            'Suporte a qualquer ReactNode nas células (botões, badges, ícones)',
            'Overflow horizontal em telas pequenas',
            'Borda arredondada no container',
            'Header com fundo sutil',
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
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Casos de Uso</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
          <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
            <li>✅ <strong>Tabelas de preços:</strong> Compare planos com CTAs em cada linha</li>
            <li>✅ <strong>Dashboards:</strong> Exiba métricas com variação colorida (verde/vermelho)</li>
            <li>✅ <strong>Listas de features:</strong> Compare recursos entre produtos</li>
            <li>✅ <strong>Dados financeiros:</strong> Valores monetários alinhados à direita</li>
            <li>✅ <strong>Relatórios:</strong> Tabelas densas com modo compact</li>
            <li>❌ <strong>Evite em mobile:</strong> Para muitas colunas, considere cards ou accordion</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Variações</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-3">Compact (padding reduzido)</p>
            <Table 
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Nome' },
                { key: 'status', label: 'Status' },
              ]}
              data={[
                { id: '#001', name: 'Site Institucional', status: <span className="text-success">● Ativo</span> },
                { id: '#002', name: 'Landing Page', status: <span className="text-success">● Ativo</span> },
                { id: '#003', name: 'CRM Dashboard', status: <span className="text-warning">● Em desenvolvimento</span> },
              ]}
              compact
              hover
            />
          </div>

          <div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-3">Striped (linhas alternadas)</p>
            <Table 
              columns={[
                { key: 'month', label: 'Mês' },
                { key: 'leads', label: 'Leads', align: 'right' as const },
                { key: 'conversion', label: 'Conversão', align: 'right' as const },
              ]}
              data={[
                { month: 'Janeiro', leads: '142', conversion: '3.2%' },
                { month: 'Fevereiro', leads: '189', conversion: '4.1%' },
                { month: 'Março', leads: '234', conversion: '4.8%' },
                { month: 'Abril', leads: '287', conversion: '5.2%' },
              ]}
              striped
              hover
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSectionDocs() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="rounded-xl border border-[var(--surface-border)] overflow-hidden">
          <HeroSection
            eyebrow="Tecnologia que gera resultado"
            headline={<>Transforme Sua Empresa com <span className="gradient-text-tech">Tecnologia</span></>}
            headlineText="Transforme Sua Empresa com Tecnologia"
            ctaPrimary="Quero Escalar Meu Negócio"
            ctaPrimaryHref="#contato"
            logo={<svg width="60" height="29" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"></path><path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"></path></svg>}
            logoText="Marketing Digital"
          />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'headline', type: 'string | ReactNode', default: '—', description: 'Título principal do hero (suporta <span> para destaque)' },
          { name: 'headlineText', type: 'string', default: 'undefined', description: 'Texto plano para as camadas RGB do glitch quando headline é JSX (sem ele, o glitch não aplica)' },
          { name: 'subheadline', type: 'string | undefined', default: 'undefined', description: 'Subtítulo opcional — não renderiza se omitido' },
          { name: 'ctaPrimary', type: 'string', default: '—', description: 'Texto do botão CTA principal' },
          { name: 'ctaSecondary', type: 'string | undefined', default: 'undefined', description: 'Texto do CTA secundário (opcional — omita para hero com CTA único)' },
          { name: 'ctaPrimaryHref', type: 'string', default: "'#'", description: 'URL do CTA principal' },
          { name: 'ctaSecondaryHref', type: 'string', default: "'#'", description: 'URL do CTA secundário' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<HeroSection
  headline={<>Transforme Sua Empresa com <span className="gradient-text-tech">Tecnologia</span></>}
  headlineText="Transforme Sua Empresa com Tecnologia"
  ctaPrimary="Quero Escalar Meu Negócio"
  ctaPrimaryHref="#contato"
/>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Headline com stagger animation (palavra por palavra)',
            'GlitchText no headline (RGB split; Tecnologia mantém azul via gradient-text-tech)',
            'Badge (eyebrow) customizável via prop eyebrow',
            'Partículas tsParticles no background',
            'Gradientes radiais decorativos',
            'CTA único (CTA secundário opcional via prop ctaSecondary)',
            'Scroll indicator animado',
            'Subheadline opcional (fade-in + blur)',
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
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Animações</h3>
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">Stagger Animation</p>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-3">
              Cada palavra do headline aparece com delay de 80ms, criando um efeito de cascata suave.
            </p>
            <CodeBlock code={`// Delay calculado automaticamente
words.forEach((word, i) => {
  setTimeout(() => {
    word.style.opacity = '1';
    word.style.transform = 'translateY(0)';
  }, 200 + i * 80);
});`} />
          </div>

          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">Partículas Interativas</p>
            <p className="text-sm text-[var(--text-on-surface-muted)]">
              60 partículas ciano com links entre elas. Reagem ao mouse (grab) e clique (push). Reduzidas para 30 em mobile.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Dicas de Conteúdo</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
          <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
            <li>✅ <strong>Headline direto:</strong> Máximo 8-10 palavras, foque no benefício principal</li>
            <li>✅ <strong>Subheadline explicativo:</strong> Complemente o headline com detalhes (2-3 linhas)</li>
            <li>✅ <strong>CTAs claros:</strong> Use verbos de ação ("Quero", "Agendar", "Começar")</li>
            <li>✅ <strong>Destaque palavras-chave:</strong> Use gradient-text-tech em termos importantes</li>
            <li>❌ <strong>Evite jargões:</strong> "Soluções sinérgicas" → "Resultados reais"</li>
            <li>❌ <strong>Não seja genérico:</strong> "O melhor do mercado" → "+150 empresas satisfeitas"</li>
          </ul>
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
          { name: 'logo', type: 'ReactNode', default: 'Logo SVG', description: 'Logo da empresa (SVG ou imagem)' },
          { name: 'links', type: 'Array<{label: string, href: string}>', default: '[]', description: 'Links de navegação' },
          { name: 'ctaText', type: 'string', default: "'Diagnóstico Gratuito'", description: 'Texto do botão CTA' },
          { name: 'ctaHref', type: 'string', default: "'#'", description: 'URL do botão CTA' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<Navbar
  links={[
    { label: 'Serviços', href: '#servicos' },
    { label: 'Cases', href: '#cases' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ]}
  ctaText="Diagnóstico Gratuito"
  ctaHref="#contato"
/>

// Com logo customizado
<Navbar
  logo={<img src="/logo.png" alt="Max Ebina" className="h-10" />}
  links={[...]}
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

function FooterSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="rounded-xl border border-[var(--surface-border)] overflow-hidden">
          <Footer />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'logo', type: 'string', default: "'MAX'", description: 'Texto do logo' },
          { name: 'links', type: 'Array<{title: string, items: Array<{label: string, href: string}>}>', default: '[]', description: 'Seções de links do footer' },
          { name: 'social', type: 'Array<{platform: string, href: string, icon: ReactNode}>', default: '[]', description: 'Links de redes sociais' },
          { name: 'copyright', type: 'string', default: "'© 2026 Max Ebina. Todos os direitos reservados.'", description: 'Texto de copyright' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<Footer
  logo="MAX"
  links={[
    {
      title: 'Serviços',
      items: [
        { label: 'Sites Institucionais', href: '#sites' },
        { label: 'Landing Pages', href: '#landing-pages' },
        { label: 'SaaS', href: '#saas' },
      ],
    },
    {
      title: 'Empresa',
      items: [
        { label: 'Sobre Nós', href: '#sobre' },
        { label: 'Cases', href: '#cases' },
        { label: 'Contato', href: '#contato' },
      ],
    },
  ]}
  social={[
    { platform: 'Instagram', href: 'https://instagram.com/maxebina', icon: <InstagramIcon /> },
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/maxebina', icon: <LinkedInIcon /> },
  ]}
  copyright="© 2026 Max Ebina. Todos os direitos reservados."
/>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Logo com gradiente tech',
            'Descrição da empresa',
            'Links organizados em colunas',
            'Ícones de redes sociais',
            'Barra inferior com copyright',
            'Links legais (Privacidade, Termos, Cookies)',
            '100% responsivo (grid adaptativo)',
            'Background escuro com borda sutil',
          ].map(f => (
            <div key={f} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
              <Check className="w-4 h-4 text-tech flex-shrink-0" />
              <span className="text-sm text-[var(--text-on-surface-muted)]">{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Estrutura do Footer</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-[var(--text-on-surface)] mb-2">📍 Coluna 1 (Logo + Descrição)</p>
              <ul className="text-[var(--text-on-surface-muted)] space-y-1 ml-4">
                <li>• Logo com gradiente</li>
                <li>• Descrição da empresa (max 2 linhas)</li>
                <li>• Ícones de redes sociais</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-on-surface)] mb-2">📍 Colunas 2-4 (Links)</p>
              <ul className="text-[var(--text-on-surface-muted)] space-y-1 ml-4">
                <li>• Título da seção</li>
                <li>• Lista de links (4-6 itens)</li>
                <li>• Hover com cor tech</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-on-surface)] mb-2">📍 Barra Inferior</p>
              <ul className="text-[var(--text-on-surface-muted)] space-y-1 ml-4">
                <li>• Copyright à esquerda</li>
                <li>• Links legais à direita</li>
                <li>• Borda superior sutil</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Dicas de Conteúdo</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
          <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
            <li>✅ <strong>Descrição concisa:</strong> Máximo 2 linhas explicando o que a empresa faz</li>
            <li>✅ <strong>Links organizados:</strong> Agrupe por tema (Serviços, Empresa, Legal)</li>
            <li>✅ <strong>Redes sociais:</strong> Apenas as que você mantém ativas</li>
            <li>✅ <strong>Links legais:</strong> Privacidade e Termos são obrigatórios (LGPD)</li>
            <li>❌ <strong>Evite links quebrados:</strong> Teste todos os links antes de publicar</li>
            <li>❌ <strong>Não sobrecarregue:</strong> Máximo 6 links por coluna</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DrawerSection() {
  const [open, setOpen] = useState(false);
  const [currentWidth, setCurrentWidth] = useState<'md' | 'half' | 'threequarter'>('md');
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="rounded-xl border border-[var(--surface-border)] overflow-hidden bg-bg-dark relative min-h-[200px] p-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => { setCurrentWidth('md'); setOpen(true); }} variant="tech">Abrir (md)</Button>
          <Button onClick={() => { setCurrentWidth('half'); setOpen(true); }} variant="secondary">50% (half)</Button>
          <Button onClick={() => { setCurrentWidth('threequarter'); setOpen(true); }} variant="secondary">75% (threequarter)</Button>
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            width={currentWidth}
            title="Contexto da Drawer"
            description="Esta drawer pode ser usada para exibir informações contextuais, disclaimers e ações secundárias sem interromper o fluxo principal do usuário."
            disclaimer="As ações realizadas nesta drawer são apenas demonstrativas."
            actions={[
              { label: 'Confirmar', variant: 'primary' },
              { label: 'Cancelar', variant: 'secondary', onClick: () => setOpen(false) },
            ]}
          />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'open', type: 'boolean', default: 'false', description: 'Estado aberto/fechado' },
          { name: 'onClose', type: '() => void', default: 'undefined', description: 'Callback ao fechar' },
          { name: 'title', type: 'string', default: "'Contexto da Drawer'", description: 'Título do drawer' },
          { name: 'description', type: 'string', default: 'texto padrão', description: 'Texto explicativo' },
          { name: 'disclaimer', type: 'string', default: 'texto padrão', description: 'Aviso legal/aviso' },
          { name: 'width', type: "'sm' | 'md' | 'lg' | 'xl' | 'half' | 'threequarter'", default: "'md'", description: 'Largura do drawer: md=420px, half=50%, threequarter=75%' },
          { name: 'actions', type: 'Array<{label, href?, onClick?, variant?}>', default: "[{label:'Confirmar'}, {label:'Cancelar'}]", description: 'Botões de ação' },
        ]} />
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Abrir Drawer</Button>
<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Contexto da Drawer"
  description="Texto sobre o contexto da drawer."
  disclaimer="Aviso: conteúdo demonstrativo."
  width="half"
  actions={[
    { label: 'Confirmar', variant: 'primary' },
    { label: 'Cancelar', variant: 'secondary', onClick: () => setOpen(false) },
  ]}
/>`} />
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Slide da direita para esquerda',
            'Animação easeOutElastic',
            'Drag handle à esquerda para arrastar e fechar',
            'Overlay com blur e clique para fechar',
            'Conteúdo: título, descrição, disclaimer, ações',
            'Responsivo (max-w-[92vw])',
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

function ModalSection() {
  const [openDefault, setOpenDefault] = useState(false);
  const [openNoSlot, setOpenNoSlot] = useState(false);
  const [openSm, setOpenSm] = useState(false);
  const [openMd, setOpenMd] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="rounded-xl border border-[var(--surface-border)] overflow-hidden bg-bg-dark relative min-h-[200px] p-8 flex items-center justify-center gap-4">
          <Button onClick={() => setOpenDefault(true)} variant="tech">Abrir Modal</Button>
          <Modal open={openDefault} onClose={() => setOpenDefault(false)} title="Título do Modal" size="md" image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" actions={[{label:'Confirmar', variant:'primary'}, {label:'Cancelar', variant:'secondary', onClick:()=>setOpenDefault(false)}]}>
            <p>Conteúdo da modal com slot de imagem à esquerda e ações no footer.</p>
          </Modal>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'open', type: 'boolean', default: 'false', description: 'Estado aberto/fechado' },
          { name: 'onClose', type: '() => void', default: 'undefined', description: 'Callback ao fechar' },
          { name: 'title', type: 'string', default: "''", description: 'Título no header' },
          { name: 'image', type: 'string', default: 'undefined', description: 'URL opcional do slot à esquerda' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Largura da modal' },
          { name: 'children', type: 'ReactNode', default: 'undefined', description: 'Conteúdo' },
          { name: 'actions', type: 'Array<{label, href?, onClick?, variant?}>', default: "[{label:'Confirmar'}, {label:'Cancelar'}]", description: 'Botões de ação' },
        ]} />
      </div>
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Variações</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <p className="font-semibold text-sm mb-2">Sem slot (sm)</p>
            <Button onClick={() => setOpenNoSlot(true)} variant="tech" size="sm">Ver</Button>
            <Modal open={openNoSlot} onClose={() => setOpenNoSlot(false)} title="Sem imagem" size="sm" actions={[{label:'Fechar', variant:'secondary', onClick:()=>setOpenNoSlot(false)}]}>
              <p>Modal sem slot de imagem, apenas conteúdo e ação.</p>
            </Modal>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <p className="font-semibold text-sm mb-2">md</p>
            <Button onClick={() => setOpenMd(true)} variant="secondary" size="sm">Ver md</Button>
            <Modal open={openMd} onClose={() => setOpenMd(false)} title="Tamanho md" size="md" actions={[{label:'Fechar', variant:'secondary', onClick:()=>setOpenMd(false)}]}>
              <p>Modal de tamanho médio (640px).</p>
            </Modal>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <p className="font-semibold text-sm mb-2">lg</p>
            <Button onClick={() => setOpenLg(true)} variant="secondary" size="sm">Ver lg</Button>
            <Modal open={openLg} onClose={() => setOpenLg(false)} title="Tamanho lg" size="lg" actions={[{label:'Fechar', variant:'secondary', onClick:()=>setOpenLg(false)}]}>
              <p>Modal grande (960px).</p>
            </Modal>
          </div>
        </div>
        <div className="mt-4 text-xs text-[var(--text-on-surface-muted)]">
          <p>• <strong>Sem slot:</strong> omitir prop <code>image</code>.</p>
          <p>• <strong>Tamanhos:</strong> <code>size={"sm"}</code> (400px), <code>size={"md"}</code> (640px), <code>size={"lg"}</code> (960px).</p>
        </div>
      </div>
    </div>
  );
}

function InstagramSection() {
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');

  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];

  const slides = [
    { type: 'capa' as const, title: '5 Automações que Toda Empresa Precisa', subtitle: 'Max Ebina — Marketing Digital', caption: '5 automações que toda empresa precisa em 2026 🚀', label: 'Capa' },
    { type: 'dica' as const, title: 'Use gatilhos mentais nos seus CTAs', body: 'Urgência e escassez aumentam conversões.', number: 3, caption: 'Dica #3 — Gatilhos mentais 💡', label: 'Dica' },
    { type: 'servico' as const, title: 'Landing Pages de Alta Conversão', caption: 'Landing Pages que convertem! 📈', label: 'Serviço' },
    { type: 'prova-social' as const, title: '', metric: '+150', metricLabel: 'Projetos entregues', caption: '+150 projetos entregues! 🙏', label: 'Prova Social' },
    { type: 'cta' as const, title: 'Agende seu diagnóstico gratuito', subtitle: 'Vagas limitadas', caption: 'Diagnóstico GRATUITO! 🔗', label: 'CTA' },
  ];

  return (
    <div className="space-y-12">
      {/* Seletor de Tema */}
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">🎨 Selecione o Tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                theme === t.id 
                  ? 'border-tech scale-105 shadow-lg' 
                  : 'border-[var(--surface-border)] hover:border-tech/50'
              }`}
              aria-label={`Tema ${t.name}`}
              aria-pressed={theme === t.id}
            >
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 border-4"
                style={{ 
                  backgroundColor: t.bg,
                  borderColor: t.border
                }}
              />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-4 h-4 text-tech" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

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
        
        {/* Container com tema aplicado */}
        <div 
          data-theme={theme}
          className="space-y-12 transition-all duration-500"
          style={{
            transition: 'background-color 0.4s ease, color 0.4s ease'
          }}
        >
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

      {/* Documentação do Sistema de Temas */}
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">🎨 Sistema de Temas</h3>
        <div className="space-y-4 text-sm text-[var(--text-on-surface-muted)]">
          <p>O Design System possui 4 temas visuais para Instagram, cada um com personalidade própria:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg border border-[var(--surface-border)] p-4">
              <p className="font-semibold text-[var(--text-on-surface)] mb-2">🌙 Midnight (Padrão)</p>
              <p className="text-xs mb-2">Fundo escuro com acentos em ciano. Ideal para posts técnicos, autoridade e cases.</p>
              <p className="text-xs font-mono text-tech">bg: #0a0a0f | accent: #06B6D4</p>
            </div>
            
            <div className="rounded-lg border border-[var(--surface-border)] p-4">
              <p className="font-semibold text-[var(--text-on-surface)] mb-2">🌅 Sunrise</p>
              <p className="text-xs mb-2">Fundo quente com acentos em laranja vibrante. Perfeito para dicas, conteúdo educativo e leveza.</p>
              <p className="text-xs font-mono text-tech">bg: #FFF5E6 | accent: #FF6B35</p>
            </div>
            
            <div className="rounded-lg border border-[var(--surface-border)] p-4">
              <p className="font-semibold text-[var(--text-on-surface)] mb-2">⚡ Neon</p>
              <p className="text-xs mb-2">Fundo preto com cores neon vibrantes. Ótimo para lançamentos, promoções e urgência.</p>
              <p className="text-xs font-mono text-tech">bg: #000000 | accent: #FF006E</p>
            </div>
            
            <div className="rounded-lg border border-[var(--surface-border)] p-4">
              <p className="font-semibold text-[var(--text-on-surface)] mb-2">✨ Minimal</p>
              <p className="text-xs mb-2">Fundo off-white com preto puro. Ideal para depoimentos, citações e elegância.</p>
              <p className="text-xs font-mono text-tech">bg: #FAFAFA | accent: #1A1A1A</p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-tech/5 border border-tech/20">
            <p className="font-semibold text-tech mb-2">💡 Como criar um novo tema:</p>
            <ol className="text-xs space-y-1 list-decimal list-inside">
              <li>Adicione as variáveis CSS em <code className="text-tech">src/index.css</code></li>
              <li>Use o seletor <code className="text-tech">[data-theme="seu-tema"]</code></li>
              <li>Defina: --slide-bg, --slide-text, --slide-accent, --slide-primary, --slide-gradient</li>
              <li>Adicione o tema no array <code className="text-tech">themes</code> em InstagramSection</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Documentação do Logo nos Templates */}
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">🎯 Logo nos Templates</h3>
        <div className="space-y-4 text-sm text-[var(--text-on-surface-muted)]">
          <p>O logo Max Ebina aparece automaticamente em 4 dos 5 tipos de slide para reforçar branding e profissionalismo:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg border border-success/20 bg-success/5 p-4">
              <p className="font-semibold text-success mb-2">✅ Inclui Logo</p>
              <ul className="text-xs space-y-1">
                <li>• <strong>Capa</strong> - Identifica a marca no primeiro contato</li>
                <li>• <strong>Serviço</strong> - Reforça quem oferece o serviço</li>
                <li>• <strong>Prova Social</strong> - Aumenta credibilidade</li>
                <li>• <strong>CTA</strong> - Autoridade no call to action</li>
              </ul>
            </div>
            
            <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
              <p className="font-semibold text-warning mb-2">⚠️ Não Inclui Logo</p>
              <ul className="text-xs space-y-1">
                <li>• <strong>Dica</strong> - Evita poluição visual em conteúdo rápido</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-tech/5 border border-tech/20">
            <p className="font-semibold text-tech mb-2">📐 Especificações do Logo:</p>
            <ul className="text-xs space-y-1 list-decimal list-inside">
              <li><strong>Posição:</strong> Canto inferior direito (16% do bottom, 14% do right) - <span className="text-success">DENTRO da safe zone</span></li>
              <li><strong>Tamanho:</strong> 60x29px (slide normal) | 40x19px (mockup)</li>
              <li><strong>Opacidade:</strong> 85% (sutil mas visível)</li>
              <li><strong>Cor:</strong> Usa <code className="text-tech">var(--slide-accent)</code> (adapta ao tema)</li>
              <li><strong>Z-index:</strong> 5 (atrás do conteúdo principal)</li>
            </ul>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="font-semibold text-primary mb-2">💡 Por que o logo é importante?</p>
            <ul className="text-xs space-y-1">
              <li>• <strong>Branding consistente</strong> - Reforça a marca em todos os posts</li>
              <li>• <strong>Reconhecimento imediato</strong> - Seguidores identificam conteúdo oficial</li>
              <li>• <strong>Profissionalismo</strong> - Posts parecem mais confiáveis</li>
              <li>• <strong>Compartilhamento</strong> - Logo vai junto quando compartilham</li>
              <li>• <strong>Diferenciação</strong> - Destaca em um feed cheio de conteúdo</li>
            </ul>
          </div>
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

function BordersSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Border Radius</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'sm', value: '8px' },
            { name: 'md', value: '12px' },
            { name: 'lg', value: '16px' },
            { name: 'xl', value: '24px' },
            { name: 'full', value: '9999px' },
          ].map(r => (
            <div key={r.name} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)] text-center">
              <div
                className="w-full h-20 bg-gradient-to-br from-tech to-primary mb-3"
                style={{ borderRadius: r.value }}
              />
              <p className="font-mono text-sm text-tech">--radius-{r.name}</p>
              <p className="text-xs text-[var(--text-on-surface-muted)]">{r.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Uso Recomendado</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { radius: 'sm (8px)', use: 'Inputs, badges pequenos, tags' },
            { radius: 'md (12px)', use: 'Cards, botões, modais' },
            { radius: 'lg (16px)', use: 'Seções grandes, containers' },
            { radius: 'xl (24px)', use: 'Hero sections, cards destacados' },
            { radius: 'full (9999px)', use: 'Avatares, pills, badges circulares' },
          ].map(item => (
            <div key={item.radius} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
              <p className="font-mono text-sm text-tech mb-1">{item.radius}</p>
              <p className="text-sm text-[var(--text-on-surface-muted)]">{item.use}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplos de Código</h3>
        <CodeBlock code={`/* Border Radius no Tailwind */
.rounded-sm { border-radius: 8px; }
.rounded-md { border-radius: 12px; }
.rounded-lg { border-radius: 16px; }
.rounded-xl { border-radius: 24px; }
.rounded-full { border-radius: 9999px; }

/* Uso em componentes */
<Button className="rounded-xl" />
<Card className="rounded-2xl" />
<Avatar className="rounded-full" />`} />
      </div>
    </div>
  );
}

function IconsSection() {
  const icons = [
    'Globe', 'Layout', 'Code2', 'Bot', 'Megaphone', 'Workflow',
    'ArrowRight', 'ArrowUpRight', 'Check', 'ChevronDown', 'ChevronRight',
    'MessageCircle', 'Star', 'Loader2', 'X', 'Menu', 'Lock',
    'Sparkles', 'Zap', 'TrendingUp', 'Clock', 'Eye', 'Search',
    'Copy', 'Heart', 'Send', 'Bookmark', 'MoreHorizontal'
  ];

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Ícones Disponíveis (Lucide)</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {icons.map(icon => (
            <div key={icon} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)] text-center hover:border-tech/30 transition-colors">
              <div className="w-8 h-8 mx-auto mb-2 text-tech flex items-center justify-center">
                <span className="text-2xl">•</span>
              </div>
              <p className="text-xs font-mono text-[var(--text-on-surface-muted)] truncate">{icon}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--text-on-surface-muted)] mt-4">
          Biblioteca completa: <a href="https://lucide.dev" target="_blank" rel="noopener" className="text-tech hover:underline">lucide.dev</a>
        </p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Como Usar</h3>
        <CodeBlock code={`import { Globe, ArrowRight, Check } from 'lucide-react';

// Ícone simples
<Globe className="w-6 h-6 text-tech" />

// Ícone com tamanho customizado
<ArrowRight className="w-4 h-4" />

// Ícone com cor e preenchimento
<Check className="w-5 h-5 text-success fill-success" />

// Ícone em botão
<Button>
  Saiba mais
  <ArrowRight className="w-4 h-4 ml-2" />
</Button>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Tamanhos Padrão</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { size: 'w-4 h-4', use: 'Ícones inline, botões pequenos' },
            { size: 'w-5 h-5', use: 'Ícones padrão, inputs' },
            { size: 'w-6 h-6', use: 'Ícones destacados, cards' },
            { size: 'w-8 h-8', use: 'Ícones grandes, hero sections' },
          ].map(item => (
            <div key={item.size} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
              <p className="font-mono text-sm text-tech mb-1">{item.size}</p>
              <p className="text-xs text-[var(--text-on-surface-muted)]">{item.use}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GridSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Container</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
          <div className="max-w-6xl mx-auto bg-tech/10 border-2 border-dashed border-tech/30 rounded-lg p-4 text-center">
            <p className="text-sm text-tech font-mono">max-w-6xl (1152px)</p>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-mono text-tech">max-w-sm</p>
              <p className="text-[var(--text-on-surface-muted)]">384px</p>
            </div>
            <div>
              <p className="font-mono text-tech">max-w-md</p>
              <p className="text-[var(--text-on-surface-muted)]">448px</p>
            </div>
            <div>
              <p className="font-mono text-tech">max-w-lg</p>
              <p className="text-[var(--text-on-surface-muted)]">512px</p>
            </div>
            <div>
              <p className="font-mono text-tech">max-w-6xl</p>
              <p className="text-[var(--text-on-surface-muted)]">1152px</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Grid System</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-2">Grid 2 colunas</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-tech/10 border border-tech/30 rounded-lg p-4 text-center text-sm text-tech">Col 1</div>
              <div className="bg-tech/10 border border-tech/30 rounded-lg p-4 text-center text-sm text-tech">Col 2</div>
            </div>
          </div>
          <div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-2">Grid 3 colunas</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-tech/10 border border-tech/30 rounded-lg p-4 text-center text-sm text-tech">Col 1</div>
              <div className="bg-tech/10 border border-tech/30 rounded-lg p-4 text-center text-sm text-tech">Col 2</div>
              <div className="bg-tech/10 border border-tech/30 rounded-lg p-4 text-center text-sm text-tech">Col 3</div>
            </div>
          </div>
          <div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-2">Grid responsivo (1-2-3 colunas)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-tech/10 border border-tech/30 rounded-lg p-4 text-center text-sm text-tech">Col 1</div>
              <div className="bg-tech/10 border border-tech/30 rounded-lg p-4 text-center text-sm text-tech">Col 2</div>
              <div className="bg-tech/10 border border-tech/30 rounded-lg p-4 text-center text-sm text-tech">Col 3</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplos de Código</h3>
        <CodeBlock code={`<!-- Container centralizado -->
<div className="max-w-6xl mx-auto px-6">
  <h1>Título da Seção</h1>
</div>

<!-- Grid responsivo -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>

<!-- Flexbox com espaçamento -->
<div className="flex flex-col md:flex-row gap-6">
  <Sidebar />
  <MainContent />
</div>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Breakpoints</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'sm', value: '640px' },
            { name: 'md', value: '768px' },
            { name: 'lg', value: '1024px' },
            { name: 'xl', value: '1280px' },
            { name: '2xl', value: '1536px' },
          ].map(bp => (
            <div key={bp.name} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)] text-center">
              <p className="font-mono text-lg text-tech">{bp.name}</p>
              <p className="text-xs text-[var(--text-on-surface-muted)]">{bp.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccessibilitySection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Contraste de Cores (WCAG AA)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { bg: '#17120e', text: '#F6EEE7', ratio: '12.5:1', status: 'AAA' },
            { bg: '#F6EEE7', text: '#17120e', ratio: '12.5:1', status: 'AAA' },
            { bg: '#17120e', text: '#06B6D4', ratio: '7.2:1', status: 'AA' },
            { bg: '#ffffff', text: '#8f6424', ratio: '5.1:1', status: 'AA' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
              <div className="flex items-center justify-between mb-3">
                <div
                  className="px-4 py-2 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: item.bg, color: item.text }}
                >
                  Texto de exemplo
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${item.status === 'AAA' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-[var(--text-on-surface-muted)] font-mono">
                {item.bg} / {item.text} → {item.ratio}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Focus States</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-2">Botão com focus</p>
            <button className="px-4 py-2 bg-tech text-bg-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-tech focus:ring-offset-2 focus:ring-offset-bg-dark">
              Clique e use Tab
            </button>
          </div>
          <div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-2">Input com focus</p>
            <input
              type="text"
              placeholder="Digite aqui..."
              className="px-4 py-2 bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-tech"
            />
          </div>
          <div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-2">Link com focus</p>
            <a href="#" className="text-tech underline focus:outline-none focus:ring-2 focus:ring-tech focus:ring-offset-2 rounded">
              Link acessível
            </a>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Checklist de Acessibilidade</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Todos os botões têm aria-label descritivo',
            'Imagens têm alt text significativo',
            'Contraste mínimo de 4.5:1 para texto normal',
            'Contraste mínimo de 3:1 para texto grande',
            'Focus visible em todos os elementos interativos',
            'Navegação completa por teclado (Tab, Enter, Esc)',
            'Formulários têm labels associados',
            'Mensagens de erro são claras e específicas',
            'Animações respeitam prefers-reduced-motion',
            'Ícones têm texto alternativo quando necessário',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
              <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <span className="text-sm text-[var(--text-on-surface-muted)]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplos de Código</h3>
        <CodeBlock code={`<!-- Botão acessível -->
<button
  aria-label="Fechar modal"
  className="focus:ring-2 focus:ring-tech"
>
  <X className="w-5 h-5" />
</button>

<!-- Imagem com alt -->
<img
  src="/logo.png"
  alt="Max Ebina - Agência de Marketing Digital"
/>

<!-- Input com label -->
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-describedby="email-error"
/>

<!-- Link acessível -->
<a
  href="/cases"
  aria-label="Ver todos os cases de sucesso"
>
  Ver Cases
</a>`} />
      </div>
    </div>
  );
}

function ResponsivenessSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Breakpoints</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'sm', value: '640px', desc: 'Mobile landscape' },
            { name: 'md', value: '768px', desc: 'Tablet' },
            { name: 'lg', value: '1024px', desc: 'Laptop' },
            { name: 'xl', value: '1280px', desc: 'Desktop' },
            { name: '2xl', value: '1536px', desc: 'Large desktop' },
          ].map(bp => (
            <div key={bp.name} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)] text-center">
              <p className="font-mono text-lg text-tech">{bp.name}</p>
              <p className="text-sm text-[var(--text-on-surface)]">{bp.value}</p>
              <p className="text-xs text-[var(--text-on-surface-muted)] mt-1">{bp.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Mobile First</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
          <p className="text-sm text-[var(--text-on-surface-muted)] mb-4">
            O Design System segue a abordagem <strong>mobile-first</strong>: estilos base são para mobile, e usamos breakpoints para adicionar complexidade em telas maiores.
          </p>
          <CodeBlock code={`<!-- Mobile first: 1 coluna -->
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>

<!-- Texto responsivo -->
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  Título Responsivo
</h1>

<!-- Padding responsivo -->
<section className="px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
  Conteúdo
</section>`} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Tipografia Fluida</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
          <p className="text-sm text-[var(--text-on-surface-muted)] mb-4">
            Usamos <code className="text-tech">clamp()</code> para tipografia que escala suavemente entre breakpoints.
          </p>
          <CodeBlock code={`/* Tipografia fluida com clamp() */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
--text-3xl: clamp(1.875rem, 1.5rem + 1.8vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.8rem + 2.2vw, 3.5rem);
--text-5xl: clamp(3rem, 2.2rem + 4vw, 5rem);`} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Testando Responsividade</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { tool: 'Chrome DevTools', desc: 'F12 → Toggle device toolbar (Ctrl+Shift+M)' },
            { tool: 'Firefox Responsive', desc: 'F12 → Responsive Design Mode (Ctrl+Shift+M)' },
            { tool: 'Safari Responsive', desc: 'Develop → Enter Responsive Design Mode' },
            { tool: 'Teste em dispositivos reais', desc: 'Sempre teste em mobile e tablet físicos' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{item.tool}</p>
              <p className="text-xs text-[var(--text-on-surface-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GlitchTextSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="space-y-8">
          <div className="rounded-xl border border-[var(--surface-border)] p-12 bg-bg-dark text-center">
            <GlitchText as="h1" className="text-4xl md:text-6xl font-display font-extrabold text-bg-light tracking-wide">
              Glitch Distortion
            </GlitchText>
            <p className="text-xs text-white/40 mt-8">Passe o mouse para intensificar · clique/tap para o burst</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-tech text-center mb-6">Com glitch (default)</p>
            <SectionHeader title="Soluções que Geram Resultado" />
            <div className="my-8 border-t border-[var(--surface-border)]" />
            <p className="text-xs font-semibold uppercase tracking-widest text-tech text-center mb-6">Opt-out</p>
            <SectionHeader glitch={false} title="Sem Efeito Glitch" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props — GlitchText</h3>
        <PropsTable props={[
          { name: 'as', type: "'h1'…'h6' | 'span'", default: "'h2'", description: 'Heading level renderizado' },
          { name: 'children', type: 'string', default: '—', description: 'Texto (obrigatório; string para duplicar nas camadas RGB)' },
          { name: 'className', type: 'string', default: "''", description: 'Classes extras (tamanho, cor, font-display…)' },
        ]} />
        <p className="text-xs text-[var(--text-on-surface-muted)] mt-3">
          O SectionHeader ganhou a prop <code className="text-tech">glitch?: boolean</code> (default <code className="text-tech">true</code>) — desliga via <code className="text-tech">glitch={'{false}'}</code>.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<GlitchText as="h1" className="text-6xl font-display font-extrabold">
  Glitch Distortion
</GlitchText>

// SectionHeader já aplica por padrão
<SectionHeader title="Soluções que Geram Resultado" />
<SectionHeader glitch={false} title="Sem glitch" />`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'RGB split automático (error + tech) em todo heading',
            'Hover intensifica o glitch (0.6s infinite)',
            'Clique/tap dispara burst de shake (0.28s)',
            'Camadas decorativas com aria-hidden="true"',
            'prefers-reduced-motion: animações desativadas',
            'Cores via tokens do DS (--color-error / --color-tech)',
            'SectionHeader usa GlitchText por padrão (opt-out: glitch={false})',
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

function BadgeSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="space-y-8">
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card)] flex flex-wrap items-center gap-4">
            <Badge pulseDot>Agência de Marketing Digital</Badge>
            <Badge>Lançamento</Badge>
            <Badge size="sm">Novo</Badge>
            <Badge size="sm" pulseDot>Atualizado</Badge>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-bg-dark flex flex-wrap items-center gap-4">
            <Badge pulseDot>Agência de Marketing Digital</Badge>
            <Badge size="sm">Novo</Badge>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'children', type: 'ReactNode', default: '—', description: 'Conteúdo do badge (obrigatório)' },
          { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'sm: px-3 py-1 text-xs · md: px-4 py-2 text-sm' },
          { name: 'pulseDot', type: 'boolean', default: 'false', description: 'Dot pulsante (bg-tech animate-pulse) à esquerda do texto' },
          { name: 'className', type: 'string', default: "''", description: 'Classes extras para extensão pontual' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<Badge pulseDot>Agência de Marketing Digital</Badge>

<Badge size="sm">Novo</Badge>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Pill rounded-full com tint tech (bg-tech/10 + border-tech/20)',
            'Dot pulsante opcional (pulseDot)',
            '2 tamanhos: sm (px-3 py-1, text-xs) e md (px-4 py-2, text-sm)',
            'children aceita qualquer ReactNode',
            'className para extensão sem criar variante nova',
            'Usado no HeroSection via prop eyebrow',
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

function SectionHeaderSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="space-y-8">
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card)]">
            <SectionHeader
              eyebrow="Nossos Serviços"
              title="Soluções que Geram Resultado"
              subtitle="Cada serviço é pensado para acelerar o crescimento do seu negócio."
            />
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card)]">
            <SectionHeader
              eyebrow="Alinhado à esquerda"
              title="Título com Alinhamento Left"
              subtitle="Use align='left' para layouts assimétricos."
              align="left"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'eyebrow', type: 'string', default: 'undefined', description: 'Texto pequeno acima do título (ex: "Nossos Serviços")' },
          { name: 'title', type: 'string', default: '—', description: 'Título principal (obrigatório)' },
          { name: 'subtitle', type: 'string', default: 'undefined', description: 'Subtítulo descritivo abaixo do título' },
          { name: 'align', type: "'center' | 'left'", default: "'center'", description: 'Alinhamento do conteúdo' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<SectionHeader
  eyebrow="Nossos Serviços"
  title="Soluções que Geram Resultado"
  subtitle="Cada serviço é pensado para acelerar o crescimento do seu negócio."
  align="center"
/>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Eyebrow com cor tech e tracking-wide',
            'Título com gradiente primary→tech',
            'Subtítulo com cor muted',
            'Alinhamento configurável (center/left)',
            'Tipografia responsiva com clamp()',
            'Espaçamento consistente (mb-12)',
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

function AnimatedCounterSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <AnimatedCounter end={150} suffix="+" label="Projetos Entregues" icon={<Layout className="w-6 h-6" />} />
            <AnimatedCounter end={40} suffix="%" label="Aumento em Leads" icon={<TrendingUp className="w-6 h-6" />} />
            <AnimatedCounter end={98} suffix="%" label="Satisfação" icon={<Star className="w-6 h-6" />} />
            <AnimatedCounter end={10} suffix="+" label="Anos de Mercado" icon={<Clock className="w-6 h-6" />} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'end', type: 'number', default: '—', description: 'Valor final do contador (obrigatório)' },
          { name: 'suffix', type: 'string', default: "''", description: 'Texto após o número (ex: "+", "%", "k")' },
          { name: 'label', type: 'string', default: '—', description: 'Texto descritivo abaixo do número' },
          { name: 'icon', type: 'ReactNode', default: '—', description: 'Ícone acima do número' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<AnimatedCounter
  end={150}
  suffix="+"
  label="Projetos Entregues"
  icon={<Layout className="w-6 h-6" />}
/>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Animação de 0 até valor final em 2s',
            'IntersectionObserver (anima ao entrar no viewport)',
            'Ícone com fundo tech/10',
            'Número com gradiente tech',
            'Label com cor muted',
            'Centralizado horizontalmente',
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

function WhatsAppFloatSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card)] relative min-h-[200px]">
          <p className="text-sm text-[var(--text-on-surface-muted)] mb-4">O botão flutuante aparece no canto inferior direito da tela:</p>
          <div className="absolute bottom-8 right-8">
            <WhatsAppFloat />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'number', type: 'string', default: "'5511999999999'", description: 'Número do WhatsApp com código do país' },
          { name: 'message', type: 'string', default: "'Olá! Gostaria de saber mais sobre os serviços.'", description: 'Mensagem pré-preenchida' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<WhatsAppFloat
  number="5511999999999"
  message="Olá! Gostaria de saber mais sobre os serviços."
/>`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Posição fixa no canto inferior direito',
            'Ícone WhatsApp com cor oficial (#25D366)',
            'Animação pulse-ring (anel expansivo)',
            'Hover com scale (1.1)',
            'Link para wa.me com mensagem pré-preenchida',
            'Target _blank (abre em nova aba)',
            'Aria-label para acessibilidade',
            'Z-index 50 (sempre visível)',
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

function ScrollToTopSection() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview</h3>
        <div className="rounded-xl border border-[var(--surface-border)] p-8 bg-[var(--surface-card)] relative min-h-[200px]">
          <p className="text-sm text-[var(--text-on-surface-muted)] mb-4">O botão aparece após o scroll alcançar a seção alvo (ou `showAfter` px) — fixe a posição ao lado do `WhatsAppFloat` (preview usa `showAfter={0}` para ficar sempre visível):</p>
          <ScrollToTop showAfter={0} />
          <WhatsAppFloat />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'targetId', type: 'string', default: "'undefined'", description: 'Id da seção que dispara a exibição (ex: "servicos")' },
          { name: 'showAfter', type: 'number', default: '600', description: 'Fallback em px quando targetId não existe' },
          { name: 'offset', type: 'number', default: '200', description: 'Quantos px antes do topo da seção o botão aparece' },
          { name: 'className', type: 'string', default: "''", description: 'Classes extras (ex: reposicionar)' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo de Uso</h3>
        <CodeBlock code={`<ScrollToTop targetId="servicos" />
<WhatsAppFloat phone="5511971610688" message="Olá! Vim pelo site" />`} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            'Posição fixa bottom-6 right-24 (ao lado do WhatsAppFloat)',
            'Aparece ao alcançar a seção alvo (targetId) ou showAfter px',
            'Some no topo (scrollY ~ 0)',
            'Clique desliza ao topo e atualiza URL para /',
            'Animação ease cubic-bezier(0.34,1.56,0.64,1)',
            'Aria-label para acessibilidade',
            'Z-index 50 (mesma camada do WhatsAppFloat)',
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
              { name: 'Hero Section', component: 'HeroSection', desc: 'Headline com stagger animation, partículas, CTA único' },
              { name: 'Serviços', component: 'ServiceCard x6', desc: 'Grid 3x2 com todos os serviços da agência' },
              { name: 'Prova Social', component: 'AnimatedCounter x4', desc: 'Números animados: +150 projetos, +40% leads, 98% satisfação' },
              { name: 'Depoimentos', component: 'TestimonialCard x3', desc: 'Cards com avatar, estrelas e texto do depoimento' },
              { name: 'Lead Magnet', component: 'LeadCaptureForm', desc: 'Formulário de captura com gradiente de fundo' },
              { name: 'FAQ', component: 'FAQ', desc: '5 perguntas frequentes em accordion' },
              { name: 'Footer', component: 'Footer', desc: 'Links, redes sociais, copyright' },
              { name: 'Drawer', component: 'Drawer', desc: 'Slide dir→esq com drag handle, easeOutElastic, conteúdo modal' },
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
          {/* 1. Navbar */}
          <Navbar
            links={[
              { label: 'Serviços', href: '#servicos' },
              { label: 'Cases', href: '#cases' },
              { label: 'Depoimentos', href: '#depoimentos' },
              { label: 'FAQ', href: '#faq' },
            ]}
            ctaText="Diagnóstico Gratuito"
          />

          {/* 2. Hero Section */}
          <HeroSection
            eyebrow="Tecnologia que gera resultado"
            headline={<>Transforme Sua Empresa com <span className="gradient-text-tech">Tecnologia</span></>}
            headlineText="Transforme Sua Empresa com Tecnologia"
            ctaPrimary="Quero Escalar Meu Negócio"
            ctaPrimaryHref="#contato"
            logo={<svg width="60" height="29" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"></path><path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"></path></svg>}
            logoText="Marketing Digital"
          />

          {/* 3. Serviços */}
          <section className="py-24 px-6 bg-bg-dark">
            <div className="max-w-6xl mx-auto">
              <SectionHeader
                eyebrow="Nossos Serviços"
                title="Soluções que Geram Resultado"
                subtitle="Cada serviço é pensado para acelerar o crescimento do seu negócio com tecnologia de ponta."
              />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ServiceCard title="Sites Institucionais" description="Presença digital profissional que converte visitantes em clientes." icon="Globe" badge="Popular" />
                <ServiceCard title="Landing Pages" description="Páginas de alta conversão para campanhas de tráfego pago." icon="Layout" badge="+40% leads" />
                <ServiceCard title="SaaS" description="Plataformas web sob medida para escalar seu modelo de negócio." icon="Code2" />
                <ServiceCard title="CRM" description="Gestão inteligente de clientes e automação de vendas." icon="Bot" />
                <ServiceCard title="Tráfego Pago" description="Investimento estratégico em mídia com ROI mensurável." icon="Megaphone" />
                <ServiceCard title="Automação WhatsApp" description="Fluxos inteligentes que vendem 24h por dia." icon="Workflow" badge="Novo" />
              </div>
            </div>
          </section>

          {/* 4. Prova Social */}
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

          {/* 5. Depoimentos */}
          <section id="depoimentos" className="py-24 px-6 bg-bg-dark">
            <div className="max-w-6xl mx-auto">
              <SectionHeader eyebrow="Depoimentos" title="O que Nossos Clientes Dizem" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TestimonialCard name="Carlos Mendes" company="TechStart" role="CEO" rating={5} testimonial="A Max Ebina transformou completamente nossa presença digital. Em 3 meses, triplicamos os leads qualificados." />
                <TestimonialCard name="Ana Silva" company="ModaFit" role="Diretora" rating={5} testimonial="A automação de WhatsApp economiza 4 horas por dia da minha equipe. Resultado incrível!" />
                <TestimonialCard name="Roberto Lima" company="Construmax" role="Gerente" rating={4} testimonial="O CRM que desenvolveram é intuitivo e poderoso. Nossa taxa de conversão subiu 60%." />
              </div>
            </div>
          </section>

          {/* 6. Lead Magnet */}
          <section id="contato" className="py-24 px-6 bg-gradient-to-br from-bg-dark via-bg-dark-secondary to-bg-dark relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            </div>
            <div className="max-w-lg mx-auto relative z-10">
              <LeadCaptureForm />
            </div>
          </section>

          {/* 7. FAQ */}
          <section id="faq" className="py-24 px-6 bg-bg-dark">
            <div className="max-w-2xl mx-auto">
              <SectionHeader eyebrow="Dúvidas Frequentes" title="Perguntas e Respostas" />
              <FAQ items={[
                { question: 'Quanto tempo leva para criar um site?', answer: 'Dependendo da complexidade, um site institucional fica pronto em 2-4 semanas. Landing pages em 1-2 semanas.' },
                { question: 'Vocês fazem manutenção após a entrega?', answer: 'Sim! Oferecemos planos de manutenção mensal que incluem atualizações de segurança, backups e suporte prioritário.' },
                { question: 'Como funciona o tráfego pago?', answer: 'Criamos campanhas estratégicas no Google Ads e Meta Ads, com foco em ROI. Você acompanha tudo em relatórios semanais.' },
                { question: 'A automação de WhatsApp substitui atendentes?', answer: 'Não substitui — potencializa! A automação cuida do primeiro contato e qualificação, liberando sua equipe para fechar vendas.' },
                { question: 'Preciso ter conhecimento técnico?', answer: 'Absolutamente não! Nós cuidamos de toda a parte técnica. Você foca no seu negócio enquanto nós transformamos sua presença digital.' },
              ]} />
            </div>
          </section>

          {/* 8. Footer */}
          <Footer />
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
