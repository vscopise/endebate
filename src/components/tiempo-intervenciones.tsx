"use client";

import { useAppStore } from "@/app/store";

export const TiempoIntervenciones = () => {
  const {
    primeraIntervencion,
    setPrimeraIntervencion,
    segundaIntervencion,
    setSegundaIntervencion,
  } = useAppStore();
  return (
    <>
      <div className="flex items-center px-1 py-5">
        <span className="font-bold text-gray-400 px-1">
          Primera Intervención
        </span>
        <select
          className="p-2 rounded border border-gray-300 focus:border-blue-400 shadow-sm"
          onChange={(e) => setPrimeraIntervencion(e.target.value)}
          defaultValue={primeraIntervencion}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
        <span className="font-bold text-gray-400 px-1">minuto(s)</span>
      </div>
      <div className="flex items-center px-1">
        <span className="font-bold text-gray-400 px-1">
          Segunda Intervención
        </span>
        <select
          className="p-2 rounded border border-gray-300 focus:border-blue-400 shadow-sm"
          onChange={(e) => setSegundaIntervencion(e.target.value)}
          defaultValue={segundaIntervencion}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
        <span className="font-bold text-gray-400 px-1">minuto(s)</span>
      </div>
    </>
  );
};
