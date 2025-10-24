'use client';

import { useState, useEffect } from 'react';
import { PokemonItem } from './PokemonItem';

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
}

export const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clickCounts, setClickCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const detailResponse = await fetch(pokemon.url);
            return detailResponse.json();
          })
        );
        
        setPokemons(pokemonDetails);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los Pokémon. Por favor, intenta nuevamente.');
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  const handlePokemonClick = (pokemonId: number) => {
    setClickCounts(prev => ({
      ...prev,
      [pokemonId]: (prev[pokemonId] || 0) + 1
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-800 to-violet-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-700">Cargando Pokémon...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-800 to-violet-200 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-800 to-violet-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-pink-100 mb-2">
          Pokédex
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pokemons.map((pokemon) => (
            <PokemonItem
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => handlePokemonClick(pokemon.id)}
              clickCount={clickCounts[pokemon.id] || 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
