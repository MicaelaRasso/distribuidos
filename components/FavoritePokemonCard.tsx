'use client';

import { useRemoveFavorite } from '@/app/hooks/useFavorites';

interface FavoritePokemonCardProps {
  id: string;
  name: string;
  nickname: string;
  description: string;
  image: string;
}

export default function FavoritePokemonCard({
  id,
  name,
  nickname,
  description,
  image,
}: FavoritePokemonCardProps) {
  const removeMutation = useRemoveFavorite();

  const handleRemove = async () => {
    try {
      await removeMutation.mutateAsync(id);
    } catch (err: any) {
      console.error('Error al eliminar favorito:', err);
      alert(err?.message || 'No se pudo eliminar el favorito');
    }
  };

  return (
    <div className="pokemon-card relative bg-white rounded-xl shadow-md w-56 flex flex-col items-center text-center">
      <div className="p-4">
        {/* Imagen */}
        <div className="bg-pink-100 rounded-full p-2 mb-3">
          <img
            src={image}
            alt={name}
            className="w-24 h-24 object-contain"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.src = '/images/pokeball.png';
            }}
          />
        </div>

        {/* Nombre y apodo */}
        <h3 className="text-lg font-bold capitalize text-gray-800">
          {name}
        </h3>
        <p className="text-sm text-pink-600 italic">“{nickname}”</p>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {description}
        </p>

        {/* ID */}
        <p className="text-xs text-gray-400 mt-1">ID: #{id}</p>

        {/* Botón eliminar */}
        <button
          onClick={handleRemove}
          disabled={removeMutation.isPending}
          className="mt-4 px-4 py-2 rounded-lg font-bold text-white bg-pink-500 hover:bg-pink-600 transition disabled:opacity-50"
        >
          {removeMutation.isPending ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}
