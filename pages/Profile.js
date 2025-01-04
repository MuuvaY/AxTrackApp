import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../api/User/User";

const Profile = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const { signOut } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (err) {
        setError("Erreur lors du chargement des informations de l'utilisateur");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    title: {
      color: colors.primary,
      fontSize: 45,
      fontFamily: fonts.semiBold,
      letterSpacing: 2,
      // marginBottom: 2,
    },
    text: {
      color: colors.text,
      fontSize: 20,
      backgroundColor: colors.secondBackground,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    logoutButton: {
      backgroundColor: "red",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      top: 200,
    },
    logoutText: {
      color: "white",
      fontSize: 18,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      color: "red",
      fontSize: 18,
      textAlign: "center",
    },
    titleName: {
      fontSize: 24,
      fontFamily: fonts.medium,
      color: colors.secondary,
      marginBottom: 10,
    },
    containerTitle: {
      left: 30,
      top: 30,
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Profil</Text>
          <Text style={styles.titleName}>
            {user.nom} {user.prenom}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
