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
    <div className="flex-1 overflow-y-auto">
      <p className="font-bold text-amber-500 text-center">Parlanchines:</p>
      <div className="flex w-full flex-wrap justify-center gap-2  bg-amber-50 rounded-xl border border-amber-500 p-2">
        {parlanchines.map((p, index) => (
          <div
            key={index}
            className={`inline-flex rounded-md py-0.5 px-2.5 border border-transparent cursor-pointer text-white ${
              p.intervenciones > 1
                ? "font-bold text-xl bg-red-500"
                : " bg-gray-400"
            }`}
            onClick={() => delParlanchin(p.nombre)}
          >
            {p.nombre} {p.intervenciones >= 2 && `(${p.intervenciones})`}
          </div>
        ))}
      </div>
    </div>
  );
};
