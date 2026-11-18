import { useState, useEffect, useRef } from 'react';
import {
  Palette, Type, Ruler, Sparkles, Box, Layout, Image,
  BookOpen, Moon, Sun, Search, X, Menu, ChevronRight,
  Copy, Check, Eye, TrendingUp, Star, Clock, ArrowRight
} from 'lucide-react';
import {
  Badge, Button, ServiceCard, SectionHeader, TestimonialCard, GlitchText,
  FAQ, WhatsAppFloat, ScrollToTop, Navbar, LeadCaptureForm, AnimatedCounter,
  InstagramSlide, Footer, Table, Drawer, Modal
} from './components/ui';
import { PhoneMockup } from './components/PhoneMockup';
import { CodeBlock, PropsTable } from './components/DocsComponents';
import { HeroSection } from './components/HeroSection';
import { OceanBackground } from './components/OceanBackground';
import { TextScramble, getScrambleFrame, getScrambleTotalTicks } from './components/social-motion/Text/TextScramble';
import { TipsyFrame } from './components/social-motion/Text/TipsyFrame';
import { AppleTitle } from './components/social-motion/Text/AppleTitle';
import { StrokeText } from './components/social-motion/Text/StrokeText';
import { PathRun, PATH_LOGO_M_D, PATH_LOGO_E_D } from './components/social-motion/Path/PathRun';
import { PathPointer } from './components/social-motion/Path/PathPointer';
import { PathPulse } from './components/social-motion/Path/PathPulse';
import { DecoBox } from './components/social-motion/Deco/DecoBox';
import type { DecoBoxVariant } from './components/social-motion/Deco/DecoBox';
import { SocialServiceCard, SERVICE_FAMILIES } from './components/social-motion/Services';
import type { ServiceCardAspect } from './components/social-motion/Services';
import { SceneBackdrop, BG_PRESETS, StepsList, ReelProgress, MarqueeTape, SceneOverlay } from './components/social-motion/Scene';
import type { SceneBackdropPreset } from './components/social-motion/Scene';
import { CtaButton } from './components/social-motion/Deco/CtaButton';
import { StickerPop } from './components/social-motion/Deco/StickerPop';
import { ConfettiBurst } from './components/social-motion/Deco/ConfettiBurst';
import { DecoProgressRing } from './components/social-motion/Deco/DecoProgressRing';
import { DecoCounter } from './components/social-motion/Deco/DecoCounter';
import { LottieDeco } from './components/social-motion/Deco/LottieDeco';

type Section = 'logo' | 'colors' | 'typography' | 'spacing' | 'motion' | 'glitch-text' | 'buttons' | 'badge' | 'cards' | 'forms' | 'table' | 'section-header' | 'animated-counter' | 'whatsapp-float' | 'scroll-to-top' | 'navbar' | 'hero' | 'faq' | 'testimonials' | 'footer' | 'social-motion' | 'social-motion-principios' | 'social-motion-transicoes' | 'social-motion-cena-timeline' | 'social-motion-fundos' | 'social-motion-textos' | 'social-motion-cards' | 'social-motion-path' | 'social-motion-servicos' | 'social-motion-numbers' | 'social-motion-cta' | 'social-motion-passos' | 'social-motion-endcard' | 'social-motion-extras' | 'instagram' | 'brand-voice' | 'preview' | 'accessibility' | 'responsiveness' | 'icons' | 'borders' | 'grid' | 'drawer' | 'modal';

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
  { id: 'social-motion-cena-timeline', label: 'Cena & Timeline', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-fundos', label: 'Fundos em Motion', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-textos', label: 'Textos Animados', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-cards', label: 'Cards & Boxes', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-path', label: 'Path Motion', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-servicos', label: 'Serviços', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-numbers', label: 'Numbers & Data', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-cta', label: 'CTA Animado', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-passos', label: 'Passos', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-endcard', label: 'End Card', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'social-motion-extras', label: 'Extras', group: '🎬 Social Studio', icon: <Sparkles className="w-4 h-4" /> },
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
          {activeSection === 'social-motion-cena-timeline' && <SocialMotionCenaTimelineSection />}
          {activeSection === 'social-motion-fundos' && <SocialMotionFundosSection />}
          {activeSection === 'social-motion-textos' && <SocialMotionTextosSection />}
          {activeSection === 'social-motion-cards' && <SocialMotionCardsSection />}
          {activeSection === 'social-motion-path' && <SocialMotionPathSection />}
          {activeSection === 'social-motion-servicos' && <SocialMotionServicosSection />}
          {activeSection === 'social-motion-numbers' && <SocialMotionNumbersSection />}
          {activeSection === 'social-motion-cta' && <SocialMotionCtaSection />}
          {activeSection === 'social-motion-passos' && <SocialMotionPassosSection />}
          {activeSection === 'social-motion-endcard' && <SocialMotionEndCardSection />}
          {activeSection === 'social-motion-extras' && <SocialMotionExtrasSection />}
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
    { id: 'social-motion-cena-timeline', label: 'Cena & Timeline', desc: 'Composição multi-cena, timeline determinística e export.' },
    { id: 'social-motion-fundos', label: 'Fundos em Motion', desc: 'Motion da camada de fundo por cena/tema (transiciona o BG, depois entram os elementos).' },
    { id: 'social-motion-textos', label: 'Textos Animados', desc: 'Letras, palavras e linhas com stagger.' },
    { id: 'social-motion-cards', label: 'Cards & Boxes', desc: 'Cards com entrada escalonada e pop.' },
    { id: 'social-motion-path', label: 'Path Motion', desc: 'Setas e elementos seguindo um caminho.' },
    { id: 'social-motion-numbers', label: 'Numbers & Data', desc: 'Big numbers, barras e contadores.' },
    { id: 'social-motion-cta', label: 'CTA Animado', desc: 'Botão com pulso e flutuação em loop.' },
    { id: 'social-motion-passos', label: 'Passos', desc: 'Passos numerados com stagger.' },
    { id: 'social-motion-endcard', label: 'End Card', desc: 'Frame final com logo, CTA e handle.' },
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

const SOCIAL_MOTION_SMOOTH = 'cubic-bezier(0.16, 1, 0.3, 1)';

function TransitionCurrentScene({ style = {} as React.CSSProperties }) {
  return (
    <div className="absolute inset-0" style={{ background: 'var(--slide-bg)', ...style }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--slide-text-muted)' }}>SLIDE ATUAL</p>
        <p className="font-display font-bold" style={{ color: 'var(--slide-text)', fontSize: 22 }}>Conteúdo atual</p>
      </div>
    </div>
  );
}

function TransitionNextScene({ show, mode = 'fade' }: { show: boolean; mode?: 'fade' | 'up' | 'pop' }) {
  const tr = 'opacity 420ms ' + SOCIAL_MOTION_SMOOTH + ' 140ms, transform 420ms ' + SOCIAL_MOTION_SMOOTH + ' 140ms';
  const hidden = mode === 'up' ? 'translateY(10px)' : mode === 'pop' ? 'scale(0.96)' : 'translateY(6px)';
  return (
    <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, color-mix(in srgb, var(--slide-accent) 22%, var(--slide-bg)) 0%, var(--slide-bg) 55%, color-mix(in srgb, var(--slide-primary, var(--slide-accent)) 18%, var(--slide-bg)) 100%)' }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center" style={{ opacity: show ? 1 : 0, transform: show ? 'none' : hidden, transition: tr }}>
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--slide-accent)' }}>PRÓXIMO SLIDE</p>
        <p className="font-display font-bold" style={{ color: 'var(--slide-text)', fontSize: 22 }}>Novo conteúdo</p>
        <span className="mt-3 px-3 py-1 rounded-full text-[10px] font-semibold" style={{ color: 'var(--slide-accent)', border: '1px solid color-mix(in srgb, var(--slide-accent) 45%, transparent)' }}>BG + elementos</span>
      </div>
    </div>
  );
}

function TransitionSliceOfCurrent({ rows, cols, row, col, cellStyle, overlapX = 1, overlapY = 1 }: { rows: number; cols: number; row: number; col: number; cellStyle: React.CSSProperties; overlapX?: number; overlapY?: number }) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: `${overlapX * 100}%`,
        height: `${overlapY * 100}%`,
        marginLeft: `${-(overlapX - 1) * 50}%`,
        marginTop: `${-(overlapY - 1) * 50}%`,
        zIndex: 2,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: `${(cols / overlapX) * 100}%`,
          height: `${(rows / overlapY) * 100}%`,
          left: `${(-col / overlapX) * 100}%`,
          top: `${(-row / overlapY) * 100}%`,
          ...cellStyle,
        }}
      >
        <TransitionCurrentScene />
      </div>
    </div>
  );
}

