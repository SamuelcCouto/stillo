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
| `/?hora=13:00` | Simula a hora do almoço: a placa vira "Fechado, volta às 15h" |
| `/?dia=dom&hora=10:00` | Simula domingo: "Fechado, abre amanhã às 6h" |
| `/?dia=seg&hora=21:30` | Simula fim do dia: "Aberto, fecha em 30 min" |

### Pontos para falar na apresentação

- **Placa ao vivo**: Ela olha a hora de Goiânia e responde sozinha se a Stillo tá aberta, até na hora do almoço. Menos “tá aberto?” no WhatsApp.
- **Uma frase para a marca**: “Cada um no seu Stillo” brinca com o nome e cabe em tudo: muro, camiseta, post, garrafinha.
- **Um clique, mensagem pronta**: Cada cartaz abre o WhatsApp da Stillo com a mensagem já escrita, dizendo qual aula a pessoa quer. Quem atende já sabe do que se trata.
- **Fotos provisórias**: Tiradas dos destaques do Instagram, por isso tão pequenas. Próxima etapa: uma manhã de fotos e vídeo na academia, com as turmas de verdade.
- **Grade das turmas**: Aqui entra a grade das aulas: que horas tem Jump, Ritmos, GAP, ABS e Funcional. Na versão com área do aluno, dá até para reservar vaga na turma.
- **Google desatualizado**: No Google Maps, o endereço da Stillo ainda é o antigo (R. JR 6), o perfil não foi reivindicado e só tem 3 fotos. A gente arruma isso junto com o site: é de lá que vem muita gente nova.
- **E os preços?**: Mostrar o valor dos planos aqui é opcional, mas ajuda: muita gente desiste quando precisa perguntar o preço. Você decide o que aparece.
- **Depois do site**: Domínio próprio (algo como stillofitness.com.br), área do aluno com treino no celular, check-in na recepção e mensalidade no Pix automático. O site é a porta de entrada disso tudo.

## Onde mexer

| O quê | Arquivo |
|---|---|
| Horários, telefone, endereço, modalidades, fotos, textos dos cartazes | `content/stillo.ts` |
| Regras do "aberto/fechado" (fuso de Goiânia, próxima abertura) | `lib/horario.ts` |
| Cores, fontes, tamanhos | `app/globals.css` (bloco `:root`) |
| Seções da página e ordem | `app/page.tsx` e `components/sections/` |
| Fotos | `public/fotos/` |

## Stack

Next.js 16 (App Router) + React 19 + TypeScript, GSAP + ScrollTrigger e Lenis pelo npm (padrões da skill site-premium: hero fixado com letreiro que se desfaz e muro de cartazes com trilha horizontal + cortina). Uma fonte só, Archivo variável pelo `next/font` (títulos em peso 800, largura 72% e itálico), servida pelo próprio site. Paleta nas proporções do logo: fundos pretos e brancos, vermelho #C8102E só em letras e detalhes. CSP restrita em `next.config.ts`; a única exceção é o mapa do Google em `<iframe>`.

## O que é provisório

- **Fotos**: tiradas do Instagram da Stillo (capas de destaque em 150 px). Próxima etapa: sessão de fotos e vídeo na academia.
- **Telefone**: a bio do Instagram traz (62) 98325-5339; o Google Maps traz (62) 99399-3311. Confirmar qual é o WhatsApp.
- **Endereço**: texto do comunicado de mudança (jul/2024). No Google Maps o endereço está desatualizado e o perfil não foi reivindicado.
- **Sem dados reais ainda**: grade de horário das turmas, preços dos planos, depoimentos. Nada disso foi inventado; ficam como pendências para o dono.
- **Falta para publicar**: domínio, `og:image` 1200×630, logo em vetor, política de privacidade se entrar formulário ou analytics.
