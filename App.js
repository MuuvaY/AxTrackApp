import React from "react";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { useFonts } from "expo-font";
import Main from "./navigation/Main";

const App = () => {
  const [fontsLoaded] = useFonts({
    "MangoGrotesque-Medium": require("./assets/fonts/MangoGortesque/MangoGrotesque-Medium.ttf"),
    "MangoGrotesque-SemiBold": require("./assets/fonts/MangoGortesque/MangoGrotesque-SemiBold.ttf"),
    "MangoGrotesque-Bold": require("./assets/fonts/MangoGortesque/MangoGrotesque-Bold.ttf"),
    "MangoGrotesque-Black": require("./assets/fonts/MangoGortesque/MangoGrotesque-Black.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <StatusBar style="light" />
        <Main />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
