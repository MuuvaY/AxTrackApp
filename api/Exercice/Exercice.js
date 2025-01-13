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

export const createExercice = async (seanceId, exerciceData) => {
  try {
    const response = await ApiManager.post(`/seances/${seanceId}/exercices`, {
      nom_exercice: exerciceData.nomExercice,
      sets: exerciceData.sets,
      poids: exerciceData.poids,
      repetitions: exerciceData.repetitions,
      degressif_active: exerciceData.degressifActive,
      series_degressif: exerciceData.degressifActive
        ? exerciceData.seriesDegressif
        : null,
      poids_degressif: exerciceData.degressifActive
        ? exerciceData.poidsDegressif
        : null,
      repetitions_degressif: exerciceData.degressifActive
        ? exerciceData.repetitions_degressif
        : null,
      reglage_assise: exerciceData.requires_assise,
      reglage_poulie: exerciceData.requires_poulie,
      reglage_banc: exerciceData.requires_banc,
      reglage_dossier: exerciceData.requires_dossier,
      reglage_thoracique: exerciceData.requires_thoracique,
      reglage_prise: exerciceData.reglage_prise,
      supersets: exerciceData.supersets,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'exercice :",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateExercice = async (seanceId, exerciceId, exerciceData) => {
  try {
    console.log(`URL: /seances/${seanceId}/exercices/${exerciceId}`);
    console.log("Données envoyées2:", exerciceData);

    const response = await ApiManager.patch(
      `/seances/${seanceId}/exercices/${exerciceId}`,
      exerciceData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'exercice:",
      error.response?.data || error.message
    );
    throw error;
  }
};
