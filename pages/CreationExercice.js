import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Animated,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { icons } from "./../assets/icons/icons";

import CustomSwitch from "../components/CustomSwitch";
import { createExercice } from "../api/Exercice/Exercice";
import { createDegressif } from "../api/Exercice/Degressif";

const CreationExercice = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();
  const route = useRoute();
  const seanceId = route.params?.seanceId;

  const [exerciceName, setExerciceName] = useState("");
  const [isTimed, setIsTimed] = useState(false);
  const [requiresPoulie, setRequiresPoulie] = useState(false);
  const [requiresBanc, setRequiresBanc] = useState(false);
  const [requiresDossier, setRequiresDossier] = useState(false);
  const [requiresThoracique, setRequiresThoracique] = useState(false);
  const [requiresAssise, setRequiresAssise] = useState(false);
  const [isCustomInputVisible, setIsCustomInputVisible] = useState(false);
  const [customInputValue, setCustomInputValue] = useState("");

  const [isDegressive, setIsDegressive] = useState(false);
  const [isPriseVisible, setIsPriseVisible] = useState(false);

  const degresiveHeight = useRef(new Animated.Value(0)).current;
  const priseHeight = useRef(new Animated.Value(0)).current;

  const [degressiveWeight, setDegressiveWeight] = useState(weight);
  const [degressiveReps, setDegressiveReps] = useState(reps);

  useEffect(() => {
    Animated.timing(degresiveHeight, {
      toValue: isDegressive ? 150 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isDegressive]);

  useEffect(() => {
    Animated.timing(priseHeight, {
      toValue: isPriseVisible ? 54 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isPriseVisible]);

  const [exercise, setExercise] = useState();
  const [sets, setSets] = useState();
  const [weight, setWeight] = useState();
  const [reps, setReps] = useState();

  // const handleSaveExercice = async () => {
  //   try {
  //     if (!exercise || !sets || !weight || !reps) {
  //       Alert.alert("Erreur", "Veuillez remplir tous les champs");
  //       return;
  //     }

  //     const exercice = await createExercice(
  //       seanceId,
  //       exercise,
  //       parseInt(sets),
  //       parseFloat(weight),
  //       parseInt(reps),
  //       isDegressive
  //     );

  //     console.log("Exercice créé avec succès:", exercice);
  //     navigation.goBack();
  //   } catch (error) {
  //     Alert.alert(
  //       "Erreur",
  //       "Une erreur est survenue lors de la création de l'exercice"
  //     );
  //     console.error(error);
  //   }
  // };

  const handleSaveExercice = async () => {
    try {
      // Vérifier si tous les champs requis sont remplis
      if (!exercise || !sets || !weight || !reps) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs");
        return;
      }

      // Vérifier si le mode dégressif est activé et les valeurs dégressives sont présentes
      if (isDegressive && (!degressiveWeight || !degressiveReps || !sets)) {
        Alert.alert("Erreur", "Veuillez remplir tous les champs dégressifs");
        return;
      }

      // Créer l'exercice
      const exercice = await createExercice(
        seanceId,
        exercise,
        parseInt(sets),
        parseFloat(weight),
        parseInt(reps),
        isDegressive,
        isDegressive ? parseInt(sets) : null, // Séries dégressives (si activé)
        isDegressive ? parseFloat(degressiveWeight) : null, // Poids dégressif (si activé)
        isDegressive ? parseInt(degressiveReps) : null // Répétitions dégressives (si activé)
      );

      console.log("Exercice créé avec succès:", exercice);
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la création de l'exercice"
      );
      console.error(error);
    }
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
      marginTop: 30,
      marginBottom: 20,
    },
    title: {
      color: colors.primary,
      fontSize: 34,
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
    containerInput: {
      backgroundColor: colors.secondBackground,
      width: 355,
      height: 212,
      marginBottom: 20,
      borderRadius: 5,
    },
    exerciceContainer: {
      paddingHorizontal: 20,
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    rowDegressif: {
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 10,
      backgroundColor: colors.secondBackground,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      height: 150,
    },
    rowDegressifItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 10,
    },
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 15,
      marginTop: 10,
      marginBottom: 10,
      width: 355,
    },
    icon: {
      marginRight: 10,
    },
    titleInput: {
      color: colors.text,
      fontSize: 30,
      fontFamily: fonts.medium,
      width: 300,
    },
    label: {
      color: colors.placeholder,
      fontSize: 24,
      fontFamily: fonts.medium,
      marginLeft: 10,
    },
    value: {
      color: colors.secondary,
      fontFamily: fonts.medium,
      fontSize: 30,
      textAlign: "center",
      marginRight: 15,
      width: 60,
    },
    labelDegressif: {
      color: colors.text,
      fontSize: 24,
      fontFamily: fonts.medium,
      marginLeft: 10,
    },
    labelDegressifPlaceholder: {
      color: colors.placeholder,
      fontSize: 24,
      fontFamily: fonts.medium,
      marginLeft: 10,
    },
    valueDegressif: {
      color: colors.secondary,
      fontFamily: fonts.medium,
      fontSize: 30,
      textAlign: "center",
      marginRight: 15,
      width: 60,
    },
    valueDegressifPlaceholder: {
      color: colors.placeholder,
      fontFamily: fonts.medium,
      fontSize: 30,
      textAlign: "center",
      marginRight: 15,
      width: 60,
    },
    containerSwitch: {
      width: 355,
      marginBottom: 20,
    },
    containerNavigation: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      backgroundColor: colors.secondBackground,
      height: 54,
      width: 355,
      borderRadius: 5,
      paddingRight: 15,
    },
    supersetContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    textNavigation: {
      fontFamily: fonts.medium,
      color: colors.text,
      fontSize: 30,
      paddingLeft: 45,
    },
    iconSuperset: {
      position: "absolute",
      left: 10,
    },

    input: {
      backgroundColor: colors.secondBackground,
      borderRadius: 5,
      height: 54,
      fontSize: 28,
      color: colors.text,
      letterSpacing: 2,
      fontFamily: fonts.medium,
      paddingLeft: 45,
      borderColor: "transparent",
      justifyContent: "center",
    },
    priseContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 54,
      backgroundColor: colors.secondBackground,
      borderRadius: 5,
      marginBottom: 20,
      paddingRight: 15,
    },
    priseText: {
      fontFamily: fonts.medium,
      fontSize: 30,
      color: colors.text,
      paddingLeft: 45,
    },

    expandableContainer: {
      overflow: "hidden",
      marginBottom: 20,
    },
    expandablePriseContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 54,
      backgroundColor: colors.secondBackground,
      paddingRight: 15,
    },
    expandableInput: {
      backgroundColor: colors.secondBackground,
      height: 54,
      fontSize: 28,
      color: colors.secondary,
      letterSpacing: 2,
      fontFamily: fonts.medium,
      paddingLeft: 15,
      borderColor: "transparent",
      justifyContent: "center",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.headerButtonText, styles.headerButtonActive]}>
              Annuler
            </Text>
          </TouchableOpacity>

          <Text style={styles.title}>Nouvel Exercice</Text>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleSaveExercice}
            disabled={!exercise?.trim() || !sets || !weight || !reps}
          >
            <Text
              style={[
                styles.headerButtonText,
                exercise?.trim() && sets && weight && reps
                  ? styles.headerButtonActive
                  : styles.headerButtonInactive,
              ]}
            >
              Créer
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.exerciceContainer,
            { paddingBottom: 100 },
          ]}
        >
          <View>
            <View style={styles.containerInput}>
              <View style={styles.labelContainer}>
                <icons.Weight
                  width={24}
                  height={24}
                  color={colors.primary}
                  style={styles.icon}
                />
                <TextInput
                  style={styles.titleInput}
                  value={exercise}
                  onChangeText={setExercise}
                  placeholder="Nom de l'exercice"
                  placeholderTextColor={colors.placeholder}
                  keyboardAppearance="dark"
                  selectionColor={colors.secondary}
                />
              </View>

              <View style={styles.row}>
                <TextInput
                  style={styles.label}
                  editable={false}
                  value="Nombre de set"
                  placeholderTextColor={colors.placeholder}
                />
                <TextInput
                  style={styles.value}
                  value={sets}
                  onChangeText={setSets}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={colors.placeholder}
                  keyboardAppearance="dark"
                  selectionColor={colors.secondary}
                />
              </View>

              <View style={styles.row}>
                <TextInput
                  style={styles.label}
                  editable={false}
                  value="Poids (kg)"
                />
                <TextInput
                  style={styles.value}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={colors.placeholder}
                  keyboardAppearance="dark"
                  selectionColor={colors.secondary}
                />
              </View>

              <View style={styles.row}>
                <TextInput
                  style={styles.label}
                  editable={false}
                  value="Nombre de reps"
                />
                <TextInput
                  style={styles.value}
                  value={reps}
                  onChangeText={setReps}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={colors.placeholder}
                  keyboardAppearance="dark"
                  selectionColor={colors.secondary}
                />
              </View>
            </View>
          </View>

          <View style={styles.containerSwitch}>
            <View style={styles.expandableContainer}>
              <View
                style={[
                  styles.priseContainer,
                  {
                    borderRadius: 5,
                    borderBottomLeftRadius: isDegressive ? 0 : 5,
                    borderBottomRightRadius: isDegressive ? 0 : 5,
                    marginBottom: 0,
                  },
                ]}
              >
                <icons.ArrowDownStat
                  width={24}
                  height={24}
                  color={colors.primary}
                  style={styles.iconSuperset}
                />
                <Text style={styles.priseText}>Dégressif</Text>
                <Switch
                  value={isDegressive}
                  onValueChange={setIsDegressive}
                  trackColor={{ false: colors.primary, true: colors.secondary }}
                  thumbColor={colors.text}
                />
              </View>
              <Animated.View style={{ height: degresiveHeight }}>
                <View style={styles.rowDegressif}>
                  <View style={styles.rowDegressifItem}>
                    <TextInput
                      style={styles.labelDegressifPlaceholder}
                      editable={false}
                      value="Nombre de set"
                      placeholderTextColor={colors.placeholder}
                    />
                    <TextInput
                      style={styles.valueDegressifPlaceholder}
                      value={sets}
                      onChangeText={setSets}
                      editable={false}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor={colors.placeholder}
                      keyboardAppearance="dark"
                      selectionColor={colors.secondary}
                    />
                  </View>

                  <View style={styles.rowDegressifItem}>
                    <TextInput
                      style={styles.labelDegressif}
                      editable={false}
                      value="Poids (kg)"
                    />
                    <TextInput
                      style={styles.valueDegressif}
                      value={degressiveWeight}
                      onChangeText={setDegressiveWeight}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor={colors.placeholder}
                      keyboardAppearance="dark"
                      selectionColor={colors.secondary}
                    />
                  </View>

                  <View style={styles.rowDegressifItem}>
                    <TextInput
                      style={styles.labelDegressif}
                      editable={false}
                      value="Nombre de reps"
                    />
                    <TextInput
                      style={styles.valueDegressif}
                      value={degressiveReps}
                      onChangeText={setDegressiveReps}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor={colors.placeholder}
                      keyboardAppearance="dark"
                      selectionColor={colors.secondary}
                    />
                  </View>
                </View>

                {/* </View> */}
              </Animated.View>
            </View>
            <View style={styles.navigation}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ExerciceDetail")}
                style={styles.containerNavigation}
              >
                <View style={styles.supersetContainer}>
                  <icons.Zap
                    width={24}
                    height={24}
                    color={colors.primary}
                    style={styles.iconSuperset}
                  />

                  <Text style={styles.textNavigation}>Superset</Text>
                  <icons.ChevronRight
                    width={24}
                    height={24}
                    color={colors.placeholder}
                    style={styles.icon2}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.expandableContainer}>
              <View
                style={[
                  styles.priseContainer,
                  {
                    borderRadius: 5,
                    borderBottomLeftRadius: isCustomInputVisible ? 0 : 5,
                    borderBottomRightRadius: isCustomInputVisible ? 0 : 5,
                    marginBottom: 0,
                  },
                ]}
              >
                <icons.Hand
                  width={24}
                  height={24}
                  color={colors.primary}
                  style={styles.iconSuperset}
                />
                <Text style={styles.priseText}>Prise</Text>
                <Switch
                  value={isPriseVisible}
                  onValueChange={setIsPriseVisible}
                  trackColor={{ false: colors.primary, true: colors.secondary }}
                  thumbColor={colors.text}
                />
              </View>
              <Animated.View style={{ height: priseHeight }}>
                <TextInput
                  style={styles.expandableInput}
                  placeholder="Type de prise "
                  placeholderTextColor={colors.placeholder}
                  value={customInputValue}
                  onChangeText={setCustomInputValue}
                  keyboardAppearance="dark"
                  selectionColor={colors.secondary}
                />
              </Animated.View>
            </View>

            <CustomSwitch
              label="Réglage Poulie"
              value={requiresPoulie}
              onValueChange={setRequiresPoulie}
              IconComponent={icons.Settings}
            />
            <CustomSwitch
              label="Réglage Banc"
              value={requiresBanc}
              onValueChange={setRequiresBanc}
              IconComponent={icons.Settings}
            />
            <CustomSwitch
              label="Réglage Dossier"
              value={requiresDossier}
              onValueChange={setRequiresDossier}
              IconComponent={icons.Settings}
            />
            <CustomSwitch
              label="Réglage Thoracique"
              value={requiresThoracique}
              onValueChange={setRequiresThoracique}
              IconComponent={icons.Settings}
            />
            <CustomSwitch
              label="Réglage Assise"
              value={requiresAssise}
              onValueChange={setRequiresAssise}
              IconComponent={icons.Settings}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CreationExercice;
