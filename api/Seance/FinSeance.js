import ApiManager from "../ApiManager";

export const getFinSeances = async (seanceId) => {
  try {
    const response = await ApiManager.get(`/finseance/${seanceId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des fin de séances:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createFinSeance = async (
  seance_id,
  duration,
  total_weight,
  volume,
  date,
  difficulty
) => {
  const finSeanceData = {
    seance_id,
    duration,
    total_weight,
    volume,
    date,
    difficulty,
  };

  try {
    const response = await ApiManager.post("/finseance", finSeanceData);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la création du résumé de séance :",
      error.response?.data || error.message
    );
    throw error;
  }
};
