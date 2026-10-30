
import styles from "../../Css/Produits.module.css";


function PetitEnfant({ produit }) {
  return (
    <div className={styles.carte}>
      <h3>{produit.nom}</h3>

      <p className={styles.description}>
        {produit.description || "Aucune description disponible."}
      </p>

      <div className={styles.infos}>
        <div className={styles.info}>
          <span className={styles.label}>Prix</span>
          <span className={styles.prix}>{produit.prix} €</span>
        </div>

        <div className={styles.info}>
          <span className={styles.label}>Quantité</span>
          <span className={styles.quantite}>{produit.quantite}</span>
        </div>
      </div>
    </div>
  );
}

export default PetitEnfant;
