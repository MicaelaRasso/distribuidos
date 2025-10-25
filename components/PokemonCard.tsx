import axios from 'axios';
import { typeColors } from '../constants/PokemonTypes';

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
  pokemonURL: string;
}
export const fetchPokemon = async (url: string): Promise<Pokemon> => {
  const response = await axios.get(url);
  const data = await response.data;
  return data;
};

export const PokemonCard = async ({ pokemonURL }: PokemonItemProps) => {

  const data = await fetchPokemon(pokemonURL);
  const pokemon = {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    sprites: data.sprites,
    types: data.types,
  };

  return (
    <div className="pokemon-card bg-white rounded-xl shadow-md p-4 w-56 flex flex-col items-center text-center">
      <div className="bg-pink-100 rounded-full p-2">
        <img
          src={pokemon.sprites?.front_default}
          alt={pokemon.name}
          className="w-24 h-24 object-contain"
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
            className={`px-2 py-1 text-xs font-medium rounded ${typeColors[type.type.name] || 'bg-gray-300 text-gray-800'} capitalize`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );

};
