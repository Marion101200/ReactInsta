
import styles from "../Css/Sidebargauche.module.css";

function Sidebargauche() {
  return (
    <aside className={styles.sidebar}>
      <h2>Filtres</h2>

      <div className={styles.section}>
        <h3>Catégories</h3>

        <label>
          <input type="checkbox" />
          Souris
        </label>

        <label>
          <input type="checkbox" />
          Manette
        </label>

        <label>
          <input type="checkbox" />
          Clavier
        </label>
      </div>

      <div className={styles.section}>
        <h3>Prix</h3>

        <label>
          <input type="radio" name="prix" />
          Moins de 25 €
        </label>

        <label>
          <input type="radio" name="prix" />
          25 € - 50 €
        </label>

        <label>
          <input type="radio" name="prix" />
          Plus de 50 €
        </label>
      </div>

      <div className={styles.section}>
        <h3>Disponibilité</h3>

        <label>
          <input type="checkbox" />
          En stock
        </label>
      </div>

      <button type="button" className={styles.bouton}>
        Appliquer les filtres
      </button>
    </aside>
  );
}

export default Sidebargauche;