import { useState, useEffect } from 'react';

/**
 * Hook para sincronizar el estado con localStorage.
 *
 * @param {string} clave Clave en LocalStorage.
 * @param {*} valorInicial Valor cuando no hay información guardada.
 * @returns {[any, Function]} Valor actual y función para actualizarlo.
 */

export function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave);
      return guardado !== null ? JSON.parse(guardado) : valorInicial;
    } catch { return valorInicial; }
  });
  useEffect(() => {
    try { localStorage.setItem(clave, JSON.stringify(valor)); }
    catch (e) { console.warn(`useLocalStorage: no guardado "${clave}"`, e); }
  }, [clave, valor]);
  return [valor, setValor];
}

export default useLocalStorage;