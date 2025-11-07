'use client';

import axios from 'axios';
import { PokemonCard } from './PokemonCard';
import { useQuery } from "@tanstack/react-query";
import PokemonesLoading from '@/app/loading';
import PokemonesNotFound from '@/app/not-found';
import React, { useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

interface FetchResponse {
  results: Pokemon[];
  next: string | null;
  count: number;
}

const PAGE_SIZE = 20;

const fetchPokemons = async (offset = 0): Promise<FetchResponse> => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
  );
  return response.data;
};

export const PokemonList = () => {
  const [page, setPage] = useState(0); // 0-based page index
  const [items, setItems] = useState<Pokemon[]>([]);
  const [loadedPages, setLoadedPages] = useState<number[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const offset = page * PAGE_SIZE;

  const {
    data: pageData,
    isLoading,
    error,
    isFetching,
  } = useQuery<FetchResponse>({
    queryKey: ["pokemons", page],
    queryFn: () => fetchPokemons(offset),
  });

  useEffect(() => {
    if (!pageData) return;

    if (!loadedPages.includes(page)) {
      setItems((prev) => [...prev, ...pageData.results]);
      setLoadedPages((prev) => [...prev, page]);
    }
    setHasMore(Boolean(pageData.next));
  }, [pageData, page, loadedPages]);

  if (isLoading && items.length === 0) {
    return <PokemonesLoading />;
  }
  if (error && items.length === 0) {
    return <PokemonesNotFound />;
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="py-6 text-4xl font-bold text-center text-pink-100 mb-2">
          Pokédex
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((pokemon, index) => (

            <PokemonCard pokemonURL={pokemon.url} key={pokemon.name + index} />

          ))}
        </div>

        <div className="mt-6 text-center">
          {hasMore ? (
            <button
              className="px-4 py-2 bg-pink-100 text-white rounded hover:opacity-90 disabled:opacity-50"
              onClick={() => setPage((p) => p + 1)}
              disabled={isFetching}
            >
              {isFetching ? 'Cargando...' : 'Cargar más'}
            </button>
          ) : (
            <p className="text-sm text-gray-500">No hay más pokemones.</p>
          )}
        </div>
      </div>
    </div>
  );
};
