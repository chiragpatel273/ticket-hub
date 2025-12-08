import axiosClient from "./axiosClient";

const movieApi = {
    getAll() {
        return axiosClient.get("/movies"); // make sure backend route exists
    },
    getById(id: string) {
        return axiosClient.get(`/movies/${id}`);
    },
};

export default movieApi;
