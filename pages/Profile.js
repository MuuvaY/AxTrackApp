import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    title: {
      color: colors.primary,
      fontSize: 45,
      fontFamily: fonts.semiBold,
      left: 30,
      top: 30,
      letterSpacing: 2,
    },
    text: {
      color: colors.text,
      fontSize: 20,
      backgroundColor: colors.secondBackground,
    },
    logoutButton: {
      backgroundColor: "red",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
      top: 200,
    },
    logoutText: {
      color: "white",
      fontSize: 18,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
