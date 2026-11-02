import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown,
  MessageCircle, Star, Loader2, Globe, Layout, Code2,
  Bot, Megaphone, Workflow, X, Menu, Lock, Sparkles,
  Zap, TrendingUp, Clock
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   BUTTON COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'tech';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  loading?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
  loading = false,
  href,
  onClick,
  className = '',
  disabled = false,
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const baseClasses = `
    relative inline-flex items-center justify-center gap-2 font-display font-semibold
    rounded-xl overflow-hidden transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    cursor-pointer select-none
  `;

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-[#8f6424] text-white hover:shadow-[0_0_30px_rgba(143,100,36,0.5)] hover:scale-105',
    secondary: 'bg-[#06B6D4] text-[#0f172a] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105',
    ghost: 'border border-[#06B6D4]/50 text-[#06B6D4] hover:bg-[#06B6D4]/10 hover:border-[#06B6D4] hover:scale-105',
    tech: 'bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-[#0f172a] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 animate-glow',
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      <span className="relative z-10">{children}</span>
      {!loading && icon && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`group ${classes}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      className={`group ${classes}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════
   SERVICE CARD COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  badge?: string;
  ctaText?: string;
  href?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-8 h-8" />,
  Layout: <Layout className="w-8 h-8" />,
  Code2: <Code2 className="w-8 h-8" />,
  Bot: <Bot className="w-8 h-8" />,
  Megaphone: <Megaphone className="w-8 h-8" />,
  Workflow: <Workflow className="w-8 h-8" />,
};

export function ServiceCard({ title, description, icon, badge, ctaText = 'Saiba mais', href = '#' }: ServiceCardProps) {
  return (
    <div className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-tech/30 via-primary/30 to-tech/30 hover:from-tech hover:via-primary hover:to-tech transition-all duration-500">
      <div className="relative h-full rounded-2xl bg-white dark:bg-bg-dark/90 p-8 backdrop-blur-sm shadow-lg transition-all duration-500 group-hover:-translate-y-2">
        {badge && (
          <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-tech/20 text-tech rounded-full border border-tech/30">
            {badge}
          </span>
        )}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-tech/20 to-primary/20 flex items-center justify-center text-tech mb-6">
          {iconMap[icon] || <Zap className="w-8 h-8" />}
        </div>
        <h3 className="text-xl font-display font-bold mb-3 text-[var(--text-on-surface)]">{title}</h3>
        <p className="text-sm text-[var(--text-on-surface-muted)] mb-6 leading-relaxed">{description}</p>
        <a href={href} className="inline-flex items-center gap-2 text-tech text-sm font-semibold group-hover:gap-3 transition-all duration-300">
          {ctaText}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION HEADER COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export function SectionHeader({ eyebrow, title, subtitle, align = 'center' }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <span className="inline-block text-tech text-sm font-semibold tracking-widest uppercase mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 gradient-text">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} text-[var(--text-on-surface-muted)]`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TESTIMONIAL CARD COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface TestimonialCardProps {
  name: string;
  company: string;
  role: string;
  rating: number;
  testimonial: string;
}

export function TestimonialCard({ name, company, role, rating, testimonial }: TestimonialCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <div className="group rounded-2xl p-8 bg-white dark:bg-white/5 border border-[var(--surface-border)] transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-tech to-primary flex items-center justify-center text-white font-bold text-lg ring-2 ring-tech/30">
          {initials}
        </div>
        <div>
          <h4 className="font-display font-bold text-[var(--text-on-surface)]">{name}</h4>
          <p className="text-sm text-[var(--text-on-surface-muted)]">{role} • {company}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-warning fill-warning' : 'text-[var(--text-on-surface-subtle)]'}`} />
        ))}
      </div>
      <p className="text-[var(--text-on-surface-muted)] leading-relaxed italic">"{testimonial}"</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FAQ COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-xl overflow-hidden bg-white dark:bg-white/5 border border-[var(--surface-border)] transition-all duration-300"
        >
          <button
            className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-display font-semibold text-[var(--text-on-surface)] pr-4">{item.question}</span>
            <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-tech/10 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-4 h-4 text-tech" />
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <p className="px-6 pb-6 text-[var(--text-on-surface-muted)] leading-relaxed">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   WHATSAPP FLOAT COMPONENT
   ═══════════════════════════════════════════════════════════ */

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Falar no WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring opacity-40" />
        <MessageCircle className="w-7 h-7 text-white relative z-10" />
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface NavbarProps {
  logo?: React.ReactNode;
  links?: { label: string; href: string }[];
  ctaText?: string;
  ctaHref?: string;
}

