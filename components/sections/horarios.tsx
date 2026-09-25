'use client';

import { horarios, nomesDias, type DiaSemana } from '@/content/stillo';
import { formatarHora } from '@/lib/horario';
import { useAgora } from '@/lib/use-agora';
import { BarraDia, pos, textoFaixas } from '@/components/ui/regua';
import { Nota } from '@/components/notas';

const ORDEM: DiaSemana[] = [1, 2, 3, 4, 5, 6, 0];
const ESCALA = [6, 8, 10, 12, 14, 16, 18, 20, 22].map((h) => h * 60);

/** A semana em réguas: cada dia com as faixas abertas; hoje em destaque, com o "agora". */
export function Horarios() {
  const agora = useAgora();

  return (
    <section className="horarios" id="horarios" aria-labelledby="horarios-titulo">
      <div className="horarios__topo">
        <h2 className="titulo-secao" id="horarios-titulo">
          Quando a porta tá aberta.
        </h2>
        <p className="horarios__texto">
          De segunda a sexta fecha na hora do almoço, das 12h às 15h. Sábado é só de manhã, e domingo é descanso.
        </p>
      </div>

      <div className="semana">
        <div className="semana__linha semana__linha--escala" aria-hidden="true">
          <span />
          <div className="semana__escala">
            {ESCALA.map((m) => (
              <span key={m} style={{ left: `${pos(m)}%` }}>
                {formatarHora(m)}
              </span>
            ))}
          </div>
          <span />
        </div>
        <ul className="semana__dias">
          {ORDEM.map((dia) => {
            const hoje = agora?.dia === dia;
            return (
              <li className="semana__linha" key={dia} data-hoje={hoje || undefined}>
                <span className="semana__nome">
                  {nomesDias[dia].curto}
                  {hoje ? <span className="semana__hoje">hoje</span> : null}
                </span>
                <BarraDia faixas={horarios[dia]} agora={hoje ? agora?.minuto : null} />
                <span className="semana__horas">{textoFaixas(horarios[dia])}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <Nota titulo="Grade das turmas" className="nota--horarios">
        Aqui entra a grade das aulas: que horas tem Jump, Ritmos, GAP, ABS e Funcional. Na versão com área do aluno,
        dá até para reservar vaga na turma.
      </Nota>
    </section>
  );
}
