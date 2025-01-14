import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ChronometreProvider } from "../context/ChronometreContext";
import { useAuth } from "../context/AuthContext";
import AppNavigator from "./AppNavigator";
import { setupInterceptor } from "../api/ApiManager";

const Main = () => {
  const navigationRef = useRef(null);
  const { signOut } = useAuth();

  useEffect(() => {
    setupInterceptor(() => {
      signOut();
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    });
  }, []);

  return (
    <ChronometreProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    </ChronometreProvider>
  );
};
export default Main;
