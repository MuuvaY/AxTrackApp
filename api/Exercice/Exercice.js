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
    const settings = {};

    if (exerciceData.requires_poulie) {
      settings["Réglage Poulie"] = exerciceData.reglage_poulie_value.toString();
    }
    if (exerciceData.requires_banc) {
      settings["Réglage Banc"] = exerciceData.reglage_banc_value.toString();
    }
    if (exerciceData.requires_dossier) {
      settings["Réglage Dossier"] =
        exerciceData.reglage_dossier_value.toString();
    }
    if (exerciceData.requires_thoracique) {
      settings["Réglage Thoracique"] =
        exerciceData.reglage_thoracique_value.toString();
    }
    if (exerciceData.requires_assise) {
      settings["Réglage Assise"] = exerciceData.reglage_assise_value.toString();
    }
    if (exerciceData.reglage_prise) {
      settings["Réglage Prise"] = exerciceData.reglage_prise_value;
    }

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
      supersets: exerciceData.supersets,
      settings: settings,
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

export const deleteExercice = async (seanceId, exerciceId) => {
  console.log("Tentative de suppression:", { seanceId, exerciceId });
  try {
    const response = await ApiManager.delete(
      `/seances/${seanceId}/exercices/${exerciceId}`
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
