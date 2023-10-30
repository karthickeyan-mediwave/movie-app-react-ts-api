
import axios from "axios";
import { Movie1, Movie } from "../types";
import  { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:5476"; 

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const getMovies = async (): Promise<Movie[]> => {
    const response: AxiosResponse<Movie[]> = await apiService.get("/movies");
    return response.data;
  };

export const createMovie = async (movie: Movie1 ): Promise<Movie1> => {
    const response: AxiosResponse<Movie1> = await apiService.post("/movies", movie);
    return response.data;
  };

  export const updateMovie = async (id: string, movieData: Movie1) => {
      const response = await axios.put(`${API_BASE_URL}/movies/${id}`, movieData);
      return response.data;
    }
export const deleteMovie = async (id: number): Promise<void> => {
  await apiService.delete(`/movies/${id}`);
};
export const getMovieById = async (id: string) => {
      const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
      return response.data;
    }
 