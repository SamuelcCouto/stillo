'use client';

import { useEffect, useRef, useState } from 'react';
import { academia } from '@/content/stillo';
import { gsap, rolarPara, ScrollTrigger, useGSAP } from '@/lib/motion';
import { BotaoWhatsApp } from '@/components/ui/botao-whatsapp';

const links = [
  { href: '#aulas', rotulo: 'Aulas' },
  { href: '#turma', rotulo: 'Turma' },
  { href: '#horarios', rotulo: 'Horários' },
  { href: '#como-chegar', rotulo: 'Como chegar' },
];

export function Cabecalho() {
  const ref = useRef<HTMLElement>(null);
  const botaoMenu = useRef<HTMLButtonElement>(null);
  const [menuAberto, setMenuAberto] = useState(false);

  useGSAP(() => {
    const cab = ref.current!;
    gsap.set(cab, { opacity: 1, animation: 'none' });
    // Transparente (texto branco) sobre o preto do hero; sólido a partir do muro de cartazes.
    // refreshPriority baixo: calcula depois do pin do hero, que empurra a página.
    // Elemento, não seletor: o useGSAP restringe seletores ao próprio cabeçalho.
    const aulas = document.getElementById('aulas');
    if (!aulas) return;
    ScrollTrigger.create({
      trigger: aulas,
      start: () => `top ${cab.offsetHeight + 1}px`,
      refreshPriority: -1,
      onEnter: () => cab.classList.add('is-solido'),
      onLeaveBack: () => cab.classList.remove('is-solido'),
    });
  }, { scope: ref });

  // Menu do celular: fecha com Esc (devolvendo o foco ao botão) e com clique fora.
  useEffect(() => {
    if (!menuAberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuAberto(false);
        botaoMenu.current?.focus();
      }
    };
    const aoClicar = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setMenuAberto(false);
    };
    document.addEventListener('keydown', aoTeclar);
    document.addEventListener('pointerdown', aoClicar);
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      document.removeEventListener('pointerdown', aoClicar);
    };
  }, [menuAberto]);

  const irPara = (evento: React.MouseEvent<HTMLAnchorElement>, alvo: string) => {
    evento.preventDefault();
    setMenuAberto(false);
    rolarPara(alvo, { offset: alvo === '#aulas' ? 0 : -(ref.current?.offsetHeight ?? 0) });
    history.replaceState(null, '', alvo);
  };

  return (
    <header className={`cabecalho${menuAberto ? ' is-menu' : ''}`} ref={ref}>
      <a className="marca" href="#topo" onClick={(e) => irPara(e, '#topo')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/fotos/logo.jpg" alt="" width={44} height={44} />
        <span>{academia.marca}</span>
      </a>
      <nav className="nav" aria-label="Seções">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => irPara(e, l.href)}>
            {l.rotulo}
          </a>
        ))}
      </nav>
      <BotaoWhatsApp className="cabecalho__whats" />

      <button
        ref={botaoMenu}
        type="button"
        className="menu-botao"
        aria-expanded={menuAberto}
        aria-controls="menu-celular"
        onClick={() => setMenuAberto((v) => !v)}
      >
        <span className="menu-botao__icone" aria-hidden="true" />
        Menu
      </button>
      <nav className="menu-celular" id="menu-celular" aria-label="Seções" hidden={!menuAberto}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => irPara(e, l.href)}>
            {l.rotulo}
          </a>
        ))}
      </nav>
    </header>
  );
}
