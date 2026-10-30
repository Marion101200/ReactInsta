import { memo } from "react";
import { usePanier } from "../context/PanierContext";
import styles from "../Css/Produits.module.css";

function ProduitCard({
  produit,
  estFavori,
  onToggleFavori,
  estAdmin,
  onModifier,
  onSupprimer
}) {
  const { ajouter } = usePanier();

  const ajouterAuPanier = () => {
    ajouter(produit);
  };

  return (
    <li className={styles.carte}>
      <div className={styles.titreProduit}>
        <h3>{produit.nom}</h3>

        {!estAdmin && (
          <button
            type="button"
            className={`${styles.boutonFavori} ${
              estFavori ? styles.favoriActif : ""
            }`}
            onClick={() => onToggleFavori(produit.id)}
            aria-label={
              estFavori ? "Retirer des favoris" : "Ajouter aux favoris"
            }
            aria-pressed={estFavori}
          >
            {estFavori ? "♥" : "♡"}
          </button>
        )}
      </div>

      {produit.description && (
        <p className={styles.description}>
          {produit.description}
        </p>
      )}

      <div className={styles.infos}>
        <div className={styles.info}>
          <span className={styles.label}>Prix</span>
          <span className={styles.prix}>{produit.prix} €</span>
        </div>

        {produit.quantite !== undefined && (
          <div className={styles.info}>
            <span className={styles.label}>Quantité</span>
            <span className={styles.quantite}>{produit.quantite}</span>
          </div>
        )}
      </div>

      {estAdmin ? (
        <div className={styles.actionsAdmin}>
          <button
            type="button"
            onClick={() => onModifier(produit)}
          >
            Modifier
          </button>

          <button
            type="button"
            onClick={() => onSupprimer(produit.id)}
          >
            Supprimer
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={styles.boutonPanier}
          onClick={ajouterAuPanier}
        >
          🛒 Ajouter au panier
        </button>
      )}
    </li>
  );
}

export default memo(ProduitCard);