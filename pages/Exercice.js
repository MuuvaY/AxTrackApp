import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { icons } from "./../assets/icons/icons";
import { deleteSeance } from "./../api/Seance/Seance";
import { getExercices } from "../api/Exercice/Exercice";

const Exercice = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();
  const route = useRoute();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Récupérer les informations de la séance depuis les paramètres de route
  const seanceNom = route.params?.seanceNom || "Séance";
  const seanceId = route.params?.seanceId;

  const [exercices, setExercices] = useState([]);

  const elements = []; // Remplacer par les données pertinentes

  const fetchExercices = async () => {
    if (!seanceId) return; // Vérifie si seanceId est disponible
    try {
      const data = await getExercices(seanceId);
      setExercices(data);
    } catch (err) {
      Alert.alert("Erreur", "Impossible de récupérer les exercices.");
    }
  };

  useEffect(() => {
    fetchExercices();
  }, []);

  const handleDelete = () => {
    setIsModalVisible(false);
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer cette séance ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              // Appel API pour supprimer la séance
              await deleteSeance(seanceId);
              navigation.goBack();
            } catch (error) {
              Alert.alert("Erreur", "Impossible de supprimer la séance");
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    setIsModalVisible(false); // Ferme le modal
    // Navigue vers CreationSeance avec tous les paramètres nécessaires
    navigation.navigate("CreationSeance", {
      isEditing: true,
      seanceId: route.params.seanceId,
      seanceNom: route.params.seanceNom,
      jour_semaine: route.params.jour_semaine,
      categorie_exercice_id: route.params.categorie_exercice_id,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 30,
      backgroundColor: colors.background,
    },
    title: {
      color: colors.primary,
      fontSize: 45,
      fontFamily: fonts.semiBold,
      letterSpacing: 2,
    },
    noSeanceContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    noSeance: {
      fontSize: 40,
      fontFamily: fonts.medium,
      color: colors.placeholder,
      margin: 20,
      textAlign: "center",
    },
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    modalOption: {
      paddingVertical: 15,
      flexDirection: "row",
      alignItems: "center",
    },
    modalOptionText: {
      color: colors.text,
      fontSize: 18,
      fontFamily: fonts.medium,
      marginLeft: 15,
    },
    modalOptionDelete: {
      color: "#FF3B30",
    },
    exerciceContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    exercice: {
      backgroundColor: colors.secondary,
      height: 62,
      width: 350,
      justifyContent: "center",
      paddingHorizontal: 10,
      margin: 10,
      borderRadius: 8,
    },
    exerciceText: {
      color: colors.background,
      fontFamily: fonts.bold,
      fontSize: 32,
      textTransform: "uppercase",
      // textAlign: "center",
      // textAlignVertical: "center",
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <icons.Ellipsis width={24} height={24} color={colors.placeholder} />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={[
            styles.exerciceContainer,
            { paddingBottom: 100 },
          ]}
        >
          {exercices.length > 0 ? (
            <View>
              {exercices.map((exercice, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ExerciceDetail")}
                  >
                    <View style={styles.exercice}>
                      <Text style={styles.exerciceText}>
                        {exercice.nom_exercice}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noSeanceContainer}>
              <Image source={require("../assets/img/DumbellCross.webp")} />
              <Text style={styles.noSeance}>
                Aucun exercice enregistré pour le moment.
              </Text>
            </View>
          )}

          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsModalVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={() => setIsModalVisible(false)}
            >
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={handleEdit}
                >
                  <icons.Edit width={24} height={24} color={colors.text} />
                  <Text style={styles.modalOptionText}>Modifier la séance</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={handleDelete}
                >
                  <icons.Trash width={24} height={24} color="#FF3B30" />
                  <Text
                    style={[styles.modalOptionText, styles.modalOptionDelete]}
                  >
                    Supprimer la séance
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Exercice;
