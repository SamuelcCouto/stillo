/* eslint-disable @next/next/no-img-element */
import { academia, modalidades, turmas } from '@/content/stillo';
import { horasAbertasDiaUtil } from '@/lib/horario';
import { Contador } from '@/components/motion/contador';
import { Nota } from '@/components/notas';

/** Editorial: o texto e os números ficam parados à esquerda; o mural de fotos passa à direita. */
export function Turma() {
  const numeros = [
    { valor: academia.instagram.seguidores, rotulo: 'pessoas acompanham a Stillo no Instagram' },
    { valor: modalidades.length, rotulo: 'modalidades, da musculação ao Jump' },
    { valor: horasAbertasDiaUtil(), sufixo: 'h', rotulo: 'de porta aberta por dia, de segunda a sexta' },
  ];

  return (
    <section className="turma" id="turma" aria-labelledby="turma-titulo">
      <div className="turma__intro">
        <div>
          <h2 className="titulo-secao" id="turma-titulo">
            Treino rende mais com a turma.
          </h2>
          <p className="turma__texto">
            Tem gente que vem pelo peso, tem gente que vem pela música. No fim, todo mundo vira turma, e a turma
            cobra quando você falta.
          </p>
        </div>
        <ul className="numeros">
          {numeros.map((n) => (
            <li key={n.rotulo}>
              <span className="numeros__valor">
                <Contador valor={n.valor} sufixo={n.sufixo} />
              </span>
              <span className="numeros__rotulo">{n.rotulo}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="turma__mural">
        {turmas.map((t) => (
          <figure className="polaroide" key={t.legenda}>
            <img src={t.src} alt={t.legenda} width={150} height={150} loading="lazy" />
            <figcaption>{t.legenda}</figcaption>
          </figure>
        ))}
        <Nota titulo="Fotos provisórias" className="nota--turma">
          Tiradas dos destaques do Instagram, por isso tão pequenas. Próxima etapa: uma manhã de fotos e vídeo na
          academia, com as turmas de verdade.
        </Nota>
      </div>
    </section>
  );
}
