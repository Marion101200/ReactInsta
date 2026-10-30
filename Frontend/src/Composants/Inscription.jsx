
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import styles from "../Css/Inscription.module.css";
import { validerInscription, nettoyerNom } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

// Liste des champs qui n'acceptent que des lettres
const CHAMPS_NOM = ["nom", "prenom"];

function Inscription() {

  // Permet de rediriger vers une autre page
  const navigate = useNavigate();

  // Récupère la fonction qui connecte l'utilisateur
  const { connecter } = useAuth();

  // Un seul état objet pour tous les champs du formulaire
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmation: "",
    cgu: false,
  });

  // État du message d'erreur
  const [erreur, setErreur] = useState("");

  // État du succès
  const [succes, setSucces] = useState(false);

  // État des erreurs par champ
  const [erreurs, setErreurs] = useState({});

  // Référence vers le champ nom
  const nomRef = useRef(null);

  // Focus automatique sur le champ nom au chargement
  useEffect(() => {
    nomRef.current.focus();
  }, []);

  // Gestionnaire appelé à chaque modification d'un champ
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let nouvelleValeur = type === "checkbox" ? checked : value;
    let messageChamp;

    // Nettoyage du nom et du prénom
    if (CHAMPS_NOM.includes(name)) {
      const nettoye = nettoyerNom(value);

      if (nettoye !== value) {
        messageChamp = "Chiffres et caractères spéciaux interdits.";
      }

      nouvelleValeur = nettoye;
    }

    setForm((prev) => ({
      ...prev,
      [name]: nouvelleValeur,
    }));

    setErreurs((prev) => ({ ...prev, [name]: messageChamp }));

    console.log(e.target.name, e.target.value);
  };

  // Fonction appelée à l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs
    const erreursForm = validerInscription(form);

    setErreurs(erreursForm);

    if (Object.keys(erreursForm).length > 0) {
      setErreur("");
      setSucces(false);
      return;
    }

    try {
      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: form.nom,
          prenom: form.prenom,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErreur(data.message);
        setSucces(false);
        return;
      }

      setErreur("");
      setSucces(true);

      // Connecte automatiquement l'utilisateur après son inscription
      connecter(data.utilisateur);

      // Redirige vers le catalogue
      navigate("/produits", { replace: true });

    } catch {
      setErreur("Serveur injoignable. Vérifie que le backend est lancé.");
      setSucces(false);
    }
  };

  return (
    <main className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <h1>Créer un compte</h1>

        <div className={styles.champ}>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            ref={nomRef}
            value={form.nom}
            onChange={handleChange}
          />
          {erreurs.nom && <small className={styles.erreur}>{erreurs.nom}</small>}
        </div>

        <div className={styles.champ}>
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
          />
          {erreurs.prenom && <small className={styles.erreur}>{erreurs.prenom}</small>}
        </div>

        <div className={styles.champ}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="nom@exemple.fr"
            value={form.email}
            onChange={handleChange}
          />
          {erreurs.email && <small className={styles.erreur}>{erreurs.email}</small>}
        </div>

        <div className={styles.champ}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {erreurs.password && <small className={styles.erreur}>{erreurs.password}</small>}
        </div>

        <div className={styles.champ}>
          <label htmlFor="confirmation">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirmation"
            name="confirmation"
            value={form.confirmation}
            onChange={handleChange}
          />
          {erreurs.confirmation && <small className={styles.erreur}>{erreurs.confirmation}</small>}
        </div>

        <div className={`${styles.champ} ${styles.champCase}`}>
          <input
            type="checkbox"
            id="cgu"
            name="cgu"
            checked={form.cgu}
            onChange={handleChange}
          />
          <label htmlFor="cgu">J'accepte les conditions d'utilisation</label>
          {erreurs.cgu && <small className={styles.erreur}>{erreurs.cgu}</small>}
        </div>

        {erreur && <p className={styles.erreur}>{erreur}</p>}
        {succes && <p className={styles.succes}>Inscription réussie, {form.prenom} !</p>}

        <button type="submit">S'inscrire</button>

        <p className={styles.lien}>
          Déjà un compte ? <Link to="/connexion">Se connecter</Link>
        </p>
      </form>
    </main>
  );
}

export default Inscription;
