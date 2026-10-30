
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import styles from "../Css/Produits.module.css";
import Recherche from "./Recherche";
import Sidebargauche from "./Sidebargauche";
import Sidebardroite from "./Sidebardroite";
import AjouterProduit from "./AjoutProduit";
import ProduitCard from "./ProduitCard";
import { normaliser } from "../utils/texte";
import { useDebounce } from "../hooks/useDebounce";

function Produits() {
  const navigate = useNavigate();

  // Récupère l'utilisateur depuis le contexte
  const { utilisateur, estConnecte } = useAuth();

  const [produits, setProduits] = useState([]);
  const [texteRecherche, setTexteRecherche] = useState("");
  const [favoris, setFavoris] = useState([]);

  // Gestion du formulaire administrateur
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);
  const [produitAModifier, setProduitAModifier] = useState(null);

  // Vérifie si l'utilisateur est administrateur
  const estAdmin = utilisateur?.role === "admin";

  const saisie = texteRecherche;
  const terme = useDebounce(saisie, 300);

  const inputRef = useRef(null);

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    if (!estConnecte) {
      navigate("/connexion", { replace: true });
    }
  }, [estConnecte, navigate]);

  // Récupère les produits depuis le serveur
  const chargerProduits = useCallback(async () => {
    console.log("Je recharge les produits !");

    try {
      const res = await fetch("/api/produits");

      if (!res.ok) {
        throw new Error("Erreur lors du chargement des produits");
      }

      const data = await res.json();
      setProduits(data);
    } catch (erreur) {
      console.error("Erreur :", erreur);
    }
  }, []);

  // Charge les produits uniquement si l'utilisateur est connecté
  useEffect(() => {
    if (!estConnecte) return;

    chargerProduits();
  }, [estConnecte, chargerProduits]);

  // Gestion des favoris
  const toggleFavori = useCallback((id) => {
    setFavoris((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  // Filtrage des produits
  const produitsFiltres = useMemo(() => {
    console.log("[useMemo] filtrage pour :", terme);

    const t = normaliser(terme);

    return produits.filter((p) =>
      normaliser(p.nom).includes(t)
    );
  }, [produits, terme]);

  // Raccourci clavier : "/" donne le focus à la barre de recherche
  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target.tagName;

      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    console.log("[useEffect] écouteur clavier ajouté");

    window.addEventListener("keydown", onKeyDown);

    return () => {
      console.log("[useEffect] écouteur clavier retiré");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Effacer la recherche
  const effacer = () => {
    setTexteRecherche("");
    inputRef.current?.focus();
  };

  // Ouvrir le formulaire pour ajouter un produit
  const ouvrirAjout = () => {
    setProduitAModifier(null);
    setAfficherFormulaire(true);
  };

  // Ouvrir le formulaire pour modifier un produit
  const modifier = (produit) => {
    setProduitAModifier(produit);
    setAfficherFormulaire(true);
  };

  // Fermer le formulaire
  const fermerFormulaire = () => {
    setAfficherFormulaire(false);
    setProduitAModifier(null);
  };

  // Supprimer un produit
  const supprimer = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      return;
    }

    try {
      const res = await fetch(`/api/produits/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la suppression du produit");
      }

      await chargerProduits();
    } catch (erreur) {
      console.error("Erreur :", erreur);
    }
  };

  // Évite d'afficher le catalogue avant la redirection
  if (!estConnecte) {
    return null;
  }

  return (
    <main className={styles.page}>
      <Recherche
        valeur={texteRecherche}
        onChange={setTexteRecherche}
        onEffacer={effacer}
        inputRef={inputRef}
      />

      <div className={`${styles.content} ${estAdmin ? styles.contentAdmin : ""}`}>

        {/* Sidebar uniquement pour les clients */}
        {!estAdmin && <Sidebargauche />}

        <section className={styles.listeProduits}>
          <h2>Catalogue</h2>

          {/* Partie réservée à l'administrateur */}
          {estAdmin && (
            <>
              <button
                type="button"
                className={styles.boutonAjouter}
                onClick={ouvrirAjout}
              >
                + Ajouter un produit
              </button>

              {afficherFormulaire && (
                <AjouterProduit
                  actualiserProduits={chargerProduits}
                  produitAModifier={produitAModifier}
                  onTerminer={fermerFormulaire}
                />
              )}
            </>
          )}

          <p>
            {produitsFiltres.length} résultat(s)
            {saisie !== terme && (
              <small> – recherche en cours…</small>
            )}
          </p>

          {produitsFiltres.length === 0 ? (
            <p>
              Aucun produit ne correspond à « {terme} ».
            </p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {produitsFiltres.map((p) => (
                <ProduitCard
                  key={p.id}
                  produit={p}
                  estFavori={favoris.includes(p.id)}
                  onToggleFavori={toggleFavori}
                  estAdmin={estAdmin}
                  onModifier={modifier}
                  onSupprimer={supprimer}
                />
              ))}
            </ul>
          )}
        </section>

        {/* Sidebar uniquement pour les clients */}
        {!estAdmin && <Sidebardroite />}

      </div>
    </main>
  );
}

export default Produits;
