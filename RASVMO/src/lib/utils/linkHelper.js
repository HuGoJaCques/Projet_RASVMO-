// fonction pour identifier le genre du lien (chemin Windows, URL, etc.)
export function getLinkType(link) {
    if (!link) return "none";
    const cleanLink = link.trim().toLowerCase();
    if (cleanLink.startsWith("http://") || cleanLink.startsWith("https://")) {
        return "web"; // Lien de type URL
    }
    if (/^(?:\\\\[\w\s.-]+|[a-zA-Z]:\\)/.test(cleanLink)) {
        return "windows"; // Lien de type chemin Windows
    }
    return "unknown"; // Type de lien inconnu
}