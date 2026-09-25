'use client';

import { useEffect, useState } from 'react';

/**
 * Camada de notas para apresentar a proposta ao dono: cada nota explica
 * uma ideia do site ou o que vem depois. Fica escondida até alguém ligar
 * pelo botão (ou abrir com ?notas=1). No site final, basta remover as <Nota>
 * e o <NotasToggle>.
 */
export function Nota({ titulo, children, className = '' }: { titulo: string; children: React.ReactNode; className?: string }) {
  return (
    <aside className={`nota ${className}`} aria-label={`Nota da proposta: ${titulo}`}>
      <strong className="nota__titulo">{titulo}</strong>
      {children}
    </aside>
  );
}

export function NotasToggle() {
  const [ligado, setLigado] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(document.querySelectorAll('.nota').length);
    let inicial = new URLSearchParams(location.search).get('notas') === '1';
    try {
      inicial ||= sessionStorage.getItem('stillo-notas') === '1';
    } catch {}
    setLigado(inicial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('com-notas', ligado);
    try {
      sessionStorage.setItem('stillo-notas', ligado ? '1' : '0');
    } catch {}
  }, [ligado]);

  return (
    <button type="button" className="notas-botao" aria-pressed={ligado} onClick={() => setLigado((v) => !v)}>
      {/* Rótulo fixo: o estado ligado/desligado vai no aria-pressed e na cor. */}
      <span>
        Notas<span className="notas-botao__extra"> da proposta</span>
      </span>
      {total ? <span className="notas-botao__total">{total}</span> : null}
    </button>
  );
}
