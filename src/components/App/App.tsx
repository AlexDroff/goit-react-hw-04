// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useQuery } from "@tanstack/react-query";
// import ReactPaginate from "react-paginate";

// import SearchBar from "../SearchBar/SearchBar";
// import MovieGrid from "../MovieGrid/MovieGrid";
// import MovieModal from "../MovieModal/MovieModal";
// import Loader from "../Loader/Loader";
// import ErrorMessage from "../ErrorMessage/ErrorMessage";

// import type { Movie } from "../../types/movie";
// import { fetchMovies } from "../../services/movieService";

// import css from "./App.module.css";

// function App() {
//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["movies", query, page],
//     queryFn: () => fetchMovies(query, page),
//     enabled: query.trim() !== "",
//     refetchOnWindowFocus: false,
//   });

//   const movies = data?.results ?? [];
//   const totalPages = data?.total_pages ?? 0;

//   // if (!isLoading && !isError && query && movies.length === 0) {
//   //   toast.error("No movies found for your request.");
//   // }

//   useEffect(() => {
//     if (!isLoading && !isError && query && movies.length === 0) {
//       toast.error("No movies found for your request.");
//     }
//   }, [isLoading, isError, query, movies.length]);

//   const handleSearch = (newQuery: string) => {
//     if (newQuery === query) return;
//     setQuery(newQuery);
//     setPage(1);
//     if (newQuery.trim() === "") {
//       toast.error("Enter text to search.");
//     }
//   };

//   const handleSelect = (movie: Movie) => setSelectedMovie(movie);
//   const handleClose = () => setSelectedMovie(null);

//   return (
//     <div className={css.app}>
//       <SearchBar onSubmit={handleSearch} />

//       {isLoading && <Loader />}
//       {isError && <ErrorMessage />}

//       {totalPages > 1 && (
//         <ReactPaginate
//           pageCount={totalPages}
//           pageRangeDisplayed={5}
//           marginPagesDisplayed={1}
//           onPageChange={({ selected }) => setPage(selected + 1)}
//           forcePage={page - 1}
//           containerClassName={css.pagination}
//           activeClassName={css.active}
//           nextLabel="→"
//           previousLabel="←"
//         />
//       )}

//       {!isLoading && !isError && movies.length > 0 && (
//         <MovieGrid movies={movies} onSelect={handleSelect} />
//       )}

//       {selectedMovie && (
//         <MovieModal movie={selectedMovie} onClose={handleClose} />
//       )}
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

import css from "./App.module.css";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim() !== "",
    refetchOnWindowFocus: false,
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (!isLoading && !isError && query && movies.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isLoading, isError, query, movies.length]);

  const handleSearch = (newQuery: string) => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setPage(1);

    if (newQuery.trim() === "") {
      toast.error("Enter text to search.");
    }
  };

  const handleSelect = (movie: Movie) => setSelectedMovie(movie);
  const handleClose = () => setSelectedMovie(null);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          previousLabel="←"
          nextLabel="→"
          previousClassName={page === 1 ? css.hidden : ""}
          nextClassName={page === totalPages ? css.hidden : ""}
        />
      )}

      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleClose} />
      )}
    </div>
  );
}

export default App;
