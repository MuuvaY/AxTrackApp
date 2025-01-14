import ApiManager from "../ApiManager";

export const getUserProfile = async () => {
  try {
    const response = await ApiManager.get("/profile");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await ApiManager.patch(`/profile/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations de l'utilisateur:",
      error.response?.data || error.message
    );
    throw error;
  }
};
