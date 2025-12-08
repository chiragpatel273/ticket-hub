import axiosClient from "./axiosClient";

const showApi = {
    // Create show
    createShow(data: any) {
        return axiosClient.post("/partner/shows", data);
    },

    // Get partner's shows
    getMyShows() {
        return axiosClient.get("/partner/shows/mine");
    },

    // Update show
    updateShow(id: string, data: any) {
        return axiosClient.put(`/partner/shows/${id}`, data);
    },

    // Delete show
    deleteShow(id: string) {
        return axiosClient.delete(`/partner/shows/${id}`);
    },
};

export default showApi;
