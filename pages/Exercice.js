import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { icons } from "./../assets/icons/icons";

const Exercice = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const navigation = useNavigation();

  const elements = []; // Remplacer par les données pertinentes

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
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Exercice</Text>

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
