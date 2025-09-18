import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  texto: string;
  setTexto: (v: string) => void;
  datos: string[];
  seleccionados: string[];
  addSeleccionado: (p: string) => void;
  delSeleccionado: (p: string) => void;
  startTime: number | null; // timestamp de inicio
  getSeconds: () => number; // calcula segundos transcurridos
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

const ADHERENTES = process.env.NEXT_PUBLIC_ADHERENTES;

export const useAppStore = create<AppState>()(
  
  persist(
    (set, get) => ({
      texto: "",
      setTexto: (v) => set({ texto: v }),
      seleccionados: [],
      startTime: null,

      addSeleccionado: (p) => {
        const { seleccionados, startTime } = get();

        // agregar solo si no está repetido
        if (!seleccionados.includes(p)) {
          const nuevos = [...seleccionados, p];
          set({ seleccionados: nuevos });
          set({ texto: "" });

          // 🚀 Arrancar contador si es el primer seleccionado
          if (nuevos.length === 1 && !startTime) {
            set({ startTime: Date.now() });
          }
        }
      },

      delSeleccionado: (p) => {
        const { seleccionados } = get();

        const esPrimero: boolean = seleccionados[0] === p;

        const nuevos = seleccionados.filter((item) => item !== p);

        set({ seleccionados: nuevos });

        // si es el primero, detener contador y resetear
        if (esPrimero) {
          //set({ startTime: null });
          set({ startTime: Date.now() });
        }

        // si ya no quedan seleccionados, borrar el contador
        if (nuevos.length === 0) {
          set({ startTime: null });
        }
      },

      getSeconds: () => {
        const { startTime } = get();
        if (!startTime) return 0;
        return Math.floor((Date.now() - startTime) / 1000);
      },
      datos: [],
      loading: false,
      error: null,
      fetchData: async () => {
        set({ loading: true, error: null });
        const url = process.env.ADHERENTES;
        try {
          console.log('hola')
          const response = await fetch(`${ADHERENTES}`);

          const csvText = await response.text();

          const datos = csvText
            .split("\r\n")
            .filter((line) => line.trim() !== ""); // Separa por líneas y elimina

            console.log({datos})

          set({ datos: datos, loading: false});
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },
    }),
    {
      name: "app-store", // nombre en localStorage
    }
  )
);
