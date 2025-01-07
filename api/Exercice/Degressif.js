import ApiManager from "../ApiManager";

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
