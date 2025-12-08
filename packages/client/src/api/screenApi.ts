import axiosClient from "./axiosClient";

const screenApi = {
    // Create screen
    createScreen(data: any) {
        return axiosClient.post("/partner/screens", data);
    },

    // Get screens created by partner
    getMyScreens() {
        return axiosClient.get("/partner/screens/mine");
    },
    getScreensByTheatre(theatreId: string | undefined) {
        return axiosClient.get(`/partner/screens/theatre/${theatreId}`);
    }
};

export default screenApi;
