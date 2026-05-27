"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../store";
import clsx from "clsx";

export const Timer = () => {
  const getSeconds = useAppStore((s) => s.getSeconds);

  const parlanchines = useAppStore((s) => s.parlanchines);
  const seleccionados = useAppStore((s) => s.seleccionados);

  const [seconds, setSeconds] = useState(getSeconds());

  // referencia persistente del audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  //desbloquear el audio después de la primera interacción del usuario
  

   // evitar reproducir varias veces el mismo segundo
  const ultimoSonido = useRef<number | null>(null);

  // crear audio una sola vez
  useEffect(() => {
    audioRef.current = new Audio('/bell.mp3');
  }, []);


  // ⏱️ Actualizar cada segundo para re-renderizar
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(getSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, [getSeconds]);

  // reproducir sonido cuando llegue el límite del tiempo
  useEffect(() => {
    const intervenciones = parlanchines.filter(p => p.nombre === seleccionados[0])[0].intervenciones;

    const debeSonar =
      (intervenciones === 1 && seconds === 240) ||
      (intervenciones === 1 && seconds === 300) ||
      (intervenciones === 1 && seconds > 300 && seconds % 5 === 0) ||
      
      (intervenciones > 1 && seconds === 120) ||
      (intervenciones > 1 && seconds === 180) ||
      (intervenciones > 1 && seconds > 180 && seconds % 5 === 0);

    if (
      debeSonar &&
      ultimoSonido.current !== seconds
    ) {
      ultimoSonido.current = seconds

      if (audioRef.current) {
        audioRef.current.currentTime = 0

        audioRef.current.play().catch((err) => {
          console.error('Error reproduciendo sonido:', err)
        })
      }
    }
  }, [seconds]);

  return (
    <div
      className={clsx(
        `w-auto px-4 text-white rounded-xl sm:ml-2 sm:px-2 text-4xl`,
        { "bg-green-600": seconds <= 180 },
        { "bg-amber-600": 180 < seconds && seconds <= 300 },
        { "bg-red-600": 300 < seconds }
      )}
    >
      {`${Math.floor(seconds / 60)}:${seconds % 60}`.replace(/\b(\d)\b/g, "0$1")}
    </div>
  );
};
