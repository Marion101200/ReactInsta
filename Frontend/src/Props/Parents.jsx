import Enfant from "./Enfants/Enfants";

function Parents({ produits = [] }) {
  console.log("Produits dans Parents :", produits);

  return (
    <div>
      {produits.map((produit) => (
        <Enfant key={produit.id} produit={produit} />
      ))}
    </div>
  );
}

export default Parents;