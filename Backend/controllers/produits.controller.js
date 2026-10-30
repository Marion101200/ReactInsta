import { db } from "../db.js";

export function listerProduits(req, res) {
  const produits = db.prepare(`
    SELECT id, nom, prix, description, quantite
    FROM produits
    ORDER BY nom
  `).all();

  res.json(produits);
}

export function ajouterProduit(req, res) {
  const { nom, prix, description, quantite } = req.body;

  db.prepare(`
    INSERT INTO produits (nom, prix, description, quantite)
    VALUES (?, ?, ?, ?)
  `).run(nom, prix, description, quantite);

  res.json({ message: "Produit ajouté avec succès !" });
}

export function modifierProduit(req, res) {
  const { id } = req.params;
  const { nom, prix, description, quantite } = req.body;

  const resultat = db.prepare(`
    UPDATE produits
    SET nom = ?, prix = ?, description = ?, quantite = ?
    WHERE id = ?
  `).run(nom, prix, description, quantite, id);

  if (resultat.changes === 0) {
    return res.status(404).json({ message: "Produit introuvable" });
  }

  res.json({ message: "Produit modifié avec succès !" });
}

export function supprimerProduit(req, res) {
  const { id } = req.params;

  const resultat = db.prepare(`
    DELETE FROM produits
    WHERE id = ?
  `).run(id);

  if (resultat.changes === 0) {
    return res.status(404).json({ message: "Produit introuvable" });
  }

  res.json({ message: "Produit supprimé avec succès !" });
}