"use client";

import { useAppStore } from "@/app/store";

export const SelectComite = () => {
  const { datos, setComite, comite } = useAppStore();

  const comites = [...new Set(datos.map((item) => item[1]))];

  return (
    <div className="p-2">
      <p className="font-bold text-gray-400 text-center py-1">Comité</p>
      <select
        className="w-full p-2 text-2xl rounded border border-gray-300 focus:border-blue-400 shadow-sm"
        onChange={(e) => setComite(e.target.value)}
        defaultValue={comite}
      >
        <option value="">Seleccione un Comité</option>
        <option value="">Todos</option>
        {comites.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};
