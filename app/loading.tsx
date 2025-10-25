import { Skeleton } from "@heroui/skeleton";

export default function PokemonesLoading() {
  <div className="py-8 px-4">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      <p className="mt-4 text-lg text-gray-700">Cargando Pokémon...</p>
    </div>
  </div>
}