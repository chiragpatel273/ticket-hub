import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import AdminMovies from "./pages/admin/AdminMovies";
import AdminTheatres from "./pages/admin/AdminTheatres";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import PartnerScreens from "./pages/partner/PartnerScreens";
import PartnerShows from "./pages/partner/PartnerShows";
import PartnerTheatres from "./pages/partner/PartnerTheatres";
import PartnerTheatreScreens from "./pages/partner/PartnerTheatreScreens";
import PartnerTheatreShows from "./pages/partner/PartnerTheatreShows";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/movies"
          element={
            <ProtectedRoute roles={["admin"]}>
              <MainLayout>
                <AdminMovies />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner/theatres"
          element={
            <ProtectedRoute roles={["partner"]}>
              <MainLayout>
                <PartnerTheatres />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/theatres"
          element={
            <ProtectedRoute roles={["admin"]}>
              <MainLayout>
                <AdminTheatres />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner/screens"
          element={
            <ProtectedRoute roles={["partner"]}>
              <MainLayout>
                <PartnerScreens />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/partner/shows"
          element={
            <ProtectedRoute roles={["partner"]}>
              <MainLayout>
                <PartnerShows />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner/theatres/:theatreId/shows"
          element={
            <ProtectedRoute roles={["partner"]}>
              <MainLayout>
                <PartnerTheatreShows />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner/theatres/:theatreId/screens"
          element={
            <ProtectedRoute roles={["partner"]}>
              <MainLayout>
                <PartnerTheatreScreens />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
