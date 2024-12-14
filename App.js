import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeTabs from "./navigation/HomeTabs";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <HomeTabs />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue", // Choisir la couleur que tu veux ici
  },
});
