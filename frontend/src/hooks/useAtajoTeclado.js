import { useEffect } from 'react';

/**
 * Hook para manejar atajos de teclado.
 *
 * @param {string} tecla Tecla que se va a escuchar.
 * @param {Function} onPress Función que se ejecuta con el atajo.
 * @param {Object} options Opciones para el atajo.
 * @param {boolean} options.ctrl Indica si se requiere la tecla Ctrl.
 */

export function useAtajoTeclado(tecla, onPress, { ctrl = false } = {}) {
  useEffect(() => {
    const handler = (e) => {
      const enInput = ['INPUT', 'TEXTAREA'].includes(e.target.tagName);
      if (enInput) return;
      if (ctrl && !e.ctrlKey) return;
      if (e.key.toLowerCase() !== tecla.toLowerCase()) return;
      e.preventDefault();
      onPress(e);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [tecla, onPress, ctrl]);
}