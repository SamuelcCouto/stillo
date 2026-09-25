import { academia, horarios, nomesDias, type DiaSemana, type Faixa } from '@/content/stillo';

/** Um instante na semana da academia: dia (0 = domingo) e minuto do dia. */
export type Momento = { dia: DiaSemana; minuto: number };

export type Status = {
  aberto: boolean;
  /** O que a placa da porta diz. */
  placa: 'Aberto' | 'Fechado';
  /** Complemento da placa: "até as 22h", "volta às 15h"... */
  detalhe: string;
  /** Frase inteira, para a barra do celular e leitores de tela. */
  frase: string;
};

const DIAS_EN: Record<string, DiaSemana> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Dia e minuto no fuso da academia, seja qual for o fuso de quem visita. */
export function momentoEm(data: Date): Momento {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: academia.fusoHorario,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(data);
  const valor = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? '0';
  return { dia: DIAS_EN[valor('weekday')] ?? 1, minuto: Number(valor('hour')) * 60 + Number(valor('minute')) };
}

/** 360 -> "6h"; 930 -> "15h30". */
export function formatarHora(minuto: number) {
  const hh = Math.floor(minuto / 60);
  const mm = minuto % 60;
  return mm ? `${hh}h${String(mm).padStart(2, '0')}` : `${hh}h`;
}

export function faixaAtual(m: Momento): Faixa | undefined {
  return horarios[m.dia].find(([abre, fecha]) => m.minuto >= abre && m.minuto < fecha);
}

export function statusEm(m: Momento): Status {
  const atual = faixaAtual(m);
  if (atual) {
    const falta = atual[1] - m.minuto;
    const detalhe = falta <= 45 ? `fecha em ${falta} min` : `até as ${formatarHora(atual[1])}`;
    return { aberto: true, placa: 'Aberto', detalhe, frase: `Aberto agora, ${detalhe}` };
  }

  // Próxima abertura: ainda hoje ou nos próximos dias.
  for (let i = 0; i < 8; i++) {
    const dia = ((m.dia + i) % 7) as DiaSemana;
    const faixa = horarios[dia].find(([abre]) => i > 0 || abre > m.minuto);
    if (!faixa) continue;
    const hora = formatarHora(faixa[0]);
    let detalhe: string;
    if (i === 0) {
      const jaAbriuHoje = horarios[dia].some(([, fecha]) => fecha <= m.minuto);
      detalhe = jaAbriuHoje ? `volta às ${hora}` : `abre às ${hora}`;
    } else if (i === 1) {
      detalhe = `abre amanhã às ${hora}`;
    } else {
      detalhe = `abre ${nomesDias[dia].longo} às ${hora}`;
    }
    return { aberto: false, placa: 'Fechado', detalhe, frase: `Fechado agora, ${detalhe}` };
  }
  return { aberto: false, placa: 'Fechado', detalhe: '', frase: 'Fechado agora' };
}

/** Horário da semana em texto corrido, agrupando dias iguais. */
export function resumoSemana() {
  const faixasTexto = (f: readonly Faixa[]) =>
    f.map(([a, b]) => `${formatarHora(a)} às ${formatarHora(b)}`).join(' e ');
  return [
    { dias: 'Segunda a sexta', horas: faixasTexto(horarios[1]) },
    { dias: 'Sábado', horas: faixasTexto(horarios[6]) },
    { dias: 'Domingo', horas: 'fechado' },
  ];
}

/** Horas de porta aberta num dia útil (6h + 7h = 13h). */
export function horasAbertasDiaUtil() {
  return horarios[1].reduce((total, [a, b]) => total + (b - a), 0) / 60;
}

// ---------------------------------------------------------------------------
// Relógio compartilhado pelos componentes de cliente (placa, régua, barra).
// Um único intervalo para a página toda, e o React só redesenha quando o
// minuto muda. Para a apresentação, ?dia=sab&hora=13:30 simula outro momento.

const SIMULACAO_DIAS: Record<string, DiaSemana> = { dom: 0, seg: 1, ter: 2, qua: 3, qui: 4, sex: 5, sab: 6 };

function momentoSimulado(): Momento | null {
  const params = new URLSearchParams(window.location.search);
  const hora = params.get('hora');
  const dia = params.get('dia');
  if (!hora && !dia) return null;
  const real = momentoEm(new Date());
  const [hh, mm] = (hora ?? '').split(':').map(Number);
  return {
    dia: dia && dia in SIMULACAO_DIAS ? SIMULACAO_DIAS[dia] : real.dia,
    minuto: Number.isFinite(hh) ? hh * 60 + (Number.isFinite(mm) ? mm : 0) : real.minuto,
  };
}

/** Minuto da semana (dia * 1440 + minuto), um número só para o React comparar. */
export function minutoDaSemanaAgora() {
  const m = momentoSimulado() ?? momentoEm(new Date());
  return m.dia * 1440 + m.minuto;
}

export function momentoDoMinuto(minutoDaSemana: number): Momento {
  return { dia: Math.floor(minutoDaSemana / 1440) as DiaSemana, minuto: minutoDaSemana % 1440 };
}

export function assinarRelogio(avisar: () => void) {
  const id = window.setInterval(avisar, 20_000);
  return () => window.clearInterval(id);
}
