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

  const handleBlur = () => {
    waitToHide()
    shrinkInput()
  }

  const shrinkInput = () => {
    const [smWidth, lgWidth]  = ["w-52", "w-96"]

    if (searchTerm) {
      return searchInputRef.current.classList.replace(smWidth, lgWidth)
    }

    searchInputRef.current.classList.replace(lgWidth, smWidth)
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
        className="bg-light text-xl text-primary border-primary border-b-4 w-52 focus:w-96 transition-all duration-300 outline-none p-1 placeholder-primary placeholder-opacity-75 focus:placeholder-opacity-50"
        placeholder="Search"
        type="text"
        onChange={handleTyping}
        onFocus={() => setVisible(true)}
        onBlur={handleBlur}
      />
      { searchTerm && visible && (
        <div className="relative w-full">
          <SuggestionsList
            suggestions={movies || []}
            handleSelectSuggestion={handleSelectSuggestion}
          />
        </div>
      )}
    </div>
  );
}
