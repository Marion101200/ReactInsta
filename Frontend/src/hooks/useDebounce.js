import { useState, useEffect } from "react";
// Renvoie `valeur`, mais seulement après `delai` ms sans changement
export function useDebounce(valeur, delai = 300) {
const [valeurDebounce, setValeurDebounce] = useState(valeur);
useEffect(() => {
const id = setTimeout(() => {
console.log("[useDebounce] valeur validée :", valeur);
setValeurDebounce(valeur);
}, delai);
// Nettoyage : si `valeur` change avant la fin, on annule le minuteur
return () => clearTimeout(id);
}, [valeur, delai]);
return valeurDebounce;
}