function SocialMotionTransicoesSection() {
  const [active, setActive] = useState<string | null>(null);
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');
  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];
  const smooth = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const elastic = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
  const trigger = (id: string) => { setActive(id); setTimeout(() => setActive(null), 1600); };
  const transitions = [
    { id: 'fade', name: 'Fade', dur: '300ms', ease: 'Smooth', desc: 'Atual (BG+conteúdo) permanece visível; próximo entra por opacity revelando seu BG e elementos.' },
    { id: 'slide', name: 'Slide', dur: '600ms', ease: 'Smooth', desc: 'Atual sai e próximo entra com seu BG+elementos (ambos visíveis na troca).' },
    { id: 'zoom', name: 'Zoom', dur: '600ms', ease: 'Elastic', desc: 'Próximo (BG+elementos) revela por scale/opacity sobre o atual.' },
    { id: 'wipe', name: 'Wipe', dur: '600ms', ease: 'Smooth', desc: 'Recorte do próximo revela seu BG+elementos sobre o BG atual.' },
    { id: 'blur', name: 'BlurIn', dur: '600ms', ease: 'Smooth', desc: 'Próximo entra com blur→foco sobre o atual visível.' },
    { id: 'push', name: 'Push/Cover', dur: '600ms', ease: 'Smooth', desc: 'Próximo (BG+elementos) empurra/cobre; atual permanece visível durante a troca.' },
    { id: 'curtain', name: 'Cortina Faixas', dur: '600ms', ease: 'Smooth', desc: 'Faixas (fatias) do BG atual saem em stagger, revelando BG+elementos do próximo.' },
    { id: 'grid', name: 'Grid 4×3', dur: '600ms', ease: 'Smooth', desc: '12 retângulos (fatias) do BG atual animam e revelam o próximo.' },
    { id: 'flip', name: 'Flip 3D', dur: '600ms', ease: 'Smooth', desc: 'Quadrantes (fatias) do BG atual viram, revelando BG+elementos do próximo.' },
    { id: 'diagonal', name: 'Diagonal', dur: '600ms', ease: 'Smooth', desc: 'Painéis (fatias) do BG atual deslizam na diagonal, revelando o próximo.' },
    { id: 'iris', name: 'Círculo Iris', dur: '600ms', ease: 'Smooth', desc: 'Círculo central revela BG+elementos do próximo sobre o atual.' },
    { id: 'venetian', name: 'Venetian', dur: '600ms', ease: 'Smooth', desc: 'Faixas horizontais (fatias) do BG atual abrem em stagger, revelando o próximo.' },
    { id: 'diamond', name: 'Diamond', dur: '600ms', ease: 'Smooth', desc: 'Retângulos 4×3 (fatias) do BG atual saem do centro→fora, revelando o próximo.' },
    { id: 'checkerboard', name: 'Checkerboard', dur: '600ms', ease: 'Smooth', desc: '12 retângulos (fatias) do BG atual em xadrez saem em stagger, revelando o próximo.' },
    { id: 'glitch', name: 'Glitch', dur: '600ms', ease: 'Smooth', desc: 'Fatias 6×4 do BG atual deslizam com jitter (delay determinístico por célula), revelando o próximo.' },
    { id: 'rgb-split', name: 'RGB Split', dur: '600ms', ease: 'Smooth', desc: 'Próximo entra com aberração cromática (drop-shadow accent/primary) e translateX que se anulam no fim.' },
  ];
  const ease = (id: string) => (id === 'zoom' ? elastic : smooth);



  const getPreview = (id: string, isActive: boolean) => {
    const e = ease(id);
    if (id === 'fade') return (<><TransitionCurrentScene /><div className="absolute inset-0" style={{ opacity: isActive ? 1 : 0, transition: 'opacity 300ms ' + smooth }}><TransitionNextScene show={isActive} /></div></>);
    if (id === 'slide') return (<><div className="absolute inset-0" style={{ transform: isActive ? 'translateX(-100%)' : 'translateX(0)', transition: 'transform 600ms ' + e }}><TransitionCurrentScene /></div><div className="absolute inset-0" style={{ transform: isActive ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 600ms ' + e }}><TransitionNextScene show={isActive} mode="up" /></div></>);
    if (id === 'zoom') return (<><TransitionCurrentScene /><div className="absolute inset-0" style={{ opacity: isActive ? 1 : 0, transform: isActive ? 'scale(1)' : 'scale(1.06)', transition: 'all 600ms ' + e }}><TransitionNextScene show={isActive} mode="pop" /></div></>);
    if (id === 'wipe') return (<><TransitionCurrentScene /><div className="absolute inset-0" style={{ clipPath: isActive ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)', transition: 'clip-path 600ms ' + e }}><TransitionNextScene show={isActive} /></div></>);
    if (id === 'blur') return (<><TransitionCurrentScene /><div className="absolute inset-0" style={{ opacity: isActive ? 1 : 0, filter: isActive ? 'blur(0px)' : 'blur(8px)', transition: 'all 600ms ' + e }}><TransitionNextScene show={isActive} /></div></>);
    if (id === 'push') return (<><div className="absolute inset-0" style={{ transform: isActive ? 'translateX(-100%)' : 'translateX(0)', transition: 'transform 600ms ' + e }}><TransitionCurrentScene /></div><div className="absolute inset-0" style={{ transform: isActive ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 600ms ' + e }}><TransitionNextScene show={isActive} /></div></>);
    if (id === 'iris') return (<><TransitionCurrentScene /><div className="absolute inset-0" style={{ clipPath: isActive ? 'circle(120% at 50% 50%)' : 'circle(0% at 50% 50%)', transition: 'clip-path 600ms ' + e }}><TransitionNextScene show={isActive} mode="pop" /></div></>);
    if (id === 'curtain') return (<><TransitionNextScene show={isActive} /><div className="absolute inset-0 grid grid-cols-4 grid-rows-1">{[0,1,2,3].map(i => (<TransitionSliceOfCurrent key={i} rows={1} cols={4} row={0} col={i} cellStyle={{ transform: isActive ? 'scaleX(0)' : 'scaleX(1)', transformOrigin: 'left', transition: 'transform 600ms ' + e + ' ' + (i * 60) + 'ms' }} />))}</div></>);
    if (id === 'venetian') return (<><TransitionNextScene show={isActive} /><div className="absolute inset-0 grid grid-rows-6">{[0,1,2,3,4,5].map(i => (<TransitionSliceOfCurrent key={i} rows={6} cols={1} row={i} col={0} cellStyle={{ transform: isActive ? 'scaleY(0)' : 'scaleY(1)', transformOrigin: 'top', transition: 'transform 600ms ' + e + ' ' + (i * 50) + 'ms' }} />))}</div></>);
    if (id === 'diagonal') return (<><TransitionNextScene show={isActive} /><div className="absolute inset-0">{[0,1].map(i => (<div key={i} className="absolute inset-0" style={{ clipPath: i === 0 ? 'polygon(0 0,100% 0,85% 100%,0 100%)' : 'polygon(15% 0,100% 0,100% 100%,0 100%)', transform: isActive ? (i === 0 ? 'translateX(-120%)' : 'translateX(120%)') : 'translateX(0)', transition: 'transform 600ms ' + e + ' ' + (i * 80) + 'ms' }}><TransitionCurrentScene /></div>))}</div></>);
    if (id === 'grid') { const items = Array.from({ length: 12 }); return (<><TransitionNextScene show={isActive} /><div className="absolute inset-0 grid grid-cols-4 grid-rows-3" style={{ perspective: '600px' }}>{items.map((_, idx) => { const row = Math.floor(idx / 4), col = idx % 4, odd = (row + col) % 2 === 0, d = (row + col) * 50; return (<TransitionSliceOfCurrent key={idx} rows={3} cols={4} row={row} col={col} cellStyle={{ opacity: isActive ? 0 : 1, transform: isActive ? (odd ? 'rotateX(-180deg) scale(0.8)' : 'rotateY(-180deg) scale(0.8)') : 'rotateX(0) rotateY(0) scale(1)', transition: 'all 600ms ' + e + ' ' + d + 'ms', backfaceVisibility: 'hidden' }} />); })}</div></>); }
    if (id === 'flip') return (<><TransitionNextScene show={isActive} /><div className="absolute inset-0 grid grid-cols-2 grid-rows-2" style={{ perspective: '600px' }}>{[0,1,2,3].map(i => { const row = Math.floor(i / 2), col = i % 2, odd = i % 2 === 0; return (<TransitionSliceOfCurrent key={i} rows={2} cols={2} row={row} col={col} cellStyle={{ opacity: isActive ? 0 : 1, transform: isActive ? (odd ? 'rotateX(-180deg)' : 'rotateY(-180deg)') : 'rotateX(0) rotateY(0)', transition: 'all 600ms ' + e + ' ' + (i * 70) + 'ms', backfaceVisibility: 'hidden' }} />); })}</div></>);
    if (id === 'diamond') { const items = Array.from({ length: 12 }); return (<><TransitionNextScene show={isActive} /><div className="absolute inset-0 grid grid-cols-4 grid-rows-3" style={{ perspective: '600px' }}>{items.map((_, idx) => { const row = Math.floor(idx / 4), col = idx % 4, odd = (row + col) % 2 === 0, d = (Math.abs(col - 1.5) + Math.abs(row - 1)) * 70; return (<TransitionSliceOfCurrent key={idx} rows={3} cols={4} row={row} col={col} overlapX={1.03} overlapY={1.02} cellStyle={{ opacity: isActive ? 0 : 1, transform: isActive ? (odd ? 'rotateX(-180deg) scale(0.8)' : 'rotateY(-180deg) scale(0.8)') : 'rotateX(0) rotateY(0) scale(1)', transition: 'all 600ms ' + e + ' ' + d + 'ms', backfaceVisibility: 'hidden' }} />); })}</div></>); }
    if (id === 'checkerboard') { const items = Array.from({ length: 12 }); return (<><TransitionNextScene show={isActive} /><div className="absolute inset-0 grid grid-cols-4 grid-rows-3" style={{ perspective: '600px' }}>{items.map((_, idx) => { const row = Math.floor(idx / 4), col = idx % 4, even = (row + col) % 2 === 0, d = (row + col) * 40; return (<TransitionSliceOfCurrent key={idx} rows={3} cols={4} row={row} col={col} overlapX={1.01} overlapY={1.02} cellStyle={{ opacity: isActive ? 0 : 1, transform: isActive ? (even ? 'rotateY(-180deg)' : 'translateX(8px)') : (even ? 'rotateY(0)' : 'translateX(0)'), transition: 'all 600ms ' + e + ' ' + d + 'ms', backfaceVisibility: 'hidden' }} />); })}</div></>); }
    if (id === 'glitch') { const items = Array.from({ length: 24 }); return (<><TransitionNextScene show={isActive} /><div className="absolute inset-0 grid grid-cols-6 grid-rows-4">{items.map((_, idx) => { const row = Math.floor(idx / 6), col = idx % 6, d = ((row * 7 + col * 13) % 5) * 50; const dx = col % 2 === 0 ? -16 : 16, dy = row % 2 === 0 ? -10 : 10; return (<TransitionSliceOfCurrent key={idx} rows={4} cols={6} row={row} col={col} cellStyle={{ opacity: isActive ? 0 : 1, transform: isActive ? ('translate(' + dx + 'px,' + dy + 'px) scale(0.88)') : 'translate(0,0) scale(1)', transition: 'all 600ms ' + e + ' ' + d + 'ms' }} />); })}</div></>); }
    if (id === 'rgb-split') { const o = isActive ? 0 : 6; return (<><TransitionCurrentScene /><div className="absolute inset-0" style={{ opacity: isActive ? 1 : 0, transform: isActive ? 'translateX(0)' : 'translateX(10px)', filter: 'drop-shadow(' + o + 'px 0 0 var(--slide-accent)) drop-shadow(' + (-o) + 'px 0 0 var(--slide-primary, var(--slide-accent)))', transition: 'all 600ms ' + e }}><TransitionNextScene show={isActive} /></div></>); }
    return (<><TransitionCurrentScene /><TransitionNextScene show={isActive} /></>);
  };

  return (
    <div className="space-y-12">
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">Selecione o tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={'relative p-4 rounded-xl border-2 transition-all ' + (theme === t.id ? 'border-tech scale-105 shadow-lg' : 'border-[var(--surface-border)] hover:border-tech/50')} aria-label={'Tema ' + t.name} aria-pressed={theme === t.id}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 border-4" style={{ backgroundColor: t.bg, borderColor: t.border }} />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (<div className="absolute top-2 right-2"><Check className="w-4 h-4 text-tech" /></div>)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">Regra (todas as transições)</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]"><strong>BG/slide atual</strong> sai com o efeito escolhido enquanto o <strong>próximo slide/BG</strong> já está por baixo e é revelado. Fragmentos = <strong>fatias do BG atual</strong> saindo. Reduced-motion = fade/corte; determinístico para export.</p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Previews (clique): atual → próximo</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] mb-6">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input type="checkbox" checked={showSafeZone} onChange={(e) => setShowSafeZone(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech relative"></div>
            <span className="text-sm font-medium text-[var(--text-on-surface)] flex items-center gap-2"><Eye className="w-4 h-4" />Mostrar área de segurança</span>
          </label>
        </div>
        <div className="grid md:grid-cols-3 gap-4" data-theme={theme}>
          {transitions.map(t => (
            <div key={t.id} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
              <button onClick={() => trigger(t.id)} className="w-full text-left">
                <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden border border-[var(--surface-border)]">
                  {getPreview(t.id, active === t.id)}
                  {showSafeZone && (<><div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} /><div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div></>)}
                </div>
              </button>
              <div className="flex items-center gap-2 mt-3"><p className="font-display font-bold text-[var(--text-on-surface)]">{t.name}</p><span className="text-xs font-mono text-tech">{t.dur} · {t.ease}</span></div>
              <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Quando usar</h3>
        <Table columns={[{ key: 'name', label: 'Transição' }, { key: 'when', label: 'Quando usar' }, { key: 'dur', label: 'Duração' }]} data={transitions.map(t => ({ name: t.name, when: t.desc, dur: t.dur + ' ' + t.ease }))} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Contrato</h3>
        <PropsTable props={[
          { name: 'regra', type: 'composição', default: '-', description: 'Outgoing (BG atual) visível → incoming (próximo BG+elementos) revelado. Fragmentos = fatias do BG atual.' },
          { name: 'duration', type: '300|600', default: '600', description: 'Determinístico (export/capture); fade curto, demais 600ms + stagger.' },
          { name: 'easing', type: 'Smooth|Elastic', default: 'Smooth', description: 'Smooth padrão; Elastic em zoom.' },
          { name: 'reduced-motion', type: 'a11y', default: 'fade/cut', description: 'Respeitar prefers-reduced-motion.' },
          { name: 'engine', type: 'SceneTransitionType', default: 'fade', description: 'ReelTimeline (export): fade|slide-up|slide-left|wipe-up|wipe|zoom|blur|iris|checkerboard|curtain|venetian|diagonal|grid|flip|diamond|glitch|rgb-split — paridade total com o preview.' },
        ]} />
      </div>
    </div>
  );
}

const APPLE_TOP = ['Tecnologia que gera resultado', 'Transforme Sua Empresa com Tecnologia'];

function SocialMotionFundosSection() {
  const [active, setActive] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');
  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];
  const trigger = (id: string) => {
    setActive(id);
    setRun((r) => r + 1); // remonta o card ativo → a entrada do SceneBackdrop roda do zero
  };
  const presets = BG_PRESETS;
  const smooth = SOCIAL_MOTION_SMOOTH;
  return (
    <div className="space-y-12">
      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">Camada de fundo (motion) por cena</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">
          Orquestração em camadas: <strong>1) BG transiciona/entra</strong> → <strong>2) elementos entram</strong> (texto, cards, CTA) com stagger.
          Mantém consistência de tema/tokens e dá contraste para transições como <em>wipe</em>. Use com <strong>Cena &amp; Timeline</strong> para duração determinística e export.
        </p>
      </div>

      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">Selecione o tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={`relative p-4 rounded-xl border-2 transition-all ${theme === t.id ? 'border-tech scale-105 shadow-lg' : 'border-[var(--surface-border)] hover:border-tech/50'}`} aria-label={`Tema ${t.name}`} aria-pressed={theme === t.id}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 border-4" style={{ backgroundColor: t.bg, borderColor: t.border }} />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (<div className="absolute top-2 right-2"><Check className="w-4 h-4 text-tech" /></div>)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-2">Exemplos de BG (clique para animar)</h3>
        <p className="text-sm text-[var(--text-on-surface-muted)] mb-6">Previews 9:16 usando tokens do tema — o conteúdo entra depois do fundo (camadas).</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" data-theme={theme}>
          {presets.map((p) => {
            const isActive = active === p.id;
            return (
              <div key={p.id} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
                <button onClick={() => trigger(p.id)} className="w-full text-left">
                  <div className="relative aspect-[9/16] w-full max-w-[220px] mx-auto rounded-lg overflow-hidden border border-[var(--surface-border)]">
                    {/* O demo consome o próprio primitivo: parado = settled (frame final),
                        clicado = remonta sem settled e a entrada anima do zero. */}
                    <SceneBackdrop
                      key={isActive ? `${p.id}-${run}` : p.id}
                      preset={p.id as SceneBackdropPreset}
                      settled={!isActive}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center" style={{ zIndex: 2, opacity: isActive ? 1 : 0, transform: isActive ? 'translateY(0)' : 'translateY(8px)', transition: `opacity 420ms ${smooth} 180ms, transform 420ms ${smooth} 180ms` }}>
                      <p className="font-display font-bold text-[var(--slide-text)]" style={{ fontSize: 18 }}>Elementos entram</p>
                      <p className="text-[11px] mt-1" style={{ color: 'var(--slide-text-muted)' }}>após o BG</p>
                    </div>
                  </div>
                </button>
                <div className="flex items-center gap-2 mt-3">
                  <p className="font-display font-bold text-[var(--text-on-surface)]">{p.name}</p>
                  <span className="text-xs font-mono text-tech">{p.id === 'shape-float' ? `${p.durationMs}ms + loop` : p.durationMs === 0 ? 'base' : `${p.durationMs}ms`}</span>
                </div>
                <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Contrato & boas práticas</h3>
        <ul className="space-y-2 text-sm text-[var(--text-on-surface-muted)] list-disc list-inside">
          <li><strong className="text-[var(--text-on-surface)]">Camadas separadas:</strong> BG abaixo do conteúdo; conteúdo respeita safe zone e legibilidade (contraste).</li>
          <li><strong className="text-[var(--text-on-surface)]">Tokens de tema:</strong> variações via <code>--slide-bg</code>/accent/gradientes do tema, sem quebrar identidade.</li>
          <li><strong className="text-[var(--text-on-surface)]">Determinístico:</strong> tempos definidos por cena; integrar ao <code>durationMs</code> total (Cena &amp; Timeline) para export.</li>
          <li><strong className="text-[var(--text-on-surface)]">Acessibilidade:</strong> respeitar <code>prefers-reduced-motion</code> (reduzir movimento/pulso; manter corte/fade simples).</li>
        </ul>
      </div>

      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="font-semibold text-[var(--text-on-surface)] mb-2">✅ Primitivo exportado: <code>SceneBackdrop</code> + <code>BG_PRESETS</code></p>
        <p className="text-sm text-[var(--text-on-surface-muted)] mb-4">Os presets acima são o próprio componente do DS — o demo consome <code>SceneBackdrop</code> (parado = <code>settled</code>, clicado = entrada anima). O app social só declara o preset por cena:</p>
        <CodeBlock code={"import { SceneBackdrop, BG_PRESETS } from '@maxebina/max-ds';\n\n<div className=\"instagram-slide\" data-theme={tema}>\n  <SceneBackdrop preset={cena.bg} delayMs={0} durationMs={600} settled={modoEstatico} />\n  {/* conteúdo por cima */}\n</div>"} />
        <div className="mt-4">
          <PropsTable props={[
            { name: 'preset', type: 'SceneBackdropPreset', default: "'solid'", description: "'solid' | 'gradient-shift' | 'accent-glow' | 'shape-float' | 'wipe-reveal' | 'zoom-bg' (BG_PRESETS traz o catálogo)." },
            { name: 'delayMs', type: 'number', default: '0', description: 'Atraso da entrada, em ms (determinístico p/ export).' },
            { name: 'durationMs', type: 'number', default: 'do preset', description: 'Duração da entrada; sobrepõe o durationMs do preset.' },
            { name: 'settled', type: 'boolean', default: 'false', description: 'Frame final sem animação = tela estática aprovada.' },
          ]} />
        </div>
      </div>
    </div>
  );
}

function SocialMotionCenaTimelineSection() {
  const transitions = [
    { key: 'none', label: 'none', dur: '0', when: 'Corte seco (usar com cuidado)' },
    { key: 'fade', label: 'fade', dur: '300–450ms', when: 'Troca suave padrão' },
    { key: 'slide-up', label: 'slide-up', dur: '450ms', when: 'Progressão/continuidade' },
    { key: 'slide-left', label: 'slide-left', dur: '450ms', when: 'Mudança de cena lateral' },
    { key: 'wipe-up', label: 'wipe-up', dur: '450ms', when: 'Revelação/virada de assunto' },
    { key: 'zoom', label: 'zoom', dur: '400–600ms', when: 'Ênfase/CTA (usar pouco)' },
  ];
  return (
    <div className="space-y-12">
      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">Composição molecular para reels/vídeo</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">
          Organismo que orquestra <strong>cenas</strong> (conteúdo) + <strong>transições</strong> + <strong>timeline determinística</strong>.
          Reutilizável entre publicações: o app de montagem (ex.: me-agencia-social) só define cenas/copy e consome a duração total para export.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Contrato da timeline (export-safe)</h3>
        <ul className="space-y-2 text-sm text-[var(--text-on-surface-muted)] list-disc list-inside">
          <li><strong className="text-[var(--text-on-surface)]">Duração determinística:</strong> <code>getReelTotalDurationMs(scenes, holdMs)</code> = soma de <code>durationMs</code> das cenas + hold final.</li>
          <li><strong className="text-[var(--text-on-surface)]">Sem interação:</strong> animação roda por tempo (autoPlay/capture), sem hover/scroll.</li>
          <li><strong className="text-[var(--text-on-surface)]">Reduced motion:</strong> respeitar <code>prefers-reduced-motion</code> (reduzir para fades/corte) para acessibilidade e previsibilidade.</li>
          <li><strong className="text-[var(--text-on-surface)]">Safe zone:</strong> conteúdo crítico dentro da área segura do formato (4:5 / 9:16).</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Transições de cena (primitivas)</h3>
        <Table columns={[{ key: 'label', label: 'Tipo' }, { key: 'dur', label: 'Duração' }, { key: 'when', label: 'Quando usar' }]} data={transitions} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Componentes / API</h3>
        <PropsTable props={[
          { name: 'ReelTimeline', type: 'component', default: '-', description: 'Player multi-cena: renderiza cena ativa, aplica transição e avança por tempo. Props: scenes, holdMs, autoPlay, loop, startAtMs, renderScene, onProgress, onComplete.' },
          { name: 'ReelSceneDef', type: 'type', default: '-', description: '{ id?, durationMs, transition?: { type, durationMs?, easing? } }' },
          { name: 'SceneTransitionType', type: 'union', default: 'fade', description: "none | fade | slide-up | slide-left | wipe-up | zoom" },
          { name: 'getReelTotalDurationMs(scenes, holdMs)', type: 'fn', default: '-', description: 'Duração total determinística para preview/export.' },
          { name: 'getSceneTransition(scene)', type: 'fn', default: '-', description: 'Resolve defaults (type/duração/easing) da transição.' },
          { name: 'SCENE_EASING / DEFAULT_TRANSITION_MS', type: 'const', default: '-', description: 'Curvas e duração padrão (450ms, smooth).' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo</h3>
        <CodeBlock code={`import { ReelTimeline, getReelTotalDurationMs, type ReelSceneDef } from '@maxebina/max-ds';

const scenes: ReelSceneDef[] = [
  { id: 'hook', durationMs: 3000, transition: { type: 'wipe-up', durationMs: 450 } },
  { id: 'oferta', durationMs: 4000, transition: { type: 'fade' } },
  { id: 'cta', durationMs: 3500, transition: { type: 'none' } },
];

const totalMs = getReelTotalDurationMs(scenes, 800); // usar no export

<ReelTimeline
  scenes={scenes}
  holdMs={800}
  autoPlay
  renderScene={({ index, scene }) => <MinhaCena id={scene.id} index={index} />}
/>`} />
      </div>

      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="font-semibold text-[var(--text-on-surface)] mb-2">Próximas moléculas (backlog do DS)</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">Primitivas de cena reutilizáveis (headline+mark, lista de pilares/cards, CTA animado com URL) e presets de transição compostos — para o app apenas compor conteúdo.</p>
      </div>
    </div>
  );
}

function SocialMotionTextosSection() {
  const [active, setActive] = useState<string | null>(null);
  const [appleRun, setAppleRun] = useState(0);
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');
  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];
  const smooth = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const trigger = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (id === 'apple') {
      setAppleRun(run => run + 1);
      setActive(id);
      return;
    }
    setActive(id);
    timeoutRef.current = setTimeout(() => setActive(null), id === 'scramble' ? 2300 : id === 'tipsy' ? 6600 : 1400);
  };

  return (
    <div className="space-y-12">
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">🎨 Selecione o Tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={`relative p-4 rounded-xl border-2 transition-all ${theme === t.id ? 'border-tech scale-105 shadow-lg' : 'border-[var(--surface-border)] hover:border-tech/50'}`} aria-label={`Tema ${t.name}`} aria-pressed={theme === t.id}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 border-4" style={{ backgroundColor: t.bg, borderColor: t.border }} />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (<div className="absolute top-2 right-2"><Check className="w-4 h-4 text-tech" /></div>)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">🎬 Textos que viram cena</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">Timeline determinística, resolução fixa (1080×1350) e safe zone obrigatória. Aqui a tipografia é a cena — RGB split, jitter e scramble de texto acontecem dentro da área segura, sem hover/scroll.</p>
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
        <p className="text-sm text-[var(--text-on-surface-muted)]">Texto crítico (`title`, `headline`) vive **dentro** da linha tracejada (`13.3%` topo, `13%` laterais, `74%` × `71.9%`).</p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview (clique para testar) — IG 4:5 · 340×425</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] mb-6">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input type="checkbox" checked={showSafeZone} onChange={(e) => setShowSafeZone(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech relative"></div>
            <span className="text-sm font-medium text-[var(--text-on-surface)] flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Mostrar área de segurança
            </span>
          </label>
        </div>
        <div className="grid md:grid-cols-3 gap-4" data-theme={theme}>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="w-full text-left">
              <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]" style={{ textShadow: '0 0 8px color-mix(in srgb, var(--slide-text) 50%, transparent)' }}>
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <GlitchText as="span" text="CTA →" className="font-display font-bold text-3xl text-[var(--slide-text)] text-center uppercase tracking-wide">CTA →</GlitchText>
                </div>
                {showSafeZone && (
                  <>
                    <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                    <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Glitch Cut</p>
              <span className="text-xs font-mono text-tech">loop · 2s infinite</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Glitch RGB em loop infinito (GlitchText do Hero), sem trigger. Tech/Digital.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <button onClick={() => trigger('scramble')} className="w-full text-left">
              <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]" style={{ textShadow: '0 0 8px color-mix(in srgb, var(--slide-text) 50%, transparent)' }}>
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  {active === 'scramble' ? (
                    <TextScramble text="Scramble" className="font-display font-bold text-3xl text-[var(--slide-text)] text-center uppercase tracking-wide" />
                  ) : (
                    <span className="font-display font-bold text-3xl text-[var(--slide-text)] text-center uppercase tracking-wide">Scramble</span>
                  )}
                </div>
                {showSafeZone && (
                  <>
                    <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                    <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                  </>
                )}
              </div>
            </button>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Text Scramble</p>
              <span className="text-xs font-mono text-tech">720ms/letra · tick 30ms</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Começa vazio, após delay cada letra embaralha 720ms em onda e resolve da esquerda p/ direita. Título tech/futuro.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <button onClick={() => trigger('tipsy')} className="w-full text-left">
              <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]" style={{ textShadow: '0 0 8px color-mix(in srgb, var(--slide-text) 50%, transparent)' }}>
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  {active === 'tipsy' ? (
                    <TipsyFrame key="playing" text="LANDING" className="font-display font-bold text-3xl text-[var(--slide-text)] text-center uppercase tracking-wide" />
                  ) : (
                    <TipsyFrame key="idle" animate={false} text="LANDING" className="font-display font-bold text-3xl text-[var(--slide-text)] text-center uppercase tracking-wide" />
                  )}
                </div>
                {showSafeZone && (
                  <>
                    <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                    <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                  </>
                )}
              </div>
            </button>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Tipsy Frame</p>
              <span className="text-xs font-mono text-tech">6000ms · Smooth</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Retângulo Primary Dark gira 180° uma vez e para — metade na frente, metade atrás do texto.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <button onClick={() => trigger('apple')} className="w-full text-left">
              <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]" style={{ textShadow: '0 0 8px color-mix(in srgb, var(--slide-text) 50%, transparent)' }}>
                <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                  {active === 'apple' ? (
                    <AppleTitle key={`playing-${appleRun}`} top={APPLE_TOP} bottom="Quero saber +" topFontSize={48} bottomFontSize={24} firstLineFontSize={16} secondLineFontSize={16} className="font-display font-bold uppercase tracking-wide" />
                  ) : (
                    <AppleTitle key="idle" animate={false} top={APPLE_TOP} bottom="Quero saber +" topFontSize={48} bottomFontSize={24} firstLineFontSize={16} secondLineFontSize={16} className="font-display font-bold uppercase tracking-wide" />
                  )}
                </div>
                {showSafeZone && (
                  <>
                    <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                    <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                  </>
                )}
              </div>
            </button>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Apple Title</p>
              <span className="text-xs font-mono text-tech">3000ms · Smooth</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Divisor entra primeiro, cada linha encosta nele empurrando a anterior para cima; o CTA desce por último.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <StrokeText text="ABCDEFGHIJKLMNOPQRSTUVWXYZ" />
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Stroke Text</p>
              <span className="text-xs font-mono text-tech">6s · loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Contorno animado em loop, sem trigger — traços tech/gold correm pelo contorno das letras.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="fx-stamp">CARIMBADO</div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Rubber Stamp</p>
              <span className="text-xs font-mono text-tech">3.2s · loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Carimbo CSS puro, sem JS — a palavra desce como tinta e desvanece. Tokens `--ink`/`--ink-2`/`--ink-3` do DS permitem re-skin.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="fx-voltage" role="img" aria-label="TRÁFEGO PAGO"><b aria-hidden="true" style={{ '--i': 0 } as React.CSSProperties}>T</b><b aria-hidden="true" style={{ '--i': 1 } as React.CSSProperties}>R</b><b aria-hidden="true" style={{ '--i': 2 } as React.CSSProperties}>Á</b><b aria-hidden="true" style={{ '--i': 3 } as React.CSSProperties}>F</b><b aria-hidden="true" style={{ '--i': 4 } as React.CSSProperties}>E</b><b aria-hidden="true" style={{ '--i': 5 } as React.CSSProperties}>G</b><b aria-hidden="true" style={{ '--i': 6 } as React.CSSProperties}>O</b><b aria-hidden="true" style={{ '--i': 7 } as React.CSSProperties}>&nbsp;</b><b aria-hidden="true" style={{ '--i': 8 } as React.CSSProperties}>P</b><b aria-hidden="true" style={{ '--i': 9 } as React.CSSProperties}>A</b><b aria-hidden="true" style={{ '--i': 10 } as React.CSSProperties}>G</b><b aria-hidden="true" style={{ '--i': 11 } as React.CSSProperties}>O</b></div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Kilovolt</p>
              <span className="text-xs font-mono text-tech">2.6s · loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Letras estalam com descarga elétrica em stagger (CSS puro, sem JS). Tokens `--ink`/`--ink-2`/`--ink-3` do DS permitem re-skin.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', containerType: 'inline-size' }}>
                <div className="fx-equalizer" role="img" aria-label="GRÁFICOS"><b aria-hidden="true" style={{ '--i': 0 } as React.CSSProperties}>G</b><b aria-hidden="true" style={{ '--i': 1 } as React.CSSProperties}>R</b><b aria-hidden="true" style={{ '--i': 2 } as React.CSSProperties}>Á</b><b aria-hidden="true" style={{ '--i': 3 } as React.CSSProperties}>F</b><b aria-hidden="true" style={{ '--i': 4 } as React.CSSProperties}>I</b><b aria-hidden="true" style={{ '--i': 5 } as React.CSSProperties}>C</b><b aria-hidden="true" style={{ '--i': 6 } as React.CSSProperties}>O</b><b aria-hidden="true" style={{ '--i': 7 } as React.CSSProperties}>S</b></div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Equalizer</p>
              <span className="text-xs font-mono text-tech">1.9s · loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Letras sobem nos picos de um medidor de áudio (CSS puro, sem JS). Tokens `--ink`/`--ink-2`/`--ink-3` do DS permitem re-skin.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="flex flex-col items-center gap-1">
                  <div className="fx-pewpew" role="img" aria-label="MARKETING"><b aria-hidden="true" style={{ '--i': 0 } as React.CSSProperties}>M</b><b aria-hidden="true" style={{ '--i': 1 } as React.CSSProperties}>A</b><b aria-hidden="true" style={{ '--i': 2 } as React.CSSProperties}>R</b><b aria-hidden="true" style={{ '--i': 3 } as React.CSSProperties}>K</b><b aria-hidden="true" style={{ '--i': 4 } as React.CSSProperties}>E</b><b aria-hidden="true" style={{ '--i': 5 } as React.CSSProperties}>T</b><b aria-hidden="true" style={{ '--i': 6 } as React.CSSProperties}>I</b><b aria-hidden="true" style={{ '--i': 7 } as React.CSSProperties}>N</b><b aria-hidden="true" style={{ '--i': 8 } as React.CSSProperties}>G</b></div>
                  <div className="fx-pewpew" role="img" aria-label="DIGITAL"><b aria-hidden="true" style={{ '--i': 9 } as React.CSSProperties}>D</b><b aria-hidden="true" style={{ '--i': 10 } as React.CSSProperties}>I</b><b aria-hidden="true" style={{ '--i': 11 } as React.CSSProperties}>G</b><b aria-hidden="true" style={{ '--i': 12 } as React.CSSProperties}>I</b><b aria-hidden="true" style={{ '--i': 13 } as React.CSSProperties}>T</b><b aria-hidden="true" style={{ '--i': 14 } as React.CSSProperties}>A</b><b aria-hidden="true" style={{ '--i': 15 } as React.CSSProperties}>L</b></div>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Pew-Pew</p>
              <span className="text-xs font-mono text-tech">3.2s · loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Letras disparam como raios laser e recapitam (CSS puro, sem JS). Tokens `--ink`/`--ink-2`/`--ink-3` do DS permitem re-skin.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="fx-loud">MAX</div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Loud</p>
              <span className="text-xs font-mono text-tech">3s · loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">A palavra incha, grita com shake violento e volta ao tamanho (CSS puro, sem JS). Tokens `--ink`/`--ink-2`/`--ink-3` do DS permitem re-skin.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="fx-rotator">ME</div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Rotator</p>
              <span className="text-xs font-mono text-tech">8s · loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Palavra rola para cima e nova entra por baixo, em 3 cores (CSS puro, sem JS). Tokens `--ink`/`--ink-2`/`--ink-3` do DS permitem re-skin.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="fx-annotate" role="img" aria-label="SaaS">SaaS<svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true"><path className="fx-annotate-ring" pathLength={100} d="M 104 8 C 58 5 22 18 12 36 C 2 56 30 82 78 90 C 126 98 178 88 190 68 C 202 48 170 20 122 10 C 108 7 92 6 78 8" /><path className="fx-annotate-line" pathLength={100} d="M 30 82 C 52 76 68 86 92 80 S 132 74 152 82 S 168 84 172 78" /></svg></div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Margin-Note</p>
              <span className="text-xs font-mono text-tech">5.2s · loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Círculo e sublinhado de caneta vermelha anotam a palavra (CSS puro, sem JS). Tokens `--ink`/`--ink-2`/`--ink-3` do DS permitem re-skin.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="fx-synthwave">UAU</div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Synth-Sunset</p>
              <span className="text-xs font-mono text-tech">6s · loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Gradiente retrô com scanlines e grade em perspectiva (CSS puro, sem JS). Tokens `--ink`/`--ink-2`/`--ink-3` do DS permitem re-skin.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="flex flex-col items-center gap-6">
                  <div className="fx-stretch" role="img" aria-label="Automação"><b aria-hidden="true" style={{ '--i': 0 } as React.CSSProperties}>A</b><b aria-hidden="true" style={{ '--i': 1 } as React.CSSProperties}>u</b><b aria-hidden="true" style={{ '--i': 2 } as React.CSSProperties}>t</b><b aria-hidden="true" style={{ '--i': 3 } as React.CSSProperties}>o</b><b aria-hidden="true" style={{ '--i': 4 } as React.CSSProperties}>m</b><b aria-hidden="true" style={{ '--i': 5 } as React.CSSProperties}>a</b><b aria-hidden="true" style={{ '--i': 6 } as React.CSSProperties}>ç</b><b aria-hidden="true" style={{ '--i': 7 } as React.CSSProperties}>ã</b><b aria-hidden="true" style={{ '--i': 8 } as React.CSSProperties}>o</b></div>
                  <div className="fx-stretch" role="img" aria-label="WhatsApp"><b aria-hidden="true" style={{ '--i': 9 } as React.CSSProperties}>W</b><b aria-hidden="true" style={{ '--i': 10 } as React.CSSProperties}>h</b><b aria-hidden="true" style={{ '--i': 11 } as React.CSSProperties}>a</b><b aria-hidden="true" style={{ '--i': 12 } as React.CSSProperties}>t</b><b aria-hidden="true" style={{ '--i': 13 } as React.CSSProperties}>s</b><b aria-hidden="true" style={{ '--i': 14 } as React.CSSProperties}>A</b><b aria-hidden="true" style={{ '--i': 15 } as React.CSSProperties}>p</b><b aria-hidden="true" style={{ '--i': 16 } as React.CSSProperties}>p</b></div>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Stretch-Club</p>
              <span className="text-xs font-mono text-tech">3.6s · loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Letras condensadas esticam para cima em ritmo escalonado, em 3 cores (CSS puro, sem JS). Tokens `--ink`/`--ink-2`/`--ink-3` do DS permitem re-skin.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Quando usar</h3>
        <Table
          columns={[
            { key: 'name', label: 'Texto' },
            { key: 'when', label: 'Quando usar' },
            { key: 'dur', label: 'Duração' },
          ]}
          data={[
            { name: 'Glitch Cut', when: 'Texto fixo com glitch RGB em loop (sem trigger)', dur: 'loop infinito 2s (GlitchText)' },
            { name: 'Text Scramble', when: 'Revelação de headline tech/futuro com decode (Capa → título)', dur: 'delay 300ms + 720ms/letra · stagger 90ms (~1680ms p/ 8 chars)' },
            { name: 'Tipsy Frame', when: 'Entrada de título com moldura giratória (Capa → título)', dur: '6000ms Smooth · 1 volta (180deg) e para' },
            { name: 'Apple Title', when: 'Entrada em duas metades com divisor (Capa → CTA)', dur: 'divisor 500ms → linha 600ms c/ pausa 400ms seq. → CTA 500ms' },
            { name: 'Stroke Text', when: 'Contorno em loop contínuo, sem trigger (texto fixo no slide)', dur: '6s linear infinite · 4 camadas alternadas Primary/Tech' },
            { name: 'Rubber Stamp', when: 'Selo/carimbo com slam e fade (CSS puro, sem JS)', dur: '3.2s cubic-bezier(.22,1.4,.36,1) infinite · tokens --ink/--ink-2/--ink-3' },
            { name: 'Kilovolt', when: 'Descarga elétrica por letra em stagger (CSS puro, sem JS)', dur: '2.6s steps(1) infinite · delay calc(var(--i)*.08s) · tokens --ink/--ink-2/--ink-3' },
            { name: 'Equalizer', when: 'Letras sobem nos picos de um medidor de áudio (CSS puro, sem JS)', dur: '1.9s ease-in-out infinite · delay calc(var(--i)*-.21s) · tokens --ink/--ink-2/--ink-3' },
            { name: 'Pew-Pew', when: 'Letras disparam como raios laser (CSS puro, sem JS)', dur: '3.2s infinite · delay calc(var(--i)*.14s) · tokens --ink/--ink-2/--ink-3' },
            { name: 'Loud', when: 'Palavra incha, grita com shake e volta (CSS puro, sem JS)', dur: '3s infinite · scale 1.75 + shake · tokens --ink/--ink-2/--ink-3' },
            { name: 'Rotator', when: 'Palavra rola e nova entra por baixo, em 3 cores (CSS puro, sem JS)', dur: '8s infinite · slide 2s cubic-bezier(.7,0,.3,1) · tokens --ink/--ink-2/--ink-3' },
            { name: 'Margin-Note', when: 'Círculo e sublinhado de caneta anotam a palavra (CSS puro, sem JS)', dur: '5.2s cubic-bezier(.45,0,.2,1) infinite · tokens --ink/--ink-2/--ink-3' },
            { name: 'Synth-Sunset', when: 'Gradiente retrô com scanlines e grade (CSS puro, sem JS)', dur: '6s linear infinite · tokens --ink/--ink-2/--ink-3' },
            { name: 'Stretch-Club', when: 'Letras condensadas esticam para cima em stagger (CSS puro, sem JS)', dur: '3.6s cubic-bezier(.65,0,.35,1) infinite · delay calc(var(--i)*.1s) · tokens --ink/--ink-2/--ink-3' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'as (GlitchText)', type: "'span'", default: "'span'", description: 'Tag renderizada (loop RGB infinito, sem trigger)' },
          { name: 'text (GlitchText)', type: 'string', default: "'CTA →'", description: 'Texto duplicado nas camadas RGB (error/tech)' },
          { name: 'text', type: 'string', default: "'Scramble'", description: 'Texto final do scramble (data-value do original)' },
          { name: 'charset', type: 'string', default: "'ABCDEFGHIJKLMNOPQRSTUVWXYZ'", description: 'Alfabeto do embaralhamento — igual ao original' },
          { name: 'tick', type: 'number (ms)', default: '30', description: 'Intervalo do scramble' },
          { name: 'stagger', type: 'number (ms)', default: '90', description: 'Espera entre o início de cada letra' },
          { name: 'delay', type: 'number (ms)', default: '300', description: 'Pausa com texto vazio antes de começar' },
          { name: 'letterDuration', type: '720 (fixo)', default: '720', description: 'Duração do embaralhamento de TODAS as letras — sempre 720ms, qualquer texto/lugar' },
          { name: 'className', type: 'string', default: "''", description: 'Classes extras (tamanho, cor, font-display…)' },
          { name: 'onComplete', type: '() => void', default: 'undefined', description: 'Chamado ao fim do scramble' },
          { name: 'duration (Tipsy)', type: 'number (ms)', default: '6000', description: '1 volta visual (180deg) e para — borda Primary Dark #6b4a1a' },
          { name: 'easing (Tipsy)', type: 'string', default: "'Smooth'", description: 'Curva da rotação do retângulo' },
          { name: 'animate (Tipsy)', type: 'boolean', default: 'true', description: 'false = retângulo parado (repouso)' },
          { name: 'top (Apple)', type: 'string[]', default: "'Tecnologia que gera resultado', 'Transforme Sua Empresa com Tecnologia'", description: 'Linhas do bloco superior (2)' },
          { name: 'bottom (Apple)', type: 'string', default: "'Quero saber +'", description: 'Linha abaixo do divisor (tech cyan)' },
          { name: 'dividerDuration (Apple)', type: 'number (ms)', default: '500', description: 'Divisor entra primeiro (scaleX)' },
          { name: 'lineDuration (Apple)', type: 'number (ms)', default: '600', description: 'Entrada inteira de cada linha' },
          { name: 'lineHold (Apple)', type: 'number (ms)', default: '400', description: 'Pausa com a linha completa antes da próxima' },
          { name: 'bottomDuration (Apple)', type: 'number (ms)', default: '500', description: 'Descida da linha de baixo, após as linhas do topo' },
          { name: 'text (Stroke)', type: 'string', default: "'ABCDEFGHIJKLMNOPQRSTUVWXYZ'", description: 'Texto do contorno — quebra automática em linhas dentro da Safe Zone (trunca com ... só se passar da altura)' },
          { name: 'fontSize (Stroke)', type: 'number', default: '45', description: 'Tamanho do texto (50% maior que o text-3xl dos outros cards)' },
          { name: 'duration (Stroke)', type: 'number (ms)', default: '6000', description: 'Loop do contorno (infinite linear, sem trigger)' },
          { name: '--ink (Stamp)', type: 'color token', default: 'currentColor', description: 'Cor principal do carimbo (CSS puro, sem JS)' },
          { name: '--ink-2 (Stamp)', type: 'color token', default: 'var(--color-tech)', description: 'Acento primário — borda/cor do carimbo' },
          { name: '--ink-3 (Stamp)', type: 'color token', default: 'var(--color-primary-light)', description: 'Acento secundário do carimbo' },
          { name: '--ink (Voltage)', type: 'color token', default: 'currentColor', description: 'Cor principal das letras (CSS puro, sem JS)' },
          { name: '--ink-2 (Voltage)', type: 'color token', default: 'var(--color-tech)', description: 'Acento primário da descarga' },
          { name: '--ink-3 (Voltage)', type: 'color token', default: 'var(--color-primary-light)', description: 'Acento secundário da descarga' },
          { name: '--i (Voltage)', type: 'number', default: 'índice da letra', description: 'Delay em stagger: calc(var(--i)*.08s) por letra' },
          { name: '--ink (Equalizer)', type: 'color token', default: 'currentColor', description: 'Cor principal das letras (CSS puro, sem JS)' },
          { name: '--ink-2 (Equalizer)', type: 'color token', default: 'var(--color-tech)', description: 'Acento primário da barra' },
          { name: '--ink-3 (Equalizer)', type: 'color token', default: 'var(--color-primary-light)', description: 'Acento secundário da barra' },
          { name: '--i (Equalizer)', type: 'number', default: 'índice da letra', description: 'Delay em stagger: calc(var(--i)*-.21s) por letra' },
          { name: '--ink (PewPew)', type: 'color token', default: 'currentColor', description: 'Cor principal das letras (CSS puro, sem JS)' },
          { name: '--ink-2 (PewPew)', type: 'color token', default: 'var(--color-tech)', description: 'Acento primário da faísca' },
          { name: '--ink-3 (PewPew)', type: 'color token', default: 'var(--color-primary-light)', description: 'Acento secundário da faísca' },
          { name: '--i (PewPew)', type: 'number', default: 'índice da letra', description: 'Delay em stagger: calc(var(--i)*.14s) por letra' },
          { name: '--ink (Loud)', type: 'color token', default: 'currentColor', description: 'Cor principal da palavra (CSS puro, sem JS)' },
          { name: '--ink-2 (Loud)', type: 'color token', default: 'var(--color-tech)', description: 'Acento do grito' },
          { name: '--ink-3 (Loud)', type: 'color token', default: 'var(--color-primary-light)', description: 'Acento secundário do grito' },
          { name: '--ink (Rotator)', type: 'color token', default: 'currentColor', description: 'Cor da 1ª palavra (CSS puro, sem JS)' },
          { name: '--ink-2 (Rotator)', type: 'color token', default: 'var(--color-tech)', description: 'Acento das palavras 2 e 4' },
          { name: '--ink-3 (Rotator)', type: 'color token', default: 'var(--color-primary-light)', description: 'Acento da palavra 3' },
          { name: '--ink (Annotate)', type: 'color token', default: 'var(--slide-text)', description: 'Cor da palavra (CSS puro, sem JS)' },
          { name: '--ink-2 (Annotate)', type: 'color token', default: 'var(--color-tech)', description: 'Acento do círculo' },
          { name: '--ink-3 (Annotate)', type: 'color token', default: 'var(--color-primary-light)', description: 'Acento do sublinhado' },
          { name: '--ink (Synthwave)', type: 'color token', default: 'currentColor', description: 'Cor principal do pôr-do-sol (CSS puro, sem JS)' },
          { name: '--ink-2 (Synthwave)', type: 'color token', default: 'var(--color-tech)', description: 'Acento primário do gradiente' },
          { name: '--ink-3 (Synthwave)', type: 'color token', default: 'var(--color-primary-light)', description: 'Acento secundário do gradiente' },
          { name: '--ink (Stretch)', type: 'color token', default: 'var(--slide-text)', description: 'Cor das letras 3n (CSS puro, sem JS)' },
          { name: '--ink-2 (Stretch)', type: 'color token', default: 'var(--color-tech)', description: 'Acento das letras 3n+1' },
          { name: '--ink-3 (Stretch)', type: 'color token', default: 'var(--color-primary-light)', description: 'Acento das letras 3n+2' },
          { name: '--i (Stretch)', type: 'number', default: 'índice da letra', description: 'Delay em stagger: calc(var(--i)*.1s) por letra' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo</h3>
        <CodeBlock code={'<GlitchText as="span" text="CTA →">CTA →</GlitchText>\n\n<TextScramble text="Scramble" charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ" tick={30} stagger={90} delay={300} />\n\n<TipsyFrame text="LANDING" duration={6000} easing="Smooth" />\n\n<AppleTitle top={["Tecnologia que gera resultado", "Transforme Sua Empresa com Tecnologia"]} bottom="Quero saber +" topFontSize={48} bottomFontSize={24} firstLineFontSize={16} secondLineFontSize={16} />\n\n<StrokeText text="ABCDEFGHIJKLMNOPQRSTUVWXYZ" fontSize={45} duration={6000} />\n\n<div class="fx-stamp">CARIMBADO</div>\n\n<div class="fx-voltage" role="img" aria-label="TRTRÁFEGO PAGO"><b aria-hidden="true" style="--i:0">T</b>...</div>\n\n<div class="fx-equalizer" role="img" aria-label="GRÁFICOS"><b aria-hidden="true" style="--i:0">G</b>...</div>\n\n<div class="fx-pewpew" role="img" aria-label="MARKETING">...</div>\n<div class="fx-pewpew" role="img" aria-label="DIGITAL">...</div>\n\n<div class="fx-loud">MAX</div>\n\n<div class="fx-rotator">ME</div>\n\n<div class="fx-annotate" role="img" aria-label="SaaS">SaaS<svg>...</svg></div>\n\n<div class="fx-synthwave">UAU</div>\n\n<div class="fx-stretch" role="img" aria-label="Automação WhatsApp">...</div>'} />
      </div>
    </div>
  );
}

function FxCountdown({ slot }: { slot: number }) {
  const [value, setValue] = useState('4.00');
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue('4.00');
      return;
    }
    const start = Date.now();
    const id = setInterval(() => {
      const raw = (Date.now() - start - slot * 6000 + 1000) % 18000;
      const phase = raw < 0 ? raw + 18000 : raw;
      const remaining = phase <= 5000 ? 5 - phase / 1000 : 0;
      setValue(remaining.toFixed(2));
    }, 10);
    return () => clearInterval(id);
  }, [slot]);
  return <>{value}</>;
}

function TiltCarousel() {
  const cards = [
    { title: 'Design Engineering', sub: 'Inclina sozinho em loop p/ vídeo' },
    { title: 'Design Systems', sub: 'Componentes que escalam junto' },
    { title: 'AI Workflows', sub: 'Automação que gera resultado' },
  ];
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(5);
      return;
    }
    setCount(5);
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 5 - elapsed / 1000);
      setCount(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        setIsTransitioning(true);
        const timer = setTimeout(() => {
          setActive((prev) => (prev + 1) % 3);
          setIsTransitioning(false);
        }, 600);
        return () => clearTimeout(timer);
      }
    }, 10);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div className="relative w-full max-w-[200px] h-[140px] [perspective:800px]">
      {cards.map((card, i) => {
        const next = (active + 1) % 3;
        let outerCls = 'absolute inset-0 flex items-center justify-center';
        let innerCls = 'w-full h-full rounded-xl border border-[var(--slide-accent)] bg-[var(--slide-bg)] p-4 text-center shadow-lg relative flex flex-col items-center justify-center';
        if (i === active && !isTransitioning) innerCls += ' fx-tilt';
        if (i === active && isTransitioning) outerCls += ' fx-tilt-exit';
        else if (i === next && isTransitioning) outerCls += ' fx-tilt-enter';
        else if (i !== active) outerCls += ' fx-tilt-hidden';
        return (
          <div key={i} className={outerCls} style={{ zIndex: i === active ? 3 : i === next ? 2 : 1 }}>
            <div className={innerCls}>
              <span className="fx-tilt-count absolute top-2 right-3 font-mono text-xs text-[var(--slide-accent)]">{i === active ? count.toFixed(2) : '5.00'}</span>
              <p className="text-[10px] uppercase tracking-widest text-[var(--slide-accent)]">Serviço</p>
              <p className="font-display font-bold text-lg text-[var(--slide-text)]">{card.title}</p>
              <p className="text-xs text-[var(--slide-text-muted)] mt-1">{card.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatCarousel() {
  const targets = [97, 89, 99];
  const labels = ['Resultado', 'Conversão', 'Retenção'];
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(targets[active]);
      return;
    }
    setCount(0);
    const target = targets[active];
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(1, elapsed / 3000);
      const current = Math.floor(progress * target);
      setCount(current);
      if (progress >= 1) {
        clearInterval(id);
        setCount(target);
        const delayTimer = setTimeout(() => {
          setIsTransitioning(true);
          const timer = setTimeout(() => {
            setActive((prev) => (prev + 1) % 3);
            setIsTransitioning(false);
          }, 600);
          return () => clearTimeout(timer);
        }, 2000);
        return () => clearTimeout(delayTimer);
      }
    }, 10);
    return () => clearInterval(id);
  }, [active]);
  return (
    <div className="relative w-full max-w-[200px] h-[140px]">
      {targets.map((target, i) => {
        const next = (active + 1) % 3;
        let cls = 'fx-stat-hidden absolute inset-0 rounded-xl border border-[var(--slide-accent)] bg-[var(--slide-bg)] p-4 text-center flex flex-col items-center justify-center';
        if (i === active) cls = 'absolute inset-0 rounded-xl border border-[var(--slide-accent)] bg-[var(--slide-bg)] p-4 text-center flex flex-col items-center justify-center';
        if (i === active && isTransitioning) cls += ' fx-stat-exit';
        if (i === next && isTransitioning) cls += ' fx-stat-enter';
        return (
          <div key={i} className={cls} style={{ zIndex: i === active ? 3 : i === next ? 2 : 1 }}>
            <p className="text-[10px] uppercase tracking-widest text-[var(--slide-accent)]">{labels[i]}</p>
            <p className="font-display font-bold text-4xl text-[var(--slide-text)]">{i === active ? count : 0}%</p>
            <p className="text-xs text-[var(--slide-text-muted)] mt-1">meta {target}%</p>
          </div>
        );
      })}
    </div>
  );
}

/**
 * EXEMPLO DE CONSUMIDOR DO `DecoBox`.
 *
 * O primitivo do DS desenha a caixa; quem mede o texto e decide o tamanho é o
 * consumidor — aqui, um `ResizeObserver` igual ao do app social. A cor vem do
 * tema (`var(--slide-accent)`) e o `settled` é o frame final (tela estática).
 */
function BoxedDemo({ text, variant, settled, fontSize = 20, delayMs = 0, durationMs = 700, loop = true }: {
  text: string;
  variant: DecoBoxVariant;
  settled: boolean;
  fontSize?: number;
  delayMs?: number;
  durationMs?: number;
  loop?: boolean;
}) {
  const innerRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize(r.width > 0 && r.height > 0 ? { w: r.width, h: r.height } : null);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text, fontSize]);
  const PAD_X = 16;
  const PAD_Y = 10;
  return (
    <span style={{ position: 'relative', display: 'inline-block', padding: `${PAD_Y}px ${PAD_X}px` }}>
      <span ref={innerRef} style={{ display: 'inline-block', position: 'relative', zIndex: 1, fontSize, lineHeight: 1.2, color: 'var(--slide-text)' }}>
        {text}
      </span>
      {size ? (
        <DecoBox
          width={Math.round(size.w + PAD_X * 2)}
          height={Math.round(size.h + PAD_Y * 2)}
          variant={variant}
          delayMs={delayMs}
          durationMs={durationMs}
          loop={loop}
          settled={settled}
          style={{ inset: 0 }}
        />
      ) : null}
    </span>
  );
}

function SocialMotionCardsSection() {
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [boxSettled, setBoxSettled] = useState(false);
  const [boxReplay, setBoxReplay] = useState(0);
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');
  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];
  return (
    <div className="space-y-12">
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">🎨 Selecione o Tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={`relative p-4 rounded-xl border-2 transition-all ${theme === t.id ? 'border-tech scale-105 shadow-lg' : 'border-[var(--surface-border)] hover:border-tech/50'}`} aria-label={`Tema ${t.name}`} aria-pressed={theme === t.id}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 border-4" style={{ backgroundColor: t.bg, borderColor: t.border }} />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (<div className="absolute top-2 right-2"><Check className="w-4 h-4 text-tech" /></div>)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">▣ Cards &amp; Boxes — caixas com comportamento</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">Cards e boxes são os recipientes do conteúdo: entrada em stagger, tilt, pilha, contador e revelação — sempre dentro da Safe Zone, sem depender de scroll ou hover para a mensagem principal.</p>
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
        <p className="text-sm text-[var(--text-on-surface-muted)]">Conteúdo crítico (`title`, `metric`) vive **dentro** da linha tracejada (`13.3%` topo, `13%` laterais, `74%` × `71.9%`).</p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Overview por tipo de card — IG 4:5 · 340×425</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] mb-6">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input type="checkbox" checked={showSafeZone} onChange={(e) => setShowSafeZone(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech relative"></div>
            <span className="text-sm font-medium text-[var(--text-on-surface)] flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Mostrar área de segurança
            </span>
          </label>
        </div>
        <div className="grid md:grid-cols-3 gap-4" data-theme={theme}>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <TiltCarousel />
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Tilt Card</p>
              <span className="text-xs font-mono text-tech">5s/card · carrossel</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">3 cards com countdown no topo à direita; ao zerar sai p/ esquerda fora da Safe Zone e próximo entra da direita (tilt só parado no centro).</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="relative w-full max-w-[200px] h-[140px]">
                  <div className="fx-stack-card absolute inset-0 rounded-xl border border-[var(--slide-accent)] bg-[var(--slide-bg)] p-4" style={{ '--s': 1 } as React.CSSProperties}><p className="text-xs font-bold text-[var(--slide-text)]">Card 3 · <FxCountdown slot={2} /></p></div>
                  <div className="fx-stack-card absolute inset-0 rounded-xl border border-[var(--slide-accent)] bg-[var(--slide-bg)] p-4" style={{ '--s': 2 } as React.CSSProperties}><p className="text-xs font-bold text-[var(--slide-text)]">Card 2 · <FxCountdown slot={1} /></p></div>
                  <div className="fx-stack-card absolute inset-0 rounded-xl border border-[var(--slide-accent)] bg-[var(--slide-bg)] p-4 shadow-xl" style={{ '--s': 0 } as React.CSSProperties}><p className="text-xs font-bold text-[var(--slide-text)]">Card 1 · <FxCountdown slot={0} /></p></div>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Stack</p>
              <span className="text-xs font-mono text-tech">18s · 5s/card</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Countdown de 5s (com centésimos) dispara o próximo; após 0,5s na subida o card vai p/ baixo do 3º sem fade e o ciclo se repete.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex items-center justify-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <StatCarousel />
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Stat</p>
              <span className="text-xs font-mono text-tech">3s + 2s · por meta</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Carrossel por meta: 97% → 89% → 99%; ao chegar, espera 2s e sai em escala 200% girando 90° com blur, próximo entra reverso.</p>
          </div>
        </div>
      </div>

      <div data-theme={theme}>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-2">DecoBox — a caixa que se desenha</h3>
        <p className="text-sm text-[var(--text-on-surface-muted)] mb-4">
          Primitivo do DS que desenha uma caixa em volta de um texto. O <strong>tamanho é do consumidor</strong> (aqui medido com <code>ResizeObserver</code>), a <strong>cor é do tema</strong> (muda com o seletor acima), e o <strong>estado assentado</strong> é o frame final — o mesmo que a tela estática do app social mostra antes de aprovar.
        </p>

        <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)] mb-4">
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-[var(--text-on-surface)]">
              <input type="checkbox" checked={boxSettled} onChange={(e) => setBoxSettled(e.target.checked)} />
              Estado assentado (tela estática)
            </label>
            <button
              onClick={() => setBoxReplay((n) => n + 1)}
              className="px-3 py-1.5 rounded-lg border border-tech/40 text-tech text-sm font-medium hover:bg-tech/10 transition-colors"
            >
              ↻ Repetir animação
            </button>
            <span className="text-xs font-mono text-[var(--text-on-surface-subtle)]">
              tamanho: medido pelo consumidor · cor: var(--slide-accent)
            </span>
          </div>

          <p className="text-xs font-mono text-[var(--text-on-surface-subtle)] mb-2">VARIANTES</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {(['highlight', 'frame', 'chip'] as DecoBoxVariant[]).map((v) => (
              <div key={v} className="flex flex-col items-start gap-2">
                <p className="text-xs font-mono text-tech">{v}</p>
                <BoxedDemo key={`${v}-${boxReplay}`} text="Qual dos 3 é o seu?" variant={v} settled={boxSettled} />
              </div>
            ))}
          </div>

          <p className="text-xs font-mono text-[var(--text-on-surface-subtle)] mb-2">VARIAÇÃO DE TAMANHO (o box acompanha o texto)</p>
          <div className="flex flex-wrap items-start gap-6">
            <BoxedDemo key={`s-${boxReplay}`} text="Erro 01" variant="highlight" settled={boxSettled} fontSize={16} />
            <BoxedDemo key={`m-${boxReplay}`} text="Otimizar para clique, não para conversão" variant="highlight" settled={boxSettled} fontSize={20} />
            <BoxedDemo key={`l-${boxReplay}`} text="Comenta 1, 2 ou 3 que eu te mostro como corrigir." variant="highlight" settled={boxSettled} fontSize={26} />
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-display font-bold text-[var(--text-on-surface)] mb-3">Props do DecoBox</h4>
          <PropsTable props={[
            { name: 'width / height', type: 'number (px)', default: '—', description: 'Tamanho da caixa: quem mede é o consumidor, o DS não mede nada' },
            { name: 'variant', type: "'highlight' | 'frame' | 'chip'", default: "'highlight'", description: 'highlight = preenchido + traço · frame = só traço · chip = pílula' },
            { name: 'radius / strokeWidth', type: 'number (px)', default: '10 / 2.5', description: 'Sobrescrevem o preset da variante' },
            { name: 'delayMs / durationMs', type: 'number (ms)', default: '0 / 700', description: 'Atraso e duração do traçado' },
            { name: 'settled', type: 'boolean', default: 'false', description: 'Estado final sem animação — é o que a tela estática mostra' },
            { name: 'loop', type: 'boolean', default: 'false', description: 'Repete o ciclo (só para ilustração no demo)' },
          ]} />
        </div>

        <CodeBlock code={'<DecoBox width={320} height={64} variant="highlight" delayMs={700} durationMs={800} settled={false} style={{ inset: 0 }} />'} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Quando usar</h3>
        <Table
          columns={[
            { key: 'name', label: 'Card' },
            { key: 'when', label: 'Quando usar' },
            { key: 'dur', label: 'Duração' },
          ]}
          data={[
            { name: 'Tilt Card', when: 'Carrossel de 3 serviços: countdown 5s no topo à direita, sai p/ esquerda e próximo entra da direita (Capa → serviço)', dur: '5s/card + 0.6s slide · vídeo' },
            { name: 'Stack', when: 'Countdown 5s por card; ao zerar sobe e volta para trás (Capa → prova/antes-depois)', dur: '18s infinite · 6s/card · vídeo' },
            { name: 'Stat', when: 'Métrica por meta: 97% → 89% → 99%; ao chegar, espera 2s e troca em escala 200% com giro 90° (Capa → resultado)', dur: '3s + 2s + 0.6s transição · vídeo' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'countdown (Tilt)', type: 'number (s)', default: '5', description: 'Countdown no topo à direita por card; ao zerar sai p/ esquerda' },
          { name: 'rotate (Stack)', type: 'deg', default: '-6 / 3', description: 'Angulos do leque no hover' },
          { name: 'target (Stat)', type: 'number', default: '97 / 89 / 99', description: 'Meta que dispara a troca (97% → 89% → 99%)' },
          { name: 'duration (Stat)', type: 'number (ms)', default: '3000', description: 'Tempo da contagem até a meta por card' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo</h3>
        <CodeBlock code={'<div class="group [perspective:800px]"><div class="transition group-hover:[transform:perspective(800px)_rotateX(6deg)_rotateY(-6deg)]">Design Engineering</div></div>\n\n<div class="group"><div>Card 3</div><div>Card 2</div><div>Card 1</div></div>\n\n<div class="fx-stat">128%</div>'} />
      </div>
    </div>
  );
}

function SocialMotionPathSection() {
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');
  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];
  return (
    <div className="space-y-12">
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">🎨 Selecione o Tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={`relative p-4 rounded-xl border-2 transition-all ${theme === t.id ? 'border-tech scale-105 shadow-lg' : 'border-[var(--surface-border)] hover:border-tech/50'}`} aria-label={`Tema ${t.name}`} aria-pressed={theme === t.id}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 border-4" style={{ backgroundColor: t.bg, borderColor: t.border }} />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (<div className="absolute top-2 right-2"><Check className="w-4 h-4 text-tech" /></div>)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">🎬 Movimento que segue um caminho</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">Setas e elementos que percorrem uma curva determinística — sempre dentro da Safe Zone, sem depender de scroll ou hover. A curva é o roteiro: A → B pela mesma trilha, em loop.</p>
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
        <p className="text-sm text-[var(--text-on-surface-muted)]">Seta/ponto crítico (`path`, `A → B`) vive **dentro** da linha tracejada (`13.3%` topo, `13%` laterais, `74%` × `71.9%`).</p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview — IG 4:5 · 340×425</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] mb-6">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input type="checkbox" checked={showSafeZone} onChange={(e) => setShowSafeZone(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech relative"></div>
            <span className="text-sm font-medium text-[var(--text-on-surface)] flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Mostrar área de segurança
            </span>
          </label>
        </div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Movimento ao longo do caminho</h3>
        <div className="grid md:grid-cols-3 gap-4" data-theme={theme}>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <p className="font-display font-bold text-lg text-[var(--slide-text)] text-center">Do início ao destino</p>
                <PathRun variant="run" />
                <span className="absolute flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--slide-primary)] bg-[var(--slide-bg)] text-xs font-bold text-[var(--slide-text)]" style={{ left: '4%', top: '88%', transform: 'translate(-50%, -50%)' }}>A</span>
                <span className="absolute flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--slide-accent)] bg-[var(--slide-bg)] text-xs font-bold text-[var(--slide-text)]" style={{ left: '90%', top: '12%', transform: 'translate(-50%, -50%)' }}>B</span>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Path Run</p>
              <span className="text-xs font-mono text-tech">3s linear infinite</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Ponto percorre a curva A → B em loop determinístico.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <p className="font-display font-bold text-lg text-[var(--slide-text)] text-center">A curva se desenha</p>
                <PathRun variant="draw" d="M 20 268 Q 126 60 232 44" duration="4s" />
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Path Draw</p>
              <span className="text-xs font-mono text-tech">loop · 4s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Trajeto se desenha e vira seta — a curva anuncia o destino.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <p className="font-display font-bold text-lg text-[var(--slide-text)] text-center">Siga os pontos</p>
                <PathRun variant="march" duration="1.2s" />
                <span className="absolute flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--slide-primary)] bg-[var(--slide-bg)] text-xs font-bold text-[var(--slide-text)]" style={{ left: '4%', top: '88%', transform: 'translate(-50%, -50%)' }}>A</span>
                <span className="absolute flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--slide-accent)] bg-[var(--slide-bg)] text-xs font-bold text-[var(--slide-text)]" style={{ left: '90%', top: '12%', transform: 'translate(-50%, -50%)' }}>B</span>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Marching Dots</p>
              <span className="text-xs font-mono text-tech">loop · 1.2s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Pontos marcham ao longo do trajeto indicando a direção.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <p className="font-display font-bold text-lg text-[var(--slide-text)] text-center">Voo até o destino</p>
                <PathRun variant="fly" duration="3.4s" />
                <span className="absolute flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--slide-primary)] bg-[var(--slide-bg)] text-xs font-bold text-[var(--slide-text)]" style={{ left: '4%', top: '88%', transform: 'translate(-50%, -50%)' }}>A</span>
                <span className="absolute flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--slide-accent)] bg-[var(--slide-bg)] text-xs font-bold text-[var(--slide-text)]" style={{ left: '90%', top: '12%', transform: 'translate(-50%, -50%)' }}>B</span>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Fly To</p>
              <span className="text-xs font-mono text-tech">3.4s · ease-out</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Elemento voa até o ponto final e pulsa na chegada.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <p className="font-display font-bold text-lg text-[var(--slide-text)] text-center">Aponte para o alvo</p>
                <PathPointer />
                <span className="absolute w-3 h-3 rounded-full bg-[var(--slide-accent)]" style={{ left: '90%', top: '12%', transform: 'translate(-50%, -50%)' }} />
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Path Pointer</p>
              <span className="text-xs font-mono text-tech">3s linear infinite</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Flechinha percorre a curva e aponta para o alvo.</p>
          </div>
        </div>

        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6 mt-12">Path aplicado ao elemento</h3>
        <div className="grid md:grid-cols-3 gap-4" data-theme={theme}>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <p className="font-display font-bold text-lg text-[var(--slide-text)] text-center">A flecha se desenha</p>
                <PathRun variant="arrow" duration="4s" />
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Path Arrow</p>
              <span className="text-xs font-mono text-tech">4s · draw loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Haste e ponta desenhadas num único traço.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <PathRun variant="card" duration="4s" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-display font-bold text-lg text-[var(--slide-text)] text-center">O card se desenha</p>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Path Card</p>
              <span className="text-xs font-mono text-tech">4s · draw loop</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Contorno de card com cantos arredondados, desenhado do zero.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <p className="font-display font-bold text-lg text-[var(--slide-text)] text-center">A marca, letra por letra</p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[88%]" style={{ aspectRatio: '182 / 87' }}>
                    <PathRun variant="logo" duration="6s" />
                  </div>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Path Logo</p>
              <span className="text-xs font-mono text-tech">loop · 6s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">O path desenha o contorno do M e depois do E do logo ME, sem preenchimento.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <p className="font-display font-bold text-lg text-[var(--slide-text)] text-center">O texto se desenha</p>
                <PathRun variant="text" text="Transforme Sua Empresa" fontSize={36} duration="6s" />
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Path Text</p>
              <span className="text-xs font-mono text-tech">loop · 6s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">O path desenha o contorno do texto letra a letra, como no logo.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="absolute inset-x-0 top-[15%] flex justify-center">
                  <PathPulse width={208} height={40} delayMs={150} loop />
                </div>
                <p className="font-display font-bold text-lg text-[var(--slide-text)] text-center absolute inset-0 flex items-center justify-center px-2">O título emoldurado</p>
                <div className="absolute inset-x-0 top-[62%] flex justify-center">
                  <PathPulse width={208} height={40} delayMs={900} loop />
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Path Pulse</p>
              <span className="text-xs font-mono text-tech whitespace-nowrap">loop · 6s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Linha de batimento (ECG) que se desenha e emolda o título: uma em cima (150ms) e outra embaixo (900ms). No demo ela fica em loop, como as outras animações.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Quando usar</h3>
        <Table
          columns={[
            { key: 'name', label: 'Path Motion' },
            { key: 'when', label: 'Quando usar' },
            { key: 'dur', label: 'Duração' },
          ]}
          data={[
            { name: 'Path Run', when: 'Ligar dois pontos com curva/seta (A → B)', dur: '3s linear infinite' },
            { name: 'Path Draw', when: 'Revelar o trajeto como ação (“olha o caminho”)', dur: 'loop · 4s' },
            { name: 'Marching Dots', when: 'Indicar direção/percurso sem texto', dur: 'loop · 1.2s' },
            { name: 'Fly To', when: 'Levar elemento a um destino e marcar chegada', dur: '3.4s · ease-out' },
            { name: 'Path Pointer', when: 'Apontar para algo (seta segue a curva até o alvo)', dur: '3s linear infinite' },
            { name: 'Path Arrow', when: 'Flecha completa (haste + ponta) num único traço', dur: '4s · draw loop' },
            { name: 'Path Card', when: 'Desenhar o contorno de um card (reveal do recipiente)', dur: '4s · draw loop' },
            { name: 'Path Logo', when: 'Contornar o logo letra por letra (M → E) como reveal da marca', dur: 'loop · 6s' },
            { name: 'Path Text', when: 'Desenhar o contorno do texto letra a letra, como no logo (reveal da headline)', dur: 'loop · 6s' },
            { name: 'Path Pulse', when: 'Separador que emolda o título com um bico de batimento (linha ECG acima e abaixo)', dur: 'loop · 6s · 150ms / 900ms' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'variant', type: "'run' | 'draw' | 'march' | 'fly' | 'arrow' | 'card' | 'logo' | 'text'", default: "'run'", description: 'Comportamento do path' },
          { name: 'text', type: 'string', default: "'Transforme Sua Empresa'", description: 'Texto desenhado (variant="text"), 2 linhas, Space Grotesk' },
          { name: 'fontSize', type: 'number', default: '36', description: 'Tamanho do texto (variant="text") — encolhe se estourar a largura' },
          { name: 'd', type: 'string', default: "'M 24 282 Q 70 90 228 40'", description: 'Curva (path SVG) ligando A → B' },
          { name: 'duration', type: '3s', default: '3s', description: 'Tempo de percorrimento do ponto' },
          { name: 'loop', type: 'infinite', default: 'infinite', description: 'Loop determinístico, sem trigger' },
          { name: 'rotate', type: 'auto', default: 'auto', description: 'Seta/ponto segue o ângulo da curva (offset-rotate)' },
          { name: 'pulse', type: 'boolean', default: 'true', description: 'Pulso na chegada (variant="fly")' },
          { name: 'durationMs (Pulse)', type: 'number', default: '1500', description: 'Duração do desenho da linha ECG (PathPulse)' },
          { name: 'delayMs (Pulse)', type: 'number', default: '0', description: 'Atraso da linha ECG — 150ms na de cima, 900ms na de baixo' },
          { name: 'settled (Pulse)', type: 'boolean', default: 'false', description: 'Estado final sem animação (tela estática)' },
          { name: 'loop (Pulse)', type: 'boolean', default: 'false', description: 'Repete o ciclo (só para ilustração no demo)' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo</h3>
        <CodeBlock code={'<PathRun variant="run" d="M 24 282 Q 70 90 228 40" duration="3s" loop />\n  A → B pela curva\n</PathRun>\n\n<PathRun variant="draw" d="M 20 268 Q 126 60 232 44" loop />\n<PathRun variant="march" d="M 24 282 Q 70 90 228 40" loop />\n<PathRun variant="fly" d="M 24 282 Q 70 90 228 40" pulse />\n\n<PathPointer d="M 24 282 Q 70 90 228 40" />\n\n<PathRun variant="arrow" loop />\n  haste + ponta num único traço\n</PathRun>\n\n<PathRun variant="card" loop />\n  contorno do card\n</PathRun>\n\n<PathRun variant="logo" loop />\n  contorna M e depois E do logo\n</PathRun>\n\n<PathRun variant="text" text="Transforme Sua Empresa" fontSize={36} />\n  contorno do texto, linha a linha\n</PathRun>\n\n<PathPulse width={208} height={40} delayMs={150} />\n  separador ECG que emolda o título\n</PathPulse>'} />
      </div>
    </div>
  );
}

function SocialMotionNumbersSection() {
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');
  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];
  const bars = [35, 60, 45, 80, 55, 95];

  return (
    <div className="space-y-12">
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">🎨 Selecione o Tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={`relative p-4 rounded-xl border-2 transition-all ${theme === t.id ? 'border-tech scale-105 shadow-lg' : 'border-[var(--surface-border)] hover:border-tech/50'}`} aria-label={`Tema ${t.name}`} aria-pressed={theme === t.id}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 border-4" style={{ backgroundColor: t.bg, borderColor: t.border }} />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (<div className="absolute top-2 right-2"><Check className="w-4 h-4 text-tech" /></div>)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">🎬 Dados que viram cena</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">Timeline determinística, resolução fixa (1080×1350) e safe zone obrigatória. Barras e contadores animam dentro da área segura — prova social como cena, não como rodapé.</p>
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
        <p className="text-sm text-[var(--text-on-surface-muted)]">Números críticos (`metric`, `value`) vivem **dentro** da linha tracejada (`13.3%` topo, `13%` laterais, `74%` × `71.9%`).</p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview — IG 4:5 · 340×425</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] mb-6">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input type="checkbox" checked={showSafeZone} onChange={(e) => setShowSafeZone(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech relative"></div>
            <span className="text-sm font-medium text-[var(--text-on-surface)] flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Mostrar área de segurança
            </span>
          </label>
        </div>
        <div className="grid md:grid-cols-3 gap-4 numbers-scope" data-theme={theme}>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden border border-[var(--surface-border)]" style={{ background: 'var(--slide-gradient)' }}>
              <div className="absolute flex flex-col items-center justify-center gap-4" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="flex items-end gap-2 h-24">
                  {bars.map((h, i) => (
                    <div key={i} className="fx-bars-grow-y" style={{ width: 12, height: `${h}%`, background: 'var(--slide-gradient)', borderRadius: 2, animationDelay: `${i * 120}ms` }} />
                  ))}
                </div>
                <span className="font-display font-bold text-2xl text-white">+150 projetos</span>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Data Grid</p>
              <span className="text-xs font-mono text-tech">loop · 5s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">6 barras + counter +150 em loop automático, sem clique.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute inset-0" style={{ background: 'var(--slide-gradient)' }}>
                <div className="absolute flex flex-col items-center justify-center gap-6" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                  <span className="font-display font-bold text-lg text-white">Antes × Depois</span>
                  <div className="w-full space-y-4">
                  {[
                    { label: 'Antes', value: 25, tone: 'var(--slide-primary)' },
                    { label: 'Depois', value: 92, tone: 'var(--slide-primary)' },
                  ].map((row, i) => (
                    <div key={row.label} className="w-full">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white/80">{row.label}</span>
                        <span className="text-xs font-mono text-white">{row.value}%</span>
                      </div>
                      <div className="h-5 rounded-full overflow-hidden" style={{ background: 'var(--slide-border)' }}>
                        <div className="fx-compare-bar h-full rounded-full" style={{ width: `${row.value}%`, background: row.tone, animationDelay: `${i * 300}ms` }} />
                      </div>
                    </div>
                  ))}
                  </div>
                  <span className="font-display font-bold text-2xl text-white">+268%</span>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Comparação</p>
              <span className="text-xs font-mono text-tech">loop · 5s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Barras horizontais Antes × Depois em loop automático, sem clique.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute inset-0" style={{ background: 'var(--slide-gradient)' }}>
                <div className="absolute flex flex-col items-center justify-center gap-4" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                  <span className="font-display font-bold text-lg text-white">Crescimento</span>
                  <svg className="w-full" viewBox="0 0 216 90" fill="none" aria-hidden>
                  <path className="fx-path-draw-line" d="M 0 80 L 36 62 L 72 68 L 108 44 L 144 50 L 180 24 L 216 10" pathLength={100} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ animationDuration: '4s' }} />
                  <circle cx="216" cy="10" r="4" fill="var(--slide-primary)" />
                  </svg>
                  <span className="font-display font-bold text-2xl text-white">+150% em 12 meses</span>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Linha de Crescimento</p>
              <span className="text-xs font-mono text-tech">loop · 4s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Trajetória que se desenha em loop automático, estilo Path Draw.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute inset-0" style={{ background: 'var(--slide-gradient)' }}>
                <div className="absolute flex flex-col items-center justify-center gap-2" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                  <span className="font-display font-bold text-lg text-white">Projetos entregues</span>
                  <span className="font-display font-bold text-6xl text-white" aria-label="150 projetos"><span aria-hidden="true">+</span><span className="fx-count" aria-hidden="true" /></span>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Contador Grande</p>
              <span className="text-xs font-mono text-tech">loop · 3s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Big number contando de 0 até +150 em loop automático.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute inset-0" style={{ background: 'var(--slide-gradient)' }}>
                <div className="absolute flex flex-col items-center justify-center gap-4" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                  <span className="font-display font-bold text-lg text-white">Clientes que indicam</span>
                  <div className="relative w-36 h-36">
                    <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" aria-hidden>
                      <circle cx="60" cy="60" r="52" stroke="var(--slide-border)" strokeWidth="10" />
                      <circle className="fx-donut-ring" cx="60" cy="60" r="52" pathLength={100} stroke="var(--slide-primary)" strokeWidth="10" strokeLinecap="round" transform="rotate(-90 60 60)" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-3xl text-white">87%</span>
                  </div>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Anel %</p>
              <span className="text-xs font-mono text-tech">loop · 4s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Anel que fecha até 87% em loop automático, com o % no centro.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute inset-0" style={{ background: 'var(--slide-gradient)' }}>
                <div className="absolute flex flex-col items-center justify-center gap-6" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                  <span className="font-display font-bold text-lg text-white">Meta do mês</span>
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-white/80">Progresso</span>
                      <span className="text-xs font-mono text-white">78%</span>
                    </div>
                    <div className="h-6 rounded-full overflow-hidden" style={{ background: 'var(--slide-border)' }}>
                      <div className="fx-compare-bar h-full rounded-full" style={{ width: '78%', background: 'var(--slide-primary)' }} />
                    </div>
                  </div>
                  <span className="font-display font-bold text-2xl text-white">78%</span>
                  <span className="text-xs text-white/70">Faltam 22% para a meta</span>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Progresso / Meta</p>
              <span className="text-xs font-mono text-tech">loop · 5s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Barra única que enche até 78% em loop automático.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute inset-0" style={{ background: 'var(--slide-gradient)' }}>
                <div className="absolute flex flex-col items-center justify-center gap-4" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                  <span className="font-display font-bold text-lg text-white">Origem do tráfego</span>
                  <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none" aria-hidden>
                    <path className="fx-path-draw-line" d="M 50 50 L 50 5 A 45 45 0 0 1 63.9 92.8 Z" pathLength={100} stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" fill="var(--slide-primary)" fillOpacity="0.85" style={{ animationDuration: '4s' }} />
                    <path className="fx-path-draw-line" d="M 50 50 L 63.9 92.8 A 45 45 0 0 1 7.2 36.1 Z" pathLength={100} stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" fill="var(--slide-accent)" fillOpacity="0.55" style={{ animationDuration: '4s', animationDelay: '800ms' }} />
                    <path className="fx-path-draw-line" d="M 50 50 L 7.2 36.1 A 45 45 0 0 1 50 5 Z" pathLength={100} stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" fill="#ffffff" fillOpacity="0.35" style={{ animationDuration: '4s', animationDelay: '1600ms' }} />
                  </svg>
                  <div className="flex items-center gap-3 text-xs text-white">
                    <span>Orgânico 45%</span>
                    <span>Pago 35%</span>
                    <span>Indicação 20%</span>
                  </div>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Pizza</p>
              <span className="text-xs font-mono text-tech">loop · 4s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Fatias se revelando em sequência em loop automático.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute inset-0" style={{ background: 'var(--slide-gradient)' }}>
                <div className="absolute flex flex-col items-center justify-center gap-4" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                  <span className="font-display font-bold text-lg text-white">Funil de conversão</span>
                  <div className="w-full space-y-2">
                    {[
                      { label: 'Visitantes', value: '10.000', width: 100, tone: 'bg-[var(--slide-primary)]' },
                      { label: 'Leads', value: '2.500', width: 55, tone: 'bg-[var(--slide-accent)]' },
                      { label: 'Clientes', value: '800', width: 25, tone: 'bg-white/40' },
                    ].map((stage, i) => (
                      <div key={stage.label} className="flex justify-center">
                        <div className={`fx-funnel-stage rounded-lg ${stage.tone}`} style={{ width: `${stage.width}%`, animationDelay: `${i * 300}ms` }}>
                          <div className="flex items-center justify-between px-3 py-1.5">
                            <span className="funil-label text-xs font-semibold text-white">{stage.label}</span>
                            <span className="funil-label text-xs font-mono text-white">{stage.value}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Funil</p>
              <span className="text-xs font-mono text-tech">loop · 5s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Estágios encolhendo em sequência em loop automático.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Quando usar</h3>
        <Table
          columns={[
            { key: 'name', label: 'Dados' },
            { key: 'when', label: 'Quando usar' },
            { key: 'dur', label: 'Duração' },
          ]}
          data={[
            { name: 'Data Grid', when: 'Prova-social com barras verticais + big number em loop', dur: 'loop · 5s + stagger 120ms' },
            { name: 'Comparação', when: 'Antes × Depois com barras horizontais em loop', dur: 'loop · 5s' },
            { name: 'Linha de Crescimento', when: 'Trajetória de crescimento que se desenha', dur: 'loop · 4s' },
            { name: 'Contador Grande', when: 'Big number contando até o valor final', dur: 'loop · 3s' },
            { name: 'Anel %', when: 'Percentual de satisfação/indicação no centro do anel', dur: 'loop · 4s' },
            { name: 'Progresso / Meta', when: 'Uma barra que enche até o % da meta', dur: 'loop · 5s' },
            { name: 'Pizza', when: 'Distribuição em fatias se revelando', dur: 'loop · 4s' },
            { name: 'Funil', when: 'Estágios de conversão encolhendo', dur: 'loop · 5s' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'duration', type: '600', default: '600', description: 'Sempre 600ms (Smooth travado)' },
          { name: 'easing', type: "'Smooth'", default: "'Smooth'", description: 'Curva Smooth para barras e counter' },
          { name: 'stagger', type: 'number (ms)', default: '60', description: 'Delay entre barras (i * stagger)' },
          { name: 'bars', type: 'number[]', default: '[35,60,45,80,55,95]', description: 'Alturas (%) das 6 barras' },
          { name: 'counter', type: 'number', default: '150', description: 'Valor final do big number (+150 projetos)' },
          { name: 'value', type: 'number', default: '150', description: 'Valor final do Contador Grande' },
          { name: 'points', type: 'number[]', default: '[0,20,35,30,55,80,100]', description: 'Pontos da Linha de Crescimento' },
          { name: 'percent', type: 'number', default: '87', description: 'Valor do Anel % (centro) e da barra de Meta' },
          { name: 'slices', type: 'number[]', default: '[45,35,20]', description: 'Fatias (%) da Pizza' },
          { name: 'stages', type: '[{label, value, width}]', default: 'Visitantes/Leads/Clientes', description: 'Estágios do Funil' },
          { name: 'rows', type: '[{label, value}]', default: 'Antes 25 / Depois 92', description: 'Barras da Comparação' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo</h3>
        <CodeBlock code={'<DataGrid bars={[35,60,45,80,55,95]} counter={150} suffix="+" stagger={60} duration={600} easing="Smooth">\n  +150 projetos\n</DataGrid>\n\n<Comparison rows={[{ label: "Antes", value: 25 }, { label: "Depois", value: 92 }]} loop />\n\n<GrowthLine points={[0,20,35,30,55,80,100]} loop />\n\n<BigCounter value={150} prefix="+" loop />\n\n<Donut percent={87} loop />\n\n<ProgressBar percent={78} loop />\n\n<Pizza slices={[45,35,20]} loop />\n\n<Funnel stages={[{ label: "Visitantes", value: "10.000" }, { label: "Leads", value: "2.500" }, { label: "Clientes", value: "800" }]} loop />'} />
      </div>
    </div>
  );
}

function SocialMotionCtaSection() {
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');
  const scrambleText = 'SALVAR';
  const scrambleTotal = getScrambleTotalTicks(scrambleText);
  const [scrambleTick, setScrambleTick] = useState(0);
  const [scramblePhase, setScramblePhase] = useState<'run' | 'hold' | 'out'>('run');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setScrambleTick(scrambleTotal);
      return;
    }
    if (scramblePhase === 'run') {
      const iv = setInterval(() => {
        setScrambleTick(t => {
          if (t + 1 >= scrambleTotal) {
            setScramblePhase('hold');
            return scrambleTotal;
          }
          return t + 1;
        });
      }, 30);
      return () => clearInterval(iv);
    }
    if (scramblePhase === 'hold') {
      const to = setTimeout(() => setScramblePhase('out'), 1400);
      return () => clearTimeout(to);
    }
    const to = setTimeout(() => {
      setScrambleTick(0);
      setScramblePhase('run');
    }, 350);
    return () => clearTimeout(to);
  }, [scramblePhase, reducedMotion, scrambleTotal]);

  const scrambleProgress = Math.min(1, scrambleTick / scrambleTotal);
  const scrambleLabel = reducedMotion ? scrambleText : getScrambleFrame(scrambleText, scrambleTick);
  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];
  return (
    <div className="space-y-12">
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">🎨 Selecione o Tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={`relative p-4 rounded-xl border-2 transition-all ${theme === t.id ? 'border-tech scale-105 shadow-lg' : 'border-[var(--surface-border)] hover:border-tech/50'}`} aria-label={`Tema ${t.name}`} aria-pressed={theme === t.id}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 border-4" style={{ backgroundColor: t.bg, borderColor: t.border }} />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (<div className="absolute top-2 right-2"><Check className="w-4 h-4 text-tech" /></div>)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">🎬 O vídeo termina com um pedido</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">CTA pulsante em loop automático — sem clique, sem hover. O anel marca onde olhar e a flutuação mantém a tensão até o fim.</p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview — IG 4:5 · 340×425</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] mb-6">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input type="checkbox" checked={showSafeZone} onChange={(e) => setShowSafeZone(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech relative"></div>
            <span className="text-sm font-medium text-[var(--text-on-surface)] flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Mostrar área de segurança
            </span>
          </label>
        </div>
        <div className="grid md:grid-cols-3 gap-4" data-theme={theme}>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex flex-col items-center justify-center gap-6" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <span className="font-display font-bold text-lg text-[var(--slide-text)]">Gostou? Salva o post</span>
                <div className="relative animate-float">
                  <span className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-[var(--slide-accent)]" aria-hidden="true" />
                  <span className="relative flex items-center gap-2 rounded-full bg-[var(--slide-accent)] px-6 py-3 font-display font-bold text-[var(--slide-on-accent)]">Salva o post</span>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">CTA Primário</p>
              <span className="text-xs font-mono text-tech">loop · 1.5s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Botão preenchido com anel pulsante e flutuação, sem clique.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex flex-col items-center justify-center gap-6" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <span className="font-display font-bold text-lg text-[var(--slide-text)]">Envia pra quem precisa</span>
                <div className="relative animate-float">
                  <span className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-[var(--slide-primary)]" aria-hidden="true" />
                  <span className="relative flex items-center gap-2 rounded-full border-2 border-[var(--slide-accent)] px-6 py-3 font-display font-bold text-[var(--slide-accent)]">Link na bio</span>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">CTA Ghost</p>
              <span className="text-xs font-mono text-tech">loop · 1.5s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Contorno com anel em primary — alternativa elegante ao preenchido.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex flex-col items-center justify-center gap-6" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <span className="font-display font-bold text-lg text-[var(--slide-text)]">Atenção!</span>
                <div className="fx-cta-loud rounded-full">
                  <span className="flex items-center gap-2 rounded-full bg-[var(--slide-accent)] px-6 py-3 font-display font-bold text-[var(--slide-on-accent)]">Salva o post</span>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">CTA Loud</p>
              <span className="text-xs font-mono text-tech">loop · 3s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Botão que escala e treme com brilho, estilo Loud dos Textos.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex flex-col items-center justify-center gap-6" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <span className="font-display font-bold text-lg text-[var(--slide-text)]">Cada letra, um traço</span>
                <div className="relative inline-flex min-w-[190px] items-center justify-center" style={{ opacity: scramblePhase === 'out' ? 0 : 1, transition: 'opacity 300ms' }}>
                  <svg className="absolute" style={{ inset: -6 }} viewBox="0 0 120 36" preserveAspectRatio="none" fill="none" aria-hidden>
                    <path d="M 18 2 H 102 Q 118 2 118 18 Q 118 34 102 34 H 18 Q 2 34 2 18 Q 2 2 18 2 Z" pathLength={100} stroke="var(--slide-accent)" strokeWidth="2.5" strokeLinejoin="round" style={{ strokeDasharray: 100, strokeDashoffset: (1 - scrambleProgress) * 100 }} />
                  </svg>
                  <span className="relative block whitespace-nowrap px-7 py-3 text-center font-display font-bold text-[var(--slide-accent)]">{scrambleLabel}</span>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">CTA Scramble</p>
              <span className="text-xs font-mono text-tech">loop · 3.2s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Letras embaralham e resolvem enquanto o contorno abre junto.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Quando usar</h3>
        <Table
          columns={[
            { key: 'name', label: 'CTA' },
            { key: 'when', label: 'Quando usar' },
            { key: 'dur', label: 'Duração' },
          ]}
          data={[
            { name: 'CTA Primário', when: 'Pedido principal do vídeo (salvar, comentar, seguir)', dur: 'loop · 1.5s' },
            { name: 'CTA Ghost', when: 'Alternativa discreta (link na bio, enviar)', dur: 'loop · 1.5s' },
            { name: 'CTA Loud', when: 'Urgência máxima: escala + shake com brilho', dur: 'loop · 3s' },
            { name: 'CTA Scramble', when: 'Letras embaralhando com contorno abrindo (scramble + draw)', dur: 'loop · 3.2s' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'label', type: 'string', default: "'Salva o post'", description: 'Rótulo do botão' },
          { name: 'variant', type: "'primary' | 'ghost' | 'loud' | 'scramble'", default: "'primary'", description: 'Preenchido, contorno, escala+shake ou scramble com contorno' },
          { name: 'loop', type: 'infinite', default: 'infinite', description: 'Anel pulsante + flutuação, sem trigger' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo</h3>
        <CodeBlock code={'<SocialCta label="Salva o post" variant="primary" loop />\n\n<SocialCta label="Link na bio" variant="ghost" loop />\n\n<SocialCta label="Salva o post" variant="loud" loop />\n\n<SocialCta label="SALVAR" variant="scramble" loop />'} />
      </div>
    </div>
  );
}

function SocialMotionPassosSection() {
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');
  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];
  const steps = [
    { n: 1, title: 'Diagnóstico', desc: 'Entendemos onde você está' },
    { n: 2, title: 'Estratégia', desc: 'Plano sob medida' },
    { n: 3, title: 'Escala', desc: 'Resultado que cresce' },
  ];
  return (
    <div className="space-y-12">
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">🎨 Selecione o Tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={`relative p-4 rounded-xl border-2 transition-all ${theme === t.id ? 'border-tech scale-105 shadow-lg' : 'border-[var(--surface-border)] hover:border-tech/50'}`} aria-label={`Tema ${t.name}`} aria-pressed={theme === t.id}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 border-4" style={{ backgroundColor: t.bg, borderColor: t.border }} />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (<div className="absolute top-2 right-2"><Check className="w-4 h-4 text-tech" /></div>)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">🎬 O caminho em 3 passos</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">Passos numerados entram em stagger dentro da Safe Zone, em loop — o "como funciona" vira cena.</p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview — IG 4:5 · 340×425</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] mb-6">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input type="checkbox" checked={showSafeZone} onChange={(e) => setShowSafeZone(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech relative"></div>
            <span className="text-sm font-medium text-[var(--text-on-surface)] flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Mostrar área de segurança
            </span>
          </label>
        </div>
        <div className="grid md:grid-cols-3 gap-4" data-theme={theme}>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex flex-col justify-center gap-4" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <span className="font-display font-bold text-lg text-[var(--slide-text)] text-center">Como funciona</span>
                {steps.map((step, i) => (
                  <div key={step.n} className="fx-step-in flex items-center gap-3" style={{ animationDelay: `${i * 500}ms` }}>
                    <span className="flex items-center justify-center w-10 h-10 rounded-full font-display font-bold text-[var(--slide-on-accent)] shrink-0" style={{ background: 'var(--slide-gradient)' }}>{step.n}</span>
                    <span className="flex flex-col">
                      <span className="font-display font-bold text-[var(--slide-text)]">{step.title}</span>
                      <span className="text-xs text-[var(--slide-text-muted)]">{step.desc}</span>
                    </span>
                  </div>
                ))}
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Passos</p>
              <span className="text-xs font-mono text-tech">loop · 6s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Passos numerados com stagger em loop automático.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex flex-col justify-center gap-3" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <span className="font-display font-bold text-lg text-[var(--slide-text)] text-center">Como funciona</span>
                {steps.map((step, i) => (
                  <div key={step.n} className="relative flex items-center gap-3 px-3 py-2.5">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 252 60" preserveAspectRatio="none" fill="none" aria-hidden>
                      <path className={`fx-step-border-${['a', 'b', 'c'][i]}`} d="M 16 2 H 236 Q 250 2 250 16 V 44 Q 250 58 236 58 H 16 Q 2 58 2 44 V 16 Q 2 2 16 2 Z" pathLength={100} stroke="var(--slide-accent)" strokeWidth="2.5" strokeLinejoin="round" />
                    </svg>
                    <span className={`fx-step-fade-${['a', 'b', 'c'][i]} flex items-center gap-3`}>
                      <span className="flex items-center justify-center w-7 h-7 rounded-full border-2 border-[var(--slide-accent)] shrink-0">
                        <Check className="w-4 h-4 text-[var(--slide-accent)]" />
                      </span>
                      <span className="flex flex-col">
                        <GlitchText as="span" text={step.title} className="font-display font-bold text-[var(--slide-text)]">{step.title}</GlitchText>
                        <span className="text-xs text-[var(--slide-text-muted)]">{step.desc}</span>
                      </span>
                    </span>
                  </div>
                ))}
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">Passos Check</p>
              <span className="text-xs font-mono text-tech">loop · 6s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Check redondo, título Glitch e contorno desenhando por passo, todos em conjunto.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Quando usar</h3>
        <Table
          columns={[
            { key: 'name', label: 'Passos' },
            { key: 'when', label: 'Quando usar' },
            { key: 'dur', label: 'Duração' },
          ]}
          data={[
            { name: 'Passos', when: '“Como funciona”, processo e roteiros em 3 etapas', dur: 'loop · 6s + stagger 500ms' },
            { name: 'Passos Check', when: 'Passos com check, título Glitch e contorno por passo', dur: 'loop · 4s + stagger 600ms' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'steps', type: '[{n, title, desc}]', default: 'Diagnóstico / Estratégia / Escala', description: 'Passos numerados' },
          { name: 'stagger', type: 'number (ms)', default: '500', description: 'Delay entre passos (i * stagger)' },
          { name: 'loop', type: 'infinite', default: 'infinite', description: 'Stagger em loop determinístico' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo</h3>
        <CodeBlock code={'<Steps steps={[{ n: 1, title: "Diagnóstico", desc: "Entendemos onde você está" }, { n: 2, title: "Estratégia", desc: "Plano sob medida" }, { n: 3, title: "Escala", desc: "Resultado que cresce" }]} stagger={500} loop />\n\n<StepsCheck check glitch border />'} />
      </div>
    </div>
  );
}

function SocialMotionEndCardSection() {
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');
  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];
  return (
    <div className="space-y-12">
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">🎨 Selecione o Tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={`relative p-4 rounded-xl border-2 transition-all ${theme === t.id ? 'border-tech scale-105 shadow-lg' : 'border-[var(--surface-border)] hover:border-tech/50'}`} aria-label={`Tema ${t.name}`} aria-pressed={theme === t.id}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 border-4" style={{ backgroundColor: t.bg, borderColor: t.border }} />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (<div className="absolute top-2 right-2"><Check className="w-4 h-4 text-tech" /></div>)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">🎬 O frame final do vídeo</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">Logo desenhado + nome + handle + CTA por 2s na Safe Zone — o encerramento padrão de qualquer vídeo social.</p>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Preview — IG 4:5 · 340×425</h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)] mb-6">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input type="checkbox" checked={showSafeZone} onChange={(e) => setShowSafeZone(e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech relative"></div>
            <span className="text-sm font-medium text-[var(--text-on-surface)] flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Mostrar área de segurança
            </span>
          </label>
        </div>
        <div className="grid md:grid-cols-3 gap-4" data-theme={theme}>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)] border border-[var(--surface-border)]">
              <div className="absolute flex flex-col items-center justify-center gap-3" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <div className="relative w-[64%]" style={{ aspectRatio: '182 / 87' }}>
                  <PathRun variant="logo" duration="6s" />
                  <svg className="fx-logo-fill absolute inset-0 w-full h-full" viewBox="0 0 182 87" preserveAspectRatio="none" fill="none" aria-hidden>
                    <path d={PATH_LOGO_E_D} fill="var(--slide-accent)" />
                    <path d={PATH_LOGO_M_D} fill="var(--slide-accent)" />
                  </svg>
                </div>
                <GlitchText as="span" text="Max Ebina" className="font-display font-bold text-xl text-[var(--slide-text)] text-center">Max Ebina</GlitchText>
                <span className="text-sm text-[var(--slide-text-muted)]">Marketing Digital</span>
                <GlitchText as="span" text="@maxebina" className="px-4 py-1.5 rounded-full border border-[var(--slide-border)] text-sm font-semibold text-[var(--slide-accent)] text-center">@maxebina</GlitchText>
                <span className="mt-1 rounded-full bg-[var(--slide-accent)] px-5 py-2 font-display font-bold text-sm text-[var(--slide-on-accent)]">Segue pra mais</span>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">End Card</p>
              <span className="text-xs font-mono text-tech">loop · 6s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Logo + marca/handle em GlitchText + CTA no frame final.</p>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto overflow-hidden rounded-lg bg-gradient-to-b from-[var(--slide-bg)] to-[var(--slide-bg-secondary)]" data-theme={theme}>
              <div className="absolute flex flex-col items-center justify-center text-center" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%' }}>
                <Sparkles className="w-8 h-8 mb-5" style={{ color: 'var(--slide-accent)' }} />
                <GlitchText as="h4" text="Agende seu diagnóstico gratuito" className="font-display font-bold text-2xl leading-tight text-[var(--slide-text)] text-center">Agende seu diagnóstico gratuito</GlitchText>
                <GlitchText as="span" text="Vagas limitadas" className="block text-sm mt-2 mb-6 text-[var(--slide-text-muted)] text-center">Vagas limitadas</GlitchText>
                <div className="fx-cta-loud rounded-full">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--slide-accent)] px-6 py-3 font-display font-semibold text-sm text-[var(--slide-on-accent)]">
                    Link na bio <ArrowRight className="w-4 h-4" style={{ color: 'var(--slide-on-accent)' }} />
                  </span>
                </div>
              </div>
              <div className="absolute" style={{ bottom: '3%', right: '4%', zIndex: 5 }}>
                <div className="relative" style={{ width: 60, height: 29 }}>
                  <PathRun variant="logo" duration="6s" />
                  <svg className="fx-logo-fill absolute inset-0 w-full h-full" viewBox="0 0 182 87" preserveAspectRatio="none" fill="none" aria-hidden>
                    <path d={PATH_LOGO_E_D} fill="var(--slide-accent)" />
                    <path d={PATH_LOGO_M_D} fill="var(--slide-accent)" />
                  </svg>
                </div>
              </div>
              {showSafeZone && (
                <>
                  <div className="absolute pointer-events-none border-2 border-dashed border-[var(--slide-border)] bg-[color-mix(in_srgb,var(--slide-accent)_3%,transparent)] rounded-lg" style={{ top: '13.3%', left: '13%', width: '74%', height: '71.9%', zIndex: 50 }} />
                  <div className="absolute pointer-events-none bg-[var(--slide-accent)] text-[var(--slide-on-accent)] px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{ top: '14.3%', left: '50%', transform: 'translateX(-50%)', zIndex: 51 }}>Safe Zone</div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="font-display font-bold text-[var(--text-on-surface)]">End Card CTA</p>
              <span className="text-xs font-mono text-tech">loop · 6s</span>
            </div>
            <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">Variação do slide CTA com headline/urgência em GlitchText e logo ME animado no canto.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-6">Quando usar</h3>
        <Table
          columns={[
            { key: 'name', label: 'End Card' },
            { key: 'when', label: 'Quando usar' },
            { key: 'dur', label: 'Duração' },
          ]}
          data={[
            { name: 'End Card', when: 'Últimos 2s do vídeo: marca + CTA + handle', dur: 'loop · 6s' },
            { name: 'End Card CTA', when: 'Encerramento no layout do slide CTA (ícone, título, vagas, Link na bio, logo ME)', dur: 'loop · 6s' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Props</h3>
        <PropsTable props={[
          { name: 'brand', type: 'string', default: "'Max Ebina'", description: 'Nome da marca' },
          { name: 'sub', type: 'string', default: "'Marketing Digital'", description: 'Assinatura' },
          { name: 'handle', type: 'string', default: "'@maxebina'", description: 'Handle do perfil' },
          { name: 'cta', type: 'string', default: "'Segue pra mais'", description: 'Rótulo do botão final' },
          { name: 'ctaVariant', type: "'ghost' | 'loud'", default: "'loud'", description: 'Animação do CTA no End Card CTA' },
        ]} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Exemplo</h3>
        <CodeBlock code={'<EndCard brand="Max Ebina" sub="Marketing Digital" handle="@maxebina" cta="Segue pra mais" loop />\n\n<EndCardCta title="Agende seu diagnóstico gratuito" subtitle="Vagas limitadas" cta="Link na bio" ctaVariant="loud" logo loop />'} />
      </div>
    </div>
  );
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
                  <li>? Mantenha a proporção original (2.09:1)</li>
                  <li>? Use em fundos claros ou escuros</li>
                  <li>? Respeite a área de proteção</li>
                  <li>? Tamanho mínimo: 91px de largura</li>
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
                  <li>? Alterar as cores do logo</li>
                  <li>? Distorcer a proporção</li>
                  <li>? Adicionar efeitos (sombra, brilho)</li>
                  <li>? Usar em fundos com pouco contraste</li>
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
              <li>? Headlines e títulos principais</li>
              <li>? Nomes de seções</li>
              <li>? CTAs de botões</li>
              <li>? Números de métricas</li>
            </ul>
          </div>
          <div className="rounded-xl border border-success/20 bg-success/5 p-6">
            <p className="font-semibold text-[var(--text-on-surface)] mb-3">✅ Use Inter para:</p>
            <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
              <li>? Corpo de texto</li>
              <li>? Labels de formulários</li>
              <li>? Descrições e parágrafos</li>
              <li>? UI elements (botões, links)</li>
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
              <li>? "Quero Escalar Meu Negócio"</li>
              <li>? "Agendar Diagnóstico Gratuito"</li>
              <li>? "Começar Agora"</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech text-sm font-semibold mb-3">Secundário (Ghost)</p>
            <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-2">
              <li>? "Ver Cases"</li>
              <li>? "Conhecer Soluções"</li>
              <li>? "Saiba Mais"</li>
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
              <li>? Background transparente</li>
              <li>? Padding maior (py-4)</li>
              <li>? Sem sombra</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
            <p className="text-tech font-semibold mb-2">📍 Após scroll (50px+)</p>
            <ul className="text-sm text-[var(--text-on-surface-muted)] space-y-1">
              <li>? Glassmorphism (backdrop-blur)</li>
              <li>? Padding menor (py-2)</li>
              <li>? Sombra e borda</li>
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
                <li>? Logo com gradiente</li>
                <li>? Descrição da empresa (max 2 linhas)</li>
                <li>? Ícones de redes sociais</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-on-surface)] mb-2">📍 Colunas 2-4 (Links)</p>
              <ul className="text-[var(--text-on-surface-muted)] space-y-1 ml-4">
                <li>? Título da seção</li>
                <li>? Lista de links (4-6 itens)</li>
                <li>? Hover com cor tech</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-on-surface)] mb-2">📍 Barra Inferior</p>
              <ul className="text-[var(--text-on-surface-muted)] space-y-1 ml-4">
                <li>? Copyright à esquerda</li>
                <li>? Links legais à direita</li>
                <li>? Borda superior sutil</li>
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
          <p>? <strong>Sem slot:</strong> omitir prop <code>image</code>.</p>
          <p>? <strong>Tamanhos:</strong> <code>size={"sm"}</code> (400px), <code>size={"md"}</code> (640px), <code>size={"lg"}</code> (960px).</p>
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
                <li>? <strong>Capa</strong> - Identifica a marca no primeiro contato</li>
                <li>? <strong>Serviço</strong> - Reforça quem oferece o serviço</li>
                <li>? <strong>Prova Social</strong> - Aumenta credibilidade</li>
                <li>? <strong>CTA</strong> - Autoridade no call to action</li>
              </ul>
            </div>
            
            <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
              <p className="font-semibold text-warning mb-2">⚠️ Não Inclui Logo</p>
              <ul className="text-xs space-y-1">
                <li>? <strong>Dica</strong> - Evita poluição visual em conteúdo rápido</li>
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
              <li>? <strong>Branding consistente</strong> - Reforça a marca em todos os posts</li>
              <li>? <strong>Reconhecimento imediato</strong> - Seguidores identificam conteúdo oficial</li>
              <li>? <strong>Profissionalismo</strong> - Posts parecem mais confiáveis</li>
              <li>? <strong>Compartilhamento</strong> - Logo vai junto quando compartilham</li>
              <li>? <strong>Diferenciação</strong> - Destaca em um feed cheio de conteúdo</li>
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
              <li>? "Transforme Sua Empresa com Tecnologia e Automação"</li>
              <li>? "Sites, LPs e CRM que geram resultados reais"</li>
              <li>? "5 Automações que Toda Empresa Precisa em 2026"</li>
              <li>? "Escale seu negócio com inteligência digital"</li>
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
                <span className="text-2xl">?</span>
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
            <p className="text-xs text-white/40 mt-8">Loop em glitch RGB, sem hover — só animação</p>
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
            'Loop infinito 2s, sem hover/clique — só a animação (p/ vídeo)',
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

