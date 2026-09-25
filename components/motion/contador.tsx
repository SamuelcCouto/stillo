'use client';

import { useRef } from 'react';
import { COM_MOVIMENTO, gsap, useGSAP } from '@/lib/motion';

const formatar = (n: number) => n.toLocaleString('pt-BR');

/**
 * Número que conta de 0 até `valor` na primeira vez que aparece na tela.
 * O HTML do servidor já traz o valor final: sem JS ou com movimento
 * reduzido, o número certo aparece sem animação.
 */
export function Contador({ valor, sufixo = '' }: { valor: number; sufixo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(COM_MOVIMENTO, () => {
      const el = ref.current!;
      const estado = { v: 0 };
      el.textContent = formatar(0) + sufixo;
      gsap.to(estado, {
        v: valor,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = formatar(Math.round(estado.v)) + sufixo; },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
      // Ao desfazer (desmontar ou trocar a preferência), volta ao valor final.
      return () => { el.textContent = formatar(valor) + sufixo; };
    });
  }, { dependencies: [valor, sufixo] });

  return <span ref={ref} className="contador">{formatar(valor) + sufixo}</span>;
}
