import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
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

  const fetchExercices = async () => {
    if (!seanceId) return;
    try {
      const data = await getExercices(seanceId);
      setExercices(data);
    } catch (err) {
      Alert.alert("Erreur", "Impossible de récupérer les exercices.");
    }
  };

  useEffect(() => {
    fetchExercices();
  }, []);

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
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            styles.exerciceContainer,
            { paddingBottom: 100 },
          ]}
        >
          {exercices.length > 0 ? (
            <View>
              {exercices.map((exercice, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ExerciceDetail")}
                  >
                    <View style={styles.exercice}>
                      <Text style={styles.exerciceText}>
                        {exercice.nom_exercice}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noSeanceContainer}>
              <Image source={require("../assets/img/DumbellCross.webp")} />
              <Text style={styles.noSeance}>
                Aucun exercice enregistré pour le moment.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("CreationExercice")}
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
