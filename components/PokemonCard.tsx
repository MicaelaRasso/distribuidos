'use client'

import { useQuery } from '@tanstack/react-query';
import { typeColors } from '../constants/PokemonTypes';
import { Pokemon, fetchPokemonDetails } from '@/services/pokemon';
import PokemonesNotFound from '@/app/not-found';
import PokemonesLoading from '@/app/loading';


interface PokemonItemProps {
  pokemonURL: string;
}

export const PokemonCard = ({ pokemonURL }: PokemonItemProps) => {
  const { data, isLoading, error } = useQuery<Pokemon>({
    queryKey: ["pokemons", pokemonURL],
    queryFn: () => fetchPokemonDetails(pokemonURL),
  });

  const fallbackUrl: string = '/images/pokeball.png';
  //por ahora voy a dejar las paginas genericas de loading y error
  if (isLoading) {
    return <PokemonesLoading />;
  }
  if (error) {
    return <PokemonesNotFound />;
  }
  if (data) {
    const pokemon: Pokemon = data;

    return (
      <div className="pokemon-card bg-white rounded-xl shadow-md p-4 w-56 flex flex-col items-center text-center">
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

        <h3 className="text-lg font-bold capitalize text-gray-800 mt-3">
          {pokemon.name}
        </h3>
        <p className="text-xs font-bold text-gray-500">
          #{pokemon.id}
        </p>
        <div className="mt-2">
          <div className="text-xs text-gray-600">
            {pokemon.height / 10}m | {pokemon.weight / 10}kg
          </div>
        </div>
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
      </div>
    );
  }
  return null;
};
