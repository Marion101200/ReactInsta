
import styles from "../Css/Recherche.module.css";

function Recherche({ valeur, onChange, onSearch, onEffacer, inputRef }) {
  return (
    <div className={styles.recherche}>
      <input
        ref={inputRef}
        type="text"
        placeholder='Rechercher un produit... (touche "/")'
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
      />

      <button type="button" onClick={onSearch}>
        Rechercher
      </button>

      <button
        type="button"
        onClick={onEffacer}
        disabled={!valeur}
      >
        Effacer
      </button>
    </div>
  );
}

export default Recherche;
