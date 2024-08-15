import React, {useEffect, useState} from "react";
import axios from "axios";
import PokemonCard from "../PokemonCard";
import {Box, Button, IconButton, useMediaQuery} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null); // URL da próxima página
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null); // URL da página anterior
  const [totalPages, setTotalPages] = useState(0); // Número total de páginas
  const limit = 20; // Número de Pokémon por página

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchPokemons = async (url: string) => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        const pokemonList = response.data.results;

        setNextPageUrl(response.data.next);
        setPreviousPageUrl(response.data.previous);

        setTotalPages(Math.ceil(response.data.count / limit));

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
        setPokemons(newPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
        (currentPage - 1) * limit
      }`
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = isMobile ? 3 : 5; // Mostrar 3 páginas no mobile e 5 no desktop

    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <Box component="div" className="pokedex">
      <Box component="div" className="pokedex_header">
        <Box component="h1">Pokédex</Box>
        <Box component="div" className="pagination_controls">
          <IconButton
            onClick={handlePreviousPage}
            disabled={!previousPageUrl || loading}>
            <ArrowBackIcon />
          </IconButton>

          <Box component="div" className="page_numbers">
            {getPageNumbers().map(page => (
              <Button
                key={page}
                variant={page === currentPage ? "contained" : "outlined"}
                onClick={() => handlePageChange(page)}
                disabled={loading}>
                {page}
              </Button>
            ))}
          </Box>

          <IconButton
            onClick={handleNextPage}
            disabled={!nextPageUrl || loading}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>

      <Box component="div" className="pokedex_wrapper">
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

      {loading && <Box component="p">Carregando...</Box>}
    </Box>
  );
};

export default Pokedex;
