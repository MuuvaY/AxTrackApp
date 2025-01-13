import React, { useEffect, useState, useMemo } from "react";
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
import { updateExercice } from "../api/Exercice/Exercice";
import debounce from "lodash/debounce";

const ExerciceDetail = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const route = useRoute();

  const { exercice, degressifs } = route.params || {};
  const [formattedDate, setFormattedDate] = useState(null);
  const { timer } = useChronometre();

  const [series, setSeries] = useState([]);
  const [checkedSets, setCheckedSets] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [degressifsInputValues, setDegressifsInputValues] = useState({});
  const [localDegressifs, setLocalDegressifs] = useState(degressifs || []);

  useEffect(() => {
    if (degressifs) {
      setLocalDegressifs(degressifs);
    }
  }, [degressifs]);

  // const debouncedUpdate = useMemo(
  //   () =>
  //     debounce(async (updatedData) => {
  //       try {
  //         setIsUpdating(true);

  //         // S'assurer que les dégressifs sont correctement formatés
  //         const formattedDegressifs = updatedData.degressifs.map(
  //           (degressif, index) => ({
  //             series_degressif: index + 1,
  //             poids_degressifs: degressif.poids_degressifs || "0",
  //             reps_degressifs: degressif.reps_degressifs || "0",
  //           })
  //         );

  //         const dataToUpdate = {
  //           ...updatedData,
  //           degressifs: formattedDegressifs,
  //         };

  //         console.log("Données envoyées à l'API:", dataToUpdate);
  //         await updateExercice(
  //           exercice.seance_id,
  //           exercice.exercice_id,
  //           dataToUpdate
  //         );
  //       } catch (error) {
  //         console.error("Erreur lors de la mise à jour:", error);
  //       } finally {
  //         setIsUpdating(false);
  //       }
  //     }, 300),
  //   [exercice]
  // );

  const debouncedUpdate = useMemo(
    () =>
      debounce(async (updatedData) => {
        try {
          setIsUpdating(true);

          // Ajouter une vérification
          const formattedDegressifs = updatedData.degressifs
            ? updatedData.degressifs.map((degressif, index) => ({
                series_degressif: index + 1,
                poids_degressifs: degressif.poids_degressifs || "0",
                reps_degressifs: degressif.reps_degressifs || "0",
              }))
            : [];

          const dataToUpdate = {
            ...updatedData,
            degressifs: formattedDegressifs,
          };

          console.log("Données envoyées à l'API:", dataToUpdate);
          await updateExercice(
            exercice.seance_id,
            exercice.exercice_id,
            dataToUpdate
          );
        } catch (error) {
          console.error("Erreur lors de la mise à jour:", error);
        } finally {
          setIsUpdating(false);
        }
      }, 300),
    [exercice]
  );
  useEffect(() => {
    console.log("Exercice reçu:", exercice, degressifs);
    if (exercice?.date_ajout) {
      const formatted = format(
        new Date(exercice.date_ajout),
        "dd/MM/yyyy 'à' HH:mm"
      );
      setFormattedDate(formatted);
    }

    if (exercice?.ExerciceSeries) {
      setSeries(exercice.ExerciceSeries);
      setCheckedSets(Array(exercice.ExerciceSeries.length).fill(false));
    }
  }, [exercice]);

  const toggleCheckbox = (index) => {
    const newCheckedSets = [...checkedSets];
    newCheckedSets[index] = !newCheckedSets[index];
    setCheckedSets(newCheckedSets);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const formatPoids = (poids) => {
    if (!poids) return "";
    // Convertit le point en virgule pour l'affichage
    const displayValue = String(poids).replace(".", ",");
    // Supprime les zéros inutiles après la virgule
    return displayValue.replace(/,0+$/, "");
  };

  const handlePoidsChange = (index, value) => {
    if (value.replace(/[.,]/g, "").length > 5) return;

    const sanitizedValue = value.replace(/[^0-9.,]/g, "");
    const dbValue = sanitizedValue.replace(",", ".");

    const updatedSeries = [...series];
    updatedSeries[index] = {
      ...updatedSeries[index],
      poids: dbValue || 0,
    };
    setSeries(updatedSeries);

    const updatedData = {
      exercice_id: exercice.exercice_id,
      seance_id: exercice.seance_id,
      nom_exercice: exercice.nom_exercice,
      degressif_active: exercice.degressif_active,
      ExerciceSeries: updatedSeries.map((serie) => ({
        serie_id: serie.serie_id,
        exercice_id: serie.exercice_id,
        numero_serie: serie.numero_serie,
        poids: serie.poids,
        repetitions: serie.repetitions,
      })),
      degressifs: localDegressifs,
    };

    debouncedUpdate(updatedData);
  };
  const handleRepetitionsChange = (index, value) => {
    if (value.length > 5) return;

    const updatedSeries = [...series];
    updatedSeries[index] = {
      ...updatedSeries[index],
      repetitions: parseInt(value) || 0,
    };
    setSeries(updatedSeries);

    const updatedData = {
      exercice_id: exercice.exercice_id,
      seance_id: exercice.seance_id,
      nom_exercice: exercice.nom_exercice,
      degressif_active: exercice.degressif_active,
      ExerciceSeries: updatedSeries.map((serie) => ({
        serie_id: serie.serie_id,
        exercice_id: serie.exercice_id,
        numero_serie: serie.numero_serie,
        poids: serie.poids,
        repetitions: serie.repetitions,
      })),
    };

    debouncedUpdate(updatedData);
  };

  const handleDegressifPoidsChange = (index, value) => {
    console.log("Valeur saisie:", value);

    if (value.replace(/[.,]/g, "").length > 5) return;

    const sanitizedValue = value.replace(/[^0-9.,]/g, "");
    const dbValue = sanitizedValue.replace(",", ".");
    console.log("Valeur formatée:", dbValue);

    const updatedDegressifs = [...localDegressifs];
    updatedDegressifs[index] = {
      ...updatedDegressifs[index],
      poids_degressifs: dbValue || 0,
      series_degressif: index + 1,
    };
    setLocalDegressifs(updatedDegressifs);

    console.log("État local mis à jour:", updatedDegressifs);

    const updatedData = {
      exercice_id: exercice.exercice_id,
      seance_id: exercice.seance_id,
      nom_exercice: exercice.nom_exercice,
      degressif_active: exercice.degressif_active,
      ExerciceSeries: series,
      degressifs: updatedDegressifs.map((d, i) => ({
        poids_degressifs: d.poids_degressifs,
        reps_degressifs: d.reps_degressifs,
        series_degressif: i + 1,
      })),
    };

    debouncedUpdate(updatedData);
  };

  const handleDegressifRepsChange = (index, value) => {
    console.log("Valeur saisie (reps):", value);
    if (value.length > 5) return;

    const updatedDegressifs = [...localDegressifs];
    updatedDegressifs[index] = {
      ...updatedDegressifs[index],
      reps_degressifs: parseInt(value) || 0,
      series_degressif: index + 1,
    };

    setLocalDegressifs(updatedDegressifs);
    console.log("État local mis à jour (reps):", updatedDegressifs);

    const updatedData = {
      exercice_id: exercice.exercice_id,
      seance_id: exercice.seance_id,
      nom_exercice: exercice.nom_exercice,
      degressif_active: exercice.degressif_active,
      ExerciceSeries: series,
      degressifs: updatedDegressifs.map((d, i) => ({
        poids_degressifs: d.poids_degressifs,
        reps_degressifs: d.reps_degressifs,
        series_degressif: i + 1,
      })),
    };

    debouncedUpdate(updatedData);
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
      // marginBottom: 20,
    },
    inputContainerDegressif: {
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
    inputContainerMargin: {
      marginBottom: 20,
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
      alignSelf: "center",
    },
    checkedCheckbox: {
      borderColor: colors.primary,
    },
    checkboxContainer: {
      height: "100%",
      justifyContent: "center",
    },
    test: {
      alignContent: "center",
    },
    setLabelContainer: {
      alignSelf: "flex-start",
    },

    exerciceDetailsValue: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 20,
      marginBottom: 20,

      // height: "100%",
      // marginBottom: 30,
      // position: "relative",
    },
    test: {
      height: "100%",
    },
    bonjour: {
      // marginBottom: 20,
    },
  });

  const renderSet = (serie, index) => {
    const firstUncheckedIndex = checkedSets.findIndex((checked) => !checked);
    const isActive = index === firstUncheckedIndex;
    const textColor = getTextColor(index);
    const unitColor = getUnitColor(index);

    const hasDegressifs =
      degressifs && degressifs.length > 0 && degressifs[index];

    return (
      <View key={serie.serie_id} style={styles.exerciceDetailsValue}>
        {/* Numéro de set */}
        <View style={styles.setLabelContainer}>
          <View style={[styles.setLabel, isActive && styles.setLabelActive]}>
            <Text style={[styles.setNumber, { color: textColor }]}>
              {serie.numero_serie}
            </Text>
            <Text style={[styles.setUnit, { color: unitColor }]}>set</Text>
          </View>
        </View>

        {/* Poids principal */}
        <View style={styles.test}>
          {/* <View
            style={[
              styles.inputContainer,
              isActive && styles.inputContainerActive,
            ]}
          > */}
          <View
            style={[
              styles.inputContainer,
              exercice.degressif_active && styles.inputContainerMargin,
              isActive && styles.inputContainerActive,
            ]}
          >
            <TextInput
              style={[styles.input, { color: textColor }]}
              value={formatPoids(serie.poids)}
              maxLength={7}
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

          {/* Affichage conditionnel des dégressifs */}
          {hasDegressifs && localDegressifs[index] && (
            <View style={styles.bonjour}>
              <View
                style={[
                  styles.inputContainerDegressif,
                  isActive && styles.inputContainerActive,
                ]}
              >
                <TextInput
                  style={[styles.input, { color: textColor }]}
                  value={
                    degressifsInputValues[`poids_${index}`] !== undefined
                      ? degressifsInputValues[`poids_${index}`]
                      : formatPoids(localDegressifs[index]?.poids_degressifs)
                  }
                  maxLength={7}
                  onChangeText={(value) =>
                    handleDegressifPoidsChange(index, value)
                  }
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={colors.placeholder}
                  keyboardAppearance="dark"
                  selectionColor={"#FF6B4A"}
                  editable={!checkedSets[index]}
                />
                <Text style={[styles.unit, { color: unitColor }]}>kg</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.test}>
          {/* Répétitions principales */}
          {/* <View
            style={[
              styles.inputContainer,
              isActive && styles.inputContainerActive,
            ]}
          > */}
          <View
            style={[
              styles.inputContainer,
              exercice.degressif_active && styles.inputContainerMargin,
              isActive && styles.inputContainerActive,
            ]}
          >
            <TextInput
              style={[styles.input, { color: textColor }]}
              value={String(serie.repetitions)}
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

          {/* Affichage conditionnel des répétitions dégressives */}
          {hasDegressifs && (
            // <View
            //   style={[
            //     styles.inputContainerDegressif,
            //     isActive && styles.inputContainerActive,
            //   ]}
            // >
            <View
              style={[
                styles.inputContainerDegressif,
                isActive && styles.inputContainerActive,
              ]}
            >
              <TextInput
                style={[styles.input, { color: textColor }]}
                value={String(localDegressifs[index]?.reps_degressifs || "")}
                onChangeText={(value) =>
                  handleDegressifRepsChange(index, value)
                }
                maxLength={7}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={colors.placeholder}
                keyboardAppearance="dark"
                selectionColor={"#FF6B4A"}
                editable={!checkedSets[index]}
              />
              <Text style={[styles.unit, { color: unitColor }]}>reps</Text>
            </View>
          )}
        </View>

        {/* Checkbox */}
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
            {series.map((serie, index) => renderSet(serie, index))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ExerciceDetail;
