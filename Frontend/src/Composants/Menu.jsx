
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import styles from "../Css/Menu.module.css";

const style = ({ isActive }) => ({
  fontWeight: isActive ? "bold" : "normal",
  textDecoration: isActive ? "underline" : "none",
});

function Menu() {
  const navigate = useNavigate();

  const { utilisateur, estConnecte, deconnexion } = useAuth();

  const [afficherMessage, setAfficherMessage] = useState(false);

  // Vérifie si l'utilisateur est administrateur
  const estAdmin = utilisateur?.role === "admin";

  // Vérifie si l'utilisateur peut accéder au catalogue
  const accederProduits = (e) => {
    if (!estConnecte) {
      e.preventDefault();
      setAfficherMessage(true);
    } else {
      setAfficherMessage(false);
    }
  };

  // Déconnecte l'utilisateur
  const gererDeconnexion = () => {
    deconnexion();
    setAfficherMessage(false);
    navigate("/connexion");
  };

  return (
    <>
      <nav className={styles.menu}>
        <NavLink to="/" end style={style}>
          Accueil
        </NavLink>

        <NavLink
          to="/produits"
          style={style}
          onClick={accederProduits}
        >
          Produits
        </NavLink>

        {!estConnecte && (
          <>
            <NavLink to="/inscription" style={style}>
              Inscription
            </NavLink>

            <NavLink to="/connexion" style={style}>
              Connexion
            </NavLink>
          </>
        )}

        {/* Le panier est réservé aux clients */}
        {estConnecte && !estAdmin && (
          <NavLink to="/panier" style={style}>
            Panier
          </NavLink>
        )}

        <NavLink to="/contact" style={style}>
          Contact
        </NavLink>

        {estConnecte && (
          <button
            type="button"
            className={styles.boutonDeconnexion}
            onClick={gererDeconnexion}
          >
            Déconnexion
          </button>
        )}
      </nav>

      {afficherMessage && (
        <div className={styles.messageConnexion}>
          <p>Connectez-vous pour accéder au catalogue !</p>

          <div className={styles.boutonsConnexion}>
            <button
              type="button"
              className={styles.boutonConnexion}
              onClick={() => {
                setAfficherMessage(false);
                navigate("/connexion");
              }}
            >
              Se connecter
            </button>

            <button
              type="button"
              className={styles.boutonInscription}
              onClick={() => {
                setAfficherMessage(false);
                navigate("/inscription");
              }}
            >
              Créer un compte
            </button>

            <button
              type="button"
              className={styles.boutonFermer}
              onClick={() => setAfficherMessage(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
