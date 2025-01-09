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

// export const createExercice = async (
//   seanceId,
//   nomExercice,
//   sets,
//   poids,
//   repetitions,
//   degressifActive
// ) => {
//   const exerciceData = {
//     nom_exercice: nomExercice,
//     sets: sets,
//     poids: poids,
//     repetitions: repetitions,
//     degressif_active: degressifActive.toString(),
//   };

//   try {
//     const response = await ApiManager.post(
//       `/seances/${seanceId}/exercices`,
//       exerciceData
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Erreur lors de la création de l'exercice :",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

// export const createExercice = async (
//   seanceId,
//   nomExercice,
//   sets,
//   poids,
//   repetitions,
//   degressifActive,
//   seriesDegressif,
//   poidsDegressif,
//   repetitionsDegressif
// ) => {
//   const exerciceData = {
//     nom_exercice: nomExercice,
//     sets: sets,
//     poids: poids,
//     repetitions: repetitions,
//     degressif_active: degressifActive,
//     series_degressif: degressifActive ? seriesDegressif : null,
//     poids_degressif: degressifActive ? poidsDegressif : null,
//     repetitions_degressif: degressifActive ? repetitionsDegressif : null,
//   };

//   try {
//     const response = await ApiManager.post(
//       `/seances/${seanceId}/exercices`,
//       exerciceData
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Erreur lors de la création de l'exercice :",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };
export const createExercice = async (
  seanceId,
  nomExercice,
  sets,
  poids,
  repetitions,
  degressifActive,
  seriesDegressif,
  poidsDegressif,
  repetitions_degressif,
  requires_assise,
  requires_poulie,
  requires_banc,
  requires_dossier,
  requires_thoracique,
  reglage_prise,
  supersets
) => {
  const exerciceData = {
    nom_exercice: nomExercice,
    sets: sets,
    poids: poids,
    repetitions: repetitions,
    degressif_active: degressifActive,
    supersets: supersets || null,
    series_degressif: degressifActive ? seriesDegressif : null,
    poids_degressif: degressifActive ? poidsDegressif : null,
    repetitions_degressif: degressifActive ? repetitions_degressif : null,
    reglage_assise: requires_assise,
    reglage_poulie: requires_poulie,
    reglage_banc: requires_banc,
    reglage_dossier: requires_dossier,
    reglage_thoracique: requires_thoracique,
    reglage_prise: reglage_prise,
  };
  console.log("Données envoyées à l'API:", exerciceData);
  try {
    const response = await ApiManager.post(
      `/seances/${seanceId}/exercices`,
      exerciceData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'exercice :",
      error.response?.data || error.message
    );
    throw error;
  }
};
