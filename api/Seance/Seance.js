import ApiManager from "../ApiManager";

export const getSeances = async () => {
  try {
    const response = await ApiManager.get("/seances");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des séances:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createSeance = async (
  seance_nom,
  jour_semaine,
  categorie_exercice_id
) => {
  const seanceData = {
    seance_nom,
    jour_semaine,
    categorie_exercice_id,
  };

  try {
    const response = await ApiManager.post("/seances", seanceData);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création de la séance :",
      error.response?.data || error.message
    );
    throw error;
  }
};
