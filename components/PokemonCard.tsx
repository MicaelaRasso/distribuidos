'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { typeColors } from '../constants/PokemonTypes';
import { Pokemon, fetchPokemonDetails } from '@/app/services/pokemon.service';
import PokemonesNotFound from '@/app/not-found';
import PokemonesLoading from '@/app/loading';
import {
  useAddFavorite,
  useFavoritesQuery,
  useRemoveFavorite,
} from '@/app/hooks/useFavorites';
import Link from 'next/link';
import AddFavoriteModal from '@/components/addFavoriteModal';

interface PokemonItemProps {
  pokemonURL: string;
}

export const PokemonCard: React.FC<PokemonItemProps> = ({ pokemonURL }) => {
  // Estados locales
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  // Query principal
  const { data, isLoading, error } = useQuery<Pokemon>({
    queryKey: ['pokemons', pokemonURL],
    queryFn: () => fetchPokemonDetails(pokemonURL),
  });

  // Favoritos
  const { data: favorites, isLoading: favLoading } = useFavoritesQuery();
  const addMutation = useAddFavorite();
  const removeMutation = useRemoveFavorite();

  const fallbackUrl = '/images/pokeball.png';
  const loading =
    isLoading || favLoading || addMutation.isPending || removeMutation.isPending;

  const isFavorite = useMemo(() => {
    if (!favorites || !data) return false;
    return favorites.some((f: any) => String(f.id) === String(data.id));
  }, [favorites, data]);

  // Toggle favoritos
  const onToggleFavorite = async (): Promise<void> => {
    if (!data) return;

    try {
      if (isFavorite) {
        await removeMutation.mutateAsync(String(data.id));
      } else {
        setSelectedPokemon(data);//puede que este sea el problema
        setIsModalOpen(true);
      }
    } catch (err: any) {
      console.error('Error al actualizar favorito:', err);
      alert(err?.message || 'No se pudo actualizar favorito');
    }
  };

  // Guardar favorito desde modal
  const handleAddFavorite = async (favoriteData: {
    id: string;
    name: string;
    nickname: string;
    description: string;
    image: string;
  }): Promise<void> => {
    try {
      await addMutation.mutateAsync(favoriteData);
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Error al agregar favorito:', err);
      alert(err?.message || 'No se pudo agregar favorito');
    }
  };

  // Renderizado condicional
  if (isLoading) return <PokemonesLoading />;
  if (error) return <PokemonesNotFound />;
  if (!data) return null;

  const pokemon = data;

  return (
    <>
      {/* CARD */}
      <div className="pokemon-card relative bg-white rounded-xl shadow-md w-56 flex flex-col items-center text-center">
        {/* Botón de favorito */}
        <button
          onClick={onToggleFavorite}
          disabled={loading}
          className="absolute top-3 right-3 text-xl focus:outline-none transition-transform hover:scale-125"
          title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? (
            <span className="text-yellow-400 drop-shadow">★</span>
          ) : (
            <span className="text-gray-400">☆</span>
          )}
        </button>

        <Link
          href={`/pokemon/${pokemon.name}`}
          className="block bg-white rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow h-full"
        >
          {/* Imagen */}
          <div className="bg-pink-100 rounded-full p-2">
            <img
              src={pokemon.sprites?.front_default || fallbackUrl}
              alt={pokemon.name}
              className="w-24 h-24 object-contain"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== fallbackUrl) {
                  target.onerror = null;
                  target.src = fallbackUrl;
                }
              }}
            />
          </div>

          {/* Info */}
          <h3 className="text-lg font-bold capitalize text-gray-800 mt-3">
            {pokemon.name}
          </h3>
          <p className="text-xs font-bold text-gray-500">#{pokemon.id}</p>

          <div className="mt-2 text-xs text-gray-600">
            {pokemon.height / 10}m | {pokemon.weight / 10}kg
          </div>

          {/* Tipos */}
          <div className="mt-3 flex flex-wrap gap-1 justify-center">
            {pokemon.types?.map((type) => (
              <span
                key={type.slot}
                className={`px-2 py-1 text-xs font-medium rounded ${typeColors[type.type.name]}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </Link>
      </div>

      {/* MODAL */}
      {selectedPokemon && (
        <AddFavoriteModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pokemon={selectedPokemon}
          onSubmit={handleAddFavorite}
        />
      )}
    </>
  );
};
