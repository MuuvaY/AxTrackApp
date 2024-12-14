import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../constants/colors";

const Accueil = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bonjour, je suis sur Accueil</Text>
      <Image />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "red",
    fontSize: 20,
    backgroundColor: colors.text,
  },
});

export default Accueil;
