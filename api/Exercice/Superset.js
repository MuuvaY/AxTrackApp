import ApiManager from "../ApiManager";

export const getSupersets = async (supersetId, exerciceId) => {
  try {
    const response = await ApiManager.get(
      `/seances/${supersetId}/exercices/${exerciceId}`
    );
    return response.data;
  } catch (error) {
    if (
      error.response?.data?.message?.includes("Supersets ne sont pas activés")
    ) {
      return [];
    }
    console.error(
      "Erreur lors de la récupération des supersets:",
      error.response?.data || error.message
    );
    throw error;
  }
};
