import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Acceuil";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import FournisseurPage from "./pages/Fourinisseur";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Deliveries from "./pages/Deleveries";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/fournisseur" element={<FournisseurPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/deliveries" element={<Deliveries />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
