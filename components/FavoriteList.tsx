'use client';

import { useQuery } from "@tanstack/react-query";
import PokemonesLoading from '@/app/loading';
import PokemonesNotFound from '@/app/not-found';
import { useState } from 'react';
import { fetchFavorites } from '@/app/services/favorites.service';
import FavoritePokemonCard from "@/components/FavoritePokemonCard";
import { useFavoritesQuery } from '@/app/hooks/useFavorites';


interface Favorite {
  id: string;
  name: string;
  nickname: string;
  description: string;
  image: string;
}

const PAGE_SIZE = 20;

export const FavoriteList = () => {
  const [page, setPage] = useState(1);

  const {
    data: allFavorites,
    isLoading,
    error,
    isFetching,
  } = useFavoritesQuery();


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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {itemsToDisplay.map((fav: Favorite) => (
            <FavoritePokemonCard
              key={fav.id}
              id={fav.id}
              name={fav.name}
              nickname={fav.nickname}
              description={fav.description}
              image={fav.image}
            />
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
