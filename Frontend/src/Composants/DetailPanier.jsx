import { memo } from "react";
import { usePanier } from "../context/PanierContext";
import styles from "../Css/Panier.module.css";

function DetailPanier({ ligne }) {

    const { modifierQuantite, supprimer } = usePanier();

    return (
        <li className={styles.ligne}>

            <div className={styles.informations}>
                <h3>{ligne.nom}</h3>

                <p>Prix unitaire : {ligne.prix} €</p>

                <p>Quantité : {ligne.quantite}</p>

                <div className={styles.commandes}>
                    <button
                        type="button"
                        onClick={() => modifierQuantite(ligne.id, ligne.quantite - 1)}
                        disabled={ligne.quantite <= 1}
                    >
                        −
                    </button>

                    <span>{ligne.quantite}</span>

                    <button
                        type="button"
                        onClick={() => modifierQuantite(ligne.id, ligne.quantite + 1)}
                        disabled={ligne.quantite >= 10}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className={styles.actions}>
                <span className={styles.sousTotal}>
                    {ligne.prix * ligne.quantite} €
                </span>

                <button
                    type="button"
                    className={styles.boutonSupprimer}
                    onClick={() => supprimer(ligne.id)}
                >
                    Supprimer
                </button>
            </div>

        </li>
    );
}

export default memo(DetailPanier);