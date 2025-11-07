'use client';

import { PokemonCard } from './PokemonCard';
import { useQuery } from "@tanstack/react-query";
import PokemonesLoading from '@/app/loading';
import PokemonesNotFound from '@/app/not-found';
import { useState } from 'react';
import { fetchFavorites } from '@/app/services/favorites.service';

interface Pokemon {
  name: string;
  url: string;
}
const PAGE_SIZE = 20;


export const FavoriteList = () => {
  const [page, setPage] = useState(1);

  const {
    data: allFavorites,
    isLoading,
    error,
    isFetching,
  } = useQuery<Pokemon[] | undefined>({
    queryKey: ["allFavorites"], // Clave estática para un solo fetch
    queryFn: () => fetchFavorites(),
    staleTime: 5 * 60 * 1000,
  });


  if (isLoading) {
    return <PokemonesLoading />;
  }
  if (error || !allFavorites) {
    return <PokemonesNotFound />;
  }

  const itemsToShow = page * PAGE_SIZE;

  const itemsToDisplay = allFavorites.slice(0, itemsToShow);

  const hasMore = allFavorites.length > itemsToDisplay.length;

  if (allFavorites.length === 0) {
    return (
      <div className="py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="py-6 text-4xl font-bold text-center text-pink-100 mb-2">
            Pokédex
          </h1>
          <p className="text-xl text-gray-400 mt-4">¡Aún no hay Pokemones favoritos!</p>
        </div>
      </div>
    );
  }

  const URL = 'https://pokeapi.co/api/v2/pokemon/';
  return (
    <div className="py-8 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="py-6 text-4xl font-bold text-center text-pink-500 mb-6">
          Favoritos
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itemsToDisplay.map((pokemon, index) => (
            <PokemonCard pokemonURL={URL + pokemon.name} key={pokemon.name + index} />
          ))}
        </div>

        <div className="mt-10 text-center">
          {hasMore ? (
            <button
              // Botón con mejor contraste y sombra para destacar
              className="px-6 py-3 bg-pink-600 text-white font-bold rounded-lg shadow-xl hover:bg-pink-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setPage((p) => p + 1)}
              disabled={isFetching}
            >
              Cargar más ({itemsToDisplay.length}/{allFavorites.length})
            </button>
          ) : (
            <p className="text-sm text-gray-500 mt-4 font-medium">¡No hay más favoritos!</p>
          )}
        </div>
      </div>
    </div>
  );
};
