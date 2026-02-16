import { API_BASE_URL } from "../config";

export async function uploadFile(formData) {
    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error("Erreur lors de l'upload");
    }

    return await response.json();
}