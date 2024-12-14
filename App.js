import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeTabs from "./navigation/HomeTabs";
import { NavigationContainer } from "@react-navigation/native";
import colors from "./constants/colors";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <HomeTabs />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default App;
