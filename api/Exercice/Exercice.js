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

export const createExercice = async (
  seanceId,
  nomExercice,
  sets,
  poids,
  repetitions,
  degressifActive,
  seriesDegressif,
  poidsDegressif,
  repetitionsDegressif
) => {
  const exerciceData = {
    nom_exercice: nomExercice,
    sets: sets,
    poids: poids,
    repetitions: repetitions,
    degressif_active: degressifActive,
    series_degressif: degressifActive ? seriesDegressif : null,
    poids_degressif: degressifActive ? poidsDegressif : null,
    repetitions_degressif: degressifActive ? repetitionsDegressif : null,
  };

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
