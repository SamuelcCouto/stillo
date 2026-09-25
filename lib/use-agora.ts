'use client';

import { useSyncExternalStore } from 'react';
import { assinarRelogio, momentoDoMinuto, minutoDaSemanaAgora, type Momento } from '@/lib/horario';

/**
 * O momento atual no fuso da academia, ou `null` no servidor e na hidratação.
 * O HTML do servidor não sabe a hora de quem visita; o navegador completa logo
 * depois de hidratar, sem aviso de "text content does not match".
 */
export function useAgora(): Momento | null {
  const minuto = useSyncExternalStore(assinarRelogio, minutoDaSemanaAgora, () => -1);
  return minuto < 0 ? null : momentoDoMinuto(minuto);
}
