import { useRef, useState } from "react";
import SuggestionsList from "./SuggestionsList";
import { debounce } from "../utils/debounce";
import { useFetchMovies } from "../contexts/FetchMoviesContext";

const DELAY = 250

export function TypeaheadInput() {

  const [searchTerm, setSearchTerm] = useState("")
  const [visible, setVisible] = useState(false)

  const { useFetchAndCacheMovies } = useFetchMovies()
  const { data: movies } = useFetchAndCacheMovies(searchTerm)

  const searchInputRef = useRef(null)

  const waitToHide = () => {
    setTimeout(() => setVisible(false), DELAY)
  }

  const debouncedHandleTyping = debounce(event => {
    setSearchTerm(event.target.value);
  }, DELAY);

  const handleTyping = event => {
    event.persist();
    debouncedHandleTyping(event);
  }

  const handleSelectSuggestion = movieName => {
    searchInputRef.current.value = movieName
    setSearchTerm(movieName)
    setVisible(false)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        ref={searchInputRef}
        className="text-lg text-primary border-primary border rounded-md w-48 focus:w-96 transition-all focus:outline-none p-1 mb-2"
        placeholder="Search"
        type="text"
        onChange={handleTyping}
        onFocus={() => setVisible(true)}
        onBlur={waitToHide}
      />
      { searchTerm && visible && (
        <SuggestionsList
          suggestions={movies || []}
          handleSelectSuggestion={handleSelectSuggestion}
        />
      )}
    </div>
  );
}
