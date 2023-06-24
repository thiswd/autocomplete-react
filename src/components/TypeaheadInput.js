import { useEffect, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import { debounce } from "../utils/debounce";

// This endpoint is from TheMovieDB https://developers.themoviedb.org/3/search/search-movies
// There is a missing query string `query` to make the search
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

export default function TypeaheadInput() {
  const [term, setTerm] = useState("")
  const [movies, setMovies] = useState([])
  const [visible, setVisible] = useState(false)

  const debouncedUpdateMovies = debounce(async () => {
    try {
      const results = await fetchMovies(term)
      results.length > 0 && setMovies([...results])
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  }, 250);

  useEffect(() => {
    debouncedUpdateMovies()
  }, [term, debouncedUpdateMovies])

  const handleTyping = e => {
    setTerm(e.target.value)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        className="text-lg text-primary border-primary border rounded-md w-48 focus:w-96 transition-all focus:outline-none p-1 mb-2"
        placeholder="Search"
        type="text"
        onChange={handleTyping}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
      />
      { term && visible && <SuggestionsList suggestions={ movies } />}
    </div>
  );
}
