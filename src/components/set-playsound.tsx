"use client";

import { useAppStore } from "@/app/store";

export const SetPlaysound = () => {
  const { playSound, togglePlaySound } = useAppStore();

  return (
    <div className="flex items-center px-1 py-5">
      <span className="font-bold text-gray-400 px-1">Reproducir campana de aviso:</span>
      <button
        onClick={togglePlaySound}
        className={`ml-2 px-4 py-2 rounded-md ${
          playSound
            ? "bg-green-500 hover:bg-green-700"
            : "bg-red-500 hover:bg-red-700"
        } text-white font-bold`}
      >
        {playSound ? "Activado" : "Desactivado"}
      </button>
    </div>
  );
};
