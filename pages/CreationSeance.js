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
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { getCategorieExo } from "../api/Categorie/Categorie";
import { createSeance } from "../api/Seance/Seance";
import { icons } from "./../assets/icons/icons";

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

const CreationSeance = ({ route }) => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();

  const [focusedInput, setFocusedInput] = useState(null);
  const [seanceName, setSeanceName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedDay, setSelectedDay] = useState(JOURS_SEMAINE[0]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategorieExo();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error);
      setLoading(false);
    }
  };

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
      const newSeance = await createSeance(
        seanceName,
        selectedDay,
        selectedCategory
      );
      if (route.params?.addSeance) {
        route.params.addSeance({
          seance_id: newSeance.seance_id,
          seance_nom: seanceName,
        });
      }
      Alert.alert("Succès", "Séance créée avec succès", [
        {
          text: "OK",
          onPress: () => {
            route.params.addSeance(newSeance);
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de la création de la séance");
    }
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setModalVisible(false);
  };

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
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      marginTop: 30,
      marginBottom: 20,
    },
    title: {
      color: colors.primary,
      fontSize: 40,
      fontFamily: fonts.semiBold,
      letterSpacing: 2,
    },
    headerButton: {
      padding: 10,
    },
    headerButtonText: {
      fontSize: 24,
      fontFamily: fonts.medium,
    },
    headerButtonInactive: {
      color: colors.placeholder,
    },
    headerButtonActive: {
      color: colors.secondary,
    },
    scrollView: {
      flex: 1,
    },
    inputContainer: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
    input: {
      backgroundColor: colors.secondBackground,
      borderRadius: 5,
      height: 50,
      fontSize: 28,
      color: colors.text,
      letterSpacing: 2,
      fontFamily: fonts.medium,
      paddingLeft: 45,
      borderWidth: 2,
      borderColor: "transparent",
      justifyContent: "center",
    },
    icon: {
      position: "absolute",
      left: 10,
      top: 13,
      zIndex: 1000,
    },
    inputFocused: {
      borderColor: colors.secondary,
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
      borderRadius: 25,
      paddingLeft: 15,
      paddingRight: 15,
      margin: 5,
      justifyContent: "center",
      alignItems: "center",
      borderColor: colors.placeholder,
      borderWidth: 2,
    },
    categoryButtonText: {
      color: colors.placeholder,
      fontFamily: fonts.medium,
      fontSize: 28,
    },
    selectedCategoryButton: {
      backgroundColor: "rgba(255, 52, 0, 0.5)",
      color: colors.text,
      borderColor: colors.secondary,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
      marginRight: 20,
    },
    modalContent: {
      backgroundColor: colors.secondBackground,
      padding: 10,
      borderRadius: 10,
      width: 200,
      maxHeight: "50%",
    },
    modalItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    modalItemText: {
      fontSize: 24,
      color: colors.text,
      fontFamily: fonts.medium,
    },

    TextSelect: {
      color: colors.text,
      fontSize: 28,
      fontFamily: fonts.medium,

      justifyContent: "center",
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={[styles.headerButtonText, styles.headerButtonActive]}
              >
                Annuler
              </Text>
            </TouchableOpacity>

            <Text style={styles.title}>Séance</Text>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleCreateSeance}
              disabled={!seanceName.trim()}
            >
              <Text
                style={[
                  styles.headerButtonText,
                  seanceName.trim()
                    ? styles.headerButtonActive
                    : styles.headerButtonInactive,
                ]}
              >
                Créer
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView}>
            <View style={styles.inputContainer}>
              <icons.Tag
                width={24}
                height={24}
                color={colors.primary}
                style={styles.icon}
              />
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
            <View style={styles.buttonCategoryContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => (
                  <Pressable
                    key={category.categorie_exercice_id}
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
                          color: colors.text,
                        },
                      ]}
                    >
                      {category.categorie_exercice_nom}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setModalVisible(true)}
              >
                <icons.Calendar
                  width={24}
                  height={24}
                  color={colors.primary}
                  style={styles.icon}
                />
                <Text style={styles.TextSelect}>{selectedDay}</Text>
              </TouchableOpacity>
            </View>

            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <FlatList
                      data={JOURS_SEMAINE}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => item + index}
                      style={styles.test}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </ScrollView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreationSeance;
