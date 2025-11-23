import { Input } from "./components/input";
import { Result } from "./components/result";
import { ListadoParticipantes } from "./components/listado-participantes";
import { ListadoParlanchines } from "./components/listado-parlanchines";

export default async function Home() {
  return (
    <div className="font-sans h-screen flex flex-col">
      <div className="flex items-center flex-col min-h-1/2 max-h-[80vh] overflow-y-auto py-3">
        <ListadoParticipantes />
        <ListadoParlanchines />
      </div>
      <Input />
      <Result />
    </div>
  );
}
