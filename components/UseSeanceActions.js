import { useState } from "react";
import { Alert } from "react-native";
import { deleteSeance } from "../api/Seance/Seance"; // Supposons que tu as un service pour gérer la suppression

export const UseSeanceActions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = (seanceId, navigation) => {
    setIsModalVisible(false);
    if (!seanceId) {
      Alert.alert("Erreur", "L'ID de la séance est manquant.");
      return;
    }
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer cette séance ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSeance(seanceId); // Appel à la fonction de suppression
              navigation.goBack();
            } catch (error) {
              Alert.alert("Erreur", "Impossible de supprimer la séance");
            }
          },
        },
      ]
    );
  };

  const handleEdit = (params, navigation) => {
    setIsModalVisible(false);
    navigation.navigate("CreationSeance", { isEditing: true, ...params });
  };

  return {
    isModalVisible,
    setIsModalVisible,
    handleDelete,
    handleEdit,
  };
};
