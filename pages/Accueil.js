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
      paddingHorizontal: 20,
    },
    title: {
      color: colors.primary,
      fontSize: 45,
      fontFamily: fonts.semiBold,
      letterSpacing: 2,
      marginTop: 20,
    },
    subtitle: {
      color: colors.text,
      fontSize: 20,
      fontFamily: fonts.medium,
      marginTop: 10,
    },
    infoText: {
      color: colors.text,
      fontSize: 16,
      marginTop: 5,
    },
    image: {
      width: 200,
      height: 200,
      alignSelf: "center",
      marginTop: 30,
    },

    inputFocused: {
      borderColor: colors.secondary,
    },
    input: {
      backgroundColor: colors.secondBackground,
      color: colors.text,
      height: 50,
      fontFamily: fonts.medium, // Remplace par la bonne police si nécessaire
      fontSize: 28,
      borderRadius: 5,
      paddingLeft: 20,
      // paddingVertical: 20,
      // textAlign: "left",
      // textAlignVertical: "center", // Fonctionne sur Android
      // multiline: true, // Permet de gérer plusieurs lignes
      // numberOfLines: 1, // Limite à une ligne (si tu veux un input sur une seule ligne)
    },
    test: { width: 200 },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>

      <WeekDays />
      <View style={styles.test}>
        <TextInput
          style={[
            styles.input,
            // focusedInput === "email" && styles.inputFocused,
          ]}
          placeholder="Mail"
          placeholderTextColor={colors.placeholder}
          // value={email}
          // onChangeText={setEmail}
          // onFocus={() => setFocusedInput("email")}
          // onBlur={() => setFocusedInput(null)}
          keyboardAppearance="dark"
          selectionColor={colors.secondary}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

export default Accueil;
