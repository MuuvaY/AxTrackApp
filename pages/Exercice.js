import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native/src";

import { useTheme } from "../context/ThemeContext";
import { getExercices } from "../api/Exercice/Exercice";
import { icons } from "./../assets/icons/icons";

const Exercice = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();
  const route = useRoute();

  const seanceId = route.params?.seanceId;
  const [exercices, setExercices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

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
            setTimer(0);
            navigation.navigate("FinSeance");
          },
        },
      ]);
    } else {
      setSessionActive(true);
    }
  };

  useEffect(() => {
    if (sessionActive) {
      const id = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [sessionActive]);

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
      marginLeft: 20,
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
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
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

        <ScrollView
          contentContainerStyle={[
            styles.exerciceContainer,
            { paddingBottom: 50 },
          ]}
        >
          {isLoading ? (
            <Text style={styles.loadingText}>Chargement des exercices...</Text>
          ) : exercices.length > 0 ? (
            exercices.map((exercice, index) => (
              <TouchableOpacity
                key={exercice.id || index}
                style={styles.exercice}
                onPress={() =>
                  navigation.navigate("ExerciceDetail", { exercice })
                }
              >
                <Text style={styles.exerciceText}>{exercice.nom_exercice}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noSeanceContainer}>
              <Text style={styles.noSeance}>
                Aucun exercice enregistré pour le moment.
              </Text>
            </View>
          )}

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
      </SafeAreaView>
    </View>
  );
};

export default Exercice;
