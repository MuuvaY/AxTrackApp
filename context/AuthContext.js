// AuthContext.js

import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { storeToken, retrieveToken, removeToken } from "../utils/secureStore";
// import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext(null);

export const AuthProvider = ({ children, navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const navigation = useNavigation();
  if (!navigation) {
    console.warn("Navigation prop manquante dans AuthProvider");
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await retrieveToken();
      console.log("Token vérifié au démarrage:", token);
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Erreur lors de la vérification du token:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };
  // const checkAuthStatus = async () => {
  //   try {
  //     const token = await retrieveToken();
  //     console.log("Token récupéré:", token);

  //     if (token && !isTokenExpired(token)) {
  //       setIsAuthenticated(true);
  //     } else {
  //       console.log("Token expiré ou non trouvé, déconnexion...");
  //       await signOut(); // Appel à signOut seulement si le token est expiré
  //     }
  //   } catch (error) {
  //     console.error("Erreur lors de la vérification du token:", error);
  //     await signOut(); // Déconnexion en cas d'erreur lors de la récupération du token
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const signIn = async (token) => {
    try {
      await storeToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  // const signOut = async () => {
  //   try {
  //     await removeToken();
  //     setIsAuthenticated(false);
  //   } catch (error) {
  //     console.error("Erreur lors de la déconnexion:", error);
  //   }
  // };
  const signOut = async () => {
    try {
      await removeToken();
      setIsAuthenticated(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwt_decode(token); // Décodage du token
      const currentTime = Date.now() / 1000; // Temps actuel en secondes
      console.log(
        "Expiration du token:",
        decodedToken.exp,
        "Temps actuel:",
        currentTime
      );
      return decodedToken.exp < currentTime; // Si l'expiration est avant l'heure actuelle, le token est expiré
    } catch (error) {
      console.log("Erreur de décodage du token:", error);
      return true; // Si une erreur survient lors du décodage, on considère que le token est expiré
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        signIn,
        signOut,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};
