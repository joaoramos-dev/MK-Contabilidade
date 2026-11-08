import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";

import { EMAIL, MAILTO } from "@/lib/contact";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | MK Contabilidade" },
      {
        name: "description",
        content:
          "Saiba como a MK Contabilidade trata os dados relacionados ao uso deste site e aos contatos iniciados por seus visitantes.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-5">
          <Link
            to="/"
            className="font-display text-lg text-foreground"
            aria-label="MK Contabilidade — voltar ao início"
          >
            <span className="font-bold">MK</span> <span className="font-light">Contabilidade</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-emerald-strong"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar ao site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-12 md:py-20">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-emerald-strong">
            Transparência e confiança
          </p>
          <h1 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-5 text-sm text-muted-foreground">
            Última atualização: 8 de novembro de 2026
          </p>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            Esta política explica como são tratados os dados relacionados à sua visita ao site da MK
            Contabilidade e às formas de contato disponibilizadas por aqui.
          </p>
        </div>

        <div className="mt-12 grid gap-10 border-t border-border pt-10 md:mt-16 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-16">
          <article className="space-y-10">
            <section>
              <h2 className="font-display text-xl font-semibold">1. Dados tratados neste site</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                O site é institucional e não possui cadastro, formulário de contato ou área de
                login. Ele não solicita diretamente dados pessoais para navegação. Ao acessar
                páginas e recursos, dados técnicos da conexão — como endereço IP, data, horário,
                navegador e páginas solicitadas — podem ser tratados pela infraestrutura de
                hospedagem para entregar e proteger o serviço.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">
                2. Quando você entra em contato
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Os links do site podem abrir o WhatsApp, seu aplicativo de e-mail ou o telefone do
                dispositivo. Se você iniciar uma conversa, os dados que decidir informar serão
                tratados para responder ao contato e conversar sobre os serviços. O WhatsApp, seu
                provedor de e-mail e sua operadora tratam dados conforme suas próprias políticas e
                práticas.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">
                3. Cookies e tecnologias semelhantes
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Este site não utiliza ferramentas próprias de analytics ou publicidade, nem cookies
                próprios para rastrear sua navegação. A infraestrutura de hospedagem e serviços de
                terceiros podem usar recursos técnicos necessários ao funcionamento ou sujeitos às
                configurações e políticas desses serviços.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">4. Serviços de terceiros</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                As fontes tipográficas são carregadas pelo Google Fonts. Ao abrir o site, seu
                navegador solicita esses arquivos ao Google, que pode receber dados técnicos da
                conexão, como o endereço IP. Quando você segue um link de contato, também passa a
                interagir diretamente com o serviço escolhido. Consulte as políticas desses
                provedores para entender como tratam os dados.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">
                5. Finalidade e compartilhamento
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Os dados são tratados, quando aplicável, para disponibilizar e proteger o site,
                responder a solicitações de contato e cumprir obrigações legais. O compartilhamento
                limita-se aos serviços necessários para essas finalidades, como hospedagem,
                carregamento de fontes e a plataforma de contato que você escolher.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">6. Armazenamento e segurança</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Conversas iniciadas por WhatsApp, e-mail ou telefone podem permanecer nos
                respectivos serviços e nos canais de atendimento. Os registros técnicos da
                hospedagem são administrados conforme as práticas e os prazos do provedor. São
                adotadas medidas razoáveis para proteger as informações, sem que qualquer
                transmissão ou armazenamento na internet possa ser garantido como absolutamente
                seguro.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">7. Seus direitos e contato</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Nos termos da legislação de proteção de dados aplicável, inclusive a LGPD, você pode
                solicitar informações sobre o tratamento dos seus dados e, quando cabível, exercer
                direitos como acesso, correção, anonimização, bloqueio ou eliminação. Para isso,
                entre em contato pelo e-mail abaixo. Poderemos solicitar informações para confirmar
                sua identidade e localizar a solicitação.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold">8. Atualizações desta política</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Esta política pode ser atualizada para refletir mudanças no site, nos serviços
                utilizados ou na legislação. A data no início da página indica a revisão mais
                recente.
              </p>
            </section>
          </article>

          <aside className="h-fit border-t border-border pt-6 md:border-t-0 md:border-l md:pl-8 md:pt-0">
            <p className="text-sm font-semibold text-muted-foreground">
              Dúvidas ou solicitações sobre privacidade?
            </p>
            <a
              href={MAILTO}
              className="mt-4 inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-emerald-strong"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {EMAIL}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </aside>
        </div>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} MK Contabilidade</span>
          <Link
            to="/"
            className="font-medium text-primary transition-colors hover:text-emerald-strong"
          >
            Voltar ao início
          </Link>
        </div>
      </footer>
    </main>
  );
}
