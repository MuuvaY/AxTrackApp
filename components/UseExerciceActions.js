import { useState } from "react";
import { Alert } from "react-native";
import { deleteExercice } from "../api/Exercice/Exercice"; // Assurez-vous d'avoir cette fonction dans votre API

export const UseExerciceActions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = (exerciceId, navigation) => {
    setIsModalVisible(false);
    if (!exerciceId) {
      Alert.alert("Erreur", "L'ID de l'exercice est manquant.");
      return;
    }
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer cet exercice ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteExercice(exerciceId);
              navigation.goBack();
            } catch (error) {
              Alert.alert("Erreur", "Impossible de supprimer l'exercice");
            }
          },
        },
      ]
    );
  };

  const handleEdit = (params, navigation) => {
    setIsModalVisible(false);
    navigation.navigate("CreationExercice", { isEditing: true, ...params });
  };

  return {
    isModalVisible,
    setIsModalVisible,
    handleDelete,
    handleEdit,
  };
};
