const passos = [
  { titulo: 'Manda um oi', texto: 'Conta no WhatsApp o que você quer treinar e em que horário fica melhor.' },
  { titulo: 'Vem conhecer', texto: 'Passa na academia para ver o espaço, os aparelhos e tirar as dúvidas com a equipe.' },
  { titulo: 'Escolhe plano e turma', texto: 'Fecha o plano que cabe no seu mês e marca o primeiro treino.' },
];

/** Três passos, do primeiro contato ao primeiro treino. É uma sequência de verdade, por isso numerada. */
export function Comecar() {
  return (
    <section className="comecar" aria-labelledby="comecar-titulo">
      <h2 className="titulo-secao" id="comecar-titulo">
        Do primeiro oi ao primeiro treino.
      </h2>
      <ol className="passos">
        {passos.map((p, i) => (
          <li className="passo" key={p.titulo}>
            <span className="passo__numero" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="passo__titulo">{p.titulo}</h3>
            <p className="passo__texto">{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
