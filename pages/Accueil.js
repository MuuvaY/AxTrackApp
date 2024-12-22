// import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
// import { useTheme } from "../components/ThemeContext";

// const Accueil = () => {
//   const theme = useTheme();
//   const { colors, fonts } = theme;

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await ApiManager.get("/profile");
//         setUsername(response.data.username); // Assure-toi que l'API retourne un "username"
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: colors.background,
//     },
//     title: {
//       color: colors.primary,
//       fontSize: 45,
//       fontFamily: fonts.semiBold,
//       left: 30,
//       top: 30,
//       letterSpacing: 2,
//     },
//     text: {
//       color: colors.text,
//       fontSize: 20,
//       backgroundColor: colors.secondBackground,
//     },
//   });

//   return (
//     <View style={styles.container}>
//       <SafeAreaView>
//         <Text style={styles.title}>Accueil</Text>
//         <Image />
//       </SafeAreaView>
//     </View>
//   );
// };

// export default Accueil;

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { useTheme } from "../context/ThemeContext";
import ApiManager from "../api/ApiManager";

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
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>
          Bienvenue, {userData.prenom || "Utilisateur"} !
        </Text>
        <Text style={styles.subtitle}>
          Voici vos informations personnelles :
        </Text>
        <Text style={styles.infoText}>Nom : {userData.nom}</Text>
        <Text style={styles.infoText}>Email : {userData.email}</Text>
        <Text style={styles.infoText}>Téléphone : {userData.phone}</Text>
        <Text style={styles.infoText}>Âge : {userData.age}</Text>
      </SafeAreaView>
    </View>
  );
};

export default Accueil;
