import axios from "axios";

export const axiosInstance = axios.create({
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

export const deleteMovie = (movieId: string) => {
  return axiosInstance.delete(`/movies/${movieId}`);
};

export const del = (id: number) => {
  return axiosInstance.delete(`/movies/${id}`);
};

// const handleSave = () => {
//   axios
//     .put(`http://localhost:5476/movies/${id}`, todo)
//     .then((response) => {
//       console.log("Todo updated:", response.data);
//       window.location.href = "/";
//     })
//     .catch((error) => {
//       console.error("Error updating :", error);
//     });
// };

// YourComponent.tsx

