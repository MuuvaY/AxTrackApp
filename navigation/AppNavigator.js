import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import HomeTabs from "./HomeTabs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CreationSeance from "../pages/CreationSeance";
import Exercice from "../pages/Exercice";
import ExerciceDetail from "../pages/ExerciceDetail";
import CreationExercice from "../pages/CreationExercice";
import OptionsModal from "../components/OptionsModal";
import { UseSeanceActions } from "../components/UseSeanceActions";
import DonnerPerso from "../pages/DonnerPerso";
import { icons } from "./../assets/icons/icons";

import FinSeance from "../pages/FinSeance";

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

  const styles = StyleSheet.create({
    headerRightButton: {
      marginRight: 20,
    },
  });

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
            name="ExerciceDetail"
            component={ExerciceDetail}
            options={{ headerBackTitle: "", headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="CreationExercice"
            component={CreationExercice}
            options={{ headerShown: false, headerBackTitleVisible: false }}
          />
          <Stack.Screen
            name="DonnerPerso"
            component={DonnerPerso}
            options={{
              headerBackTitle: "",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="FinSeance"
            component={FinSeance}
            options={{
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
