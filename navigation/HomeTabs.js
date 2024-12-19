import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accueil from "../pages/Accueil";
import Seance from "../pages/Seance";
import Profile from "../pages/Profile";
import Test from "../pages/TestTokenScreen";

import { StyleSheet, View, Image } from "react-native";
import { useTheme } from "../components/ThemeContext";
import { icons } from "./../assets/icons/icons";

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon: Icon, color }) => {
  return (
    <View>
      <Icon width={28} height={28} color={color} />
    </View>
  );
};

const HomeTabs = () => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.placeholder,
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={Accueil}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.Home}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Seance"
        component={Seance}
        options={{
          title: "Séance",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.Dumbell}
              color={color}
              name="Seance"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.User}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Test"
        component={Test}
        options={{
          title: "Test",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.User}
              color={color}
              name="Test"
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
