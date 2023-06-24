import SuggestionsList from "./SuggestionsList";

// This endpoint is from TheMovieDB https://developers.themoviedb.org/3/search/search-movies
// There is a missing query string `query` to make the search
const MOVIES_ENDPOINT =
  "https://api.themoviedb.org/3/search/movie?api_key=a0471c3efcac73e624b948daeda6085f";

export default function TypeaheadInput() {
  return (
    <div className="flex flex-col justify-center items-center">
      <input
        className="text-lg text-primary border-primary border rounded-md w-48 focus:w-96 transition-all focus:outline-none p-1 mb-2"
        placeholder="Search"
        type="text"
      />
      {/* Should only show this component when searching */}
      <SuggestionsList suggestions={[{ id: 1, title: "Movie #1" }]} />
    </div>
  );
}
