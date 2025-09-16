"use client";

import { useShallow } from "zustand/shallow";
import { useAppStore } from "../store";
import { Timer } from "./timer";

export const ListadoParticipantes = () => {
  const { seleccionados, delSeleccionado } = useAppStore(
    useShallow((state) => ({
      seleccionados: state.seleccionados,
      delSeleccionado: state.delSeleccionado,
    }))
  );

  return (
    <div className="flex items-center flex-col min-h-1/2 max-h-[80vh] overflow-y-auto py-3">
      {seleccionados.length === 0
        ? null
        : seleccionados.map((p, index) => (
            <div
              className={`flex flex-col items-center justify-center sm:flex-row cursor-pointer mb-2 ${
                index === 0 ? "text-4xl " : "text-xl"
              }`}
              key={index}
              onClick={() => delSeleccionado(p)}
            >
              <div className="w-auto text-gray-900">{p}</div>
              {index === 0 && <Timer />}
            </div>
          ))}
    </div>
  );
};
