import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { icons } from "./../assets/icons/icons"; // Assurez-vous que l'icône MoreVert est exportée ici

const Exercice = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();

  const elements = []; // Remplacer par les données pertinentes

  const handleMenuPress = () => {
    Alert.alert(
      "Options",
      "Que voulez-vous faire ?",
      [
        {
          text: "Modifier",
          onPress: () => console.log("Modifier"),
        },
        {
          text: "Supprimer",
          onPress: () => console.log("Supprimer"),
          style: "destructive",
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
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
      left: 30,
      top: 30,
      letterSpacing: 2,
    },
    titleContainer: {
      backgroundColor: colors.background,
      width: "100%",
    },
    noSeanceContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    noSeance: {
      fontSize: 40,
      fontFamily: fonts.medium,
      color: colors.placeholder,
      margin: 20,
      textAlign: "center",
    },
    menuIcon: {
      position: "absolute", // Positionnement de l'icône en haut à droite
      top: 10,
      right: 10,
      zIndex: 1, // S'assurer que l'icône reste devant d'autres éléments
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        {/* Titre (optionnel) */}
        {/* <View style={styles.titleContainer}>
          <Text style={styles.title}>{seanceNom}</Text>
        </View> */}

        {/* Icône des trois petits points en haut à droite */}
        <TouchableOpacity style={styles.menuIcon} onPress={handleMenuPress}>
          <icons.Tag width={30} height={30} color={colors.primary} />
        </TouchableOpacity>

        {/* Contenu principal */}
        {elements.length > 0 ? (
          <Text>Il y a des éléments à afficher.</Text>
        ) : (
          <View style={styles.noSeanceContainer}>
            <icons.DumbellCross
              width={100}
              height={100}
              color={colors.primary}
            />
            <Image source={require("../assets/img/DumbellCross.webp")} />

            <Text style={styles.noSeance}>
              Aucun exercice enregistré pour le moment.
            </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Exercice;
