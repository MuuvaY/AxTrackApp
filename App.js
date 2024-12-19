// import { View, StyleSheet, Text } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import HomeTabs from "./navigation/HomeTabs";
// import { NavigationContainer } from "@react-navigation/native";
// import { ThemeProvider } from "./components/ThemeContext";
// import { useFonts } from "expo-font";

// const App = () => {
//   const [fontsLoaded] = useFonts({
//     "MangoGrotesque-Medium": require("./assets/fonts/MangoGrotesque/MangoGrotesque-Medium.otf"),
//     "MangoGrotesque-SemiBold": require("./assets/fonts/MangoGrotesque/MangoGrotesque-SemiBold.otf"),
//     "MangoGrotesque-Bold": require("./assets/fonts/MangoGrotesque/MangoGrotesque-Bold.otf"),
//     "MangoGrotesque-Black": require("./assets/fonts/MangoGrotesque/MangoGrotesque-Black.otf"),
//   });

//   if (!fontsLoaded) {
//     return <Text>Loading...</Text>;
//   }
//   return (
//     <ThemeProvider>
//       <StatusBar style="light" />
//       <NavigationContainer>
//         <HomeTabs />
//       </NavigationContainer>
//     </ThemeProvider>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./components/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useFonts } from "expo-font";
import { setupInterceptor } from "./api/ApiManager";
import TestTokenScreen from "./pages/TestTokenScreen";

import HomeTabs from "./navigation/HomeTabs";
import Login from "./pages/Login";

const Stack = createStackNavigator();

const NavigationContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        // Routes authentifiées
        <>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="TestToken" component={TestTokenScreen} />
        </>
      ) : (
        // Routes non authentifiées
        <Stack.Screen name="Login" component={Login} />
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
