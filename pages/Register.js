import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { icons } from "./../assets/icons/icons";

import ApiManager from "../api/ApiManager";
import { registerUser } from "../api/User/register";

const RegisterScreen = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleRegister = async () => {
    console.log("Bouton cliqué !");
    if (loading) return;

    if (!nom || !prenom || !email || !password) {
      setMessage({ text: "Veuillez remplir tous les champs", type: "error" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ text: "Format d'email invalide", type: "error" });
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser(nom, prenom, email, password);
      setMessage({
        text: "Votre compte a été créé avec succès !",
        type: "success",
      });
      setTimeout(() => {
        navigation.navigate("Login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage({
        text: "L'inscription a échoué. Veuillez réessayer.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate("Login");
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
    inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    inputWrapperName: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.secondBackground,
      borderRadius: 5,
      height: 50,
      marginBottom: 15,
      paddingLeft: 10,
      width: "48%",
      borderWidth: 2, // Ajoutez ceci
      borderColor: "transparent", // Et ceci
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.secondBackground,
      borderRadius: 5,
      height: 50,
      marginBottom: 15,
      paddingLeft: 10,
      borderWidth: 2, // Ajoutez ceci
      borderColor: "transparent", // Et ceci
    },
    input: {
      flex: 1,
      padding: 10,
      fontSize: 30,
      color: colors.text,
      letterSpacing: 2,
      fontFamily: fonts.medium,
      textAlignVertical: "center",
      lineHeight: 35,
    },
    inputFocused: {
      borderColor: colors.secondary,
    },
    icon: {
      marginRight: 10,
    },
    button: {
      backgroundColor: colors.secondary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 50,
      height: 54,
    },
    buttonText: {
      color: colors.text,
      letterSpacing: 2,
      fontFamily: fonts.medium,
      fontSize: 32,
      textAlign: "center",
    },
    message: {
      marginTop: 20,
      textAlign: "center",
      fontSize: 18,
      fontFamily: fonts.medium,
    },
    messageError: {
      color: "red",
    },
    messageSuccess: {
      color: "green",
    },
    footerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      position: "absolute",
      bottom: 40,
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
      color: colors.secondary,
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
        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputWrapperName,
              focusedInput === "nom" && styles.inputFocused,
            ]}
          >
            <icons.UserRound
              width={24}
              height={24}
              color={colors.primary}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nom"
              placeholderTextColor={colors.placeholder}
              onFocus={() => setFocusedInput("nom")}
              onBlur={() => setFocusedInput(null)}
              keyboardAppearance="dark"
              selectionColor={colors.secondary}
              value={nom}
              onChangeText={setNom}
            />
          </View>
          <View
            style={[
              styles.inputWrapperName,
              focusedInput === "prenom" && styles.inputFocused,
            ]}
          >
            <icons.UserRound
              width={24}
              height={24}
              color={colors.primary}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              placeholderTextColor={colors.placeholder}
              onFocus={() => setFocusedInput("prenom")}
              onBlur={() => setFocusedInput(null)}
              keyboardAppearance="dark"
              selectionColor={colors.secondary}
              value={prenom}
              onChangeText={setPrenom}
            />
          </View>
        </View>
        <View
          style={[
            styles.inputWrapper,
            focusedInput === "mail" && styles.inputFocused,
          ]}
        >
          <icons.Mail
            width={24}
            height={24}
            color={colors.primary}
            style={styles.icon}
          />
          <TextInput
            style={[styles.input]}
            placeholder="Mail"
            placeholderTextColor={colors.placeholder}
            onFocus={() => setFocusedInput("mail")}
            onBlur={() => setFocusedInput(null)}
            keyboardAppearance="dark"
            selectionColor={colors.secondary}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View
          style={[
            styles.inputWrapper,
            focusedInput === "password" && styles.inputFocused,
          ]}
        >
          <icons.Lock
            width={24}
            height={24}
            color={colors.primary}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor={colors.placeholder}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
            secureTextEntry
            keyboardAppearance="dark"
            selectionColor={colors.secondary}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View
          style={[
            styles.inputWrapper,
            focusedInput === "confirmationPassword" && styles.inputFocused,
          ]}
        >
          <icons.Lock
            width={24}
            height={24}
            color={colors.primary}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor={colors.placeholder}
            onFocus={() => setFocusedInput("confirmationPassword")}
            onBlur={() => setFocusedInput(null)}
            secureTextEntry
            keyboardAppearance="dark"
            selectionColor={colors.secondary}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
        {message.text ? (
          <Text
            style={[
              styles.message,
              message.type === "error"
                ? styles.messageError
                : styles.messageSuccess,
            ]}
          >
            {message.text}
          </Text>
        ) : null}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Déjà un compte ?</Text>
          <TouchableOpacity onPress={handleLoginNavigation}>
            <Text style={styles.linkText}> Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
