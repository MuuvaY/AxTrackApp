import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { useAuth } from "../context/AuthContext";
import { setupInterceptor } from "../api/ApiManager";
import { ChronometreProvider } from "../context/ChronometreContext";

const Main = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    setupInterceptor(signOut);
  }, [signOut]);

  return (
    <ChronometreProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ChronometreProvider>
  );
};

export default Main;

// navigation/Main.js
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { View, ActivityIndicator } from "react-native";
// import AppNavigator from "./AppNavigator";
// import { useAuth } from "../context/AuthContext";
// import { setupInterceptor } from "../api/ApiManager";

// const Main = () => {
//   const { isInitialized, isLoading, getAuthToken, signOut } = useAuth();

//   // Initialiser l'intercepteur une seule fois quand le composant est monté
//   React.useEffect(() => {
//     if (isInitialized) {
//       setupInterceptor(getAuthToken, signOut);
//     }
//   }, [isInitialized]);

//   if (isLoading || !isInitialized) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// };

// export default Main;
// import React, { useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "./AppNavigator";
// import { useAuth } from "../context/AuthContext";
// import { setupInterceptor } from "../api/ApiManager";

// const Main = () => {
//   const { getAuthToken, signOut } = useAuth();

//   useEffect(() => {
//     setupInterceptor(getAuthToken, signOut);
//   }, []);

//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// };

// export default Main;
