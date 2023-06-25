import { FetchMoviesProvider } from "../contexts/FetchMoviesContext";
import { TypeaheadInput } from "./TypeaheadInput";

export default function Form() {
  return (
    <FetchMoviesProvider>
      <div className="flex justify-center items-center mt-14">
        <TypeaheadInput />
      </div>
    </FetchMoviesProvider>
  );
}
