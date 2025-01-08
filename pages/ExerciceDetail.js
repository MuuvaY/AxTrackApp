import react from "react";
import { View, Text, StyleSheet } from "react-native";
import { icons } from "./../assets/icons/icons";
import { useTheme } from "../context/ThemeContext";

const ExerciceDetail = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;

  const styles = StyleSheet.create({});
  return (
    <View>
      <Text>Bonjour exercice detail</Text>
    </View>
  );
};

export default ExerciceDetail;