export function Navbar({ logo = 'MAX', links = [], ctaText = 'Diagnóstico Gratuito', ctaHref = '#' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`mx-4 md:mx-8 rounded-2xl px-6 py-3 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-bg-dark/80 backdrop-blur-xl shadow-lg border border-[var(--surface-border)]'
          : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center">
            <svg width="91" height="43" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"/>
              <path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"/>
            </svg>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-[var(--text-on-surface-muted)] hover:text-[var(--text-on-surface)] transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tech transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button variant="tech" size="sm" href={ctaHref}>
              {ctaText}
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-[var(--text-on-surface)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[var(--surface-border)] animate-fade-in">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-[var(--text-on-surface-muted)] hover:text-tech transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4">
              <Button variant="tech" size="sm" href={ctaHref} className="w-full">
                {ctaText}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   LEAD CAPTURE FORM COMPONENT
   ═══════════════════════════════════════════════════════════ */

export function LeadCaptureForm() {
  // Estados dos campos
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    service: '',
    message: '',
  });

  // Estados de erro
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Estados de campos tocados (para mostrar erros apenas após interação)
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  
  // Estado de envio
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Regex para validação
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PHONE_REGEX = /^\(\d{2}\) \d{5}-\d{4}$/;
  const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s]{3,}$/;

  // Máscara para telefone
  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  // Validação de um campo específico
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (!NAME_REGEX.test(value)) return 'Nome deve ter pelo menos 3 caracteres';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email é obrigatório';
        if (!EMAIL_REGEX.test(value)) return 'Email inválido. Exemplo: seu@email.com';
        return '';
      
      case 'whatsapp':
        if (!value.trim()) return 'WhatsApp é obrigatório';
        if (!PHONE_REGEX.test(value)) return 'Telefone inválido. Formato: (11) 99999-9999';
        return '';
      
      case 'service':
        if (!value) return 'Selecione um serviço';
        return '';
      
      default:
        return '';
    }
  };

  // Valida todos os campos
  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'message') { // message é opcional
        const error = validateField(key, value);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Verifica se formulário está válido
  const isFormValid = (): boolean => {
    return (
      formData.name.trim().length >= 3 &&
      NAME_REGEX.test(formData.name) &&
      EMAIL_REGEX.test(formData.email) &&
      PHONE_REGEX.test(formData.whatsapp) &&
      formData.service !== ''
    );
  };

  // Handler de mudança de campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Aplica máscara para telefone
    const formattedValue = name === 'whatsapp' ? formatPhone(value) : value;
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    
    // Valida em tempo real se o campo já foi tocado
    if (touched[name]) {
      const error = validateField(name, formattedValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handler de blur (campo perdeu foco)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Marca como tocado
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Valida o campo
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handler de submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Marca todos os campos como tocados
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Valida todos os campos
    if (!validateAll()) {
      return;
    }
    
    setStatus('submitting');
    
    // Simula envio (substituir por chamada real à API)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      
      // Aqui você faria a chamada real:
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
    } catch (error) {
      setStatus('error');
    }
  };

  // Estado de sucesso
  if (status === 'success') {
    return (
      <div className="rounded-2xl p-12 text-center bg-white dark:bg-white/5 border border-[var(--surface-border)] animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-success" />
        </div>
        <h3 className="text-2xl font-display font-bold text-[var(--text-on-surface)] mb-3">Recebemos seus dados! 🚀</h3>
        <p className="text-[var(--text-on-surface-muted)]">Em até 2h úteis entraremos em contato.</p>
      </div>
    );
  }

  // Classes para inputs com erro
  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full px-4 py-3 rounded-xl bg-[var(--surface-card-secondary)] border text-[var(--text-on-surface)] placeholder-[var(--text-on-surface-subtle)] focus:ring-1 outline-none transition-all";
    
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-error focus:border-error focus:ring-error`;
    }
    
    return `${baseClass} border-[var(--surface-border)] focus:border-tech focus:ring-tech`;
  };

  return (
    <div className="rounded-2xl p-8 md:p-12 bg-white dark:bg-white/5 border border-[var(--surface-border)]">
      <h3 className="text-2xl font-display font-bold text-[var(--text-on-surface)] mb-2">Vamos conversar sobre seu projeto</h3>
      <p className="text-[var(--text-on-surface-muted)] mb-8">Preencha o formulário e receba um diagnóstico gratuito em até 2h.</p>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--text-on-surface)] mb-2">
            Nome completo <span className="text-error">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('name')}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {touched.name && errors.name && (
            <p id="name-error" className="mt-2 text-sm text-error flex items-center gap-1" role="alert">
              <span>⚠️</span> {errors.name}
            </p>
          )}
        </div>

        {/* Email e WhatsApp */}
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-on-surface)] mb-2">
              Email <span className="text-error">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClassName('email')}
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {touched.email && errors.email && (
              <p id="email-error" className="mt-2 text-sm text-error flex items-center gap-1" role="alert">
                <span>⚠️</span> {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-[var(--text-on-surface)] mb-2">
              WhatsApp <span className="text-error">*</span>
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              placeholder="(11) 99999-9999"
              value={formData.whatsapp}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={15}
              className={getInputClassName('whatsapp')}
              aria-invalid={touched.whatsapp && !!errors.whatsapp}
              aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
            />
            {touched.whatsapp && errors.whatsapp && (
              <p id="whatsapp-error" className="mt-2 text-sm text-error flex items-center gap-1" role="alert">
                <span>⚠️</span> {errors.whatsapp}
              </p>
            )}
          </div>
        </div>

        {/* Serviço */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-[var(--text-on-surface)] mb-2">
            Serviço de interesse <span className="text-error">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClassName('service')}
            aria-invalid={touched.service && !!errors.service}
            aria-describedby={errors.service ? 'service-error' : undefined}
          >
            <option value="">Selecione um serviço</option>
            <option value="site">Site Institucional</option>
            <option value="landing-page">Landing Page</option>
            <option value="saas">SaaS</option>
            <option value="crm">CRM</option>
            <option value="trafego">Tráfego Pago</option>
            <option value="automacao">Automação WhatsApp</option>
          </select>
          {touched.service && errors.service && (
            <p id="service-error" className="mt-2 text-sm text-error flex items-center gap-1" role="alert">
              <span>⚠️</span> {errors.service}
            </p>
          )}
        </div>

        {/* Mensagem (opcional) */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--text-on-surface)] mb-2">
            Mensagem <span className="text-[var(--text-on-surface-subtle)]">(opcional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Conte-nos sobre seu projeto..."
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className={getInputClassName('message')}
          />
        </div>

        {/* Botão de envio */}
        <Button
          variant="tech"
          size="lg"
          className="w-full"
          disabled={!isFormValid() || status === 'submitting'}
          loading={status === 'submitting'}
        >
          {status === 'submitting' ? 'Enviando...' : 'Quero Escalar Meu Negócio'}
        </Button>

        {/* Nota de privacidade */}
        <p className="flex items-center gap-2 text-xs text-[var(--text-on-surface-subtle)]">
          <Lock className="w-3 h-3" />
          Seus dados estão seguros. Não enviamos spam.
        </p>

        {/* Mensagem de erro geral */}
        {status === 'error' && (
          <div className="p-4 rounded-xl bg-error/10 border border-error/30 text-error text-sm" role="alert">
            <p className="font-semibold mb-1">❌ Ops! Algo deu errado</p>
            <p>Não conseguimos enviar seus dados. Tente novamente ou entre em contato pelo WhatsApp.</p>
          </div>
        )}
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

export function AnimatedCounter({ end, suffix = '', label, icon }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="w-14 h-14 rounded-xl bg-tech/10 flex items-center justify-center mx-auto mb-4 text-tech">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-display font-bold gradient-text-tech mb-2">
        {count}{suffix}
      </div>
      <p className="text-[var(--text-on-surface-muted)] text-sm">{label}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INSTAGRAM SLIDE COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface InstagramSlideProps {
  type: 'capa' | 'dica' | 'servico' | 'prova-social' | 'cta';
  title: string;
  subtitle?: string;
  body?: string;
  number?: number;
  metric?: string;
  metricLabel?: string;
  showSafeZone?: boolean;
  isMockup?: boolean;
}

export function InstagramSlide({ type, title, subtitle, body, number, metric, metricLabel, showSafeZone = false, isMockup = false }: InstagramSlideProps) {
  const titleSize = isMockup ? 'text-lg' : 'text-3xl';
  const subtitleSize = isMockup ? 'text-xs' : 'text-sm';
  const bodySize = isMockup ? 'text-xs' : 'text-sm';

  return (
    <div
      className="instagram-slide"
      style={{ 
        fontFamily: 'var(--font-display)',
        backgroundColor: 'var(--slide-bg)',
        color: 'var(--slide-text)',
      }}
    >
      {showSafeZone && (
        <>
          <div className="safe-zone-overlay" />
          <div className="safe-zone-label">Safe Zone</div>
        </>
      )}

      {/* Elementos decorativos com cores do tema */}
      <div 
        className="absolute top-[5%] right-[5%] w-20 h-20 rounded-full blur-xl" 
        style={{ 
          background: 'var(--slide-accent)',
          opacity: 0.1
        }}
      />
      <div 
        className="absolute bottom-[8%] left-[5%] w-16 h-16 rounded-full blur-xl" 
        style={{ 
          background: 'var(--slide-primary)',
          opacity: 0.1
        }}
      />

      {/* Logo Max Ebina - posicionado no canto inferior direito */}
      {/* Não aparece em slides de "dica" para evitar poluição visual */}
      {type !== 'dica' && (
        <div 
          className="absolute"
          style={{ 
            bottom: isMockup ? '8%' : '10%',
            right: isMockup ? '8%' : '10%',
            opacity: 0.85,
            zIndex: 5
          }}
        >
          <svg 
            width={isMockup ? '40' : '60'} 
            height={isMockup ? '19' : '29'} 
            viewBox="0 0 182 87" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M182 19.333H116V33.833H182V53.167H116V67.667H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" 
              fill="var(--slide-accent)"
            />
            <path 
              d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" 
              fill="var(--slide-accent)"
            />
          </svg>
        </div>
      )}

      <div 
        className="absolute flex flex-col" 
        style={{ 
          top: '13.3%', 
          left: '13%', 
          width: '74%',
          height: '71.9%',
          zIndex: 10
        }}
      >
        {type === 'capa' && (
          <div className="flex flex-col h-full justify-center">
            <p 
              className={`${subtitleSize} font-semibold tracking-widest uppercase mb-2`}
              style={{ color: 'var(--slide-accent)' }}
            >
              Max Ebina
            </p>
            <h2 
              className={`${titleSize} font-bold leading-tight mb-3`}
              style={{ color: 'var(--slide-text)' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p 
                className={subtitleSize}
                style={{ color: 'var(--slide-text-muted)' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {type === 'dica' && (
          <div className="flex flex-col h-full justify-center">
            <span 
              className={`inline-block px-3 py-1 ${isMockup ? 'text-[10px]' : 'text-xs'} font-semibold rounded-full mb-${isMockup ? '3' : '6'} w-fit`}
              style={{ 
                backgroundColor: 'var(--slide-accent)',
                color: 'var(--slide-bg)',
                opacity: 0.9
              }}
            >
              Dica #{number || 1}
            </span>
            <h2 
              className={`${isMockup ? 'text-base' : 'text-2xl'} font-bold leading-tight mb-${isMockup ? '2' : '4'}`}
              style={{ color: 'var(--slide-text)' }}
            >
              {title}
            </h2>
            {body && (
              <p 
                className={`${bodySize} leading-relaxed`}
                style={{ color: 'var(--slide-text-muted)' }}
              >
                {body}
              </p>
            )}
          </div>
        )}

        {type === 'servico' && (
          <div className="flex flex-col h-full">
            <h2 
              className={`${isMockup ? 'text-base' : 'text-2xl'} font-bold leading-tight mb-${isMockup ? '3' : '6'}`}
              style={{ color: 'var(--slide-text)' }}
            >
              {title}
            </h2>
            <div className={`space-y-${isMockup ? '2' : '3'} flex-1`}>
              {['Automatize processos', 'Gere mais leads', 'Escale resultados'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check 
                    className={`${isMockup ? 'w-3 h-3' : 'w-5 h-5'} flex-shrink-0`}
                    style={{ color: 'var(--slide-accent)' }}
                  />
                  <span 
                    className={bodySize}
                    style={{ color: 'var(--slide-text-muted)' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className={`pt-${isMockup ? '2' : '6'}`}>
              <p 
                className={`${bodySize} font-semibold`}
                style={{ color: 'var(--slide-accent)' }}
              >
                Link na bio →
              </p>
            </div>
          </div>
        )}

        {type === 'prova-social' && (
          <div className="text-center flex flex-col h-full justify-center">
            <div 
              className={`${isMockup ? 'text-4xl' : 'text-6xl'} font-bold mb-2`}
              style={{ 
                background: 'var(--slide-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {metric || '+150'}
            </div>
            <p 
              className={`${subtitleSize} mb-${isMockup ? '4' : '8'}`}
              style={{ color: 'var(--slide-text-muted)' }}
            >
              {metricLabel || 'Projetos entregues'}
            </p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div 
                  key={i} 
                  className={`${isMockup ? 'w-5 h-5' : 'w-8 h-8'} rounded-full border`}
                  style={{ 
                    background: 'var(--slide-gradient)',
                    borderColor: 'var(--slide-border)',
                    opacity: 0.3
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {type === 'cta' && (
          <div className="text-center flex flex-col h-full justify-center">
            <Sparkles 
              className={`${isMockup ? 'w-6 h-6' : 'w-10 h-10'} mx-auto mb-${isMockup ? '3' : '6'}`}
              style={{ color: 'var(--slide-accent)' }}
            />
            <h2 
              className={`${isMockup ? 'text-base' : 'text-2xl'} font-bold leading-tight mb-${isMockup ? '2' : '4'}`}
              style={{ color: 'var(--slide-text)' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p 
                className={`${subtitleSize} mb-${isMockup ? '4' : '8'}`}
                style={{ color: 'var(--slide-text-muted)' }}
              >
                {subtitle}
              </p>
            )}
            <div 
              className={`inline-flex items-center gap-2 rounded-full ${isMockup ? 'px-3 py-1.5' : 'px-6 py-3'} mx-auto shadow-lg`}
              style={{ 
                backgroundColor: 'var(--slide-accent)',
                color: 'var(--slide-bg)'
              }}
            >
              <span 
                className={`font-semibold ${isMockup ? 'text-xs' : 'text-sm'}`}
                style={{ color: 'var(--slide-bg)' }}
              >
                Link na bio
              </span>
              <ArrowRight 
                className={`${isMockup ? 'w-3 h-3' : 'w-4 h-4'}`}
                style={{ color: 'var(--slide-bg)' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TABLE COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface TableProps {
  columns: { key: string; label: string; align?: 'left' | 'center' | 'right' }[];
  data: Record<string, React.ReactNode>[];
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
  compact?: boolean;
}

export function Table({ 
  columns, 
  data, 
  striped = false, 
  hover = true,
  bordered = false,
  compact = false 
}: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--surface-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-black/5 dark:bg-white/5 border-b border-[var(--surface-border)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 font-semibold text-[var(--text-on-surface)] text-${col.align || 'left'} ${compact ? 'text-xs' : 'text-sm'}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`
                border-b border-[var(--surface-border)]
                ${striped && rowIndex % 2 === 1 ? 'bg-black/2 dark:bg-white/2' : ''}
                ${hover ? 'hover:bg-tech/5 transition-colors' : ''}
              `}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-[var(--text-on-surface-muted)] text-${col.align || 'left'} ${compact ? 'text-xs py-2' : 'text-sm'}`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER COMPONENT
   ═══════════════════════════════════════════════════════════ */

interface FooterProps {
  logo?: string;
  links?: {
    title: string;
    items: { label: string; href: string }[];
  }[];
  social?: {
    platform: string;
    href: string;
    icon: React.ReactNode;
  }[];
  copyright?: string;
}

export function Footer({
  logo = 'MAX',
  links = [
    {
      title: 'Serviços',
      items: [
        { label: 'Sites Institucionais', href: '#sites' },
        { label: 'Landing Pages', href: '#landing-pages' },
        { label: 'SaaS', href: '#saas' },
        { label: 'CRM', href: '#crm' },
        { label: 'Tráfego Pago', href: '#trafego' },
        { label: 'Automação WhatsApp', href: '#automacao' },
      ],
    },
    {
      title: 'Empresa',
      items: [
        { label: 'Sobre Nós', href: '#sobre' },
        { label: 'Cases', href: '#cases' },
        { label: 'Blog', href: '#blog' },
        { label: 'Contato', href: '#contato' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Privacidade', href: '#privacidade' },
        { label: 'Termos de Uso', href: '#termos' },
        { label: 'Cookies', href: '#cookies' },
      ],
    },
  ],
  social = [],
  copyright = '© 2026 Max Ebina. Todos os direitos reservados.',
}: FooterProps) {
  return (
    <footer className="bg-bg-dark border-t border-white/5 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="font-display font-bold text-3xl gradient-text mb-4">
              {logo}
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md">
              Transformamos negócios com tecnologia e automação. Sites, LPs, CRM e tráfego pago que geram resultados reais.
            </p>
            {social.length > 0 && (
              <div className="flex gap-4">
                {social.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-tech hover:border-tech/30 transition-all"
                    aria-label={s.platform}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          {links.map((section, i) => (
            <div key={i}>
              <h4 className="font-display font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <a
                      href={item.href}
                      className="text-sm text-white/60 hover:text-tech transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">{copyright}</p>
          <div className="flex items-center gap-6">
            <a href="#privacidade" className="text-sm text-white/40 hover:text-tech transition-colors">
              Privacidade
            </a>
            <a href="#termos" className="text-sm text-white/40 hover:text-tech transition-colors">
              Termos
            </a>
            <a href="#cookies" className="text-sm text-white/40 hover:text-tech transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
