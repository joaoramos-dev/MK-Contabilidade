import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { HeroCanvas } from "@/components/HeroCanvas";
import {
  Code2, Stethoscope, Briefcase, ShoppingCart, Rocket, BarChart3, Lightbulb, Users,
  MessageCircle, Smartphone, ShieldCheck, HeartPulse, BadgeCheck, Menu, X,
} from "lucide-react";

const WA = "https://wa.me/5500000000000?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20contador.";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "MK Contabilidade — Contabilidade Digital e Inteligente" },
      { name: "description", content: "Abertura de empresas, gestão fiscal, planejamento tributário e folha de pagamento. Atendimento humanizado para todo o Brasil." },
      { property: "og:title", content: "MK Contabilidade — Contabilidade Digital e Inteligente" },
      { property: "og:description", content: "Contabilidade completa, digital e humanizada para sua empresa prosperar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const segments = [
  { icon: Code2, t: "TI & Programadores", d: "Imposto reduzido para devs, exportação de serviços e PJs." },
  { icon: Stethoscope, t: "Saúde & Clínicas", d: "Médicos, psicólogos, dentistas e clínicas estruturadas." },
  { icon: Briefcase, t: "Prestadores de Serviços", d: "Consultorias, agências, engenharia e representação." },
  { icon: ShoppingCart, t: "Comércio & E-commerce", d: "Emissão de NF, gestão de estoque e tributação." },
];
const services = [
  { icon: Rocket, t: "Abertura e Migração de CNPJ", d: "Transição simples sem travar sua operação." },
  { icon: BarChart3, t: "Gestão Fiscal e Contábil", d: "Emissão de guias, balancetes e obrigações no prazo." },
  { icon: Lightbulb, t: "Planejamento Tributário", d: "Enquadramento no Simples Nacional ou Lucro Presumido para pagar o menor imposto legal." },
  { icon: Users, t: "Folha de Pagamento & Pró-labore", d: "Gestão de funcionários e distribuição de lucros isenta." },
];
const reasons = [
  { icon: MessageCircle, t: "Atendimento Direto com Contador", d: "Nada de abrir ticket e esperar 3 dias. Resposta rápida via WhatsApp." },
  { icon: Smartphone, t: "100% Digital e Seguro", d: "Envie e receba documentos pelo celular de onde estiver." },
  { icon: HeartPulse, t: "Foco na Saúde Financeira", d: "Garantimos que sua empresa fique 100% regular com a Receita Federal." },
];
const nav = [["Início", "#inicio"], ["Quem Somos", "#quem-somos"], ["Serviços", "#servicos"], ["Segmentos", "#segmentos"]];

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">{children}</h2>
    </div>
  );
}

