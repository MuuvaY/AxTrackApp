import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Accueil from "../pages/Accueil";
import Seance from "../pages/Seance";
import Profile from "../pages/Profile";

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Accueil" component={Accueil} />
      <Tab.Screen name="Seance" component={Seance} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
