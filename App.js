import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeTabs from "./navigation/HomeTabs";
import { NavigationContainer } from "@react-navigation/native";
import colors from "./constants/colors";

const App = () => {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <HomeTabs />
      </NavigationContainer>
    </>
  );
};

export default App;
