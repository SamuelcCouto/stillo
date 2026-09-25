'use client';

import { statusEm } from '@/lib/horario';
import { useAgora } from '@/lib/use-agora';
import { BotaoWhatsApp } from '@/components/ui/botao-whatsapp';

/** Só no celular: o status da porta e o WhatsApp sempre à mão. */
export function BarraCelular() {
  const agora = useAgora();
  const status = agora ? statusEm(agora) : null;

  return (
    <div className="barra-celular">
      <p className="barra-celular__status" data-estado={status ? (status.aberto ? 'aberto' : 'fechado') : 'carregando'}>
        <span className="barra-celular__ponto" aria-hidden="true" />
        {status ? (
          <span>
            <strong>{status.placa}</strong> {status.detalhe}
          </span>
        ) : (
          <span>Seg a sáb, desde 6h</span>
        )}
      </p>
      <BotaoWhatsApp>WhatsApp</BotaoWhatsApp>
    </div>
  );
}
