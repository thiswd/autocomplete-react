export default function SuggestionsList({ suggestions, handleSelectSuggestion }) {
  return (
    <ul
      data-testid="results-list"
      className="border border-primary rounded-md w-96 text-lg bg-white"
    >
      {suggestions.map(item => (
        <li key={item.id}
          className="p-1 hover:bg-gray-200"
          onClick={() => handleSelectSuggestion(item.title || item.name)}
        >
          <span>{item.title || item.name}</span>
        </li>
      ))}
    </ul>
  );
}
