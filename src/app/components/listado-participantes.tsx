"use client";

import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useAppStore } from "../store";
import { Timer } from "./timer";

export const ListadoParticipantes = () => {
  const { seleccionados, delSeleccionado, startTime } = useAppStore(
    useShallow((state) => ({
      seleccionados: state.seleccionados,
      delSeleccionado: state.delSeleccionado,
      startTime: state.startTime,
    }))
  );

  const [anim, setAnim] = useState(false);

  useEffect(() => {
    console.log(startTime);
    setAnim(true);
    const timeout = setTimeout(() => setAnim(false), 400); // pequeño delay para reiniciar
    return () => clearTimeout(timeout);
  }, [startTime]); // 👉 se reinicia cada vez que cambia el valor en Zustand

  return (
    <div className="flex items-center flex-col min-h-1/2 max-h-[80vh] overflow-y-auto py-3">
      {seleccionados.length === 0
        ? null
        : seleccionados.map((p, index) => {
            var classText = index === 0 ? "font-bold" : "";
            classText =
              index > 1
                ? "text-gray-400 text-3xl"
                : `text-gray-900 ${classText}`;

            return (
              <div
                className={`flex flex-col items-center justify-center sm:flex-row text-4xl cursor-pointer ${
                  index === 0 ? "mb-4 border-2 border-gray-400 p-2 rounded-md" : "mb-0"
                } ${index === 0 && anim ? "animate-expand" : ""} `}
                key={index}
                onClick={() => delSeleccionado(p)}
              >
                <div className={`w-auto ${classText}`}>{p}</div>
                {index === 0 && <Timer />}
              </div>
            );
          })}
    </div>
  );
};
