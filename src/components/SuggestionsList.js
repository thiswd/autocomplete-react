import { useSelectedMovies } from "../contexts/SelectMoviesContext";

export default function SuggestionsList({ suggestions, handleSelectSuggestion }) {
  const { selectMovie } = useSelectedMovies()

  const handleAutoCompleteClick = (movieTitle) => {
    handleSelectSuggestion(movieTitle)
    selectMovie(movieTitle)
  }

  return (
    <ul
      data-testid="results-list"
      className="absolute w-96 text-lg bg-white"
    >
      {suggestions.map(item => (
        <li key={item.id}
          className="p-1 hover:bg-primary hover:text-light truncate cursor-default"
          onClick={() => handleAutoCompleteClick(item.title)}
        >
          {item.title || item.name}
        </li>
      ))}
    </ul>
  );
}
