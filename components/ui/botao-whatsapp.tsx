import { linkWhatsApp } from '@/content/stillo';
import { IconeWhatsApp } from '@/components/ui/icone-whatsapp';

type Props = {
  mensagem?: string;
  children?: React.ReactNode;
  variante?: 'escuro' | 'claro';
  className?: string;
};

/** Abre o WhatsApp da Stillo com a mensagem já escrita. */
export function BotaoWhatsApp({ mensagem, children = 'Chamar no WhatsApp', variante = 'escuro', className = '' }: Props) {
  return (
    <a
      className={`botao ${variante === 'claro' ? 'botao--claro' : ''} ${className}`}
      href={linkWhatsApp(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconeWhatsApp />
      <span>{children}</span>
    </a>
  );
}
