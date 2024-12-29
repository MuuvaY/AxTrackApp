import React, { useEffect } from "react";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useFonts } from "expo-font";
import { setupInterceptor } from "./api/ApiManager";
import TestTokenScreen from "./pages/TestTokenScreen";
import { useTheme } from "./context/ThemeContext";

import HomeTabs from "./navigation/HomeTabs";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/Profile";
import CreationSeance from "./pages/CreationSeance";
import Exercice from "./pages/Exercice";

const Stack = createStackNavigator();

const NavigationContent = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false, // Désactiver le glissement pour tous les écrans
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen
            name="CreationSeance"
            component={CreationSeance}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Exercice"
            component={Exercice}
            options={{
              headerStyle: {
                backgroundColor: colors.background, // couleur verte
                shadowOpacity: 0,
                elevation: 0,
              },
              headerTintColor: colors.placeholder,

              headerTitleStyle: {
                fontSize: 45,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
              headerBackTitleVisible: false,
              headerBackTitle: "",
            }}
          />
          <Stack.Screen name="TestToken" component={TestTokenScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    "MangoGrotesque-Medium": require("./assets/fonts/MangoGrotesque/MangoGrotesque-Medium.otf"),
    "MangoGrotesque-SemiBold": require("./assets/fonts/MangoGrotesque/MangoGrotesque-SemiBold.otf"),
    "MangoGrotesque-Bold": require("./assets/fonts/MangoGrotesque/MangoGrotesque-Bold.otf"),
    "MangoGrotesque-Black": require("./assets/fonts/MangoGrotesque/MangoGrotesque-Black.otf"),
  });

  useEffect(() => {
    setupInterceptor();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <NavigationContent />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
