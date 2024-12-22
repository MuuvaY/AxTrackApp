import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native"; // Importer useNavigation

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation(); // Utiliser useNavigation pour accéder à la navigation

  const handleRegister = async () => {
    try {
      // Logique d'enregistrement ici (API call ou autre)
      Alert.alert("Compte créé", "Vous pouvez maintenant vous connecter.");
      // Vous pouvez rediriger l'utilisateur après l'enregistrement, si nécessaire
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      Alert.alert("Erreur", "Une erreur s'est produite.");
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate("Login"); // Redirige vers l'écran de connexion
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: colors.background,
    },
    title: {
      color: colors.primary,
      fontSize: 45,
      fontFamily: fonts.semiBold,
      marginBottom: 20,
      textAlign: "center",
    },

    footerContainer: {
      flexDirection: "row", // Alignement horizontal des éléments
      justifyContent: "center", // Centrer l'ensemble de la ligne
      position: "absolute",
      bottom: 40, // Le texte sera à 20px du bas de l'écran
      left: 0,
      right: 0,
    },
    footerText: {
      textAlign: "center",
      color: colors.text,
      fontSize: 22,
      marginTop: 20,
      fontFamily: fonts.medium,
      letterSpacing: 1,
    },
    linkText: {
      color: colors.secondary, // Le lien aura la couleur secondaire
      fontFamily: fonts.medium,
      fontSize: 22,
      letterSpacing: 1,
      marginTop: 20,
      marginLeft: 5,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>S'inscrire</Text>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Déjà un compte ?</Text>
          <TouchableOpacity onPress={handleLoginNavigation}>
            <Text style={[styles.linkText]}> Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
