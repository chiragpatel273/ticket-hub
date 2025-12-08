import axiosClient from "./axiosClient";

const adminMovieApi = {
  list() {
    return axiosClient.get("/admin/movies");
  },
  create(data: any) {
    return axiosClient.post("/admin/movies", data);
  },
  update(id: any, data: any) {
    return axiosClient.put(`/admin/movies/${id}`, data);
  },
  delete(id: any) {
    return axiosClient.delete(`/admin/movies/${id}`);
  }
};

export default adminMovieApi;
