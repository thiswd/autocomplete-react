import Hero from "./Hero";

import { QueryClient, QueryClientProvider } from 'react-query';
import { SelectedMoviesList } from "./SelectedMoviesList";
import { SelectedMoviesProvider } from "../contexts/SelectMoviesContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SelectedMoviesProvider>
        <div className="h-screen w-full overflow-hidden grid grid-cols-2">
          <Hero />
          <SelectedMoviesList />
        </div>
      </SelectedMoviesProvider>
    </QueryClientProvider>
  );
}
