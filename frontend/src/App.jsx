import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/NavBar";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { useThemeStore } from "./store/useThemeStore";
import Profile from "./pages/profile";

export default function App() {
  const { auth } = useAuth();
  const isAuthenticated = !!auth.token && !!auth.user;
  const {theme} = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div data-theme={theme}>
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={isAuthenticated? <Home /> : <Navigate to='/login' />} />
          <Route path="/login" element={!isAuthenticated? <Login /> : <Navigate to='/' />} />
          <Route path="/register" element={!isAuthenticated? <Register /> : <Navigate to='/' />} />
          <Route path="/blogs/:id" element={isAuthenticated? <BlogDetails /> : <Navigate to='/login' />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster />
    </>
    </div>
  );
}
