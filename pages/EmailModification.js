import react from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const EmailModification = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
  return (
    <View style={styles.container}>
      <Text>EmailModification</Text>
    </View>
  );
};

export default EmailModification;
