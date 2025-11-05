'use client'

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { typeColors } from '../constants/PokemonTypes';
import { Pokemon, fetchPokemonDetails } from '@/app/services/pokemon.service';
import PokemonesNotFound from '@/app/not-found';
import PokemonesLoading from '@/app/loading';
import { useAddFavorite, useFavoritesQuery, useRemoveFavorite } from '@/app/hooks/useFavorites';
import Link from 'next/link';

interface PokemonItemProps {
  pokemonURL: string;
}

export const PokemonCard = ({ pokemonURL }: PokemonItemProps) => {
  // Todos los hooks van arriba, sin condiciones
  const { data, isLoading, error } = useQuery<Pokemon>({
    queryKey: ['pokemons', pokemonURL],
    queryFn: () => fetchPokemonDetails(pokemonURL),
  });

  const { data: favorites, isLoading: favLoading } = useFavoritesQuery();
  const addMutation = useAddFavorite();
  const removeMutation = useRemoveFavorite();

  // Variables derivadas que no son hooks
  const fallbackUrl = '/images/pokeball.png';
  const loading = isLoading || favLoading || addMutation.isPending || removeMutation.isPending;

  // Determinar si este Pokémon es favorito
  const isFavorite = useMemo(() => {
    if (!favorites || !data) return false;
    return favorites.some((f: any) => String(f.id) === String(data.id));
  }, [favorites, data]);

  // Eento de toggle favorito
  const onToggleFavorite = async () => {
    if (!data) return;
    try {
      if (isFavorite) {
        await removeMutation.mutateAsync(String(data.id));
      } else {
        await addMutation.mutateAsync({
          id: String(data.id),
          name: data.name,
        });
      }
    } catch (err: any) {
      console.error('Error al actualizar favorito:', err);
      alert(err?.message || 'No se pudo actualizar favorito');
    }
  };

  // Render según estado (fuera de los hooks)
  if (isLoading) return <PokemonesLoading />;
  if (error) return <PokemonesNotFound />;
  if (!data) return null;

  const pokemon = data;

  return (
    <div className="pokemon-card relative bg-white rounded-xl shadow-md w-56 flex flex-col items-center text-center">
      {/* Botón de favorito */}
      <button
        onClick={onToggleFavorite}
        disabled={loading}
        className="absolute top-3 right-3 text-xl focus:outline-none transition-transform hover:scale-110"
        title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {isFavorite ? (
          <span className="text-yellow-500">★</span>
        ) : (
          <span className="text-gray-500">☆</span>
        )}
      </button>
      <Link href={`/pokemon/${pokemon.name}`} className="block bg-white rounded-xl p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow h-full">
        {/* Imagen */}
        <div className="bg-pink-100 rounded-full p-2">
          <img
            src={pokemon.sprites?.front_default || fallbackUrl}
            alt={pokemon.name}
            className="w-24 h-24 object-contain"
            onError={(e) => {
              const target = e.currentTarget;
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
  );
};
