/**
 * Conteúdo da Academia Stillo Fitness. É a única fonte de texto e dados do
 * site: trocar horário, telefone ou modalidade é aqui, não nos componentes.
 * Quando virar sistema (área do aluno, grade de turmas), estes dados passam a
 * vir do banco com o mesmo formato.
 *
 * Levantado do Instagram e do Google Maps em 25/09/2026. Itens marcados com
 * CONFIRMAR precisam da palavra do dono antes de publicar.
 */

export type DiaSemana = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo

/** Faixas em minutos desde a meia-noite: [abre, fecha). */
export type Faixa = readonly [number, number];

const h = (hora: number, minuto = 0) => hora * 60 + minuto;

export const academia = {
  nome: 'Academia Stillo Fitness',
  marca: 'Stillo Fitness',
  bairro: 'Conjunto Vera Cruz I',
  cidade: 'Goiânia',
  lema: ['Get fit.', 'Stay strong.', 'Be healthy.'],
  fusoHorario: 'America/Sao_Paulo',
  instagram: {
    usuario: 'stillo_fitnessacademia',
    url: 'https://www.instagram.com/stillo_fitnessacademia/',
    seguidores: 3011,
  },
  // CONFIRMAR: a bio do Instagram traz 98325-5339; o Google Maps, (62) 99399-3311.
  whatsapp: {
    numero: '5562983255339',
    exibicao: '(62) 98325-5339',
  },
  endereco: {
    referencia: 'Em frente à passarela, do lado da Igreja Bom Pastor',
    // CONFIRMAR: texto do comunicado de mudança (julho de 2024).
    linha1: 'Av. Couto Magalhães com Rua VI-3, Qd. QI 2, Lt. 02',
    linha2: 'Conjunto Vera Cruz I, Goiânia - GO',
    mapsUrl: 'https://maps.app.goo.gl/bMDacCQ5EPZj595D7',
    rotaUrl: 'https://www.google.com/maps/dir/?api=1&destination=-16.6570757,-49.3802482',
    embedUrl: 'https://www.google.com/maps?q=-16.6570757,-49.3802482&z=16&output=embed',
  },
} as const;

/** Horário de funcionamento por dia da semana. */
export const horarios: Record<DiaSemana, readonly Faixa[]> = {
  0: [],
  1: [[h(6), h(12)], [h(15), h(22)]],
  2: [[h(6), h(12)], [h(15), h(22)]],
  3: [[h(6), h(12)], [h(15), h(22)]],
  4: [[h(6), h(12)], [h(15), h(22)]],
  5: [[h(6), h(12)], [h(15), h(22)]],
  6: [[h(7), h(12)]],
};

export const nomesDias: Record<DiaSemana, { curto: string; longo: string }> = {
  0: { curto: 'Dom', longo: 'domingo' },
  1: { curto: 'Seg', longo: 'segunda' },
  2: { curto: 'Ter', longo: 'terça' },
  3: { curto: 'Qua', longo: 'quarta' },
  4: { curto: 'Qui', longo: 'quinta' },
  5: { curto: 'Sex', longo: 'sexta' },
  6: { curto: 'Sáb', longo: 'sábado' },
};

export type Formato = 'Aula em turma' | 'No seu horário' | 'Com hora marcada';

export type Modalidade = {
  id: string;
  nome: string;
  /** Como a modalidade entra na frase "queria saber mais sobre ___". */
  sobre: string;
  formato: Formato;
  descricao: string;
  foto?: { src: string; alt: string };
  cor: 'preto' | 'branco';
};

