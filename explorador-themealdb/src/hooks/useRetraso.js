import { useEffect, useState } from 'react';

export function useRetraso(valor, milisegundos = 400) {
  const [retrasado, setRetrasado] = useState(valor);

  useEffect(() => {
    const temporizador = setTimeout(() => setRetrasado(valor), milisegundos);
    return () => clearTimeout(temporizador);
  }, [valor, milisegundos]);

  return retrasado;
}
