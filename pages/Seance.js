import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { icons } from "./../assets/icons/icons";
import { getSeances } from "../api/Seance/Seance";

const Seance = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();

  const [seances, setSeances] = useState([]);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const data = await getSeances();
        setSeances(data); // Mise à jour du state avec les séances
      } catch (err) {
        setError("Impossible de récupérer les séances.");
      }
    };
    fetchSeances();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    title: {
      color: colors.primary,
      fontSize: 45,
      fontFamily: fonts.semiBold,
      left: 30,
      top: 30,
      letterSpacing: 2,
      zIndex: 1000,
    },
    seanceContainer: {
      marginTop: 100,
      alignItems: "center", // Centre l'élément dans le container
      justifyContent: "center", // Centre l'élément verticalement
    },
    buttonContainer: {
      marginTop: 20,
      backgroundColor: colors.primary, // Utilisation de la couleur primaire du thème
      height: 52,
      width: 52,
      borderRadius: 7,
      justifyContent: "center", // Centrer l'icône dans le bouton
      alignItems: "center", // Centrer l'icône dans le bouton
    },
    icon: {
      color: colors.background, // Couleur de l'icône
    },
    seanceText: {
      color: colors.text,
      fontSize: 20,
      fontFamily: fonts.semiBold,
      marginTop: 20,
    },
    noSeance: {
      fontSize: 40,
      fontFamily: fonts.medium,
      color: colors.placeholder,
      margin: 20,
      textAlign: "center",
    },
    noSeanceContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    exerciceContainer: {},
    exerciceRow: {
      backgroundColor: colors.secondary,
      width: 350,
      height: 80,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
      margin: 10,
    },

    exercice: {
      color: colors.background,
      fontFamily: fonts.black,
      fontSize: 64,
      lineHeight: 80,
      textAlign: "center",
      textAlignVertical: "center",
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Séance</Text>

        <ScrollView
          contentContainerStyle={[
            styles.seanceContainer,
            { paddingBottom: 100 }, // Laisse de l'espace pour le bouton
          ]}
        >
          {" "}
          {seances.length > 0 ? (
            seances.map((seance, index) => (
              <View key={index} style={styles.exerciceContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Exercice")}
                >
                  <View style={styles.exerciceRow}>
                    <Text style={styles.exercice}> {seance.seance_nom}</Text>
                    <icons.ChevronRight
                      width={44}
                      height={44}
                      color={colors.primary}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.noSeanceContainer}>
              {/* Si aucun nom de séance n'existe, afficher une icône par défaut */}
              <icons.DumbellCross
                width={100}
                height={100}
                color={colors.primary}
                style={styles.iconErreur}
              />
              <Image source={require("../assets/img/DumbellCross.webp")} />
              <Text style={styles.noSeance}>
                Aucun exercice enregistré pour le moment.
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("CreationSeance")}
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

export default Seance;