// Ordem = ordem dos cartazes no muro. Preto e branco se alternam; vermelho
// só nos detalhes (nome, sombra), nunca no fundo.
export const modalidades: Modalidade[] = [
  {
    id: 'musculacao',
    nome: 'Musculação',
    sobre: 'a musculação',
    formato: 'No seu horário',
    descricao: 'Aparelhos e pesos livres para ganhar força, no ritmo que o seu corpo pede.',
    foto: { src: '/fotos/alunos-sf.jpg', alt: 'Dois professores da Stillo ao lado de uma aluna segurando um troféu' },
    cor: 'preto',
  },
  {
    id: 'jump',
    nome: 'Jump',
    sobre: 'o Jump',
    formato: 'Aula em turma',
    descricao: 'Aula no mini trampolim, com música alta. Cansa, mas você só percebe no fim.',
    foto: { src: '/fotos/turma-jump.jpg', alt: 'Turma de Jump reunida para foto, à noite' },
    cor: 'branco',
  },
  {
    id: 'funcional',
    nome: 'Funcional',
    sobre: 'o Funcional',
    formato: 'Aula em turma',
    descricao: 'Agachar, empurrar, puxar, saltar: os movimentos do dia a dia em circuito.',
    foto: { src: '/fotos/turma-funcional.jpg', alt: 'Turma de treinamento funcional posando na academia' },
    cor: 'preto',
  },
  {
    id: 'ritmos',
    nome: 'Ritmos',
    sobre: 'as aulas de Ritmos',
    formato: 'Aula em turma',
    descricao: 'Coreografias fáceis em ritmos variados. Não precisa saber dançar.',
    foto: { src: '/fotos/turma-ritmos.jpg', alt: 'Alunas dançando durante a aula de Ritmos' },
    cor: 'branco',
  },
  {
    id: 'gap',
    nome: 'GAP',
    sobre: 'o GAP',
    formato: 'Aula em turma',
    descricao: 'Glúteo, abdômen e perna. Aula localizada, uma parte do corpo de cada vez.',
    foto: { src: '/fotos/turma-gap.jpg', alt: 'Turma de GAP fazendo exercício no chão' },
    cor: 'preto',
  },
  {
    id: 'abs',
    nome: 'ABS',
    sobre: 'o ABS',
    formato: 'Aula em turma',
    descricao: 'Aula só de abdômen, no colchonete, com o professor contando as séries.',
    foto: { src: '/fotos/turma-abs.jpg', alt: 'Alunas deitadas em colchonetes durante a aula de ABS' },
    cor: 'branco',
  },
  {
    id: 'ergometria',
    nome: 'Ergometria',
    sobre: 'a ergometria',
    formato: 'No seu horário',
    descricao: 'Esteira, bike e companhia. A parte do cardio, antes ou depois do treino.',
    cor: 'preto',
  },
  {
    id: 'avaliacao',
    nome: 'Avaliação física',
    sobre: 'a avaliação física',
    formato: 'Com hora marcada',
    descricao: 'Peso, medidas e composição do corpo, para acompanhar a evolução com número.',
    cor: 'branco',
  },
];

export const turmas = [
  { src: '/fotos/turma-jump.jpg', legenda: 'Turma do Jump' },
  { src: '/fotos/alunos-sf.jpg', legenda: 'Alunos SF' },
  { src: '/fotos/turma-funcional.jpg', legenda: 'Turma do Funcional' },
  { src: '/fotos/turma-ritmos.jpg', legenda: 'Turma de Ritmos' },
  { src: '/fotos/turma-gap.jpg', legenda: 'Turma de GAP' },
  { src: '/fotos/turma-abs.jpg', legenda: 'Turma de ABS' },
] as const;

/** Link do WhatsApp com a mensagem já escrita. */
export function linkWhatsApp(mensagem = 'Oi, Stillo! Vi o site e queria saber mais sobre a academia.') {
  return `https://wa.me/${academia.whatsapp.numero}?text=${encodeURIComponent(mensagem)}`;
}

export function mensagemModalidade(m: Pick<Modalidade, 'sobre'>) {
  return `Oi, Stillo! Vi o site e queria saber mais sobre ${m.sobre}.`;
}
