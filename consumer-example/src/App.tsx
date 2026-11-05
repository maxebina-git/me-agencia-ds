import { HeroSection, Navbar, Footer } from "@maxebina/max-ds";

export default function App() {
  return (
    <>
      <Navbar
        links={[
          { label: "Serviços", href: "#servicos" },
          { label: "Cases", href: "#cases" },
          { label: "Depoimentos", href: "#depoimentos" },
          { label: "FAQ", href: "#faq" },
        ]}
        ctaText="Diagnóstico Gratuito"
      />

      <HeroSection
        headline={<>Transforme Sua Empresa com <span className="gradient-text-tech">Tecnologia</span></>}
        headlineText="Transforme Sua Empresa com Tecnologia"
        ctaPrimary="Quero Escalar Meu Negócio"
        ctaPrimaryHref="#contato"
        logo={<svg width="60" height="29" viewBox="0 0 182 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M182 19.333H116V33.833H182V53.167H182V87H111.837L95 70.7246V16.2754L111.837 0H182V19.333Z" fill="#8f6424"></path><path d="M67.667 87V21H53.167L53.167 87H33.833L33.833 21H19.333L19.333 87H0L3.06693e-06 16.8369L16.2754 0L70.7246 2.38005e-06L87 16.8369V87H67.667Z" fill="#8f6424"></path></svg>}
        logoText="Marketing Digital"
        eyebrow=""
      />

      <Footer />
    </>
  );
}