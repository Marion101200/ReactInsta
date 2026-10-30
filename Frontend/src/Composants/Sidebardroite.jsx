
import styles from "../Css/Sidebardroite.module.css";

function Sidebardroite() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h2>Offres du moment</h2>
        <p>-10 % sur votre première commande !</p>
        <p>Découvrez nos promotions.</p>
      </div>

      <div className={styles.section}>
        <h3>Nos avantages</h3>
        <p>🚚 Livraison rapide</p>
        <p>🔒 Paiement sécurisé</p>
        <p>↩️ Retours sous 14 jours</p>
      </div>

      <div className={styles.section}>
        <h3>Besoin d'aide ?</h3>
        <p>Consultez notre FAQ.</p>
        <p>Contactez-nous.</p>
      </div>
    </aside>
  );
}

export default Sidebardroite;
