"use client";

import { useShallow } from "zustand/shallow";
import { useAppStore } from "../store";
import Link from "next/link";

export default function SelectComite() {
  const { datos, setComite, comite } = useAppStore(
    useShallow((state) => ({
      datos: state.datos,
      setComite: state.setComite,
      comite: state.comite,
    }))
  );

  const comites = [...new Set(datos.map((item) => item[1]))];

  return (
    <div className="p-2">
      <select
        className="w-full p-2 text-2xl rounded border border-gray-300 focus:border-blue-400 shadow-sm"
        onChange={(e) => setComite(e.target.value)}
      >
        <option value="">Seleccione un Comité</option>
        <option value="">Todos</option>
        {comites.map((c) => (
          <option key={c} selected={c === comite}>
            {c}
          </option>
        ))}
      </select>
      <div className="text-center py-6">
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white  text-2xl py-2 px-4 rounded-lg"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}
