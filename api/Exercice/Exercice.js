import ApiManager from "../ApiManager";

export const getExercices = async (seanceId) => {
  try {
    const response = await ApiManager.get(`/seances/${seanceId}/exercices`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des exercices:",
      error.response?.data || error.message
    );
    throw error;
  }
};
