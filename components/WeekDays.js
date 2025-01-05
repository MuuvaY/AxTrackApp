// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { useTheme } from "../context/ThemeContext";
// import { getSeances } from "../api/Seance/Seance";

// const getWeekDays = (currentDate) => {
//   const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
//   const weekDays = [];
//   const startDay = currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1;

//   for (let i = 0; i < 7; i++) {
//     const date = new Date(currentDate);
//     date.setDate(currentDate.getDate() - startDay + i);
//     weekDays.push({
//       label: daysOfWeek[i],
//       date: date.getDate(),
//       isoDate: date.toISOString().split("T")[0],
//     });
//   }

//   return weekDays;
// };

// const getDayLabel = (isoDate) => {
//   const daysOfWeek = [
//     "Dimanche",
//     "Lundi",
//     "Mardi",
//     "Mercredi",
//     "Jeudi",
//     "Vendredi",
//     "Samedi",
//   ];
//   const date = new Date(isoDate);
//   return daysOfWeek[date.getDay()];
// };

// const WeekDays = () => {
//   const theme = useTheme();
//   const { colors, fonts } = theme;
//   const [seances, setSeances] = useState([]);
//   const currentDate = new Date();
//   const weekDays = getWeekDays(currentDate);

//   useEffect(() => {
//     const fetchSeances = async () => {
//       try {
//         const data = await getSeances();
//         console.log("Séances récupérées :", data);
//         setSeances(data);
//       } catch (err) {
//         console.error("Erreur lors de la récupération des séances", err);
//       }
//     };
//     fetchSeances();
//   }, []);

//   const hasSeanceOnDay = (isoDate) => {
//     const dayLabel = getDayLabel(isoDate);
//     return seances.some((seance) => seance.jour_semaine === dayLabel);
//   };

//   const styles = StyleSheet.create({
//     container: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       paddingHorizontal: 10,
//     },
//     dayColumn: {
//       flex: 1,
//       alignItems: "center",
//       marginHorizontal: 5,
//     },
//     dayWrapper: {
//       height: 80,
//       width: 45,
//       borderRadius: 10,
//       alignItems: "center",
//     },
//     currentDay: {
//       backgroundColor: "#292929",
//     },
//     contentContainer: {
//       height: "100%",
//       justifyContent: "space-between",
//       alignItems: "center",
//       paddingVertical: 8,
//     },
//     dayText: {
//       fontSize: 26,
//       color: colors.placeholder,
//       fontFamily: fonts.medium,
//       marginBottom: 5,
//     },
//     dateText: {
//       fontSize: 20,
//       color: colors.text,
//       fontFamily: fonts.medium,
//       marginVertical: 5,
//     },
//     point: {
//       width: 4,
//       height: 4,
//       borderRadius: 4,
//       backgroundColor: colors.secondary,
//     },
//   });

//   return (
//     <View style={styles.container}>
//       {weekDays.map((day, index) => (
//         <View key={index} style={styles.dayColumn}>
//           <View
//             style={[
//               styles.dayWrapper,
//               day.isoDate === currentDate.toISOString().split("T")[0]
//                 ? styles.currentDay
//                 : null,
//             ]}
//           >
//             <View style={styles.contentContainer}>
//               <Text style={styles.dayText}>{day.label}</Text>
//               <Text style={styles.dateText}>{day.date}</Text>
//               {hasSeanceOnDay(day.isoDate) && <View style={styles.point} />}
//             </View>
//           </View>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default WeekDays;

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getSeances } from "../api/Seance/Seance";

const getWeekDays = (currentDate) => {
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

const getDayLabel = (isoDate) => {
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const date = new Date(isoDate);
  return daysOfWeek[date.getDay()];
};

const WeekDays = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const [seances, setSeances] = useState([]);
  const currentDate = new Date();
  const weekDays = getWeekDays(currentDate);

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const data = await getSeances();
        console.log("Séances récupérées :", data);
        setSeances(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des séances", err);
      }
    };
    fetchSeances();
  }, []);

  const hasSeanceOnDay = (isoDate) => {
    const dayLabel = getDayLabel(isoDate);
    return seances.some((seance) => seance.jour_semaine === dayLabel);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
    dayColumn: {
      flex: 1,
      alignItems: "center",
      marginHorizontal: 8, // Augmenter la marge horizontale
    },
    dayWrapper: {
      height: 100, // Augmenter la hauteur du conteneur
      width: 55, // Augmenter la largeur du conteneur
      borderRadius: 12,
      position: "relative",
    },
    currentDay: {
      backgroundColor: "#292929",
    },
    dayText: {
      fontSize: 26,
      color: colors.placeholder,
      fontFamily: fonts.medium,
      position: "absolute",
      top: 12,
      width: "100%",
      textAlign: "center",
    },
    dateText: {
      fontSize: 20,
      color: colors.text,
      fontFamily: fonts.medium,
      position: "absolute",
      top: "55%",
      width: "100%",
      textAlign: "center",
      transform: [{ translateY: -9 }],
    },
    point: {
      width: 6,
      height: 6,
      borderRadius: 6,
      backgroundColor: colors.secondary,
      position: "absolute",
      bottom: 12,
      alignSelf: "center",
    },
  });

  return (
    <View style={styles.container}>
      {weekDays.map((day, index) => (
        <View key={index} style={styles.dayColumn}>
          <View
            style={[
              styles.dayWrapper,
              day.isoDate === currentDate.toISOString().split("T")[0]
                ? styles.currentDay
                : null,
            ]}
          >
            <Text style={styles.dayText}>{day.label}</Text>
            <Text style={styles.dateText}>{day.date}</Text>
            {hasSeanceOnDay(day.isoDate) && <View style={styles.point} />}
          </View>
        </View>
      ))}
    </View>
  );
};

export default WeekDays;
