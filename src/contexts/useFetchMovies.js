import { createContext, useContext } from "react";

const FetchMoviesContext = createContext()

export function FetchMoviesProvider({ children }) {
  const MOVIES_ENDPOINT = "https://api.themoviedb.org/3/search/movie?api_key=a0471c3efcac73e624b948daeda6085f"

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
    return results
  }

  return (
    <FetchMoviesContext.Provider value={{fetchMovies}}>
      {children}
    </FetchMoviesContext.Provider>
  )
}

export function useFetchMovies() {
  return useContext(FetchMoviesContext);
}
