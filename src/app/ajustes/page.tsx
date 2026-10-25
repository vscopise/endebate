import { SelectComite, SetPlaysound, TiempoIntervenciones } from "@/components/";
import Link from "next/link";

export default function AjustesPage() {
  return (
    <div className="flex items-center flex-col min-h-1/2 max-h-[80vh] overflow-y-auto py-3">
      <SelectComite />
      <TiempoIntervenciones />
      <SetPlaysound />
      <div className="py-2 px-5 w-full mb-2">
        <hr className="w-full border-gray-300" />
      </div>
      <Link
        href="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Volver
      </Link>
    </div>
  );
}
