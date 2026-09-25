'use client';

import { statusEm } from '@/lib/horario';
import { useAgora } from '@/lib/use-agora';

/**
 * A placa de porta "Aberto / Fechado", pendurada por um cordão. O texto vem
 * do horário de Goiânia; antes de o navegador saber a hora, mostra o horário
 * resumido (é o que aparece também se o JavaScript falhar).
 */
export function Placa() {
  const agora = useAgora();
  const status = agora ? statusEm(agora) : null;
  const estado = status ? (status.aberto ? 'aberto' : 'fechado') : 'carregando';

  return (
    <div className="placa" data-estado={estado}>
      <div className="placa__corpo">
        <span className="placa__prego" aria-hidden="true" />
        <svg className="placa__cordao" viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M100 0 L34 70 M100 0 L166 70" fill="none" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="placa__chapa" role="status">
          {status ? (
            <>
              <span className="placa__texto">{status.placa}</span>
              <span className="placa__detalhe"> {status.detalhe}</span>
            </>
          ) : (
            <>
              <span className="placa__texto">Horário</span>
              <span className="placa__detalhe"> seg a sáb, desde 6h</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
