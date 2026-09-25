# Stillo Fitness — site (rascunho de proposta)

Site da Academia Stillo Fitness (Conjunto Vera Cruz I, Goiânia), feito para apresentar a ideia ao dono.
Direção visual e dados levantados: [design-plan.md](design-plan.md).

## Rodar

```bash
npm install
npm run build
npx next start -p 3210     # http://localhost:3210
```

Em desenvolvimento: `npm run dev`. Teste sempre o build de produção antes de mostrar.

## Para a apresentação

| Endereço | O que mostra |
|---|---|
| `/` | O site limpo |
| `/?notas=1` | Liga os post-its que explicam cada ideia ao dono (também pelo botão "Notas da proposta" no topo) |
| `/?hora=13:00` | Simula a hora do almoço: a placa vira "Fechado, volta às 15h" |
| `/?dia=dom&hora=10:00` | Simula domingo: "Fechado, abre amanhã às 6h" |
| `/?dia=seg&hora=21:30` | Simula fim do dia: "Aberto, fecha em 30 min" |

## Onde mexer

| O quê | Arquivo |
|---|---|
| Horários, telefone, endereço, modalidades, fotos, textos dos cartazes | `content/stillo.ts` |
| Regras do "aberto/fechado" (fuso de Goiânia, próxima abertura) | `lib/horario.ts` |
| Cores, fontes, tamanhos | `app/globals.css` (bloco `:root`) |
| Seções da página e ordem | `app/page.tsx` e `components/sections/` |
| Notas da proposta | componentes `<Nota>` nas seções e `<NotasToggle>` no cabeçalho. No site final, remova os dois |
| Fotos | `public/fotos/` |

## Stack

Next.js 16 (App Router) + React 19 + TypeScript, GSAP + ScrollTrigger e Lenis pelo npm (padrões da skill site-premium: hero fixado com letreiro que se desfaz e muro de cartazes com trilha horizontal + cortina). Uma fonte só, Archivo variável pelo `next/font` (títulos em peso 900, largura 66% e itálico), servida pelo próprio site. Paleta: preto, vermelho #C8102E e branco, as cores do logo. CSP restrita em `next.config.ts`; a única exceção é o mapa do Google em `<iframe>`.

## O que é provisório

- **Fotos**: tiradas do Instagram da Stillo (capas de destaque em 150 px). Próxima etapa: sessão de fotos e vídeo na academia.
- **Telefone**: a bio do Instagram traz (62) 98325-5339; o Google Maps traz (62) 99399-3311. Confirmar qual é o WhatsApp.
- **Endereço**: texto do comunicado de mudança (jul/2024). No Google Maps o endereço está desatualizado e o perfil não foi reivindicado.
- **Sem dados reais ainda**: grade de horário das turmas, preços dos planos, depoimentos. Nada disso foi inventado; viraram notas da proposta.
- **Falta para publicar**: domínio, `og:image` 1200×630, logo em vetor, política de privacidade se entrar formulário ou analytics.
