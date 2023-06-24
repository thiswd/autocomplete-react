import { useEffect, useState } from "react";
import SuggestionsList from "./SuggestionsList";

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
  const data = await response.json()
  const { results } = data
  return results
}

export default function TypeaheadInput() {
  const [term, setTerm] = useState("")
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function updateMovies() {
      const results = await fetchMovies(term)
      results.length > 0 && setMovies([...results])
    }

    updateMovies()
  }, [term])

  function handleOnTyping(e) {
    setTerm(e.target.value)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        className="text-lg text-primary border-primary border rounded-md w-48 focus:w-96 transition-all focus:outline-none p-1 mb-2"
        placeholder="Search"
        type="text"
        onChange={handleOnTyping}
      />
      {term && <SuggestionsList suggestions={ movies } />}
    </div>
  );
}
