import ApiManager from "../ApiManager";

export const deleteExerciceSerie = async (exerciceId, serieId) => {
  console.log("Tentative de suppression de la série:", { exerciceId, serieId });
  try {
    const response = await ApiManager.delete(
      `/exercice/${exerciceId}/exerciceSerie/${serieId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la suppression de la série:",
      error.response?.data || error.message
    );
    throw error;
  }
};
