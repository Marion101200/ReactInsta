
import Database from "better-sqlite3";

// Connexion à la base de données SQLite
export const db = new Database("database.sqlite");

console.log("Base SQLite utilisée :", db.name);
console.log("Dossier de lancement :", process.cwd());

// Création des tables si elles n'existent pas
db.exec(`
  CREATE TABLE IF NOT EXISTS utilisateurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    mot_de_passe TEXT NOT NULL,
    cree_le TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS produits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prix REAL NOT NULL
  );
`);

const colonnesUtilisateurs = db.prepare(
  "PRAGMA table_info(utilisateurs)"
).all();

const nomsColonnesUtilisateurs = colonnesUtilisateurs.map(
  (colonne) => colonne.name
);

if (!nomsColonnesUtilisateurs.includes("role")) {
  db.exec(`
    ALTER TABLE utilisateurs
    ADD COLUMN role TEXT NOT NULL DEFAULT 'client'
  `);
}


console.log(
  "Produits présents dans SQLite :",
  db.prepare("SELECT * FROM produits").all()
);
// Ajout de produits de départ si la table est vide
const { total } = db.prepare(
  "SELECT COUNT(*) AS total FROM produits"
).get();

if (total === 0) {
  const ajouter = db.prepare(
    "INSERT INTO produits (nom, prix) VALUES (?, ?)"
  );

  ajouter.run("Clavier", 49);
  ajouter.run("Souris", 25);
}
const colonnes = db.prepare("PRAGMA table_info(produits)").all();
const nomsColonnes = colonnes.map((colonne) => colonne.name);

if (!nomsColonnes.includes("description")) {
  db.exec("ALTER TABLE produits ADD COLUMN description TEXT DEFAULT ''");
}

if (!nomsColonnes.includes("quantite")) {
  db.exec("ALTER TABLE produits ADD COLUMN quantite INTEGER NOT NULL DEFAULT 0");
}