import { Input } from "./components/input";
import { Result } from "./components/result";
import { ListadoParticipantes } from "./components/listado-participantes";

export default async function Home() {
  return (
    <div className="font-sans h-screen flex flex-col">
      <ListadoParticipantes />
      <Input />
      <Result />
    </div>
  );
}
