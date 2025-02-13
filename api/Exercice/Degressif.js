import ApiManager from "../ApiManager";

export const getDegressifs = async (exerciceId) => {
  try {
    const response = await ApiManager.get(`/exercice/${exerciceId}/degressifs`);
    return response.data;
  } catch (error) {
    if (
      error.response?.data?.message?.includes("dégressifs ne sont pas activés")
    ) {
      return [];
    }
    console.error(
      "Erreur lors de la récupération des degressifs:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createDegressif = async (
  exerciceId,
  seriesDegressif,
  poidsDegressif,
  repetitionsDegressif
) => {
  console.log("URL appelée:", `/exercice/${exerciceId}/degressifs`);
  console.log("Données envoyées:", {
    exercice_id: exerciceId,
    series_degressif: seriesDegressif,
    poids_degressif: poidsDegressif,
    repetitions_degressif: repetitionsDegressif,
  });

  try {
    const response = await ApiManager.post(
      `/exercice/${exerciceId}/degressifs`,
      {
        exercice_id: exerciceId,
        series_degressif: seriesDegressif,
        poids_degressif: poidsDegressif,
        repetitions_degressif: repetitionsDegressif,
      }
    );
    console.log("Réponse du serveur:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création du dégressif:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteDegressif = async (exerciceId, degressifId) => {
  console.log("Tentative de suppression:", { exerciceId, degressifId });
  try {
    const response = await ApiManager.delete(
      `/exercice/${exerciceId}/degressifs/${degressifId}`
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