function SocialMotionServicosSection() {
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');
  const [aspect, setAspect] = useState<ServiceCardAspect>('4:5');
  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];
  return (
    <div className="space-y-12">
      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">🎨 Selecione o Tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={`relative p-4 rounded-xl border-2 transition-all ${theme === t.id ? 'border-tech scale-105 shadow-lg' : 'border-[var(--surface-border)] hover:border-tech/50'}`} aria-label={`Tema ${t.name}`} aria-pressed={theme === t.id}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 border-4" style={{ backgroundColor: t.bg, borderColor: t.border }} />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (<div className="absolute top-2 right-2"><Check className="w-4 h-4 text-tech" /></div>)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">🃏 Card de serviço — 3 camadas (Direção D)</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">
          Cada serviço é um card com <strong>selo de ícone</strong> (topo direito), <strong>ilustração plana atrás com bleed</strong> (fundo) e o <strong>mock do dispositivo na frente</strong> (foco — é nesse lugar que a foto real entra depois, no app social). Embaixo, título + frase sobre o fundo do tema. Cor vem do tema, tamanho é fixo por aspect e a safe zone acompanha o formato.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-[var(--surface-card-secondary)] border border-[var(--surface-border)]">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={showSafeZone} onChange={(e) => setShowSafeZone(e.target.checked)} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tech relative"></div>
          <span className="text-sm font-medium text-[var(--text-on-surface)] flex items-center gap-2"><Eye className="w-4 h-4" />Mostrar área de segurança</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[var(--text-on-surface)]">Formato</span>
          {(['4:5', '9:16'] as ServiceCardAspect[]).map((a) => (
            <button key={a} onClick={() => setAspect(a)} aria-pressed={aspect === a} className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${aspect === a ? 'bg-tech text-white border-tech' : 'border-[var(--surface-border)] text-[var(--text-on-surface-muted)] hover:border-tech/50'}`}>
              {a} {a === '9:16' ? '(reels)' : '(feed)'}
            </button>
          ))}
        </div>
      </div>

      <div data-theme={theme} className="space-y-12">
        {SERVICE_FAMILIES.map((fam) => (
          <div key={fam.id}>
            <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-1">{fam.title}</h3>
            <p className="text-sm text-[var(--text-on-surface-muted)] mb-6">{fam.cards.length} serviços</p>
            <div className="grid md:grid-cols-3 gap-4">
              {fam.cards.map((card) => (
                <div key={card.id} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
                  <div className="flex justify-center">
                    <SocialServiceCard
                      title={card.title}
                      phrase={card.phrase}
                      icon={card.icon}
                      device={card.device}
                      aspect={aspect}
                      showSafeZone={showSafeZone}
                      settled
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <p className="font-display font-bold text-[var(--text-on-surface)]">{card.title}</p>
                    <span className="text-xs font-mono text-tech">{aspect === '9:16' ? '340×604' : '340×425'}</span>
                  </div>
                  <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">{card.phrase}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Uso (o app social consome o DS)</h3>
        <CodeBlock code={"import { SocialServiceCard, SERVICE_FAMILIES } from 'me-agencia-ds';\\n\\n{SERVICE_FAMILIES.map(fam => (\\n  <section key={fam.id}>\\n    <h2>{fam.title}</h2>\\n    {fam.cards.map(c => (\\n      <SocialServiceCard key={c.id} title={c.title} phrase={c.phrase} icon={c.icon} device={c.device} aspect=\"9:16\" settled />\\n    ))}\\n  </section>\\n))}"} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Contrato</h3>
        <PropsTable props={[
          { name: 'title', type: 'string', default: '-', description: 'Título do serviço (ex.: "Sites Institucionais").' },
          { name: 'phrase', type: 'string', default: '-', description: 'Frase curta de venda, embaixo do título.' },
          { name: 'icon', type: 'ServiceIconName', default: '-', description: 'Ícone do selo e das duas artes (set de 15 em ServiceIcon).' },
          { name: 'device', type: "'browser' | 'phone' | 'dash'", default: "'browser'", description: 'Envelope do mock (foco do card). A foto real entra nesse lugar no app social.' },
          { name: 'aspect', type: "'4:5' | '9:16'", default: "'4:5'", description: '4:5 = 340×425 (feed) · 9:16 = 340×604 (reels). A safe zone acompanha o aspect.' },
          { name: 'showSafeZone', type: 'boolean', default: 'false', description: 'Overlay da área de segurança (demo no DS; variante 9:16 incluída).' },
          { name: 'settled', type: 'boolean', default: 'false', description: 'Frame final sem animação de entrada — o mesmo das telas estáticas.' },
        ]} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Social Studio → Extras (lote 2026-11-17)
   CtaButton · StickerPop · ConfettiBurst · DecoProgressRing ·
   DecoCounter odometer · LottieDeco (Deco/) e
   StepsList · ReelProgress · MarqueeTape · SceneOverlay (Scene/)
   ═══════════════════════════════════════════════════════════ */

const EXTRAS_LOTTIE_DATA = {
  v: '5.7.4', fr: 30, ip: 0, op: 60, w: 200, h: 200, nm: 'pulse', ddd: 0, assets: [],
  layers: [{
    ddd: 0, ind: 1, ty: 4, nm: 'circle', sr: 1,
    ks: {
      o: { a: 0, k: 100 }, r: { a: 0, k: 0 },
      p: { a: 0, k: [100, 100, 0] }, a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: [
        { i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] }, t: 0, s: [30, 30, 100] },
        { i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] }, t: 30, s: [130, 130, 100] },
        { t: 60, s: [30, 30, 100] },
      ] },
    },
    ao: 0,
    shapes: [{
      ty: 'gr',
      it: [
        { ty: 'el', d: 1, s: { a: 0, k: [120, 120] }, p: { a: 0, k: [0, 0] } },
        { ty: 'fl', c: { a: 0, k: [1, 0.42, 0.2, 1] }, o: { a: 0, k: 100 } },
        { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
      ],
      nm: 'g',
    }],
    ip: 0, op: 60, st: 0, bm: 0,
  }],
};

function SocialMotionExtrasSection() {
  const [theme, setTheme] = useState<'midnight' | 'sunrise' | 'neon' | 'minimal'>('midnight');
  const [settled, setSettled] = useState(true);
  const [run, setRun] = useState(0);
  const [prog, setProg] = useState(1); // 0..1 dirigido pelo botão Animar (progress-driven)
  const themes = [
    { id: 'midnight' as const, name: 'Midnight', bg: '#0a0a0f', border: '#06B6D4', desc: 'Posts técnicos, autoridade' },
    { id: 'sunrise' as const, name: 'Sunrise', bg: '#FFF5E6', border: '#FF6B35', desc: 'Dicas, conteúdo educativo' },
    { id: 'neon' as const, name: 'Neon', bg: '#000000', border: '#FF006E', desc: 'Lançamentos, urgência' },
    { id: 'minimal' as const, name: 'Minimal', bg: '#FAFAFA', border: '#1A1A1A', desc: 'Depoimentos, elegância' },
  ];
  const animar = () => {
    setRun(r => r + 1); // remonta os primitivos de entrada (key) → anima do zero
    setSettled(false);
    setProg(0);
    const t0 = performance.now();
    const dur = 1600;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setProg(p);
      if (p < 1) requestAnimationFrame(step);
      else setSettled(true);
    };
    requestAnimationFrame(step);
  };
  const steps = [
    { title: 'Diagnóstico', desc: 'Entendemos onde você está hoje' },
    { title: 'Estratégia', desc: 'Plano sob medida pro seu negócio' },
    { title: 'Escala', desc: 'Resultado que cresce todo mês' },
  ];
  const tape = ['Marketing Digital', 'Sites & LPs', 'Automação', 'Tráfego Pago', 'Branding'];
  const card = (title: string, desc: string, children: React.ReactNode) => (
    <div key={title} className="rounded-xl border border-[var(--surface-border)] p-4 bg-[var(--surface-card-secondary)]">
      <div className="relative aspect-[4/5] w-full max-w-[300px] mx-auto rounded-lg overflow-hidden border border-[var(--slide-border)] flex items-center justify-center" style={{ background: 'var(--slide-gradient)' }}>
        {children}
      </div>
      <div className="flex items-center gap-2 mt-3"><p className="font-display font-bold text-[var(--text-on-surface)]">{title}</p></div>
      <p className="text-sm text-[var(--text-on-surface-muted)] mt-1">{desc}</p>
    </div>
  );
  return (
    <div className="space-y-12">
      <div className="rounded-xl bg-tech/5 border border-tech/20 p-6">
        <p className="text-tech font-semibold mb-2">Lote "Extras" — primitivos novos do DS (2026-11-17)</p>
        <p className="text-sm text-[var(--text-on-surface-muted)]">Todos nascem em <code className="text-tech">social-motion/</code> e seguem o contrato ADR-005: cor só do tema (<code className="text-tech">--slide-*</code>), entrada por <code className="text-tech">delayMs</code>/<code className="text-tech">durationMs</code>, <code className="text-tech">settled</code> = frame final (igual à tela estática). Parado = <strong>settled</strong>; clique em <strong>Animar</strong> para ver a entrada do zero. Progress-driven (ReelProgress, DecoCounter, DecoProgressRing aqui) segue o progresso da cena — determinístico no export.</p>
      </div>

      <div className="rounded-xl border border-[var(--surface-border)] p-6 bg-[var(--surface-card-secondary)]">
        <p className="text-tech font-semibold mb-4">Selecione o tema</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {themes.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)} className={'relative p-4 rounded-xl border-2 transition-all ' + (theme === t.id ? 'border-tech scale-105 shadow-lg' : 'border-[var(--surface-border)] hover:border-tech/50')} aria-label={'Tema ' + t.name} aria-pressed={theme === t.id}>
              <div className="w-12 h-12 rounded-full mx-auto mb-3 border-4" style={{ backgroundColor: t.bg, borderColor: t.border }} />
              <p className="font-semibold text-sm text-[var(--text-on-surface)] mb-1">{t.name}</p>
              <p className="text-xs text-[var(--text-on-surface-subtle)]">{t.desc}</p>
              {theme === t.id && (<div className="absolute top-2 right-2"><Check className="w-4 h-4 text-tech" /></div>)}
            </button>
          ))}
        </div>
        <button onClick={animar} className="px-5 py-2.5 rounded-lg bg-tech text-[var(--text-on-accent,#fff)] font-semibold text-sm hover:opacity-90 transition-opacity">▶ Animar (entra do zero)</button>
        <span className="ml-3 text-sm text-[var(--text-on-surface-muted)]">{settled ? 'Estado: settled (frame final / tela estática)' : 'Estado: animando…'}</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" data-theme={theme}>
        {card('CtaButton', 'Pílula de CTA com pop + anel pulsante + flutuação. settled = parado.', <CtaButton key={run} label="Segue pra mais" settled={settled} />)}
        {card('StepsList', 'Passos em cascata (stagger). settled = todos no lugar.', <div className="p-4 w-full"><StepsList key={run} steps={steps} settled={settled} /></div>)}
        {card('StickerPop', 'Sticker/emoji com spring + wiggle. settled = parado.', <StickerPop key={run} text="🔥" settled={settled} />)}
        {card('ReelProgress', 'Barra de progresso do reel (progress-driven, liga no onProgress).', <ReelProgress progress={prog} />)}
        {card('MarqueeTape', 'Fita marquee em loop (2 cópias, translateX -50%). settled = parada.', <MarqueeTape key={run} items={tape} settled={settled} />)}
        {card('SceneOverlay', 'Vinheta + grão de filme (SVG feTurbulence). Estático — seguro p/ export.', <SceneOverlay preset="grain-vignette" />)}
        {card('ConfettiBurst', 'Confete com seed fixa (determinístico). settled = frame final vazio.', <ConfettiBurst key={run} settled={settled} />)}
        {card('DecoProgressRing', 'Anel que se desenha até value/max (pathLength 100).', <DecoProgressRing key={run} value={Math.round(72 * prog)} label={Math.round(72 * prog) + '%'} settled={settled} />)}
        {card('DecoCounter odometer', "variant='odometer': dígitos em colunas (progress-driven).", <DecoCounter variant="odometer" value={Math.round(150 * prog)} suffix=" projetos" progress={prog} durationMs={1600} fontSize={40} />)}
        {card('LottieDeco', 'Lottie via import dinâmico (peer opcional lottie-web). settled = último frame.', <LottieDeco key={run} data={EXTRAS_LOTTIE_DATA} settled={settled} loop style={{ width: 120, height: 120 }} />)}
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Uso (o app social consome o DS)</h3>
        <CodeBlock code={"import { CtaButton, StepsList, StickerPop, ConfettiBurst, DecoProgressRing, DecoCounter, LottieDeco, ReelProgress, MarqueeTape, SceneOverlay } from 'me-agencia-ds';\\n\\n<div className=\"instagram-slide\" data-theme=\"neon\">\\n  <SceneOverlay preset=\"grain-vignette\" />\\n  <ReelProgress progress={p} />\\n  <StepsList steps={passos} settled={modoEstatico} />\\n  <StickerPop text=\"🔥\" settled={modoEstatico} />\\n  <ConfettiBurst settled={modoEstatico} />\\n  <DecoProgressRing value={72} settled={modoEstatico} />\\n  <DecoCounter variant=\"odometer\" value={150} progress={p} durationMs={2000} />\\n  <LottieDeco src=\"https://.../anim.json\" settled={modoEstatico} />\\n  <MarqueeTape items={['Marketing', 'Sites', 'Automação']} settled={modoEstatico} />\\n  <CtaButton label=\"Segue pra mais\" settled={modoEstatico} />\\n</div>"} />
      </div>

      <div>
        <h3 className="text-xl font-display font-bold text-[var(--text-on-surface)] mb-4">Contrato</h3>
        <PropsTable props={[
          { name: 'delayMs / durationMs', type: 'number', default: '0 / por primitivo', description: 'Entrada por keyframes via CSS vars; determinístico no export.' },
          { name: 'settled', type: 'boolean', default: 'false', description: 'Frame final sem animação de entrada — o mesmo das telas estáticas (ADR-005).' },
          { name: 'progress (ReelProgress/DecoCounter)', type: '0..1', default: '-', description: 'Progress-driven: vem do onProgress da ReelTimeline; não precisa de settled.' },
          { name: 'variant (DecoCounter)', type: "'count' | 'odometer'", default: "'count'", description: "'count' = comportamento atual preservado; 'odometer' = colunas de dígitos." },
          { name: 'seed (ConfettiBurst)', type: 'number', default: '7', description: 'RNG com seed fixa (mulberry32) → partículas determinísticas; count limitado a 8..80.' },
          { name: 'src/data (LottieDeco)', type: 'string | object', default: '-', description: 'Lottie via import dinâmico: lottie-web é peer opcional e vira chunk separado.' },
          { name: 'cores', type: 'tema', default: '--slide-*', description: 'Nenhum primitivo aceita cor fixa por prop; SceneOverlay/LottieDeco são excessões documentadas (grão monocromático / cor do .json).' },
        ]} />
      </div>
    </div>
  );
}
