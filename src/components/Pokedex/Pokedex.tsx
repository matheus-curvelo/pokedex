import React, {useEffect, useState} from "react";
import axios from "axios";
import PokemonCard from "../PokemonCard";
import {Box} from "@mui/material";
import "./Pokedex.scss";

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
}

const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemonIndices = Array.from({length: 150}, (_, i) => i + 1); // Índices dos Pokémon a serem buscados (limita a exibição em 150 pokemons)

      try {
        const pokemonDataPromises = pokemonIndices.map(async index => {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${index}`
          );
          return {
            name: response.data.name,
            sprites: response.data.sprites,
          };
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        setPokemons(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Box component="div" className="pokedex">
      <Box component="h1">Pokédex</Box>
      <Box
        component="div"
        className="wrapper">
        {pokemons.map(pokemon => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Pokedex;
