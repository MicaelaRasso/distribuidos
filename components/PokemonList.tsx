'use client';

import axios from 'axios';
import Link from 'next/link';
import { PokemonCard } from './PokemonCard';
import { useQuery } from "@tanstack/react-query";
import PokemonesLoading from '@/app/loading';
import PokemonesNotFound from '@/app/not-found';
import { useState } from 'react';

interface Pokemon {
  name: string;
  url: string;
}

const fetchPokemons = async (): Promise<Pokemon[]> => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
  return response.data.results;
};

export const PokemonList = () => {
  const { data, isLoading, error } = useQuery<Pokemon[]>({
    queryKey: ["pokemons"], // clave del cache
    queryFn: fetchPokemons, // función que trae los datos
  });

  if (isLoading) {
    return <PokemonesLoading />;
  }
  if (error) {
    return <PokemonesNotFound />;
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="py-6 text-4xl font-bold text-center text-pink-100 mb-2">
          Pokédex
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data?.map(
            (pokemon, index) => (
              <Link href={`/pokemon/${pokemon.name}`} key={index}>
                <PokemonCard pokemonURL={pokemon.url} />
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};
