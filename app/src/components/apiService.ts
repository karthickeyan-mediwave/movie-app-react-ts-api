
import axios from "axios";
import { Todo1, Todo } from "../types";
import  { AxiosResponse } from "axios";

const API_BASE_URL = "http://localhost:5476"; 

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const getMovies = async (): Promise<Todo[]> => {
    const response: AxiosResponse<Todo[]> = await apiService.get("/movies");
    return response.data;
  };

export const createMovie = async (movie: Todo1): Promise<Todo1> => {
    const response: AxiosResponse<Todo1> = await apiService.post("/movies", movie);
    return response.data;
  };

  export const updateMovie = async (id: string, movieData: Todo1) => {
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
