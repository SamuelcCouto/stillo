import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { Cabecalho } from '@/components/cabecalho';
import { BarraCelular } from '@/components/barra-celular';
import { academia } from '@/content/stillo';
import './globals.css';

// Uma família só, variável no peso e na largura: texto em largura normal,
// horários estreitos e títulos no extremo (estreito, preto e itálico, como o logo).
const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${academia.nome} | ${academia.bairro}, ${academia.cidade}`,
  description:
    'Musculação, Jump, Funcional, Ritmos, GAP, ABS, ergometria e avaliação física no Conjunto Vera Cruz I, em Goiânia. Veja se a Stillo está aberta agora e chame no WhatsApp.',
  icons: { icon: '/fotos/logo.jpg' },
  openGraph: {
    title: academia.nome,
    description: 'Cada um no seu Stillo. Academia no Conjunto Vera Cruz I, Goiânia.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#000000' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <body>
        <a className="pular" href="#conteudo">Pular para o conteúdo</a>
        <SmoothScroll />
        <Cabecalho />
        {children}
        <BarraCelular />
      </body>
    </html>
  );
}
