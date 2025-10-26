'use server'
import { typeColors } from '@/constants/PokemonTypes';
import { Pokemon, fetchPokemonDetails } from '@/services/pokemon';

interface PokemonProps {
  name: string;
}

export const PokemonDetails = async ({ name }: PokemonProps) => {
  const pokemon: Pokemon = await fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${name}`);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Título centrado */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold capitalize text-gray-800 mb-2">
              {pokemon.name}
            </h1>
            <p className="text-gray-600">#{pokemon.id}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Columna izquierda: Imágenes */}
            <div className="flex-shrink-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-pink-100 rounded-lg p-4">
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-32 h-32"
                  />
                </div>
                <div className="bg-pink-100 rounded-lg p-4">
                  <img
                    src={pokemon.sprites.back_default}
                    alt={pokemon.name}
                    className="w-32 h-32"
                  />
                </div>
                <div className="bg-pink-100 rounded-lg p-4">
                  <img
                    src={pokemon.sprites.front_shiny}
                    alt={pokemon.name}
                    className="w-32 h-32"
                  />
                </div>
                <div className="bg-pink-100 rounded-lg p-4">
                  <img
                    src={pokemon.sprites.back_shiny}
                    alt={pokemon.name}
                    className="w-32 h-32"
                  />
                </div>
              </div>
            </div>

            {/* Columna derecha: Tipos, Habilidades y Medidas */}
            <div className="flex-grow">
              {/* Medidas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-pink-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Altura</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {pokemon.height / 10}m
                  </p>
                </div>
                <div className="bg-pink-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Peso</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {pokemon.weight / 10}kg
                  </p>
                </div>
              </div>

              {/* Tipos */}
              <div className="mb-6 mt-4">
                <h2 className="text-sm font-semibold text-gray-600 mb-2">
                  Tipos
                </h2>
                <div className="flex gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.slot}
                      className={`px-4 py-1 text-sm font-medium rounded-lg ${typeColors[type.type.name] ||
                        'bg-gray-300 text-gray-800'
                        }`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Habilidades */}
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-gray-600 mb-2">
                  Habilidades
                </h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-gray-500 rounded-full text-sm"
                    >
                      {ability.ability.name}
                    </span>
                  ))}
                </div>
              </div>


            </div>
          </div>

          {/* Estadísticas - Abajo en ancho completo */}
          <div>
            <h2 className="text-sm font-semibold text-gray-600 mb-3">
              Estadísticas base
            </h2>
            <div className="space-y-2">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="capitalize text-gray-600">
                      {stat.stat.name}
                    </span>
                    <span className="font-semibold text-gray-800">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${typeColors[pokemon.types[0].type.name]} h-2 rounded-full`}
                      style={{
                        width: `${(stat.base_stat / 255) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

} 