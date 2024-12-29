import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const getWeekDays = (currentDate) => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const weekDays = [];

  const startDay = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);

    date.setDate(currentDate.getDate() - startDay + i);
    weekDays.push({
      label: daysOfWeek[i],
      date: date.getDate(),
      isoDate: date.toISOString().split("T")[0],
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
      backgroundColor: "#292929",
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
              {day.date}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default WeekDays;
