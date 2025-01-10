import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { icons } from "./../assets/icons/icons";
import { useTheme } from "../context/ThemeContext";
import { useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import { useChronometre } from "../context/ChronometreContext";
import HeaderCarousel from "../components/Carrousel";
import * as Haptics from "expo-haptics";

const ExerciceDetail = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const route = useRoute();

  const { exercice } = route.params || {};
  const [formattedDate, setFormattedDate] = useState(null);
  const { timer } = useChronometre();

  const [sets, setSets] = useState(exercice?.sets || 0);
  const [poids, setPoids] = useState([]);
  const [repetitions, setRepetitions] = useState([]);
  const [checkedSets, setCheckedSets] = useState(Array(sets).fill(false));

  const toggleCheckbox = (index) => {
    const newCheckedSets = [...checkedSets];
    newCheckedSets[index] = !newCheckedSets[index];
    setCheckedSets(newCheckedSets);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  useEffect(() => {
    if (exercice?.date_ajout) {
      const formatted = format(
        new Date(exercice.date_ajout),
        "dd/MM/yyyy 'à' HH:mm"
      );
      setFormattedDate(formatted);
    }

    const initialPoids = Array(sets).fill(exercice?.poids || "");
    const initialRepetitions = Array(sets).fill(exercice?.repetitions || "");
    setPoids(initialPoids);
    setRepetitions(initialRepetitions);
    setCheckedSets(Array(sets).fill(false));
  }, [exercice, sets]);

  const handlePoidsChange = (index, value) => {
    const updatedPoids = [...poids];
    updatedPoids[index] = value;
    setPoids(updatedPoids);
  };

  const handleRepetitionsChange = (index, value) => {
    const updatedRepetitions = [...repetitions];
    updatedRepetitions[index] = value;
    setRepetitions(updatedRepetitions);
  };

  const getBorderColor = (index) => {
    const firstUncheckedIndex = checkedSets.findIndex((checked) => !checked);
    return index === firstUncheckedIndex
      ? colors.primary
      : colors.secondBackground;
  };

  const getTextColor = (index) => {
    const firstUncheckedIndex = checkedSets.findIndex((checked) => !checked);
    if (index < firstUncheckedIndex) {
      return colors.primary;
    } else if (index === firstUncheckedIndex) {
      return colors.primary;
    } else {
      return colors.placeholder;
    }
  };

  const getUnitColor = (index) => {
    const firstUncheckedIndex = checkedSets.findIndex((checked) => !checked);
    if (index <= firstUncheckedIndex) {
      return colors.secondary;
    } else {
      return colors.placeholder;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerTitle: {
      color: colors.background,
      fontFamily: fonts.bold,
      fontSize: 50,
    },
    exerciceTitle: {
      color: colors.secondary,
      fontSize: 22,
      fontFamily: fonts.medium,
      marginVertical: 20,
      marginLeft: 20,
    },
    exerciceDetailsValue: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      marginBottom: 20,
    },
    exerciceContainer: {
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    setLabel: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.secondBackground,
      borderRadius: 5,
      height: 54,
      width: 80,
      borderWidth: 2,
      borderColor: colors.secondBackground,
    },
    setLabelActive: {
      borderColor: colors.primary,
    },
    setNumber: {
      fontFamily: fonts.bold,
      fontSize: 30,
      textAlign: "center",
      minWidth: 30,
    },
    setUnit: {
      fontFamily: fonts.medium,
      fontSize: 18,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.secondBackground,
      borderRadius: 5,
      padding: 10,
      height: 54,
      width: 80,
      borderWidth: 2,
      borderColor: colors.secondBackground,
    },
    inputContainerActive: {
      borderColor: colors.primary,
    },
    input: {
      fontFamily: fonts.bold,
      fontSize: 30,
      padding: 0,
    },
    unit: {
      fontFamily: fonts.medium,
      fontSize: 18,
      marginLeft: 5,
    },
    checkbox: {
      width: 25,
      height: 25,
      borderWidth: 2,
      borderColor: colors.placeholder,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.secondBackground,
    },
    checkedCheckbox: {
      borderColor: colors.primary,
    },
    test: {
      alignContent: "center",
    },
  });

  const renderSet = (index) => {
    const firstUncheckedIndex = checkedSets.findIndex((checked) => !checked);
    const isActive = index === firstUncheckedIndex;
    const textColor = getTextColor(index);
    const unitColor = getUnitColor(index);

    return (
      <View key={index} style={styles.exerciceDetailsValue}>
        <View style={[styles.setLabel, isActive && styles.setLabelActive]}>
          <Text style={[styles.setNumber, { color: textColor }]}>
            {index + 1}
          </Text>
          <Text style={[styles.setUnit, { color: unitColor }]}>set</Text>
        </View>

        <View
          style={[
            styles.inputContainer,
            isActive && styles.inputContainerActive,
          ]}
        >
          <TextInput
            style={[styles.input, { color: textColor }]}
            value={String(poids[index])}
            onChangeText={(value) => handlePoidsChange(index, value)}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.placeholder}
            keyboardAppearance="dark"
            selectionColor={"#FF6B4A"}
            editable={!checkedSets[index]}
          />
          <Text style={[styles.unit, { color: unitColor }]}>kg</Text>
        </View>

        <View
          style={[
            styles.inputContainer,
            isActive && styles.inputContainerActive,
          ]}
        >
          <TextInput
            style={[styles.input, { color: textColor }]}
            value={String(repetitions[index])}
            onChangeText={(value) => handleRepetitionsChange(index, value)}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={colors.placeholder}
            keyboardAppearance="dark"
            selectionColor={"#FF6B4A"}
            editable={!checkedSets[index]}
          />
          <Text style={[styles.unit, { color: unitColor }]}>reps</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.checkbox,
            checkedSets[index] && styles.checkedCheckbox,
          ]}
          onPress={() => toggleCheckbox(index)}
        >
          {checkedSets[index] && (
            <icons.Check width={20} height={20} color={colors.primary} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderCarousel
          exercice={exercice}
          formattedDate={formattedDate}
          timer={timer}
          theme={theme}
        />
        <ScrollView style={styles.test}>
          <Text style={styles.exerciceTitle}>{exercice?.nom_exercice}</Text>
          <View style={styles.exerciceContainer}>
            {Array.from({ length: sets }).map((_, index) => renderSet(index))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ExerciceDetail;
