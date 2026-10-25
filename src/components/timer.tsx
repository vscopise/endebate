"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/app/store";
import clsx from "clsx";

export const Timer = () => {
  const getSeconds = useAppStore((s) => s.getSeconds);

  const parlanchines = useAppStore((s) => s.parlanchines);
  const seleccionados = useAppStore((s) => s.seleccionados);

  const primeraIntervencion = +useAppStore((s) => s.primeraIntervencion);

  const segundaIntervencion = +useAppStore((s) => s.segundaIntervencion);

  const [seconds, setSeconds] = useState(getSeconds());

  const playSound = useAppStore((s) => s.playSound);

  // referencia persistente del audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // evitar reproducir varias veces el mismo segundo
  const ultimoSonido = useRef<number | null>(null);

  // crear audio una sola vez
  useEffect(() => {
    audioRef.current = new Audio("/bell.mp3");
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
    let tiempoIntervencion = primeraIntervencion;
    if (
      parlanchines.filter((p) => p.nombre === seleccionados[0])[0]
        .intervenciones > 1
    ) {
      tiempoIntervencion = segundaIntervencion;
    }

    const debeSonar =
      seconds === (tiempoIntervencion - 1) * 60 || // 1 minuto restante de la intervención
      seconds === tiempoIntervencion * 60 || // intervención finalizada
      (seconds >= tiempoIntervencion * 60 && seconds % 5 === 0); // cada 5 segundos después de la intervención

    if (debeSonar && playSound && ultimoSonido.current !== seconds) {
      ultimoSonido.current = seconds;

      if (audioRef.current) {
        audioRef.current.currentTime = 0;

        audioRef.current.play().catch((err) => {
          console.error("Error reproduciendo sonido:", err);
        });
      }
    }
  }, [seconds]);

  // Si ya intervino tomar la segunda intervención, si no la primera
  let tiempoIntervencion = parlanchines.filter((p) => p.nombre === seleccionados[0])[0]
      .intervenciones > 1 ? segundaIntervencion : primeraIntervencion;

  return (
    <div
      className={clsx(
        `w-auto px-4 text-white rounded-xl sm:ml-2 sm:px-2 text-4xl`,
        { "bg-green-600": seconds <= (tiempoIntervencion - 1) * 60 },
        {
          "bg-amber-600":
            (tiempoIntervencion - 1) * 60 <= seconds &&
            seconds < tiempoIntervencion * 60,
        },
        { "bg-red-600": tiempoIntervencion * 60 <= seconds },
      )}
    >
      {`${Math.floor(seconds / 60)}:${seconds % 60}`.replace(
        /\b(\d)\b/g,
        "0$1",
      )}
    </div>
  );
};
