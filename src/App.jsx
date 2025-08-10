import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/navbar";
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
import Reports from "./pages/Reports";
import Alerts from "./pages/Alertes";

function App() {
  const location = useLocation();
  const showNavbar = ![
    "/admin",
    "/users",
    "/categories",
    "/orders",
    "/deliveries",
    "/reports",
    "/alerts",
  ].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
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
          <Route path="/reports" element={<Reports />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
