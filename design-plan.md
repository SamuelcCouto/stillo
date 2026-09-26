# Plano de design — Academia Stillo Fitness (rascunho de proposta)

## Dados levantados (25/09/2026)
| Fonte | Dado |
|---|---|
| Instagram @stillo_fitnessacademia | 3.011 seguidores, 148 posts. Modalidades: Musculação, Ergometria, Treinamento Funcional, Ritmos, ABS, GAP, Jump, Avaliação Física. Horário: seg a sex 6h–12h e 15h–22h, sáb 7h–12h. Telefone na bio: 98325-5339 |
| Post de 09/07/2024 | Mudança para "Av. Couto Magalhães com a Rua VI 3, Qd QI 2, Lt 02, em frente à passarela, ao lado da Igreja Bom Pastor, Conjunto Vera Cruz I" |
| Google Maps | "Academia Stillo Fitness", R. JR 6, 3 - Conj. Vera Cruz, Goiânia-GO, 74494-095, (62) 99399-3311. Perfil **não reivindicado**, sem site, 3 fotos, sem avaliações visíveis. Pino em -16.6570757, -49.3802482 |
| Marca | Selo circular preto, figura musculosa em vermelho, "Stillo Fitness" em pincel itálico, "Get fit / Stay strong / Be healthy". Sala de aulas com luz rosa. Parede com letreiro pintado |
| Pesquisa de sites de academia | Padrão: fundo preto, fonte condensada em caixa alta, foto de banco, "transforme seu corpo", 3 cards de plano, carrossel de depoimentos. Premiados (La Huella, Phive): tipografia enorme sobre cor chapada |

A confirmar com o dono: qual telefone é o WhatsApp; endereço exato; grade das turmas; preços.

## Tema
Sujeito: a academia do bairro Vera Cruz I, em Goiânia, com musculação e muitas aulas em turma.
Público: moradores do Vera Cruz e arredores, que chegam pelo link do Instagram, pelo celular.
Função da página: responder "tá aberta? onde fica? que aula tem?" e levar a pessoa a mandar um oi no WhatsApp.
Detalhe do mundo do cliente: o **letreiro pintado à mão** e a **placa de porta "Aberto/Fechado"** do comércio de bairro, o **horário quebrado** (fecha no almoço) e o **endereço dado por ponto de referência** ("em frente à passarela, do lado da igreja").

## Revisão 3 (pedido do cliente)
- Nenhum fundo vermelho: fundos só pretos e brancos (+ cinza-claro neutro), com o preto predominando como no logo. Vermelho só em letras, sombras dos títulos e detalhes (barras de horário, marcador "agora", ponto de status, contorno do "hoje").
- Placa "Aberto": chapa branca com a palavra em vermelho e sombra vermelha; "Fechado": chapa preta. Cartazes alternam preto e branco. Cortina e mural das turmas: pretos.
- Letreiro menos exagerado: peso 900 → 800, largura 66% → 72%, sombra de .05em → .035em, tamanhos ~6% menores.
- Celular: título logo abaixo do cabeçalho; placa (e foto, em telas altas) na parte de baixo, à direita.
- Notas da proposta removidas; o espaço virou um botão "Menu" no celular e no tablet.

## Paleta (revisão 2, pedido do cliente: só as cores do logo)
| Token | Hex | Papel |
|-------|-----|-------|
| --preto | #000000 | hero, horários, rodapé, cartazes: o selo do logo |
| --vermelho | #C8102E | o vermelho do logo: placa, sombra do letreiro, cartazes, mural, cortina |
| --vermelho-escuro | #7A0A1C | só sombra de peças vermelhas sobre preto |
| --branco | #FFFFFF | texto sobre preto e vermelho, seções claras, cartazes |
| --claro | #F2F2F2 | fundo alternativo das seções claras |
| --cinza | #555555 | texto secundário sobre fundo claro |

Regras: branco sobre vermelho tem contraste 5,9 (texto de qualquer tamanho). Vermelho sobre preto (3,6) só em texto grande e pesado. Nada de rosa, amarelo ou verde: o status "aberto" usa o vermelho da placa.
Revisão 1 (descartada): rosa #FF5CA8 da sala como campo principal e post-its amarelos. O cliente achou longe do logo.

