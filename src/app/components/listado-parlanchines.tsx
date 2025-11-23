"use client";

import { useShallow } from "zustand/shallow";
import { useAppStore } from "../store";

export const ListadoParlanchines = () => {
  const { parlanchines, delParlanchin } = useAppStore(
    useShallow((state) => ({
      parlanchines: state.parlanchines,
      delParlanchin: state.delParlanchin,
    }))
  );

  if (parlanchines.length === 0) return null;

  return (
    <div className="p-2 mt-2 bg-amber-50 w-3/4 text-center rounded-xl border border-amber-500">
      <p className="font-bold text-amber-500">Parlanchines:</p>
      {parlanchines.map((p, index) => {
        return (
          <div
            key={index}
            className={`cursor-pointer ${
                p.intervenciones > 1 
                ? "text-red-500 font-bold text-lg"
                : "text-gray-500"
            }`}
            onClick={() => delParlanchin(p.nombre)}
          >
            {p.nombre} ({p.intervenciones})
          </div>
        );
      })}
    </div>
  );
};
