
import { Routes, Route } from "react-router";
import Layout from "./Composants/Layout";
import Produits from "./Composants/Produits";
import Connexion from "./Composants/Connexion";
import Inscription from "./Composants/Inscription";
import Accueil from "./Composants/Accueil";
import AjouterProduit from "./Composants/AjoutProduit";
import Props from "./Props/Parents";
import ProtectedRoute from "./Composants/ProtectedRoute";
import Panier from "./Composants/Panier";

function Contact() {
  return <h2>Contact</h2>;
}

function NotFound() {
  return <h2>Page introuvable</h2>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Accueil />} />

        {/* Pages réservées aux utilisateurs connectés */}
        <Route element={<ProtectedRoute />}>
          <Route path="produits" element={<Produits />} />
          <Route path="AjouterProduit" element={<AjouterProduit />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="props" element={<Props />} />
        </Route>

        {/* Pages accessibles sans connexion */}
        <Route path="inscription" element={<Inscription />} />
        <Route path="connexion" element={<Connexion />} />
        <Route path="contact" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
