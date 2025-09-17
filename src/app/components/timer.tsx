"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "../store";

export const Timer = () => {
  //const segundosTotales = useAppStore((state) => state.seconds);
  const getSeconds = useAppStore((s) => s.getSeconds);

  const [segundosTotales, setsegundosTotales] = useState(getSeconds());

  // ⏱️ Actualizar cada segundo para re-renderizar
  useEffect(() => {
    const id = setInterval(() => {
      setsegundosTotales(getSeconds());
    }, 1000);

    return () => clearInterval(id);
  }, [getSeconds]);

  const minutes = Math.floor(segundosTotales / 60);
  const seconds = segundosTotales % 60;

  let bg = "";
  if (segundosTotales <= 180) {
    bg = "bg-green-600";
  } else if (180 < segundosTotales && segundosTotales <= 300) {
    bg = "bg-amber-600";
  } else {
    bg = "bg-red-600";
  }

  return (
    <div className={`w-auto px-2 text-white rounded-xl ml-2 text-2xl ${bg}`}>
      {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`}
    </div>
  );
};
