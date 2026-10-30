
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Récupère l'utilisateur enregistré au chargement
  const [utilisateur, setUtilisateur] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("utilisateur") || "null"
      );
    } catch {
      return null;
    }
  });

  // Enregistre l'utilisateur après une connexion réussie
  const connecter = (donneesUtilisateur) => {
    localStorage.setItem(
      "utilisateur",
      JSON.stringify(donneesUtilisateur)
    );

    setUtilisateur(donneesUtilisateur);
  };

  // Déconnecte l'utilisateur
  const deconnexion = () => {
    localStorage.removeItem("utilisateur");
    setUtilisateur(null);
  };

  const estConnecte = utilisateur !== null;

  return (
    <AuthContext.Provider
      value={{
        utilisateur,
        estConnecte,
        connecter,
        deconnexion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Permet aux composants d'accéder au contexte
export function useAuth() {
  const contexte = useContext(AuthContext);

  if (contexte === null) {
    throw new Error(
      "useAuth doit être utilisé dans un AuthProvider"
    );
  }

  return contexte;
}
