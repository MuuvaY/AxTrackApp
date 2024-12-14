import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accueil from "../pages/Accueil";
import Seance from "../pages/Seance";
import Profile from "../pages/Profile";
import colors from "../constants/colors";

import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator style={styles.container}>
      <Tab.Screen name="Accueil" component={Accueil} />
      <Tab.Screen name="Seance" component={Seance} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
});
export default HomeTabs;
