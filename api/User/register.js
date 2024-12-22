import ApiManager from "../ApiManager";

// Fonction pour créer un compte
export const registerUser = async (nom, prenom, email, password) => {
  try {
    // Appel API pour créer un utilisateur
    const response = await ApiManager.post("/register", {
      nom,
      prenom,
      email,
      password,
    });

    // Retourner la réponse de l'API (par exemple, les informations de l'utilisateur créé ou un message de succès)
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error; // Propager l'erreur si l'inscription échoue
  }
};
