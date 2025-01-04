import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { useAuth } from "../context/AuthContext";
import { setupInterceptor } from "../api/ApiManager";

const Main = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    setupInterceptor(signOut); // Vérifie que signOut est bien passé à l'intercepteur
  }, [signOut]);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default Main;
