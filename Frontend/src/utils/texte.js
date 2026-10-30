export function normaliser(texte) {
return texte
.normalize("NFD")
.replace(/[̀-ͯ]/g, "")
.toLowerCase()
.trim();
}