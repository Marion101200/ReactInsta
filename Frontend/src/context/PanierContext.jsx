
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useMemo,
    useEffect
} from "react";

import { useAuth } from "./AuthContext";

const PanierContext = createContext(null);
const QUANTITE_MAX = 10;

// Lit le panier d'un utilisateur
function lireStockage(userId) {
    if (!userId) return [];

    console.log("[init] lecture du panier utilisateur", userId);

    try {
        const valeur = JSON.parse(
            localStorage.getItem(`panier_${userId}`)
        );

        return Array.isArray(valeur)
            ? valeur.filter((l) => l && l.id != null && l.quantite != null)
            : [];
    } catch {
        return [];
    }
}

export function PanierProvider({ children }) {

    const { utilisateur } = useAuth();
    const userId = utilisateur?.id;

    // Initialisation du panier de l'utilisateur connecté
    const [lignes, setLignes] = useState(() => lireStockage(userId));

    // Permet de savoir pour quel utilisateur le panier est chargé
    const [panierChargePour, setPanierChargePour] = useState(userId);

    // Recharge le panier quand l'utilisateur change
    useEffect(() => {
        console.log("[useEffect] changement utilisateur :", userId);

        setLignes(lireStockage(userId));
        setPanierChargePour(userId);
    }, [userId]);

    // Sauvegarde uniquement lorsque le bon panier est chargé
    useEffect(() => {
        if (!userId || panierChargePour !== userId) return;

        console.log("[useEffect] sauvegarde du panier :", userId);

        localStorage.setItem(
            `panier_${userId}`,
            JSON.stringify(lignes)
        );
    }, [lignes, userId, panierChargePour]);

    console.log("[rendu] PanierProvider, lignes =", lignes);

    // Ajouter un produit
    const ajouter = useCallback((produit) => {
        setLignes((prev) => {
            const existante = prev.find((l) => l.id === produit.id);

            // Produit absent
            if (!existante) {
                return [
                    ...prev,
                    {
                        id: produit.id,
                        nom: produit.nom,
                        prix: produit.prix,
                        quantite: 1
                    }
                ];
            }

            // Quantité maximale atteinte
            if (existante.quantite >= QUANTITE_MAX) return prev;

            // Produit déjà présent
            return prev.map((l) =>
                l.id === produit.id
                    ? { ...l, quantite: l.quantite + 1 }
                    : l
            );
        });
    }, []);

    // Modifier la quantité
    const modifierQuantite = useCallback((id, nouvelleQuantite) => {
        setLignes((prev) =>
            prev.map((l) =>
                l.id === id
                    ? {
                        ...l,
                        quantite: Math.min(
                            QUANTITE_MAX,
                            Math.max(1, nouvelleQuantite)
                        )
                    }
                    : l
            )
        );
    }, []);

    // Supprimer un produit
    const supprimer = useCallback((id) => {
        setLignes((prev) => prev.filter((l) => l.id !== id));
    }, []);

    // Vider le panier
    const vider = useCallback(() => {
        setLignes([]);
    }, []);

    // Nombre total d'articles
    const nombreArticles = useMemo(
        () => lignes.reduce((somme, l) => somme + l.quantite, 0),
        [lignes]
    );

    // Prix total du panier
    const total = useMemo(
        () => lignes.reduce((somme, l) => somme + l.prix * l.quantite, 0),
        [lignes]
    );

    // Quantités par produit
    const quantites = useMemo(() => {
        const resultat = {};

        for (const l of lignes) {
            resultat[l.id] = l.quantite;
        }

        return resultat;
    }, [lignes]);

    const value = useMemo(() => {
        return {
            lignes,
            quantites,
            nombreArticles,
            total,
            ajouter,
            modifierQuantite,
            supprimer,
            vider
        };
    }, [
        lignes,
        quantites,
        nombreArticles,
        total,
        ajouter,
        modifierQuantite,
        supprimer,
        vider
    ]);

    return (
        <PanierContext.Provider value={value}>
            {children}
        </PanierContext.Provider>
    );
}

export function usePanier() {
    const ctx = useContext(PanierContext);

    if (!ctx) {
        throw new Error(
            "usePanier doit être utilisé à l'intérieur de <PanierProvider>"
        );
    }

    return ctx;
}
