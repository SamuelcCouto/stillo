import { academia, linkWhatsApp } from '@/content/stillo';
import { resumoSemana } from '@/lib/horario';
import { BotaoWhatsApp } from '@/components/ui/botao-whatsapp';

export function Rodape() {
  const { endereco, whatsapp, instagram } = academia;
  return (
    <footer className="rodape" id="contato">
      <div className="rodape__chamada">
        <p className="rodape__frase">Manda um oi.</p>
        <div className="rodape__acao">
          <BotaoWhatsApp variante="claro">Chamar no WhatsApp</BotaoWhatsApp>
          <p className="rodape__fone">{whatsapp.exibicao}</p>
        </div>
      </div>

      <div className="rodape__grade">
        <div>
          <h2 className="rodape__titulo">Endereço</h2>
          <p>
            {endereco.linha1}
            <br />
            {endereco.linha2}
          </p>
          <p className="rodape__ref">{endereco.referencia}.</p>
        </div>
        <div>
          <h2 className="rodape__titulo">Horário</h2>
          <ul className="rodape__lista">
            {resumoSemana().map((l) => (
              <li key={l.dias}>
                {l.dias}: {l.horas}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="rodape__titulo">Contato</h2>
          <ul className="rodape__lista">
            <li>
              <a href={linkWhatsApp()} target="_blank" rel="noopener noreferrer">
                WhatsApp {whatsapp.exibicao}
              </a>
            </li>
            <li>
              <a href={instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram @{instagram.usuario}
              </a>
            </li>
            <li>
              <a href={endereco.mapsUrl} target="_blank" rel="noopener noreferrer">
                Google Maps
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="rodape__titulo">{academia.marca}</h2>
          <p className="rodape__lema">
            {academia.lema.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
        </div>
      </div>

      <p className="rodape__credito">
        Rascunho de proposta, setembro de 2026. Textos, horários e fotos tirados do Instagram e do Google Maps da
        Stillo.
      </p>

    </footer>
  );
}
