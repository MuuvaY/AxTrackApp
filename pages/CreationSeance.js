import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { getCategorieExo } from "../api/Categorie/Categorie";
import { createSeance } from "../api/Seance/Seance";

const JOURS_SEMAINE = [
  "Sélectionner un jour",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const CreationSeance = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();

  const [focusedInput, setFocusedInput] = useState(null);
  const [seanceName, setSeanceName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedDay, setSelectedDay] = useState(JOURS_SEMAINE[0]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility for day selection

  useEffect(() => {
    loadCategories();
  }, []);

  // Function to load categories from API
  const loadCategories = async () => {
    try {
      const data = await getCategorieExo();
      console.log("Catégories récupérées :", data);
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error);
      setLoading(false);
    }
  };

  // Function to create a session
  const handleCreateSeance = async () => {
    if (!seanceName.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un nom de séance");
      return;
    }

    if (!selectedDay || selectedDay === JOURS_SEMAINE[0]) {
      Alert.alert("Erreur", "Veuillez sélectionner un jour");
      return;
    }

    if (!selectedCategory) {
      Alert.alert("Erreur", "Veuillez sélectionner une catégorie");
      return;
    }

    try {
      await createSeance(seanceName, selectedDay, selectedCategory);
      Alert.alert("Succès", "Séance créée avec succès", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de la création de la séance");
    }
  };

  // Function to handle the day selection
  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setModalVisible(false); // Close the modal after selection
  };

  // Render each item in the day selection modal
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleDaySelect(item)}
    >
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
      marginBottom: 20,
    },
    title: {
      color: colors.primary,
      fontSize: 40,
      fontFamily: fonts.semiBold,
      textAlign: "center",
      marginTop: 30,
      marginBottom: 20,
      letterSpacing: 2,
    },
    buttonContainer: {
      marginLeft: 20,
      marginBottom: 20,
    },
    buttonText: {
      color: colors.secondary,
      fontSize: 24,
      fontFamily: fonts.medium,
    },
    inputContainer: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
    input: {
      backgroundColor: colors.secondBackground,
      height: 50,
      fontFamily: fonts.medium,
      fontSize: 28,
      borderRadius: 5,
      color: colors.text,
      paddingHorizontal: 15,
    },
    inputFocused: {
      borderColor: colors.secondary,
      borderWidth: 1,
    },
    sectionTitle: {
      color: colors.text,
      fontSize: 20,
      fontFamily: fonts.semiBold,
      marginHorizontal: 20,
      marginBottom: 10,
    },
    buttonCategoryContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: 20,
      marginBottom: 20,
    },
    categoryButton: {
      backgroundColor: colors.secondBackground,
      borderRadius: 5,
      padding: 10,
      margin: 5,
    },
    categoryButtonText: {
      color: colors.text,
      fontFamily: fonts.medium,
      fontSize: 18,
    },
    selectedCategoryButton: {
      backgroundColor: colors.secondary,
    },
    createButton: {
      backgroundColor: colors.secondary,
      padding: 15,
      borderRadius: 10,
      margin: 20,
    },
    createButtonText: {
      color: colors.background,
      textAlign: "center",
      fontSize: 18,
      fontFamily: fonts.semiBold,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end", // Align the modal to the right
      marginRight: 20, // Add a little space from the right edge
    },
    modalContent: {
      backgroundColor: colors.background,
      padding: 10,
      borderRadius: 10,
      width: 200, // Width of the modal (small size)
      maxHeight: "50%", // Limit the height of the modal
    },
    modalItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalItemText: {
      fontSize: 18,
      color: colors.text,
      fontFamily: fonts.medium,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Nouvelle Séance</Text>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                focusedInput === "seanceName" && styles.inputFocused,
              ]}
              placeholder="Nom de la séance"
              placeholderTextColor={colors.placeholder}
              value={seanceName}
              onChangeText={setSeanceName}
              onFocus={() => setFocusedInput("seanceName")}
              onBlur={() => setFocusedInput(null)}
              keyboardAppearance="dark"
              selectionColor={colors.secondary}
            />
          </View>

          <Text style={styles.sectionTitle}>Jour de la séance</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: colors.text }}>
              {selectedDay === JOURS_SEMAINE[0]
                ? "Sélectionner un jour"
                : selectedDay}
            </Text>
          </TouchableOpacity>

          {/* Modal for day selection */}
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <FlatList
                  data={JOURS_SEMAINE}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => item + index}
                />
              </View>
            </View>
          </Modal>

          <Text style={styles.sectionTitle}>Catégorie de la séance</Text>
          <View style={styles.buttonCategoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={category.categorie_exercice_id || index}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.categorie_exercice_id &&
                    styles.selectedCategoryButton,
                ]}
                onPress={() =>
                  setSelectedCategory(category.categorie_exercice_id)
                }
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category.categorie_exercice_id && {
                      color: colors.background,
                    },
                  ]}
                >
                  {category.categorie_exercice_nom}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateSeance}
          >
            <Text style={styles.createButtonText}>Créer la séance</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CreationSeance;
