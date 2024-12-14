import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const Seance = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Bonjour, je suis sur Seance</Text>
      </View>
    </>
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

export default Seance;
