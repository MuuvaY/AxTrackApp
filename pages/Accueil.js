import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import ApiManager from "../api/ApiManager";
import WeekDays from "../components/WeekDays";

const Accueil = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;

  // State pour stocker les informations utilisateur
  const [userData, setUserData] = useState({});

  // Récupérer les données utilisateur depuis l'API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ApiManager.get("/profile");
        setUserData(response.data); // Stocke les données utilisateur
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur:",
          error
        );
      }
    };

    fetchUserData();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    containerTitle: {
      left: 30,
      top: 30,
      marginBottom: 80,
    },
    title: {
      color: colors.primary,
      fontSize: 45,
      fontFamily: fonts.semiBold,
      letterSpacing: 2,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Accueil</Text>
        </View>
        <WeekDays />
      </SafeAreaView>
    </View>
  );
};

export default Accueil;
