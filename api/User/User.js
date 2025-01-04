import ApiManager from "../ApiManager";

export const getUserProfile = async () => {
  try {
    const response = await ApiManager.get("/profile");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur:",
      error.response?.data || error.message
    );
    throw error;
  }
};
