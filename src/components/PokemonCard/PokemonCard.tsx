// src/components/PokemonCard.tsx

import React from "react";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import "./PokemonCard.scss";

interface PokemonProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const PokemonCard: React.FC<PokemonProps> = ({id, name, image, types}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <Box className="pokemon_card" component="a" onClick={handleClick}>
      <Box component="img" src={image} alt={name} />
      <Box component="p">{name}</Box>
      <Box component="p">{id}</Box>
      <Box component="p">Types: {types.join(", ")}</Box>
    </Box>
  );
};

export default PokemonCard;
