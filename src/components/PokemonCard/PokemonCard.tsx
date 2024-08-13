import React from "react";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import typeColors from "../../utils/typeColors";
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

  const backgroundColor = typeColors[types[0]] || "rgba(255, 255, 255, 0.8)";

  return (
    <Box
      className="pokemon_card"
      component="div"
      style={{backgroundColor}}
      onClick={handleClick}>
      <Box component="img" src={image} alt={name} />
      <Box component="p">{name}</Box>
      <Box component="p">{id}</Box>
      <Box component="p">Types: {types.join(", ")}</Box>
    </Box>
  );
};

export default PokemonCard;
