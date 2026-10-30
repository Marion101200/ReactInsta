import { useState, useEffect, useRef } from "react";
import styles from "../Css/AjoutProduit.module.css";

function AjouterProduit({
  actualiserProduits,
  produitAModifier,
  onTerminer
}) {
  const [titre, setTitre] = useState("");
  const [prix, setPrix] = useState("");
  const [description, setDescription] = useState("");
  const [quantite, setQuantite] = useState("0");

  const titreRef = useRef(null);

  useEffect(() => {
    if (produitAModifier) {
      setTitre(produitAModifier.nom);
      setPrix(String(produitAModifier.prix));
      setDescription(produitAModifier.description || "");
      setQuantite(String(produitAModifier.quantite));
    } else {
      setTitre("");
      setPrix("");
      setDescription("");
      setQuantite("0");
    }

    titreRef.current.focus();
  }, [produitAModifier]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produit = {
      nom: titre,
      prix: Number(prix),
      description,
      quantite: Number(quantite),
    };

    try {
      const url = produitAModifier
        ? `/api/produits/${produitAModifier.id}`
        : "/api/produits";

      const res = await fetch(url, {
        method: produitAModifier ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(produit),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'enregistrement du produit");
      }

      await actualiserProduits();
      onTerminer();
    } catch (erreur) {
      console.error("Erreur :", erreur);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>
        {produitAModifier ? "Modifier un produit" : "Ajouter un produit"}
      </h2>

      <label htmlFor="titre">Nom du produit</label>
      <input
        id="titre"
        ref={titreRef}
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="prix">Prix</label>
      <input
        id="prix"
        type="number"
        min="0"
        step="0.01"
        value={prix}
        onChange={(e) => setPrix(e.target.value)}
        required
      />

      <label htmlFor="quantite">Quantité</label>
      <input
        id="quantite"
        type="number"
        min="0"
        value={quantite}
        onChange={(e) => setQuantite(e.target.value)}
        required
      />

      <button type="submit">
        {produitAModifier ? "Enregistrer les modifications" : "Ajouter le produit"}
      </button>

      <button type="button" onClick={onTerminer}>
        Annuler
      </button>
    </form>
  );
}

export default AjouterProduit;