## Tipografia (revisão 2: uma família só)
**Archivo** variável (peso 100–900, largura 62–125, itálico) faz tudo:
- Letreiro (títulos, placa, números, marca): peso 900, largura 66%, itálico, como o "Stillo Fitness" inclinado do logo, com a sombra chapada vermelha deslocada.
- Texto: largura 100. Horários e dados: largura 75–85 (cara de tabela de horário).
Revisão 1 (descartada): Shrikhand no letreiro e Kalam nas notas. O cliente achou com cara de HQ.
Escala: hero clamp(62px, 10.4vw, 172px); h2 clamp(44px, 6.4vw, 104px); cartaz pela palavra mais longa (container query); corpo 18px / 1.5.

## Layout
Conceito: um muro de bairro nas cores do logo. Seções são campos chapados de preto, vermelho e branco, os títulos vão de ponta a ponta, conteúdo alinhado à esquerda.

```
HERO (preto, fixado)
 Academia no Conjunto Vera Cruz I, Goiânia        ┌──┐  <- placa de porta
 Cada um                                         │ABERTO│  (vermelha, balança)
 no seu                                          │até 22h│
 Stillo.   (Archivo 900 itálico + sombra vermelha) └──────┘
 [Chamar no WhatsApp]  [Como chegar]
 5h ──6h████12h──15h█████22h── 23h   ● agora

MODALIDADES (fixado, trilha horizontal = muro de lambe-lambe)
 |cartaz preto|cartaz vermelho|cartaz branco|...  x8
 cada cartaz: tipo (turma / horário livre / hora marcada), nome enorme,
 foto colada com fita (se houver), uma frase, "Perguntar sobre Jump"
 -> revelação: painel vermelho abre do centro com a ilustração da equipe

TURMA (editorial sticky)
 | Treino rende mais com a turma.  |  mural de fotos coladas das turmas |
 | 3.011  8  13h                   |                                    |

HORÁRIOS  semana em réguas (seg..dom), hoje destacado, linha do "agora"
COMO CHEGAR  "Sabe a passarela da Couto Magalhães?" + mapa + rota
COMEÇAR  1 chama no WhatsApp  2 vem conhecer  3 escolhe plano e turma
RODAPÉ
```
Celular: tudo em uma coluna; barra fixa embaixo com o status ao vivo e o botão do WhatsApp.

## Mapa de seções
| Ordem | Seção | Padrão | Conteúdo |
|-------|-------|--------|----------|
| 1 | Hero | fixado, título que se desfaz | "Cada um no seu Stillo." + placa ao vivo + régua do dia |
| 2 | Modalidades | trilha horizontal fixada | 8 cartazes lambe-lambe |
| 3 | Revelação | clip-path do centro | ilustração da equipe sobre vermelho |
| 4 | Turma | coluna sticky + números | fotos reais das turmas, 3.011 / 8 / 13h |
| 5 | Horários | estático | réguas da semana, hoje em destaque |
| 6 | Como chegar + começar | estático | referência, endereço, mapa, 3 passos |
| 7 | Rodapé | grade | contato, redes, horário |

## Momento marcante
A placa "Aberto/Fechado" ao vivo, calculada no horário de Goiânia, pendurada ao lado do letreiro. É a pergunta que o dono mais responde no WhatsApp, e nenhum site de academia da região responde. Na entrada, a placa balança e para; as letras do letreiro sobem.

## Mídia
| Peça | Origem | Status |
|------|--------|--------|
| Logo | foto de perfil do Instagram (150px) | provisório, pedir o arquivo vetorial |
| Fotos das turmas | capas dos destaques (150px) | provisório, usadas pequenas como "foto colada" |
| Sala rosa | frame do reel fixado | provisório |
| Ilustração da equipe | post de 03/04/2025 | ok para rascunho |
| Vídeo / fotos grandes | não existe | próxima etapa: sessão na academia |

## Notas da proposta
Camada de notas em cartão branco com filete vermelho (botão "Notas da proposta", ou `?notas=1`) que explica ao dono cada ideia e o que vem depois (grade de turmas, preços, área do aluno, check-in, Pix). Fica fora do site final.

## Revisão contra o briefing
- Revisão 1 fugiu do preto com vermelho (padrão de academia) usando o rosa da sala; o cliente pediu a volta às cores do logo. O que evita o clichê agora é o layout (placa ao vivo, cartazes, mural) e o letreiro em caixa normal, não a paleta.
- Depoimentos e preços: não existem dados reais. Em vez de inventar, viram notas da proposta.
- Contadores tipo "+500 alunos": cortados. Só números verificáveis (3.011 seguidores, 8 modalidades, 13h por dia).
- Enfeite cortado: textura de meio-tom no fundo do hero, vídeo 3D, ícones nas modalidades.
