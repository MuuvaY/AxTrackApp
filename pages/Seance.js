import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { useTheme } from "../context/ThemeContext";

const Seance = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;

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
    text: {
      color: colors.text,
      fontSize: 20,
      backgroundColor: colors.secondBackground,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Séance</Text>
        <Image />
      </SafeAreaView>
    </View>
  );
};

export default Seance;