function Index() {
  const scroller = useRef<HTMLDivElement>(null);
  const [past, setPast] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const s = scroller.current;
    if (!s) return;
    const f = () => setPast(s.scrollTop > s.clientHeight * 0.6);
    s.addEventListener("scroll", f);
    return () => s.removeEventListener("scroll", f);
  }, []);

  return (
    <div ref={scroller} className="snap-container h-svh overflow-y-auto bg-background">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline bg-nav backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <a href="#inicio" className="font-display text-lg tracking-tight text-hero-foreground">
            <span className="font-bold">MK</span> <span className="font-light text-hero-muted">Contabilidade</span>
          </a>
          <nav className="hidden gap-8 md:flex">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className="text-sm text-hero-muted transition-colors hover:text-hero-foreground">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={WA} target="_blank" rel="noreferrer" className="btn-cta hidden px-4 py-2 text-sm sm:inline-flex">
              <MessageCircle className="h-4 w-4" /> Falar com Contador
            </a>
            <button onClick={() => setOpen(!open)} className="p-2 text-hero-foreground md:hidden" aria-label="Menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-hairline px-5 py-3 md:hidden">
            {nav.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="py-2 text-hero-muted">{l}</a>
            ))}
            <a href={WA} target="_blank" rel="noreferrer" className="btn-cta mt-2 justify-center px-4 py-3 text-sm">
              <MessageCircle className="h-4 w-4" /> Falar com Contador
            </a>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" className="snap-section relative flex items-center justify-center overflow-hidden bg-hero">
        <HeroCanvas />
        <div className="pointer-events-none absolute inset-0 bg-hero-vignette" />
        <div className="relative z-10 mx-auto max-w-4xl px-5 pt-16 text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-glass px-4 py-1.5 text-xs text-hero-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Contabilidade digital para todo o Brasil
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-hero-foreground md:text-6xl lg:text-7xl">
            Contabilidade Completa, Digital e Inteligente para a Sua Empresa <span className="text-gradient">Prosperar</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-hero-muted md:text-lg">
            A MK Contabilidade cuida da abertura de empresas, gestão fiscal, planejamento tributário e folha de pagamento. Atendimento humanizado com especialista no CRC, sem burocracia e para todo o Brasil.
          </p>
          <a href={WA} target="_blank" rel="noreferrer" className="btn-cta pointer-events-auto mt-10 px-6 py-4 text-sm md:px-8 md:text-base">
            <Smartphone className="h-5 w-5" /> Solicitar Orçamento Sem Compromisso no WhatsApp
          </a>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["CRC Ativo", "Atendimento Humano", "Economia Tributária"].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-glass px-3 py-1 text-xs text-hero-muted">
                <BadgeCheck className="h-3.5 w-3.5 text-emerald" /> {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SEGMENTOS */}
      <section id="segmentos" className="snap-section flex items-center px-5 py-24">
        <div className="mx-auto w-full max-w-7xl">
          <SectionTitle eyebrow="Segmentos">Soluções Especializadas para o Seu Modelo de Negócio</SectionTitle>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {segments.map(({ icon: I, t, d }) => (
              <div key={t} className="card-premium group p-7">
                <div className="icon-tile mb-6"><I className="h-6 w-6" /></div>
                <h3 className="font-display text-lg font-semibold text-foreground">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="snap-section flex items-center bg-secondary px-5 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <SectionTitle eyebrow="Serviços">Tudo o que sua empresa precisa em um só lugar</SectionTitle>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            {services.map(({ icon: I, t, d }) => (
              <div key={t} className="flex gap-5 bg-card p-7 md:p-9">
                <div className="icon-tile shrink-0"><I className="h-6 w-6" /></div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section id="quem-somos" className="snap-section flex items-center px-5 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <SectionTitle eyebrow="Diferenciais">Por que os empresários fecham com a MK Contabilidade?</SectionTitle>
          <div className="grid gap-10 md:grid-cols-3">
            {reasons.map(({ icon: I, t, d }, i) => (
              <div key={t} className="border-t border-border pt-8">
                <span className="font-display text-sm text-emerald">0{i + 1}</span>
                <I className="mt-4 h-8 w-8 text-primary" />
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{t}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + FOOTER */}
      <section className="snap-section flex flex-col bg-hero px-5 pt-24">
        <div className="flex flex-1 items-center">
          <div className="cta-box mx-auto w-full max-w-4xl p-10 text-center md:p-16">
            <ShieldCheck className="mx-auto h-10 w-10 text-emerald" />
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-hero-foreground md:text-5xl">
              Pronto para simplificar a contabilidade do seu negócio com a MK Contabilidade?
            </h2>
            <a href={WA} target="_blank" rel="noreferrer" className="btn-cta mt-10 px-8 py-4 text-base">
              <MessageCircle className="h-5 w-5" /> Iniciar Conversa no WhatsApp Agora
            </a>
          </div>
        </div>
        <footer className="mx-auto mt-16 w-full max-w-7xl border-t border-hairline py-8 text-sm text-hero-muted">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="font-display text-base text-hero-foreground"><b>MK</b> Contabilidade</p>
              <p className="mt-1">MK Serviços Contábeis Ltda · CNPJ 00.000.000/0001-00</p>
              <p>CRC 000000/O-0</p>
            </div>
            <div>
              <p>contato@mkcontabilidade.com.br</p>
              <p>(00) 00000-0000</p>
            </div>
            <div className="md:text-right">
              <a href="#" className="hover:text-hero-foreground">Política de Privacidade</a>
              <p className="mt-1">© {new Date().getFullYear()} MK Contabilidade</p>
            </div>
          </div>
        </footer>
      </section>

      <a
        href={WA}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className={`fab-wa fixed bottom-5 right-5 z-50 ${past ? "fab-show" : "fab-hide"}`}
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
