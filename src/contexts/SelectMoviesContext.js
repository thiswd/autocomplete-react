import { useState, createContext, useContext } from 'react';

const SelectedMoviesContext = createContext();

export function SelectedMoviesProvider({ children }) {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const selectMovie = (movie) => {
    if (selectedMovies.includes(movie)) return

    setSelectedMovies((prevMovies) => [...prevMovies, movie]);
  };

  return (
    <SelectedMoviesContext.Provider value={{ selectedMovies, selectMovie }}>
      {children}
    </SelectedMoviesContext.Provider>
  );
}

export function useSelectedMovies() {
  const context = useContext(SelectedMoviesContext);

  if (!context) {
    throw new Error('useSelectedMovies must be used within a SelectedMoviesProvider');
  }

  return context;
}
