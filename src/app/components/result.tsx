"use client";
import { useShallow } from "zustand/shallow";

import { useAppStore } from "../store";

export const Result = () => {
  const { texto, datos, addSeleccionado } = useAppStore(
    useShallow((state) => ({
      texto: state.texto,
      datos: state.datos,
      addSeleccionado: state.addSeleccionado,
    }))
  );

  

  const resultados =
    texto.trim() === ""
      ? []
      : datos.filter((p) => p.toLowerCase().includes(texto.toLowerCase()));

  return (
    <div className="flex-1 overflow-y-auto">

      <div className="flex w-full flex-wrap justify-center gap-2 ">
        {resultados.length === 0
          ? null
          : resultados.map((item, index) => (
              <div
                className="inline-flex rounded-md bg-slate-800 py-0.5 px-2.5 border border-transparent text-xl text-white transition-all shadow-sm cursor-pointer"
                key={index}
                onClick={() => addSeleccionado(item)}
              >
                {item}
              </div>
            ))}
      </div>
    </div>
  );
};
