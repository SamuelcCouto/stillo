import { Fragment } from 'react';

/**
 * Quebra o título em letras no próprio JSX. No HTML puro isso é feito
 * mexendo no DOM depois de carregar; no React, o DOM mudado por fora não bate
 * com o que o servidor renderizou e a hidratação reclama.
 *
 * Cada letra tem duas camadas: `.char` é animada pela rolagem e `.char__in`
 * pela entrada. Assim as duas animações nunca disputam a mesma propriedade.
 * O leitor de tela lê a cópia em `.sr-only`; as letras soltas ficam ocultas.
 *
 * Não usa hooks, então funciona em componente de servidor ou de cliente.
 */
export function SplitChars({ linhas }: { linhas: string[] }) {
  return (
    <>
      <span className="sr-only">{linhas.join(' ')}</span>
      {linhas.map((linha, i) => (
        <span className="line" aria-hidden="true" key={i}>
          {linha.split(' ').map((palavra, j, palavras) => (
            <Fragment key={j}>
              <span className="word">
                {Array.from(palavra).map((letra, k) => (
                  <span className="char" key={k}>
                    <span className="char__in">{letra}</span>
                  </span>
                ))}
              </span>
              {j < palavras.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </span>
      ))}
    </>
  );
}
