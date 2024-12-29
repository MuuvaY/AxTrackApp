import ApiManager from "../ApiManager";

export const getCategorieExo = async () => {
  try {
    const response = await ApiManager.get("/categorieExercice");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des séances:",
      error.response?.data || error.message
    );
    throw error;
  }
};
