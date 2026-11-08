# MK Contabilidade

Site institucional da MK Contabilidade, com apresentação dos serviços e segmentos atendidos, informações sobre a empresa e links para contato por WhatsApp, telefone e e-mail.

## Tecnologias

- React 19 e TypeScript
- TanStack Start e TanStack Router
- Vite
- Tailwind CSS 4
- Three.js para o visual da página inicial
- Vitest e Testing Library para testes

## Requisitos

- [Bun](https://bun.sh/) — o projeto mantém suas dependências no `bun.lock`.

## Desenvolvimento local

```sh
git clone https://github.com/joaoramos-dev/MK-Contabilidade.git
cd MK-Contabilidade
bun install
bun run dev
```

O servidor de desenvolvimento informa no terminal o endereço local para abrir no navegador.

## Comandos

| Comando | Descrição |
| --- | --- |
| `bun run dev` | Inicia o servidor de desenvolvimento |
| `bun run build` | Gera o build de produção |
| `bun run preview` | Serve localmente o build gerado |
| `bun run test` | Executa os testes uma vez |
| `bun run test:watch` | Executa os testes em modo de observação |
| `bun run lint` | Verifica o código com ESLint |

## Contatos

Os dados de contato e os links `mailto:`, `tel:` e WhatsApp ficam em [`src/lib/contact.ts`](./src/lib/contact.ts).

## Deploy

O projeto já está conectado à Vercel. Cada push para a branch `main` inicia automaticamente um novo deploy de produção. O comando de build é `bun run build`.

O domínio personalizado é configurado nas definições do projeto na Vercel. Os registros DNS do site não substituem os registros necessários para o provedor de e-mail.
