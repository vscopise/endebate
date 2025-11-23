"use client";
import { useShallow } from "zustand/shallow";

import { useAppStore } from "../store";

export const Result = () => {
  const { texto, datos, addSeleccionado, addParlanchin, comite } = useAppStore(
    useShallow((state) => ({
      texto: state.texto,
      datos: state.datos,
      addSeleccionado: state.addSeleccionado,
      addParlanchin: state.addParlanchin,
      comite: state.comite,
    }))
  );

  const processSeleccionado = (sel: string) => {
    //console.log({sel});
    addSeleccionado(sel);
    addParlanchin(sel);
  }

  // Función para normalizar y eliminar acentos de un string
  const normalizarString = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const adherentes =
    comite === "" ? datos : datos.filter((c) => c[1] === comite);

    console.log({adherentes})

  const resultados =
    texto.trim() === ""
      ? []
      : adherentes.filter((p) =>
          normalizarString(p[0]).includes(normalizarString(texto))
        );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex w-full flex-wrap justify-center gap-2 ">
        {resultados.length === 0
          ? null
          : resultados.map((item, index) => (
              <div
                className="inline-flex rounded-md bg-slate-800 py-0.5 px-2.5 border border-transparent text-xl text-white transition-all shadow-sm cursor-pointer"
                key={index}
                onClick={() => processSeleccionado(item[0])}
                //onClick={() => addSeleccionado(item[0])}
              >
                {item[0]}
              </div>
            ))}
      </div>
    </div>
  );
};
