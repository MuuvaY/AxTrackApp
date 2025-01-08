import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { icons } from "./../assets/icons/icons";
import { useTheme } from "../context/ThemeContext";
import { useRoute } from "@react-navigation/native";

const Superset = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const route = useRoute();

  const exerciceName = route.params?.exerciceName || "";
  const sets = route.params?.sets || 0;
  const poids = route.params?.poids || 0;
  const reps = route.params?.reps || 0;

  const [exercises, setExercises] = useState([
    {
      name: exerciceName,
      sets: sets,
      poids: poids,
      reps: reps,
    },
  ]);

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: 0, poids: 0, reps: 0 }]);
  };

  const updateExercise = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

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
      color: "white",
      fontSize: 20,
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
                style={[styles.titleInput, index === 0 && { opacity: 0.5 }]}
                placeholder="Nom de l'exercice"
                placeholderTextColor={colors.placeholder}
                keyboardAppearance="dark"
                selectionColor={colors.secondary}
                value={exercise.name}
                editable={index !== 0}
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
                editable={index !== 0}
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
                editable={index !== 0}
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
                editable={index !== 0}
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
