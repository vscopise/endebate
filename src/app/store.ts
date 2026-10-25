import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  //tiempo de la primera intervención en minutos
  primeraIntervencion: string;
  setPrimeraIntervencion: (v: string) => void;
  //tiempo de la segunda intervención en minutos
  segundaIntervencion: string;
  setSegundaIntervencion: (v: string) => void;

  // Manejo del menu lateral
  isSideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;

  // Campana de aviso
  playSound: boolean;
  togglePlaySound: () => void;

  texto: string;
  setTexto: (v: string) => void;
  datos: string[][];
  comite: string;
  // Comite se usa para filtrar los datos según el Comité donde se ejecuta la aplicación
  setComite: (c: string) => void;

  // seleccionados es la lista de oradorers
  seleccionados: string[];
  addSeleccionado: (p: string) => void;
  delSeleccionado: (p: string) => void;

  //los parlanchines son las personas que han hablado
  parlanchines: Parlanchin[];
  addParlanchin: (p: string) => void;
  delParlanchin: (p: string) => void;

  delIntervencion: (p: string) => void;
  startTime: number | null; // timestamp de inicio
  getSeconds: () => number; // calcula segundos transcurridos
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

interface Parlanchin {
  nombre: string;
  intervenciones: number;
}

const ADHERENTES = process.env.NEXT_PUBLIC_ADHERENTES;

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      primeraIntervencion: '5',
      setPrimeraIntervencion: (v) => set({ primeraIntervencion: v }),

      segundaIntervencion: '3',
      setSegundaIntervencion: (v) => set({ segundaIntervencion: v }),

      isSideMenuOpen: false,
      openSideMenu: () => set({ isSideMenuOpen: true }),
      closeSideMenu: () => set({ isSideMenuOpen: false }),

      playSound: true,
      togglePlaySound: () => set((state) => ({ playSound: !state.playSound })),

      texto: "",
      setTexto: (v) => set({ texto: v }),

      seleccionados: [],
      parlanchines: [],

      startTime: null,

      comite: "",

      datos: [],

      setComite: (c) => set({ comite: c }),

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

      addParlanchin: (p) => {
        const { parlanchines, seleccionados } = get();

        // No contabilizar si ya est+a en la lista de oradores
        if (seleccionados.some((el) => el === p)) return;

        if (!parlanchines.some((el) => el.nombre === p)) {
          set({
            parlanchines: [...parlanchines, { nombre: p, intervenciones: 1 }],
          });
        } else {
          set({
            parlanchines: parlanchines.map((el) =>
              el.nombre === p
                ? { ...el, intervenciones: el.intervenciones + 1 }
                : el,
            ),
          });
        }
      },

      delParlanchin: (p) => {
        const { parlanchines, seleccionados } = get();

        //console.log({ parlanchines, seleccionados });

        //console.log(p)

        if (p !== seleccionados[0]) {
          set({
            parlanchines: parlanchines.filter((item) => item.nombre !== p),
          });
        }

        //set({ parlanchines: parlanchines.filter((item) => item.nombre !== p) });
      },

      delIntervencion: (p) => {
        const { parlanchines } = get();

        if (parlanchines.some((el) => el.nombre === p)) {
          if (
            1 < parlanchines.filter((el) => el.nombre === p)[0].intervenciones
          ) {
            set({
              parlanchines: parlanchines.map((el) =>
                el.nombre === p
                  ? { ...el, intervenciones: el.intervenciones - 1 }
                  : el,
              ),
            });
          } else {
            set({ parlanchines: parlanchines.filter((el) => el.nombre !== p) });
          }
        }
      },

      getSeconds: () => {
        const { startTime } = get();
        if (!startTime) return 0;
        return Math.floor((Date.now() - startTime) / 1000);
      },

      loading: false,
      error: null,

      fetchData: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetch(`${ADHERENTES}`);
          const csvText = await response.text();
          const datos = csvText.split("\r\n").map((row) => row.split(","));
          set({ datos: datos, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },
    }),
    {
      name: "app-store", // nombre en localStorage

      // 👇 SOLO persistir estas propiedades
      partialize: (state) => ({
        texto: state.texto,
        seleccionados: state.seleccionados,
        parlanchines: state.parlanchines,
        comite: state.comite,
        primeraIntervencion: state.primeraIntervencion,
        segundaIntervencion: state.segundaIntervencion,
        playSound: state.playSound,
      }),
    },
  ),
);
