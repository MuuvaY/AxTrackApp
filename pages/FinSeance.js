import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { useTheme } from "../context/ThemeContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import { getExercices } from "../api/Exercice/Exercice";

const FinSeance = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();
  const route = useRoute();
  const { timer } = route.params || {};

  const [totalVolume, setTotalVolume] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [duration, setDuration] = useState("");

  const saveExercises = useCallback(() => {}, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={saveExercises} style={{ paddingRight: 25 }}>
          <Text style={styles.headerBtn}>Valider</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors.primary, fonts.medium]);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timer) {
      setDuration(formatDuration(timer));
    }
  }, [timer]);

  useEffect(() => {
    const calculateTotals = async () => {
      try {
        const exercicesData = await getExercices(route.params?.seanceId);

        let totalWeightLifted = 0;
        let totalVolumeCount = 0;

        exercicesData.forEach((exercice) => {
          exercice.ExerciceSeries.forEach((serie) => {
            const weight = parseFloat(serie.poids) || 0;
            const reps = parseInt(serie.repetitions) || 0;

            totalWeightLifted += weight * reps;
            totalVolumeCount += reps;
          });
        });

        setTotalWeight(Math.round(totalWeightLifted));
        setTotalVolume(totalVolumeCount);
      } catch (error) {
        console.error("Erreur lors du calcul des totaux:", error);
      }
    };

    calculateTotals();
  }, [route.params?.seanceId]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerBtn: {
      color: colors.secondary,
      fontSize: 24,
      fontFamily: fonts.medium,
    },
    headerTitle: {
      color: colors.text,
      fontFamily: fonts.bold,
      fontSize: 30,
      marginTop: "10%",
      marginLeft: "5%",
    },
    separator: {
      height: 1,
      backgroundColor: colors.placeholder,
      marginTop: 20,
      opacity: 0.3,
      marginHorizontal: "5%",
    },
    infoWrapper: {
      paddingHorizontal: "5%",
      marginTop: 20,
    },
    infoLabel: {
      color: colors.primary,
      fontFamily: fonts.bold,
      fontSize: 24,
      marginBottom: 8,
    },
    infoData: {
      color: colors.text,
      fontFamily: fonts.medium,
      fontSize: 24,
    },
    infoRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    infoContainer: {
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
    },
    infoContainerLeft: {
      flexDirection: "column",
      alignItems: "flex-start",
      flex: 1,
    },
    infoContainerCenter: {
      flexDirection: "column",
      alignItems: "center",
      flex: 1,
    },
    infoContainerRight: {
      flexDirection: "column",
      alignItems: "flex-end",
      flex: 1,
    },
    statsContainer: {
      paddingHorizontal: "5%",
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    // statsPair: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   gap: 15,
    // },
    dateWrapper: {
      paddingHorizontal: "5%",
      marginTop: 20,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Récapitulatif de l'entraînement</Text>
      <View style={styles.infoWrapper}>
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <View style={styles.infoContainerLeft}>
              <Text style={styles.infoLabel}>Durée</Text>
              <Text style={styles.infoData}>{duration}</Text>
            </View>
            <View style={styles.infoContainerCenter}>
              <Text style={styles.infoLabel}>Charge soulevée</Text>
              <Text style={styles.infoData}>{totalWeight}kg</Text>
            </View>
            <View style={styles.infoContainerRight}>
              <Text style={styles.infoLabel}>Volume</Text>
              <Text style={styles.infoData}>{totalVolume}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.statsContainer}>
        <View style={styles.statsPair}>
          <Text style={styles.infoLabel}>Date</Text>
          <Text style={styles.infoData}>{duration}</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.statsContainer}>
        <View style={styles.statsPair}>
          <Text style={styles.infoLabel}>Difficulté</Text>
          <Text style={styles.infoData}>-</Text>
        </View>
      </View>
    </View>
  );
};

export default FinSeance;
