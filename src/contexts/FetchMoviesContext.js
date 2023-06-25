import { createContext, useContext } from "react";
import { useQuery } from "react-query";

const MOVIES_ENDPOINT = "https://api.themoviedb.org/3/search/movie?api_key=a0471c3efcac73e624b948daeda6085f"
const MAX_AMOUNT = 6

const FetchMoviesContext = createContext()

function buildUrl(txt) {
  const encodedTerm = encodeURI(txt)
  return `${MOVIES_ENDPOINT}&query=${encodedTerm}`
}

async function fetchMovies(txt) {
  const url = buildUrl(txt)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch movies. Status: ${response.status}, URL: ${url}`);
  }
  const data = await response.json()
  const { results } = data
  return results.slice(0, MAX_AMOUNT)
}

export function FetchMoviesProvider({ children }) {

  function useFetchAndCacheMovies(txt, options) {
    return useQuery(["movies", txt], () => fetchMovies(txt), {
      staleTime: 1000 * 60 * 10, // 10 min
      ...options,
    });
  }

  return (
    <FetchMoviesContext.Provider value={{useFetchAndCacheMovies}}>
      {children}
    </FetchMoviesContext.Provider>
  )
}

export function useFetchMovies() {
  const context = useContext(FetchMoviesContext);

  if (!context) {
    throw new Error('useFetchMovies must be used within a FetchMoviesProvider');
  }

  return context;
}
