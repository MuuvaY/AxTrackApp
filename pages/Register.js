import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { icons } from "./../assets/icons/icons";

const Register = () => {
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
      marginBottom: 15,
      position: "relative",
    },
    input: {
      backgroundColor: colors.secondBackground,
      borderRadius: 5,
      height: 50,
      fontSize: 28,
      color: colors.text,
      letterSpacing: 2,
      fontFamily: fonts.medium,
      paddingLeft: 45,
      borderWidth: 2,
      borderColor: "transparent",
    },
    inputFocused: {
      borderColor: colors.secondary,
    },
    icon: {
      position: "absolute",
      left: 10,
      top: 13,
      zIndex: 1000,
    },
    halfInputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      // marginBottom: -15, // Pour compenser le marginBottom des inputContainer
    },
    halfInput: {
      width: "48%",
    },
    button: {
      backgroundColor: colors.secondary,
      borderRadius: 5,
      height: 54,
      marginTop: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: colors.text,
      letterSpacing: 2,
      fontFamily: fonts.medium,
      fontSize: 32,
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

        <View style={styles.halfInputContainer}>
          <View style={[styles.inputContainer, styles.halfInput]}>
            <icons.UserRound
              width={24}
              height={24}
              color={colors.primary}
              style={styles.icon}
            />
            <TextInput
              style={[
                styles.input,
                focusedInput === "nom" && styles.inputFocused,
              ]}
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

          <View style={[styles.inputContainer, styles.halfInput]}>
            <icons.UserRound
              width={24}
              height={24}
              color={colors.primary}
              style={styles.icon}
            />
            <TextInput
              style={[
                styles.input,
                focusedInput === "prenom" && styles.inputFocused,
              ]}
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

        <View style={styles.inputContainer}>
          <icons.Mail
            width={24}
            height={24}
            color={colors.primary}
            style={styles.icon}
          />
          <TextInput
            style={[
              styles.input,
              focusedInput === "mail" && styles.inputFocused,
            ]}
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

        <View style={styles.inputContainer}>
          <icons.Lock
            width={24}
            height={24}
            color={colors.primary}
            style={styles.icon}
          />
          <TextInput
            style={[
              styles.input,
              focusedInput === "password" && styles.inputFocused,
            ]}
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

        <View style={styles.inputContainer}>
          <icons.Lock
            width={24}
            height={24}
            color={colors.primary}
            style={styles.icon}
          />
          <TextInput
            style={[
              styles.input,
              focusedInput === "confirmationPassword" && styles.inputFocused,
            ]}
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

export default Register;
