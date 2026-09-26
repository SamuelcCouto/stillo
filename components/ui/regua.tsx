'use client';

import { horarios, nomesDias, type DiaSemana, type Faixa } from '@/content/stillo';
import { formatarHora } from '@/lib/horario';
import { useAgora } from '@/lib/use-agora';

/** A régua vai das 5h às 23h: o dia útil da academia com uma folga de cada lado. */
export const REGUA_INICIO = 5 * 60;
export const REGUA_FIM = 23 * 60;
export const pos = (minuto: number) =>
  (Math.min(Math.max(minuto, REGUA_INICIO), REGUA_FIM) - REGUA_INICIO) / (REGUA_FIM - REGUA_INICIO) * 100;

export const textoFaixas = (faixas: readonly Faixa[]) =>
  faixas.length ? faixas.map(([a, b]) => `${formatarHora(a)} às ${formatarHora(b)}`).join(' e ') : 'fechado';

/** Barra de um dia, com as faixas abertas e, se for hoje, o "agora". */
export function BarraDia({ faixas, agora }: { faixas: readonly Faixa[]; agora?: number | null }) {
  const agoraVisivel = agora != null && agora >= REGUA_INICIO && agora <= REGUA_FIM;
  const lado = agoraVisivel ? (pos(agora) > 80 ? ' barra__agora-rotulo--direita' : pos(agora) < 20 ? ' barra__agora-rotulo--esquerda' : '') : '';
  return (
    <div className="barra" aria-hidden="true">
      {faixas.map(([a, b]) => (
        <span className="barra__faixa" key={`${a}-${b}`} style={{ left: `${pos(a)}%`, width: `${pos(b) - pos(a)}%` }} />
      ))}
      {agoraVisivel ? (
        <span className="barra__agora" style={{ left: `${pos(agora)}%` }}>
          <span className={`barra__agora-rotulo${lado}`}>agora, {formatarHora(agora)}</span>
        </span>
      ) : null}
    </div>
  );
}

/** Régua de hoje, no rodapé do hero. */
export function ReguaDia() {
  const agora = useAgora();
  // Antes de saber o dia (servidor), mostra o dia útil, que é o caso mais comum.
  const dia: DiaSemana = agora?.dia ?? 1;
  const faixas = horarios[dia];
  const titulo = agora ? `Hoje, ${nomesDias[dia].longo}` : 'Segunda a sexta';
  const marcas = [...new Set(faixas.flat())];

  return (
    <figure className="regua">
      <figcaption className="regua__legenda">
        <span>{titulo}</span>
        <span>{textoFaixas(faixas)}</span>
      </figcaption>
      <BarraDia faixas={faixas} agora={agora?.minuto} />
      <div className="regua__marcas" aria-hidden="true">
        {marcas.map((m) => (
          <span key={m} style={{ left: `${pos(m)}%` }}>{formatarHora(m)}</span>
        ))}
      </div>
    </figure>
  );
}
