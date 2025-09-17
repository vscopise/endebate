"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "../store";
import clsx from "clsx";

export const Timer = () => {
  const getSeconds = useAppStore((s) => s.getSeconds);

  const [seg, setSeg] = useState(getSeconds());

  // ⏱️ Actualizar cada segundo para re-renderizar
  useEffect(() => {
    const id = setInterval(() => {
      setSeg(getSeconds());
    }, 1000);
    return () => clearInterval(id);
  }, [getSeconds]);

  return (
    <div
      className={clsx(
        `w-auto px-4 text-white rounded-xl sm:ml-2 sm:px-2 text-4xl`,
        { "bg-green-600": seg <= 180 },
        { "bg-amber-600": 180 < seg && seg <= 300 },
        { "bg-red-600": 300 < seg }
      )}
    >
      {`${Math.floor(seg / 60)}:${seg % 60}`.replace(/\b(\d)\b/g, "0$1")}
    </div>
  );
};
