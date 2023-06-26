import { useSelectedMovies } from "../contexts/SelectMoviesContext"

export function SelectedMoviesList() {
  const { selectedMovies } = useSelectedMovies()

  const selectedMoviesTogether = () => {
    return selectedMovies.join(" \u00B7 ")
  }

  return (
    <div className="w-full h-screen bg-black py-12">
      <div className="margin-auto">
        <div className="w-full pl-8">
          <h2 className="text-4xl text-right pr-6 text-light pb-1 px-2 border-b border-light font-extralight mb-16">Selected Movies</h2>
        </div>
          <p className="text-right pl-8 pr-6 text-light text-xl font-extralight mb-4">{selectedMoviesTogether()}</p>
      </div>
    </div>
  )
}
