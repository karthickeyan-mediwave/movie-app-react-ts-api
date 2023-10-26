import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5476",
  //   timeout: 1000,
});

export const getMovies = () => {
  return axiosInstance.get("/movies");
};

interface IMovieAdd {
  title: string;
  year: number;
}

export const addMovie = (payload: IMovieAdd) => {
  return axiosInstance.post("/movies", payload);
};

export const updateMovie = (payload: IMovieAdd, movieId: number) => {
  return axiosInstance.put(`/movies/${movieId}`, payload);
};

export const deleteMovie = (movieId: number) => {
  return axiosInstance.delete(`/movies/${movieId}`);
};
// const deleteTodo = async (id: number): Promise<void> => {
//   await axios.delete(`http://localhost:5476/todos/${id}`);
//   console.log(`${id}`);

//   setTodos(todos.filter((todo) => todo.id !== id));
// };
// const handledel = () => {
//   setdialog(false);
// };
{
  /* <button className="" onClick={() => handledel}>
                <Link to="/">ok</Link>
              </button> */
}
// async function getMoviesFromAPI() {
//     setIsLoading(true);
//     try {
//       const response = await deleteMovie();
//       setMovies(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }
// getMoviesFromAPI();
