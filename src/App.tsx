import React from "react";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import "./App.scss";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box component="div" className="content-page">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
