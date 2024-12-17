import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../components/ThemeContext";

// Fonction pour obtenir les 7 jours de la semaine avec la date
const getWeekDays = (currentDate) => {
  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const weekDays = [];

  // Ajuster le calcul des jours pour que la semaine commence à "Lun"
  // Si on est dimanche (0), on met dimanche à la fin de la semaine
  const startDay = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    // Modifier le calcul des dates pour que la semaine commence le lundi
    date.setDate(currentDate.getDate() - startDay + i);
    weekDays.push({
      label: daysOfWeek[i], // Les jours de la semaine de "Lun" à "Dim"
      date: date.getDate(), // Extraire uniquement le jour du mois
      isoDate: date.toISOString().split("T")[0], // Format date ISO pour comparaison
    });
  }

  return weekDays;
};

const WeekDays = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    dayContainer: {
      flex: 1,
      alignItems: "center",
      height: 75,
      width: 45,
      padding: 10,
      marginHorizontal: 2,
      borderRadius: 5,
      justifyContent: "center",
    },
    currentDay: {
      backgroundColor: "#292929", // Couleur pour le jour actuel
    },
    dayText: {
      fontSize: 26,
      color: colors.placeholder,
      fontFamily: fonts.medium,
      letterSpacing: 1,
      textAlign: "center",
      marginBottom: 5,
    },
    dateText: {
      fontSize: 20,
      color: colors.text,
      fontFamily: fonts.medium,
      letterSpacing: 1,
      textAlign: "center",
    },
    currentDayText: {},
  });

  const currentDate = new Date();
  const weekDays = getWeekDays(currentDate);

  return (
    <View style={styles.container}>
      {weekDays.map((day, index) => (
        <View
          key={index}
          style={[
            styles.dayContainer,
            day.isoDate === currentDate.toISOString().split("T")[0]
              ? styles.currentDay
              : null,
          ]}
        >
          <View>
            <Text
              style={[
                styles.dayText,
                day.isoDate === currentDate.toISOString().split("T")[0]
                  ? styles.currentDayText
                  : null,
              ]}
            >
              {day.label} {/* Affiche "Lun", "Mar", etc. */}
            </Text>
            <Text
              style={[
                styles.dateText,
                day.isoDate === currentDate.toISOString().split("T")[0]
                  ? styles.currentDayText
                  : null,
              ]}
            >
              {day.date} {/* Affiche le jour du mois */}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default WeekDays;
