// src/components/PokemonDetails.tsx

import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import {Box, Button} from "@mui/material";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {type: {name: string}}[];
  height: number;
  weight: number;
  abilities: {ability: {name: string}}[];
  base_experience: number;
  stats: {base_stat: number; stat: {name: string}}[];
}

const PokemonDetails: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const goBack = () => {
    navigate("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pokemon) {
    return <p>No details found for this Pokémon.</p>;
  }

  return (
    <Box component="div" className="pokemon-details">
      <Box component="h2">{pokemon.name}</Box>
      <Box
        component="img"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <Box component="p">Height: {pokemon.height}</Box>
      <Box component="p">Weight: {pokemon.weight}</Box>
      <Box component="p">Base Experience: {pokemon.base_experience}</Box>
      <Box component="p">
        Types: {pokemon.types.map(typeInfo => typeInfo.type.name).join(", ")}
      </Box>
      <Box component="p">
        Abilities:{" "}
        {pokemon.abilities
          .map(abilityInfo => abilityInfo.ability.name)
          .join(", ")}
      </Box>
      <Box component="div">
        <Box component="h3">Stats:</Box>
        {pokemon.stats.map(statInfo => (
          <Box component="p" key={statInfo.stat.name}>
            {statInfo.stat.name}: {statInfo.base_stat}
          </Box>
        ))}
      </Box>
      <Button variant="contained" onClick={goBack}>
        Voltar
      </Button>
    </Box>
  );
};

export default PokemonDetails;
