"use client";

import { useEffect } from "react";
import { useAppStore } from "../store";

export const Input = () => {
  const texto = useAppStore((state) => state.texto);
  const setTexto = useAppStore((state) => state.setTexto);

  const { datos, loading, error, fetchData } = useAppStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p className="text-center">Cargando...</p>
  if (error) return <p className="text-center">Error: {error}</p>

  return (
    <div className="p-2">
      <input
        className="w-full p-2 rounded border border-gray-300 focus:border-blue-400 shadow-sm"
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        autoFocus
        placeholder="Ingresa algún participante"
      />
    </div>
  );
};
