import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import ApiManager from "../api/ApiManager";
import * as SecureStore from "expo-secure-store";

const TestTokenScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [token, setToken] = useState(null);

  const fetchToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("userToken");
      setToken(storedToken);
      // console.log("Token récupéré :", storedToken);
    } catch (error) {
      console.error("Erreur lors de la récupération du token :", error);
      Alert.alert("Erreur", "Impossible de récupérer le token.");
    }
  };

  const testProfileRoute = async () => {
    try {
      const response = await ApiManager.get("/profile");
      // console.log("Réponse de /profile :", response.data);
      setProfileData(response.data);
      Alert.alert("Succès", "Route sécurisée accessible !");
    } catch (error) {
      console.error(
        "Erreur lors de l'accès à /profile :",
        error.response?.data || error.message
      );
      Alert.alert("Erreur", error.response?.data?.message || "Accès refusé");
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Test de la route sécurisée</Text>
      <Button
        title="Tester la route sécurisée /profile"
        onPress={testProfileRoute}
      />
      {token && (
        <View style={styles.result}>
          <Text style={styles.text}>Token récupéré :</Text>
          <Text style={styles.token}>{token}</Text>
        </View>
      )}
      {profileData && (
        <View style={styles.result}>
          <Text style={styles.text}>Données de profil :</Text>
          <Text>{JSON.stringify(profileData, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    width: "100%",
  },
  text: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  token: {
    fontSize: 12,
    color: "#495057",
    wordWrap: "break-word",
  },
});

export default TestTokenScreen;
