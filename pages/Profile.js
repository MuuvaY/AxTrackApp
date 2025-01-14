import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { getUserProfile } from "../api/User/User";
import { useNavigation } from "@react-navigation/native";
import { icons } from "./../assets/icons/icons";

const Profile = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const { signOut } = useAuth();
  const navigation = useNavigation();

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

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Se déconnecter",
        onPress: async () => {
          try {
            await signOut();
          } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
          }
        },
        style: "destructive",
      },
    ]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    separator: {
      height: 2,
      backgroundColor: colors.background,
      opacity: 0.3,
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
    dataContainer: {
      alignItems: "center",
      marginTop: 50,
    },
    dataPersoContainer: {
      height: 54,
      width: 355,
      backgroundColor: colors.secondBackground,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderRadius: 5,
    },
    dataPersoText: {
      fontFamily: fonts.medium,
      color: colors.text,
      fontSize: 30,
      paddingLeft: 45,
    },
    deleteAccount: {
      fontFamily: fonts.medium,
      color: "red",
      fontSize: 30,
      paddingLeft: 45,
    },
    icon: {
      position: "absolute",
      left: 10,
    },
    icon2: {
      position: "absolute",
      right: 10,
    },
    donnerPerso: {
      marginBottom: "7%",
    },

    securitySettingsMdp: {
      height: 54,
      width: 355,
      backgroundColor: colors.secondBackground,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    securitySettingsMail: {
      height: 54,
      width: 355,
      backgroundColor: colors.secondBackground,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderBottomLeftRadius: 5,
      borderBottomLeftRadius: 5,
      marginBottom: "7%",
    },
    confidentialité: {
      height: 54,
      width: 355,
      backgroundColor: colors.secondBackground,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderRadius: 5,
    },
  });

  if (loading) {
    return (
      <SafeAreaView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // if (error) {
  //   return (
  //     <SafeAreaView>
  //       {/* <Text style={styles.errorText}>{error}</Text>{" "} */}
  //     </SafeAreaView>
  //   );
  // }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Profil</Text>
          <Text style={styles.titleName}>{/* {user.nom} {user.prenom} */}</Text>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.donnerPerso}>
            <TouchableOpacity
              style={styles.dataPerso}
              onPress={() => navigation.navigate("DonneePerso")}
            >
              <View style={styles.dataPersoContainer}>
                <icons.UserRound
                  width={24}
                  height={24}
                  color={colors.primary}
                  style={styles.icon}
                />
                <Text style={styles.dataPersoText}>Données personnelles</Text>
                <icons.ChevronRight
                  width={30}
                  height={30}
                  color={colors.placeholder}
                  style={styles.icon2}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("EmailModification")}
            >
              <View style={styles.securitySettingsMdp}>
                <icons.Mail
                  width={24}
                  height={24}
                  color={colors.primary}
                  style={styles.icon}
                />
                <Text style={styles.dataPersoText}>Modifier votre email</Text>
                <icons.ChevronRight
                  width={30}
                  height={30}
                  color={colors.placeholder}
                  style={styles.icon2}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.dataPerso}
              onPress={() => navigation.navigate("ResetMdp")}
            >
              <View style={styles.securitySettingsMail}>
                <icons.Lock
                  width={24}
                  height={24}
                  color={colors.primary}
                  style={styles.icon}
                />
                <Text style={styles.dataPersoText}>
                  Modifier votre mot de passe
                </Text>
                <icons.ChevronRight
                  width={30}
                  height={30}
                  color={colors.placeholder}
                  style={styles.icon2}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.donnerPerso}>
            <TouchableOpacity
              style={styles.dataPerso}
              onPress={() => Linking.openURL("https://mariusyvt.me/")}
            >
              <View style={styles.confidentialité}>
                <icons.MessageSquareMore
                  width={24}
                  height={24}
                  color={colors.primary}
                  style={styles.icon}
                />
                <Text style={styles.dataPersoText}>
                  CGU, Politique de Confidentialité
                </Text>
                <icons.ChevronRight
                  width={30}
                  height={30}
                  color={colors.placeholder}
                  style={styles.icon2}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.donnerPerso}>
            <TouchableOpacity
              style={styles.dataPerso}
              onPress={() => navigation.navigate("Contact")}
            >
              <View style={styles.dataPersoContainer}>
                <icons.UserRound
                  width={24}
                  height={24}
                  color={colors.primary}
                  style={styles.icon}
                />
                <Text style={styles.dataPersoText}>Nous contacter</Text>
                <icons.ChevronRight
                  width={30}
                  height={30}
                  color={colors.placeholder}
                  style={styles.icon2}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.donnerPerso}>
            <TouchableOpacity style={styles.dataPerso} onPress={handleLogout}>
              <View style={styles.securitySettingsMdp}>
                <icons.Logout
                  width={24}
                  height={24}
                  color={"red"}
                  style={styles.icon}
                />
                <Text style={styles.deleteAccount}>Se déconnecter</Text>
                <icons.ChevronRight
                  width={30}
                  height={30}
                  color={"red"}
                  style={styles.icon2}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.dataPerso}
              onPress={() => navigation.navigate("SuppCompte")}
            >
              <View style={styles.securitySettingsMail}>
                <icons.Trash
                  width={24}
                  height={24}
                  color={"red"}
                  style={styles.icon}
                />
                <Text style={styles.deleteAccount}>Supprimer le compte</Text>
                <icons.ChevronRight
                  width={30}
                  height={30}
                  color={"red"}
                  style={styles.icon2}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
