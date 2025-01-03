import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useFonts } from "expo-font";
import { setupInterceptor } from "./api/ApiManager";
import TestTokenScreen from "./pages/TestTokenScreen";
import { useTheme } from "./context/ThemeContext";
import { icons } from "./assets/icons/icons";
import { deleteSeance } from "./api/Seance/Seance";

import HomeTabs from "./navigation/HomeTabs";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Profile from "./pages/Profile";
import CreationSeance from "./pages/CreationSeance";
import Exercice from "./pages/Exercice";
import ExerciceDetail from "./pages/ExerciceDetail";
import CreationExercice from "./pages/CreationExercice";

import OptionsModal from "./components/OptionsModal";

const Stack = createStackNavigator();

const NavigationContent = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const { isAuthenticated, isLoading } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  const styles = StyleSheet.create({
    headerRightButton: {
      marginRight: 20,
    },
  });

  const handleDelete = (seanceId) => {
    console.log("Tentative de suppression de la séance avec ID :", seanceId);
    setIsModalVisible(false);
    if (!seanceId) {
      console.error("L'ID de la séance est manquant !");
      Alert.alert("Erreur", "L'ID de la séance est manquant.");
      return;
    }
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer cette séance ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSeance(seanceId);
              navigation.goBack();
            } catch (error) {
              console.error("Erreur dans handleDelete:", error);
              Alert.alert("Erreur", "Impossible de supprimer la séance");
            }
          },
        },
      ]
    );
  };

  const handleEdit = (params) => {
    setIsModalVisible(false); // Ferme le modal
    navigation.navigate("CreationSeance", {
      isEditing: true,
      seanceId: params.seanceId,
      seanceNom: params.seanceNom,
      jour_semaine: params.jour_semaine,
      categorie_exercice_id: params.categorie_exercice_id,
    });
  };

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Accueil"
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
            options={({ route, navigation }) => ({
              title: route.params?.seanceNom || "Exercice",
              headerStyle: {
                backgroundColor: colors.background,
                shadowOpacity: 0,
                elevation: 0,
              },
              headerTintColor: colors.placeholder,

              headerTitleStyle: {
                fontSize: 30,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
              headerBackTitleVisible: false,
              headerBackTitle: "",
              headerRight: () => (
                <>
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    style={styles.headerRightButton}
                  >
                    <icons.Ellipsis
                      width={24}
                      height={24}
                      color={colors.placeholder}
                    />
                  </TouchableOpacity>

                  <OptionsModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onEdit={() => handleEdit(route.params)}
                    onDelete={() => handleDelete(route.params.seanceId)}
                    colors={colors}
                    fonts={fonts}
                    icons={icons}
                  />
                </>
              ),
            })}
          />
          <Stack.Screen
            name="ExerciceDetail"
            component={ExerciceDetail}
            options={{
              headerStyle: {
                backgroundColor: colors.background,
                shadowOpacity: 0,
                elevation: 0,
              },
              headerTintColor: colors.placeholder,

              headerTitleStyle: {
                fontSize: 30,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
              headerBackTitleVisible: false,
              headerBackTitle: "",
            }}
          />
          <Stack.Screen
            name="CreationExercice"
            component={CreationExercice}
            options={{ headerShown: false }}
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
    "MangoGrotesque-Medium": require("./assets/fonts/MangoGortesque/MangoGrotesque-Medium.ttf"),
    "MangoGrotesque-SemiBold": require("./assets/fonts/MangoGortesque/MangoGrotesque-SemiBold.ttf"),
    "MangoGrotesque-Bold": require("./assets/fonts/MangoGortesque/MangoGrotesque-Bold.ttf"),
    "MangoGrotesque-Black": require("./assets/fonts/MangoGortesque/MangoGrotesque-Black.ttf"),
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
