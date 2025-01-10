import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native/src";

import { useTheme } from "../context/ThemeContext";
import { getExercices } from "../api/Exercice/Exercice";
import { icons } from "./../assets/icons/icons";
import { useChronometre } from "../context/ChronometreContext";

const Exercice = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();
  const route = useRoute();

  const seanceId = route.params?.seanceId;
  const [exercices, setExercices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  // const [timer, setTimer] = useState(0);
  // const [intervalId, setIntervalId] = useState(null);
  const { timer, startTimer, resetTimer } = useChronometre();
  const intervalId = useRef(null);

  const toggleSession = () => {
    if (sessionActive) {
      Alert.alert("Confirmation", "Voulez-vous vraiment terminer la séance ?", [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Terminer",
          onPress: () => {
            setSessionActive(false);
            clearInterval(intervalId);
            const id = setInterval(startTimer, 1000);
            navigation.navigate("FinSeance");
            setIntervalId(id);
          },
        },
      ]);
    } else {
      setSessionActive(true);
    }
  };

  useEffect(() => {
    if (sessionActive) {
      // Démarrer un nouvel intervalle si la session est active
      intervalId.current = setInterval(() => {
        startTimer();
      }, 1000);
    } else {
      clearInterval(intervalId.current); // Arrêter l'intervalle quand la session est terminée
    }

    return () => {
      clearInterval(intervalId.current); // Nettoyage lors du démontage du composant
    };
  }, [sessionActive, startTimer]);

  const fetchExercices = async () => {
    if (!seanceId) return;
    try {
      const data = await getExercices(seanceId);
      setExercices(data);
    } catch (err) {
      Alert.alert("Erreur", "Impossible de récupérer les exercices.");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchExercices();
    }, [seanceId])
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerBtnContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
      marginTop: 30,
      width: 350,
    },
    headerBtnTitle: {
      fontSize: 28,
      fontFamily: fonts.bold,
      color: colors.text,
    },
    timerText: {
      color: colors.primary,
      fontFamily: fonts.bold,
      fontSize: 28,
      marginTop: 10,
      textAlign: "left",
      width: 350,
      alignSelf: "center",
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      alignItems: "center",
      paddingHorizontal: 10,
      height: 38,
    },
    buttonText: {
      color: colors.background,
      fontFamily: fonts.bold,
      fontSize: 28,
    },
    exerciceListContainer: {
      // Nouveau conteneur pour la liste d'exercices
      paddingTop: 10,
      alignItems: "center",
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
    },
    buttonContainer: {
      marginTop: 20,
      backgroundColor: colors.primary,
      height: 52,
      width: 52,
      borderRadius: 7,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      color: colors.background,
    },
    noExerciceContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    noExercice: {
      fontSize: 40,
      fontFamily: fonts.medium,
      color: colors.placeholder,
      margin: 20,
      textAlign: "center",
    },
    image: {
      opacity: 0.5,
    },
    contentContainer: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.contentContainer}>
          {isLoading ? (
            <View style={styles.noExerciceContainer}>
              <Text>Chargement des exercices...</Text>
            </View>
          ) : exercices.length > 0 ? (
            <ScrollView
              contentContainerStyle={styles.exerciceListContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.headerBtnContainer}>
                <Text style={styles.headerBtnTitle}>Exercice</Text>
                <TouchableOpacity style={styles.button} onPress={toggleSession}>
                  <Text style={styles.buttonText}>
                    {sessionActive ? "Terminer" : "Commencer"}
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.timerText}>
                {Math.floor(timer / 60)}:
                {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
              </Text>
              {exercices.map((exercice, index) => (
                <TouchableOpacity
                  key={exercice.id || index}
                  style={styles.exercice}
                  onPress={() =>
                    navigation.navigate("ExerciceDetail", { exercice, timer })
                  }
                >
                  <Text style={styles.exerciceText}>
                    {exercice.nom_exercice}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  navigation.navigate("CreationExercice", { seanceId })
                }
              >
                <icons.Plus
                  width={30}
                  height={30}
                  color={colors.primary}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <View style={styles.noExerciceContainer}>
              <Image
                style={styles.image}
                source={require("../assets/img/DumbellCross.webp")}
              />
              <Text style={styles.noExercice}>
                Aucun exercice enregistré pour le moment.
              </Text>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  navigation.navigate("CreationExercice", { seanceId })
                }
              >
                <icons.Plus
                  width={30}
                  height={30}
                  color={colors.primary}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Exercice;
