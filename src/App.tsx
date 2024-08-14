import React from "react";
import {Box, Container, CssBaseline, ThemeProvider} from "@mui/material";
import "./App.scss";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import theme from "./theme";
import Pokedex from "./components/Pokedex";
import PokemonDetails from "./components/PokemonDetails";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box component="div" className="content-page">
          <Container>
            <Routes>
              <Route path="/" element={<Pokedex />} />
              <Route path="/pokemon/:id" element={<PokemonDetails />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
