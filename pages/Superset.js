import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { icons } from "./../assets/icons/icons";
import { useTheme } from "../context/ThemeContext";
import { useRoute, useNavigation } from "@react-navigation/native";

const Superset = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const route = useRoute();
  const navigation = useNavigation();

  const baseExercise = {
    name: route.params?.exerciceName || "",
    sets: route.params?.sets || 0,
    poids: route.params?.poids || 0,
    reps: route.params?.reps || 0,
  };

  const [exercises, setExercises] = useState([]);

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", poids: "", reps: "" }]);
  };

  const updateExercise = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const onSave = route.params?.onSave;

  const saveExercises = useCallback(() => {
    if (!validateExercises()) {
      Alert.alert(
        "Erreur",
        "Veuillez remplir tous les champs pour chaque exercice"
      );
      return;
    }

    if (onSave) {
      onSave(exercises);
    }
    navigation.goBack();
  }, [onSave, exercises, navigation]);

  const validateExercises = () => {
    for (let exercise of exercises) {
      const { name, sets, poids, reps } = exercise;
      if (!name?.trim() || !sets || !poids || !reps) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={saveExercises} style={{ paddingRight: 25 }}>
          <Text style={styles.headerBtn}>OK</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, saveExercises, colors.primary, fonts.medium]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    containerInput: {
      backgroundColor: colors.secondBackground,
      width: 355,
      height: 212,
      marginBottom: 20,
      borderRadius: 5,
      padding: 15,
    },
    exerciceContainer: {
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
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
      width: 60,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    addButton: {
      backgroundColor: colors.primary,
      padding: 15,
      alignItems: "center",
      borderRadius: 5,
      marginTop: 20,
    },
    addButtonText: {
      color: colors.background,
      fontSize: 20,
      fontFamily: fonts.medium,
    },
    headerBtn: {
      color: colors.secondary,
      fontSize: 30,
      fontFamily: fonts.medium,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.exerciceContainer,
          { paddingBottom: 100 },
        ]}
      >
        <View style={styles.containerInput}>
          <View style={styles.labelContainer}>
            <icons.Weight
              width={24}
              height={24}
              color={colors.primary}
              style={styles.icon}
            />
            <TextInput
              style={[styles.titleInput, { opacity: 0.5 }]}
              value={baseExercise.name}
              placeholder="Nom de l'exercice"
              editable={false}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Nombre de set</Text>
            <TextInput
              style={styles.value}
              value={String(baseExercise.sets)}
              editable={false}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Poids (kg)</Text>
            <TextInput
              style={styles.value}
              value={String(baseExercise.poids)}
              editable={false}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Nombre de reps</Text>
            <TextInput
              style={styles.value}
              value={String(baseExercise.reps)}
              editable={false}
            />
          </View>
        </View>
        {/* Afficher les supersets ajoutés */}
        {exercises.map((exercise, index) => (
          <View key={index} style={styles.containerInput}>
            <View style={styles.labelContainer}>
              <icons.Weight
                width={24}
                height={24}
                color={colors.primary}
                style={styles.icon}
              />
              <TextInput
                style={styles.titleInput}
                placeholder={`Superset ${index + 1}`}
                placeholderTextColor={colors.placeholder}
                keyboardAppearance="dark"
                selectionColor={colors.secondary}
                value={exercise.name}
                onChangeText={(text) => updateExercise(index, "name", text)}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Nombre de set</Text>
              <TextInput
                style={styles.value}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.placeholder}
                keyboardAppearance="dark"
                selectionColor={colors.secondary}
                value={String(exercise.sets)}
                onChangeText={(text) =>
                  updateExercise(index, "sets", parseInt(text) || 0)
                }
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Poids (kg)</Text>
              <TextInput
                style={styles.value}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.placeholder}
                keyboardAppearance="dark"
                selectionColor={colors.secondary}
                value={String(exercise.poids)}
                onChangeText={(text) =>
                  updateExercise(index, "poids", parseInt(text) || 0)
                }
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Nombre de reps</Text>
              <TextInput
                style={styles.value}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.placeholder}
                keyboardAppearance="dark"
                selectionColor={colors.secondary}
                value={String(exercise.reps)}
                onChangeText={(text) =>
                  updateExercise(index, "reps", parseInt(text) || 0)
                }
              />
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={addExercise} style={styles.addButton}>
          <Text style={styles.addButtonText}>Ajouter un exercice</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Superset;
