import React from "react";
import {Box} from "@mui/material";
import "./PokemonCard.scss";

interface PokemonProps {
  id: number;
  name: string;
  image: string;
}

const PokemonCard: React.FC<PokemonProps> = ({id, name, image}) => {
  return (
    <Box className="pokemon_card" component="div">
      <Box component="img" src={image} alt={name} />
      <Box component="p">{name}</Box>
      <Box component="p">{id}</Box>
    </Box>
  );
};

export default PokemonCard;
