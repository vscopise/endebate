"use client";

import { useEffect } from "react";
import { useAppStore } from "../store";

import {IoClose} from 'react-icons/io5'

export const Input = () => {
  const { texto, setTexto, loading, error, fetchData } = useAppStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p className="text-center">Cargando...</p>;
  if (error) return <p className="text-center">Error: {error}</p>;

  return (
    <div className="p-2 relative">
      <input
        className="w-full p-2 text-2xl rounded border pr-10 border-gray-300 focus:border-blue-400 shadow-sm"
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        autoFocus
        placeholder="Ingresa algún participante"
      />
      <button
        className=" text-4xl absolute right-4 top-1/2 -translate-y-1/2 leading-none cursor-pointer"
        onClick={() => setTexto("")}
      >
        <IoClose />
      </button>
    </div>
  );
};
