import { Hero } from '@/components/sections/hero';
import { Modalidades } from '@/components/sections/modalidades';
import { Turma } from '@/components/sections/turma';
import { Horarios } from '@/components/sections/horarios';
import { ComoChegar } from '@/components/sections/como-chegar';
import { Comecar } from '@/components/sections/comecar';
import { Rodape } from '@/components/sections/rodape';

/**
 * Ordem das seções = ordem dos ScrollTriggers. Os dois trechos fixados (hero e
 * muro de cartazes) vêm primeiro; o que está abaixo calcula posição contando com eles.
 */
export default function Pagina() {
  return (
    <>
      <main id="conteudo">
        <Hero />
        <Modalidades />
        <Turma />
        <Horarios />
        <ComoChegar />
        <Comecar />
      </main>
      <Rodape />
    </>
  );
}
