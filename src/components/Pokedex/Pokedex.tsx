import React, {useEffect, useState} from "react";
import axios from "axios";
import PokemonCard from "../PokemonCard";
import {Box} from "@mui/material";
import "./Pokedex.scss";

interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: string[];
}

const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0); // Paginamento
  const [hasMorePokemons, setHasMorePokemons] = useState(true); // Verifica se existem mais Pokémons
  const limit = 50; // Número de Pokémon a serem buscados por vez

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const pokemonList = response.data.results;

        if (pokemonList.length < limit) {
          setHasMorePokemons(false); // Se o número de resultados for menor que o limite, não há mais Pokémon
        }

        const pokemonDataPromises = pokemonList.map(
          async (pokemon: {url: string}) => {
            const pokemonDataResponse = await axios.get(pokemon.url);
            return {
              id: pokemonDataResponse.data.id,
              name: pokemonDataResponse.data.name,
              sprites: pokemonDataResponse.data.sprites,
              types: pokemonDataResponse.data.types.map(
                (typeInfo: {type: {name: string}}) => typeInfo.type.name
              ),
            };
          }
        );

        const newPokemons = await Promise.all(pokemonDataPromises);
        setPokemons(prevPokemons => [...prevPokemons, ...newPokemons]);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [offset]);

  const loadMorePokemons = () => {
    setLoading(true);
    setOffset(prevOffset => prevOffset + limit);
  };

  return (
    <Box component="div" className="pokedex">
      <Box component="h1">Pokédex</Box>
      <Box component="div" className="wrapper">
        {pokemons.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            types={pokemon.types}
          />
        ))}
      </Box>
      {!loading && hasMorePokemons && (
        <Box component="button" onClick={loadMorePokemons} disabled={loading}>
          Carregar
        </Box>
      )}
      {!loading && !hasMorePokemons && (
        <Box component="p" className="no-more-pokemons">
          Não existem mais pokémons...
        </Box>
      )}
    </Box>
  );
};

export default Pokedex;
