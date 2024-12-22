import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ApiManager from "../api/ApiManager";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { icons } from "./../assets/icons/icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const { signIn } = useAuth();
  const theme = useTheme();
  const { colors, fonts } = theme;

  const handleLogin = async () => {
    try {
      const response = await ApiManager.post("/login", { email, password });
      const { token } = response.data;

      await signIn(token);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", "Please check your credentials");
    }
  };

  const handleSignUpNavigation = () => {
    navigation.navigate("Register");
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
    input: {
      backgroundColor: colors.secondBackground,
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      height: 50,
      fontSize: 30,
      color: colors.text,
      letterSpacing: 2,
      fontFamily: fonts.medium,
      textAlignVertical: "center",
      lineHeight: 35,
      paddingLeft: 45,
    },
    inputFocused: {
      borderColor: colors.secondary,
      borderWidth: 2,
      paddingHorizontal: 8,
      paddingVertical: 8,
    },
    button: {
      backgroundColor: colors.secondary,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      height: 54,
    },
    buttonText: {
      color: colors.text,
      letterSpacing: 2,
      fontFamily: fonts.medium,
      fontSize: 32,
      textAlign: "center",
    },
    icon: {
      position: "absolute",
      left: 10,
      top: 13,
      zIndex: 1000,
    },
    linkContainer: {
      flexDirection: "row", // Aligner horizontalement
      justifyContent: "center", // Centrer les éléments
      position: "absolute",
      bottom: 40, // Le texte sera à 20px du bas de l'écran
      left: 0,
      right: 0,
    },
    normalText: {
      color: colors.text,
      fontSize: 22,
      fontFamily: fonts.medium,
      letterSpacing: 1,
    },
    linkText: {
      color: colors.secondary,
      fontSize: 22,
      fontFamily: fonts.medium,
      marginLeft: 5,
      letterSpacing: 1,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Se connecter</Text>
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
              focusedInput === "email" && styles.inputFocused,
            ]}
            placeholder="Mail"
            placeholderTextColor={colors.placeholder}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
            keyboardAppearance="dark"
            selectionColor={colors.secondary}
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
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedInput("password")}
            onBlur={() => setFocusedInput(null)}
            keyboardAppearance="dark"
            selectionColor={colors.secondary}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <Text style={styles.normalText}>Tu n'as pas de compte ?</Text>
          <TouchableOpacity onPress={handleSignUpNavigation}>
            <Text style={styles.linkText}> S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}