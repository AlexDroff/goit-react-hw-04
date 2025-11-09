import axios from "axios";
import type { Movie } from "../types/movie";

const token = import.meta.env.VITE_TMDB_TOKEN;

export interface TMDBResponse {
  results: Movie[];
  page: number;
  total_results: number;
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<TMDBResponse> => {
  const response = await axios.get<TMDBResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
