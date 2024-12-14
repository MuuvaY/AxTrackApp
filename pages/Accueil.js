import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const Accueil = () => {
  return (
    <>
      <View>
        <Text style={styles.container}>Bonjour, je suis sur Accueil</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    color: "red",
  },
});

export default Accueil;
