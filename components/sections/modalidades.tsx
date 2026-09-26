/* eslint-disable @next/next/no-img-element */
import { linkWhatsApp, mensagemModalidade, modalidades } from '@/content/stillo';
import { ColecaoHorizontal } from '@/components/sections/colecao-horizontal';
import { IconeWhatsApp } from '@/components/ui/icone-whatsapp';

/**
 * O muro de lambe-lambe: um cartaz por modalidade, lado a lado, passando na
 * horizontal enquanto a página rola. No fim, uma cortina vermelha abre do
 * centro com a turma. Componente de servidor: só a trilha é de cliente.
 */
export function Modalidades() {
  return (
    <ColecaoHorizontal
      id="aulas"
      titulo="Aulas e modalidades"
      revelacao={
        <div className="revela">
          <p className="revela__frase">Ninguém treina sozinho aqui.</p>
          <figure className="revela__arte">
            <img
              src="/fotos/ilustracao-equipe.jpg"
              alt="Ilustração de professores e alunos da Stillo em frente ao letreiro pintado na parede da academia"
              width={512}
              height={640}
            />
          </figure>
        </div>
      }
      legenda={<p className="revela__legenda">Arte postada pela Stillo no Instagram em abril de 2025.</p>}
    >
      <div className="colecao__item intro">
        <h2 className="intro__titulo">Tem aula pra cada jeito de treinar.</h2>
        <p className="intro__texto">
          Musculação e cardio no seu horário. Jump, Funcional, Ritmos, GAP e ABS em turma, com música. E avaliação
          física para ver o resultado no papel.
        </p>
      </div>

      {modalidades.map((m) => (
        <article
          className={`colecao__item cartaz cartaz--${m.cor}${m.foto ? '' : ' cartaz--sem-foto'}`}
          key={m.id}
          aria-labelledby={`cartaz-${m.id}`}
          // O nome cresce até encher a largura do cartaz, pela palavra mais longa.
          style={{ '--letras': Math.max(...m.nome.split(' ').map((p) => p.length)) } as React.CSSProperties}
        >
          <p className="cartaz__formato">{m.formato}</p>
          <h3 className="cartaz__nome" id={`cartaz-${m.id}`}>
            {m.nome}
          </h3>
          {m.foto ? (
            <figure className="cartaz__foto">
              <img src={m.foto.src} alt={m.foto.alt} width={150} height={150} loading="lazy" />
            </figure>
          ) : null}
          <div className="cartaz__rodape">
            <p className="cartaz__descricao">{m.descricao}</p>
            <a className="cartaz__link" href={linkWhatsApp(mensagemModalidade(m))} target="_blank" rel="noopener noreferrer">
              <IconeWhatsApp tamanho={18} />
              Perguntar sobre {m.sobre}
            </a>
          </div>
        </article>
      ))}
    </ColecaoHorizontal>
  );
}
