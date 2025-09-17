"use client";

import { useShallow } from "zustand/shallow";
import { useAppStore } from "../store";
import { Timer } from "./timer";
import { useState } from "react";

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
        : seleccionados.map((p, index) => {
            var classText = index === 0 ? "text-4xl font-bold" : "text-3xl";
            classText =
              index > 1
                ? "text-gray-400 text-xl"
                : `text-gray-900 ${classText}`;

            return (
              <div
                className={`flex flex-col items-center justify-center sm:flex-row cursor-pointer ${
                  index === 0 ? "mb-2" : "mb-0"
                }`}
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
