'use client';

import {typeColors} from '../constants/PokemonTypes';

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

interface PokemonItemProps {
  pokemon: Pokemon;
  onClick: () => void;
}

export const PokemonCard = ({ pokemon, onClick }: PokemonItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-white border-4 border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-200 flex flex-col items-center"
    >
      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
        className="w-24 h-24"
      />
      <h3 className="text-lg font-bold capitalize text-gray-800 mt-2">
        {pokemon.name}
      </h3>
      <p className="text-xs font-bold text-gray-500">
        #{pokemon.id}
      </p>
      <div className="mt-2 text-center">
        <div className="text-xs text-gray-600">
          {pokemon.height / 10}m | {pokemon.weight / 10}kg
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1 justify-center">
        {pokemon.types?.map((type) => (
          <span
            key={type.slot}
           className={`px-2 py-1 text-xs font-medium rounded ${typeColors[type.type.name] || 'bg-gray-300 text-gray-800'}`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </button>
  );
};
