// Validation des champs du formulaire d'inscription.
// Les fonctions simples renvoient true (valide) ou false (invalide).
// validerInscription() les assemble et renvoie un objet d'erreurs par champ.

// Longueur minimale du mot de passe : identique à celle exigée par le backend
export const LONGUEUR_MIN_MOT_DE_PASSE = 12;

// Vérifie qu'une valeur est du texte contenant au moins un caractère visible
export const nonVide = (valeur) =>
  typeof valeur === "string" && valeur.trim() !== "";

// AJOUT NOM : supprime tout caractère interdit dans un nom ou un prénom.
// Sont conservés : les lettres (accents compris), les espaces, le tiret et l'apostrophe.
// Les chiffres et les caractères spéciaux (@ # $ % ! ? . , etc.) sont retirés.
export const nettoyerNom = (valeur) =>
  typeof valeur === "string" ? valeur.replace(/[^\p{L}\s'’-]/gu, "") : "";

// AJOUT NOM : true si la valeur ne contient aucun chiffre ni caractère spécial
export const caracteresNomValides = (valeur) =>
  typeof valeur === "string" && /^[\p{L}\s'’-]*$/u.test(valeur);

// Nom ou prénom : 2 à 50 caractères, lettres (accents compris),
// espaces, tirets et apostrophes autorisés
export const nomValide = (valeur) => {
  if (!nonVide(valeur)) return false;
  const texte = valeur.trim();
  return (
    texte.length >= 2 &&
    texte.length <= 50 &&
    /^[\p{L}][\p{L}\s'’-]*$/u.test(texte)
  );
};

// Email : format texte@domaine.extension, sans espace, 254 caractères maximum
export const emailValide = (valeur) => {
  if (!nonVide(valeur)) return false;
  const texte = valeur.trim();
  return texte.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(texte);
};

// Mot de passe : longueur minimale imposée, 128 caractères maximum
// (pas de trim : les espaces font partie du mot de passe)
export const motDePasseValide = (valeur) =>
  typeof valeur === "string" &&
  valeur.length >= LONGUEUR_MIN_MOT_DE_PASSE &&
  valeur.length <= 128;

// Confirmation : non vide et strictement identique au mot de passe
export const confirmationValide = (motDePasse, confirmation) =>
  typeof confirmation === "string" &&
  confirmation !== "" &&
  motDePasse === confirmation;

// Conditions d'utilisation : la case doit être cochée (booléen true)
export const cguAcceptees = (valeur) => valeur === true;

// Valide tout le formulaire d'un coup.
// Renvoie un objet { champ: "message" } ; un objet vide signifie « tout est valide ».
export function validerInscription(form) {
  const erreurs = {};

  // AJOUT NOM : message précis si la valeur contient un chiffre ou un caractère spécial
  if (!caracteresNomValides(form.nom)) {
    erreurs.nom = "Le nom ne doit contenir ni chiffre ni caractère spécial.";
  } else if (!nomValide(form.nom)) {
    erreurs.nom = "Le nom est obligatoire (2 à 50 lettres).";
  }
  // AJOUT NOM : même contrôle pour le prénom
  if (!caracteresNomValides(form.prenom)) {
    erreurs.prenom = "Le prénom ne doit contenir ni chiffre ni caractère spécial.";
  } else if (!nomValide(form.prenom)) {
    erreurs.prenom = "Le prénom est obligatoire (2 à 50 lettres).";
  }
  if (!emailValide(form.email)) {
    erreurs.email = "L'adresse email n'est pas valide.";
  }
  if (!motDePasseValide(form.password)) {
    erreurs.password = `Le mot de passe doit contenir au moins ${LONGUEUR_MIN_MOT_DE_PASSE} caractères.`;
  }
  if (!confirmationValide(form.password, form.confirmation)) {
    erreurs.confirmation = "Les mots de passe ne sont pas identiques.";
  }
  if (!cguAcceptees(form.cgu)) {
    erreurs.cgu = "Vous devez accepter les conditions d'utilisation.";
  }

  return erreurs;
}
