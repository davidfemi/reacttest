import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthProvider } from "./context/AuthContext";
import IntercomPageTracker from "./components/IntercomPageTracker";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <IntercomPageTracker />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/hotels" 
            element={
              <ProtectedRoute>
                <List />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/hotels/:id" 
            element={
              <ProtectedRoute>
                <Hotel />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
