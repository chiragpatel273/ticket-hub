import axiosClient from "./axiosClient";

const theatreApi = {
  // Partner
  createTheatre(data: any) {
    return axiosClient.post("/partner/theatres", data);
  },
  getMyTheatres() {
    return axiosClient.get("/partner/theatres/mine");
  },

  // Admin
  getAll() {
    return axiosClient.get("/admin/theatres");
  },
  approve(id: any) {
    return axiosClient.put(`/admin/theatres/${id}/approve`);
  },
  reject(id: any) {
    return axiosClient.put(`/admin/theatres/${id}/reject`);
  },
};

export default theatreApi;
