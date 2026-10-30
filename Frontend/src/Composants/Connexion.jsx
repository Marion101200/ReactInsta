
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import styles from "../Css/Inscription.module.css";

function Connexion() {
  const navigate = useNavigate();
  const { connecter } = useAuth();

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [erreur, setErreur] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    if (!form.email || !form.password) {
      setErreur("Merci de remplir tous les champs.");
      return;
    }

    try {
      const res = await fetch("/api/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErreur(data.message || "Email ou mot de passe incorrect.");
        return;
      }

      connecter({
        id: data.id,
        prenom: data.prenom,
        role: data.role,
      });

      navigate("/produits");
    } catch {
      setErreur("Serveur injoignable. Vérifie que le backend est lancé.");
    }
  };

  return (
    <main className={styles.page}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <h1>Se connecter</h1>

        <div className={styles.champ}>
          <label htmlFor="email">Login</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
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
        </div>

        {erreur && <p className={styles.erreur}>{erreur}</p>}

        <p className={styles.lien}>
          Pas de compte ? <Link to="/inscription">S'inscrire</Link>
        </p>

        <button type="submit">Se connecter</button>
      </form>
    </main>
  );
}

export default Connexion;
