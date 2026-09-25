# Stillo Fitness — site

## Codebase Overview

Site da Academia Stillo Fitness (Conjunto Vera Cruz I, Goiânia), em fase de rascunho para apresentar ao dono; pode evoluir para um SaaS de academia (área do aluno, grade de turmas, check-in, cobrança). A identidade visual é de "muro de bairro" nas cores do logo (preto, vermelho #C8102E e branco, sem outras cores), letreiro em Archivo 900 estreita e itálica com sombra chapada vermelha, placa de porta "Aberto/Fechado" ao vivo.

**Stack**: Next.js 16 (App Router), React 19, TypeScript estrito, CSS puro com tokens em `:root`, GSAP + ScrollTrigger + Lenis pelo npm (padrões da skill `site-premium`).
**Structure**: `content/stillo.ts` (todos os dados), `lib/` (horário ao vivo, movimento), `components/sections/` (uma seção por arquivo), `components/ui/`, `app/globals.css`.

For detailed architecture, see [docs/CODEBASE_MAP.md](docs/CODEBASE_MAP.md). Design decisions: [design-plan.md](design-plan.md). How to run and present: [README.md](README.md).

## Regras do projeto

- Não inventar preços, depoimentos ou números da academia. Dado sem fonte vira `<Nota>` da proposta.
- Textos e dados só em `content/stillo.ts`.
- Animação: só `transform`, `opacity`, `filter`, `clip-path`; entrada e rolagem em camadas diferentes; tudo dentro de `useGSAP`; no máximo dois trechos fixados.
- Paleta fechada pelo cliente: só preto, vermelho e branco (mais o cinza-claro neutro). Nada de rosa, amarelo ou verde.
- Fonte: só a Archivo. O cliente rejeitou fontes com cara de HQ (Shrikhand, Kalam).
- Evitar os outros clichês de site de academia: caixa alta em tudo e foto de banco.
- Antes de mostrar: `npx tsc --noEmit`, `npm run build`, `npx next start -p 3210` e os prints da skill site-premium (normal e `--reduce`).
