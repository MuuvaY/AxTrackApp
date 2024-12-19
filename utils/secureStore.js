import * as SecureStore from "expo-secure-store";

export const storeToken = async (token) => {
  try {
    await SecureStore.setItemAsync("userToken", token);
    console.log("Token stocké avec succès !");
  } catch (error) {
    console.error("Erreur lors du stockage du token :", error);
  }
};

export const retrieveToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (token) {
      console.log("Token récupéré avec succès !", token);
    } else {
      console.log("Aucun token trouvé");
    }
    return token;
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync("userToken");
    console.log("Token supprimé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression du token :", error);
  }
};
