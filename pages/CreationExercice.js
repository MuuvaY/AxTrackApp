import { Text, View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const CreationExercice = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;

  const styles = StyleSheet.create({});
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            styles.exerciceContainer,
            { paddingBottom: 100 },
          ]}
        ></ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CreationExercice;
