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

export const deleteSuperset = async (exerciceId, supersetId) => {
  console.log("Tentative de suppression:", {
    exerciceId,
    supersetId,
  });
  try {
    const response = await ApiManager.delete(
      `/exercice/${exerciceId}/superset/${supersetId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la suppression:",
      error.response?.data || error.message
    );
    throw error;
  }
};
