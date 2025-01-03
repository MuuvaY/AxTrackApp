import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { icons } from "./../assets/icons/icons";

import CustomSwitch from "../components/CustomSwitch";

const CreationExercice = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();
  const [exerciceName, setExerciceName] = useState("");
  const [isTimed, setIsTimed] = useState(false);
  const [requiresPoulie, setRequiresPoulie] = useState(false);
  const [requiresBanc, setRequiresBanc] = useState(false);
  const [requiresDossier, setRequiresDossier] = useState(false);
  const [requiresThoracique, setRequiresThoracique] = useState(false);
  const [requiresAssise, setRequiresAssise] = useState(false);
  const [isCustomInputVisible, setIsCustomInputVisible] = useState(false);
  const [customInputValue, setCustomInputValue] = useState("");

  const handleToggleSwitch = () => {
    setIsCustomInputVisible(!isCustomInputVisible);
  };

  const [exercise, setExercise] = useState();
  const [sets, setSets] = useState();
  const [weight, setWeight] = useState();
  const [reps, setReps] = useState();

  const handleSaveExercice = () => {
    console.log("Exercice enregistré :", exerciceName);
    navigation.goBack();
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
      marginLeft: 30,
    },
    value: {
      color: colors.secondary,
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
            disabled={!exerciceName.trim()}
          >
            <Text
              style={[
                styles.headerButtonText,
                exerciceName.trim()
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
            <CustomSwitch
              label="Dégressif"
              value={isTimed}
              onValueChange={setIsTimed}
              IconComponent={icons.ArrowDownStat}
            />
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

            <View style={styles.priseContainer}>
              <icons.Hand
                width={24}
                height={24}
                color={colors.primary}
                style={styles.iconSuperset}
              />
              <Text style={styles.priseText}>Prise</Text>
              <Switch
                value={isCustomInputVisible}
                onValueChange={handleToggleSwitch}
                trackColor={{ false: colors.primary, true: colors.secondary }}
                thumbColor={colors.text}
              />
            </View>

            {isCustomInputVisible && (
              <TextInput
                style={styles.input}
                placeholder="Entrez la valeur personnalisée"
                placeholderTextColor={colors.placeholder}
                value={customInputValue}
                onChangeText={setCustomInputValue}
              />
            )}

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
