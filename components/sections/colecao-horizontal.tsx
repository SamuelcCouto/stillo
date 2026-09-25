'use client';

import { useRef, type ReactNode } from 'react';
import { COM_MOVIMENTO, gsap, obterLenis, useGSAP } from '@/lib/motion';

type Props = {
  /** id da seção, usado por âncoras e menus. */
  id?: string;
  /** Título para leitores de tela (a seção não mostra título visível). */
  titulo: string;
  /** Os itens: cada um um elemento com a classe `colecao__item`. */
  children: ReactNode;
  /** Conteúdo da revelação (vídeo, imagem, canvas). Sem ele, só a trilha. */
  revelacao?: ReactNode;
  /** Legenda que aparece quando a revelação abre. */
  legenda?: ReactNode;
  /** Progresso (0→1) da abertura, para ligar/desligar uma cena 3D. */
  aoRevelar?: (progresso: number) => void;
};

/**
 * Coleção horizontal + revelação numa timeline fixada só:
 * [ trilha anda para a esquerda ][ painel abre do centro ][ pausa ]
 * A revelação começa um pouco antes de a trilha parar, sem emenda.
 */
export function ColecaoHorizontal({ id, titulo, children, revelacao, legenda, aoRevelar }: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const secao = useRef<HTMLElement>(null);
  const trilha = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(COM_MOVIMENTO, () => {
        const s = secao.current!;
        const t = trilha.current!;
        const distancia = () => Math.max(0, t.scrollWidth - s.clientWidth);
        const TRILHA = 1;
        const REVELA = 0.6;

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: s,
            start: 'top top',
            end: () => `+=${distancia() + window.innerHeight * (revelacao ? 1.4 : 0.2)}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true, // recalcula ao redimensionar
          },
        });

        tl.to(t, { x: () => -distancia(), duration: TRILHA });

        if (revelacao) {
          // Oculta até a hora de abrir: com o recorte fechado no centro, o
          // arredondamento de subpixel deixava vazar uma linha de 1px.
          tl.set('.revelacao', { visibility: 'visible' }, TRILHA - 0.12)
            .fromTo('.revelacao',
              { clipPath: 'inset(0% 50% 0% 50%)' },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: REVELA,
                ease: 'power2.inOut',
                onUpdate: function (this: gsap.core.Tween) { aoRevelar?.(this.progress()); },
              },
              TRILHA - 0.12)
            .fromTo('.revelacao__midia', { scale: 1.3 }, { scale: 1, duration: REVELA, ease: 'power2.out' }, '<')
            .fromTo('.revelacao__legenda', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.2 }, '>-0.1')
            .to({}, { duration: 0.25 }); // pausa com a tela cheia
        }

        // Acessibilidade: com Tab num item fora da tela, rola até ele.
        const aoFocar = (evento: FocusEvent) => {
          const item = (evento.target as HTMLElement).closest<HTMLElement>('.colecao__item');
          const st = tl.scrollTrigger;
          const total = distancia();
          if (!item || !st || !total) return;
          const esquerda = item.offsetLeft + Number(gsap.getProperty(t, 'x'));
          if (esquerda >= -1 && esquerda + item.offsetWidth <= s.clientWidth + 1) return;
          const alvoX = gsap.utils.clamp(-total, 0, -(item.offsetLeft - (s.clientWidth - item.offsetWidth) / 2));
          const fracao = (-alvoX / total) * (TRILHA / tl.duration());
          const y = st.start + (st.end - st.start) * fracao;
          const lenis = obterLenis();
          if (lenis) lenis.scrollTo(y, { duration: 0.8 });
          else window.scrollTo({ top: y });
        };
        t.addEventListener('focusin', aoFocar);
        return () => t.removeEventListener('focusin', aoFocar);
      });

      // Sem animação, a revelação já está aberta.
      mm.add('(prefers-reduced-motion: reduce)', () => { aoRevelar?.(1); });
    },
    { scope: raiz },
  );

  return (
    <div ref={raiz}>
      <section className="colecao" id={id} ref={secao} aria-label={titulo}>
        <div className="colecao__trilha" ref={trilha}>
          {children}
        </div>
        {revelacao ? (
          <div className="revelacao">
            <div className="revelacao__midia">{revelacao}</div>
            {legenda ? <div className="revelacao__legenda">{legenda}</div> : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
