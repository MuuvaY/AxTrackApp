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

import HomeTabs from "./navigation/HomeTabs";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Stack = createStackNavigator();

const NavigationContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" component={Profile} />
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
