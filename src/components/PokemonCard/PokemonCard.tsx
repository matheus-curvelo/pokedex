import React from "react";
import {Box} from "@mui/material";
import "./PokemonCard.scss";

interface PokemonProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const PokemonCard: React.FC<PokemonProps> = ({id, name, image, types}) => {
  return (
    <Box className="pokemon_card" component="div">
      <Box component="img" src={image} alt={name} />
      <Box component="p">{name}</Box>
      <Box component="p">{id}</Box>
      <Box component="p">{types.join(', ')}</Box>
    </Box>
  );
};

export default PokemonCard;
