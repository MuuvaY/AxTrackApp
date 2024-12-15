import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import HomeTabs from "./navigation/HomeTabs";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "./components/ThemeContext";
import { useFonts } from "expo-font";

const App = () => {
  const [fontsLoaded] = useFonts({
    "MangoGrotesque-Medium": require("./assets/fonts/MangoGrotesque/MangoGrotesque-Medium.otf"),
    "MangoGrotesque-SemiBold": require("./assets/fonts/MangoGrotesque/MangoGrotesque-SemiBold.otf"),
    "MangoGrotesque-Bold": require("./assets/fonts/MangoGrotesque/MangoGrotesque-Bold.otf"),
    "MangoGrotesque-Black": require("./assets/fonts/MangoGrotesque/MangoGrotesque-Black.otf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <HomeTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
