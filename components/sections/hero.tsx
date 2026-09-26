'use client';

import { useRef } from 'react';
import { academia } from '@/content/stillo';
import { COM_MOVIMENTO, gsap, rolarPara, useGSAP } from '@/lib/motion';
import { SplitChars } from '@/components/motion/split-chars';
import { BotaoWhatsApp } from '@/components/ui/botao-whatsapp';
import { Placa } from '@/components/ui/placa';
import { ReguaDia } from '@/components/ui/regua';
import { Nota } from '@/components/notas';

/**
 * Hero fixado. Camadas, para entrada e rolagem nunca mexerem no mesmo elemento:
 *   entrada  -> .char__in, .hero__onde, .placa, .hero__foto, .barra__faixa, .hero__acao
 *   rolagem  -> .char, .hero__onde-wrap, .hero__placa-wrap, .hero__foto-wrap, .hero__regua-wrap, .hero__acao-wrap
 *   hover    -> .placa__corpo (a placa balança quando a mão passa)
 */
export function Hero() {
  const raiz = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // "animation: none" desliga o failsafe do CSS: uma animação com fill "forwards"
      // vence o estilo inline, e a placa, a foto e a régua não sumiriam na rolagem.
      gsap.set(['.hero__conteudo', '.hero__placa-wrap', '.hero__foto-wrap', '.hero__regua-wrap'], {
        opacity: 1,
        animation: 'none',
      });

      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        // A única entrada orquestrada da página: letras sobem, a placa é
        // pendurada e balança até parar, a régua do dia se desenha.
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .fromTo('.hero__onde', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1 }, 0.1)
          .fromTo('.char__in',
            { yPercent: 70, opacity: 0, filter: 'blur(14px)' },
            { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, stagger: 0.04 }, 0.2)
          .fromTo('.placa',
            { rotation: 18, y: -60, opacity: 0 },
            { rotation: 0, y: 0, opacity: 1, duration: 2.6, ease: 'elastic.out(1, 0.3)' }, 0.6)
          .fromTo('.hero__foto',
            { opacity: 0, rotation: -9, scale: 0.9 },
            { opacity: 1, rotation: 0, scale: 1, duration: 1.2, ease: 'back.out(1.6)' }, 1.1)
          .fromTo('.regua .barra__faixa',
            { scaleX: 0 },
            { scaleX: 1, duration: 1.1, stagger: 0.18, ease: 'power3.out' }, 0.95)
          .fromTo('.hero__acao', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1 }, 1);

        // Rolagem: o hero fica parado e o letreiro se desfaz da esquerda para a direita.
        gsap
          .timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=80%', pin: true, scrub: true } })
          .to('.hero__titulo .char',
            { opacity: 0, filter: 'blur(14px)', xPercent: 18, ease: 'power1.in', duration: 0.35, stagger: 0.05 }, 0)
          .to('.hero__onde-wrap', { opacity: 0, y: -10, duration: 0.3 }, 0)
          .to('.hero__acao-wrap', { opacity: 0, y: 10, duration: 0.3 }, 0.1)
          .to('.hero__placa-wrap', { rotation: -10, y: -30, opacity: 0, duration: 0.5, ease: 'power1.in' }, 0.35)
          .to('.hero__foto-wrap', { y: -60, rotation: 4, opacity: 0, duration: 0.5, ease: 'power1.in' }, 0.25)
          .to('.hero__regua-wrap', { opacity: 0, y: 16, duration: 0.4 }, 0.5);

        // A placa balança quando a mão passa por ela.
        const corpo = raiz.current!.querySelector<HTMLElement>('.placa__corpo');
        const balancar = () => {
          gsap.fromTo(corpo, { rotation: 7 }, { rotation: 0, duration: 1.8, ease: 'elastic.out(1, 0.25)', overwrite: true });
        };
        corpo?.addEventListener('pointerenter', balancar);
        return () => corpo?.removeEventListener('pointerenter', balancar);
      });
    },
    { scope: raiz },
  );

  return (
    <div ref={raiz}>
      <section className="hero" id="topo" aria-labelledby="hero-titulo">
        <div className="hero__conteudo">
          <div className="hero__onde-wrap">
            <p className="hero__onde">
              Academia no {academia.bairro}, {academia.cidade}
            </p>
          </div>
          <h1 className="hero__titulo" id="hero-titulo">
            <SplitChars linhas={['Cada um', 'no seu', 'Stillo.']} />
          </h1>
          <div className="hero__acao-wrap">
            <div className="hero__acao">
              <BotaoWhatsApp />
              <a
                className="botao botao--contorno"
                href="#como-chegar"
                onClick={(e) => {
                  e.preventDefault();
                  rolarPara('#como-chegar', { offset: -72 });
                }}
              >
                Como chegar
              </a>
            </div>
          </div>
        </div>

        <div className="hero__placa-wrap">
          <Placa />
        </div>

        <div className="hero__foto-wrap">
          <figure className="hero__foto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/sala-rosa-recorte.jpg"
              alt="Aula na sala da Stillo iluminada de rosa, com alunas de roupa rosa"
              width={361}
              height={200}
            />
            <figcaption>A sala acesa, em março de 2026</figcaption>
          </figure>
        </div>

        <div className="hero__regua-wrap">
          <ReguaDia />
        </div>

        <Nota titulo="Placa ao vivo" className="nota--hero-placa">
          Ela olha a hora de Goiânia e responde sozinha se a Stillo tá aberta, até na hora do almoço. Menos
          &ldquo;tá aberto?&rdquo; no WhatsApp.
        </Nota>
        <Nota titulo="Uma frase para a marca" className="nota--hero-frase">
          &ldquo;Cada um no seu Stillo&rdquo; brinca com o nome e cabe em tudo: muro, camiseta, post, garrafinha.
        </Nota>
      </section>
    </div>
  );
}
