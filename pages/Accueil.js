import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { useTheme } from "../components/ThemeContext";
import WeekDays from "../components/WeekDays";

const Accueil = () => {
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
      marginBottom: 50,
    },
    text: {
      color: colors.text,
      fontSize: 20,
      backgroundColor: colors.secondBackground,
    },
    test: {},
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.test}>
          <Text style={styles.title}>Accueil</Text>
          <WeekDays />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Accueil;
