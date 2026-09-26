import { academia } from '@/content/stillo';
import { BotaoWhatsApp } from '@/components/ui/botao-whatsapp';

/** Endereço do jeito que o bairro explica: pelo ponto de referência primeiro. */
export function ComoChegar() {
  const { endereco } = academia;
  return (
    <section className="chegar" id="como-chegar" aria-labelledby="chegar-titulo">
      <div className="chegar__texto">
        <h2 className="titulo-secao" id="chegar-titulo">
          Sabe a passarela da Couto Magalhães?
        </h2>
        <p className="chegar__ref">A Stillo fica bem em frente, do lado da Igreja Bom Pastor.</p>
        <address className="chegar__endereco">
          {endereco.linha1}
          <br />
          {endereco.linha2}
        </address>
        <div className="chegar__acoes">
          <a className="botao" href={endereco.rotaUrl} target="_blank" rel="noopener noreferrer">
            Abrir rota no Google Maps
          </a>
          <BotaoWhatsApp className="botao--contorno" mensagem="Oi, Stillo! Vi o site e queria ajuda para chegar aí.">
            Pedir ajuda no WhatsApp
          </BotaoWhatsApp>
        </div>
      </div>
      <div className="chegar__mapa">
        <iframe
          title="Mapa com a localização da Academia Stillo Fitness"
          src={endereco.embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
