import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import HomeTabs from "./HomeTabs";
import { icons } from "./../assets/icons/icons";

import { UseSeanceActions } from "../components/UseSeanceActions";
import OptionsModal from "../components/OptionsModal";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CreationSeance from "../pages/CreationSeance";
import CreationExercice from "../pages/CreationExercice";
import Exercice from "../pages/Exercice";
import Superset from "../pages/Superset";
import DonneePerso from "../pages/DonneePerso";
import FinSeance from "../pages/FinSeance";
import ExerciceDetail from "../pages/ExerciceDetail";
import EmailModification from "../pages/EmailModification";
import ResetMdp from "../pages/ResetMdp";
import Contact from "../pages/Contact";
import SuppCompte from "../pages/SuppCompte";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const { isAuthenticated, isLoading } = useAuth();
  const { isModalVisible, setIsModalVisible, handleDelete, handleEdit } =
    UseSeanceActions();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const styles = StyleSheet.create({ headerRightButton: { marginRight: 20 } });

  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="Accueil"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
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
              headerStyle: { backgroundColor: colors.background },
              headerTintColor: colors.placeholder,
              headerBackTitle: "",
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: 30,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
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
                    onEdit={() => handleEdit(route.params, navigation)}
                    onDelete={() =>
                      handleDelete(route.params.seanceId, navigation)
                    }
                    colors={colors}
                    fonts={fonts}
                  />
                </>
              ),
            })}
          />

          <Stack.Screen
            name="CreationExercice"
            component={CreationExercice}
            options={{ headerShown: false, headerBackTitleVisible: false }}
          />

          <Stack.Screen
            name="ExerciceDetail"
            component={ExerciceDetail}
            options={{
              headerStyle: { backgroundColor: colors.secondary },
              headerStyle: {
                backgroundColor: colors.secondary,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerShadowVisible: false,
              headerTitle: "",
              headerBackTitle: "",
              headerTintColor: colors.background,
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: 30,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
              headerRight: () => (
                <>
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    style={styles.headerRightButton}
                  >
                    <icons.Ellipsis
                      width={24}
                      height={24}
                      color={colors.background}
                    />
                  </TouchableOpacity>
                  <OptionsModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onEdit={() => handleEdit(route.params, navigation)}
                    onDelete={() =>
                      handleDelete(route.params.seanceId, navigation)
                    }
                    colors={colors}
                    fonts={fonts}
                  />
                </>
              ),
            }}
          />
          <Stack.Screen
            name="Superset"
            component={Superset}
            options={{
              headerBackTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: colors.placeholder,
              headerStyle: { backgroundColor: colors.background },
              headerTitleStyle: {
                fontSize: 30,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
            }}
          />
          <Stack.Screen
            name="FinSeance"
            component={FinSeance}
            options={({ route }) => ({
              title: route.params?.seanceNom || "Exercice",
              headerTintColor: colors.placeholder,
              headerTitleStyle: {
                fontSize: 30,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
              headerStyle: {
                backgroundColor: colors.background,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerBackTitle: "",
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="DonneePerso"
            component={DonneePerso}
            options={{
              title: "Données personnelles",
              headerTitleStyle: {
                fontSize: 30,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
              headerStyle: {
                backgroundColor: colors.background,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: colors.placeholder,
              headerBackTitle: "",
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="EmailModification"
            component={EmailModification}
            options={{
              title: "Modifier votre email",
              headerTitleStyle: {
                fontSize: 30,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
              headerStyle: {
                backgroundColor: colors.background,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: colors.placeholder,
              headerBackTitle: "",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="ResetMdp"
            component={ResetMdp}
            options={{
              title: "Modifier votre mot de passe",
              headerTitleStyle: {
                fontSize: 30,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
              headerStyle: {
                backgroundColor: colors.background,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: colors.placeholder,
              headerBackTitle: "",
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="Contact"
            component={Contact}
            options={{
              title: "Nous contacter",
              headerTitleStyle: {
                fontSize: 30,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
              headerStyle: {
                backgroundColor: colors.background,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: colors.placeholder,
              headerBackTitle: "",
              headerBackTitleVisible: false,
            }}
          />

          <Stack.Screen
            name="SuppCompte"
            component={SuppCompte}
            options={{
              title: "Supprimer le compte",
              headerTitleStyle: {
                fontSize: 30,
                fontFamily: fonts.semiBold,
                color: colors.primary,
              },
              headerStyle: {
                backgroundColor: colors.background,
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: colors.placeholder,
              headerBackTitle: "",
              headerBackTitleVisible: false,
            }}
          />
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

export default AppNavigator;
