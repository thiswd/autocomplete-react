import Header from "./Header";

import { FetchMoviesProvider } from "../contexts/FetchMoviesContext";
import { TypeaheadInput } from "./TypeaheadInput";

export default function Hero() {
  return (
    <FetchMoviesProvider>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Header />
        <TypeaheadInput />
      </div>
    </FetchMoviesProvider>
  );
}
