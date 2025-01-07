import React, { useState } from "react";
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

  const toggleSession = () => {
    if (sessionActive) {
      Alert.alert("Confirmation", "Voulez-vous vraiment terminer la séance ?", [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Terminer",
          onPress: () => setSessionActive(false),
        },
      ]);
    } else {
      setSessionActive(true);
    }
  };

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
    headerBtnTitle: {
      fontSize: 28,
      fontFamily: fonts.bold,
      color: colors.text,
      // paddingHorizontal: 20,
    },
    headerBtn: {
      height: 2,
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
    headerBtnContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center",
      width: 350,
      marginTop: 20,
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
        <View style={styles.headerBtnContainer}>
          <Text style={styles.headerBtnTitle}>Exercice</Text>
          <TouchableOpacity style={styles.button} onPress={toggleSession}>
            <Text style={styles.buttonText}>
              {sessionActive ? "Terminer" : "Commencer"}
            </Text>
          </TouchableOpacity>
        </View>
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
