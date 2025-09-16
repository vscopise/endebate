"use client";

import { useAppStore } from "../store";

export const Input = () => {
    const texto = useAppStore((state) => state.texto);
    const setTexto = useAppStore((state) => state.setTexto);

  return (
    <div className="p-2">
        <input
          className="border p-2 rounded-2xl w-full"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          autoFocus
        />
    </div>
  );
};
