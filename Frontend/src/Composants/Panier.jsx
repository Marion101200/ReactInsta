
import { Link, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { usePanier } from "../context/PanierContext";
import DetailPanier from "./DetailPanier";
import styles from "../Css/Panier.module.css";

export default function Panier() {

    const { utilisateur, estConnecte } = useAuth();
    const { lignes, total, vider } = usePanier();

    // Vérifie si l'utilisateur est connecté
    if (!estConnecte) {
        return <Navigate to="/connexion" replace />;
    }

    // Empêche l'administrateur d'accéder au panier
    if (utilisateur?.role === "admin") {
        return <Navigate to="/produits" replace />;
    }

    if (lignes.length === 0) {
        return (
            <main className={styles.page}>
                <div className={styles.contenu}>
                    <h2 className={styles.titre}>Mon panier</h2>

                    <div className={styles.panierVide}>
                        <p>Votre panier est vide.</p>

                        <Link to="/produits" className={styles.boutonRetour}>
                            Retour au catalogue
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.page}>
            <div className={styles.contenu}>

                <h2 className={styles.titre}>Mon panier</h2>

                <ul className={styles.liste}>
                    {lignes.map((l) => (
                        <DetailPanier key={l.id} ligne={l} />
                    ))}
                </ul>

                <div className={styles.resume}>
                    <strong>Total du panier</strong>
                    <strong>{total} €</strong>
                </div>

                <div className={styles.actionsPanier}>
                    <Link to="/produits" className={styles.boutonRetour}>
                        Retour au catalogue
                    </Link>

                    <button
                        type="button"
                        className={styles.boutonVider}
                        onClick={vider}
                    >
                        Vider le panier
                    </button>
                </div>

            </div>
        </main>
    );
}
