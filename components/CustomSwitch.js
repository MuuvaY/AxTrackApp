// // // // import React, { useState, useRef, useEffect } from "react";
// // // // import { View, Text, Switch, StyleSheet, Animated } from "react-native";
// // // // import { useTheme } from "../context/ThemeContext";

// // // // const CustomSwitch = ({ label, value, onValueChange, IconComponent }) => {
// // // //   const theme = useTheme();
// // // //   const { colors, fonts } = theme;

// // // //   const animatedValue = useRef(new Animated.Value(0)).current;

// // // //   useEffect(() => {
// // // //     Animated.timing(animatedValue, {
// // // //       toValue: value ? 1 : 0, // si activé (true), l'animation est à 1, sinon à 0
// // // //       duration: 300, // Durée de l'animation
// // // //       useNativeDriver: false, // Nous animons des propriétés comme l'opacité et la hauteur, donc on n'utilise pas le native driver
// // // //     }).start();
// // // //   }, [value]);

// // // //   const containerAnimatedStyle = {
// // // //     opacity: animatedValue, // Animation sur l'opacité
// // // //     height: animatedValue.interpolate({
// // // //       inputRange: [0, 1],
// // // //       outputRange: [0, 54], // Quand l'animation est à 1 (true), la hauteur sera 54
// // // //     }),
// // // //   };

// // // //   const styles = StyleSheet.create({
// // // //     container: {
// // // //       alignItems: "center",
// // // //     },
// // // //     switchContainer: {
// // // //       flexDirection: "row",
// // // //       justifyContent: "space-between",
// // // //       alignItems: "center",
// // // //       marginBottom: 20,
// // // //       backgroundColor: colors.secondBackground,
// // // //       height: 54,
// // // //       width: 355,
// // // //       borderRadius: 5,
// // // //       paddingRight: 15,
// // // //     },
// // // //     labelContainer: {
// // // //       flexDirection: "row",
// // // //       alignItems: "center",
// // // //       justifyContent: "flex-start",
// // // //     },
// // // //     label: {
// // // //       fontSize: 30,
// // // //       paddingLeft: 45,
// // // //       fontFamily: fonts.medium,
// // // //       color: colors.text,
// // // //     },
// // // //     icon: {
// // // //       position: "absolute",
// // // //       left: 10,
// // // //       zIndex: 1000,
// // // //     },
// // // //   });
// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <View style={styles.switchContainer}>
// // // //         <View style={styles.labelContainer}>
// // // //           {IconComponent && (
// // // //             <IconComponent
// // // //               width={24}
// // // //               height={24}
// // // //               color={colors.primary}
// // // //               style={styles.icon}
// // // //             />
// // // //           )}
// // // //           <Text style={styles.label}>{label}</Text>
// // // //         </View>
// // // //         <Switch
// // // //           value={value}
// // // //           onValueChange={onValueChange}
// // // //           trackColor={{ false: colors.primary, true: colors.secondary }}
// // // //           thumbColor={colors.text}
// // // //           style={styles.switch}
// // // //         />
// // // //       </View>

// // // //       {/* Animation de l'élément qui suit le switch */}
// // // //       <Animated.View style={[containerAnimatedStyle]}>
// // // //         {/* Contenu animé qui peut être étendu ou réduit */}
// // // //         <Text style={styles.label}>Exemple de texte animé</Text>
// // // //       </Animated.View>
// // // //     </View>
// // // //   );
// // // // };

// // // // export default CustomSwitch;

// // // import React, { useState, useRef, useEffect } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   Switch,
// // //   StyleSheet,
// // //   Animated,
// // //   TextInput,
// // // } from "react-native";
// // // import { useTheme } from "../context/ThemeContext";
// // // import { Picker } from "@react-native-picker/picker";

// // // const CustomSwitch = ({
// // //   label,
// // //   value,
// // //   onValueChange,
// // //   IconComponent,
// // //   pickerPlaceholder = "Entrez une valeur",
// // //   onPickerValueChange,
// // // }) => {
// // //   const theme = useTheme();
// // //   const { colors, fonts } = theme;
// // //   const [pickerValue, setPickerValue] = useState("");
// // //   const animatedHeight = useRef(new Animated.Value(0)).current;
// // //   const [selectedValue, setSelectedValue] = useState(0);

// // //   useEffect(() => {
// // //     Animated.timing(animatedHeight, {
// // //       toValue: value ? 54 : 0,
// // //       duration: 300,
// // //       useNativeDriver: false,
// // //     }).start();
// // //   }, [value]);

// // //   const handlePickerChange = (text) => {
// // //     setPickerValue(text);
// // //     if (onPickerValueChange) {
// // //       onPickerValueChange(text);
// // //     }
// // //   };

// // //   const styles = StyleSheet.create({
// // //     container: {
// // //       alignItems: "center",
// // //       overflow: "hidden",
// // //       marginBottom: 20,
// // //     },
// // //     switchContainer: {
// // //       flexDirection: "row",
// // //       justifyContent: "space-between",
// // //       alignItems: "center",
// // //       backgroundColor: colors.secondBackground,
// // //       height: 54,
// // //       width: 355,
// // //       borderRadius: value ? 5 : 5,
// // //       borderBottomLeftRadius: value ? 0 : 5,
// // //       borderBottomRightRadius: value ? 0 : 5,
// // //       paddingRight: 15,
// // //       marginBottom: 0,
// // //     },
// // //     labelContainer: {
// // //       flexDirection: "row",
// // //       alignItems: "center",
// // //       justifyContent: "flex-start",
// // //     },
// // //     label: {
// // //       fontSize: 30,
// // //       paddingLeft: 45,
// // //       fontFamily: fonts.medium,
// // //       color: colors.text,
// // //     },
// // //     icon: {
// // //       position: "absolute",
// // //       left: 10,
// // //       zIndex: 1000,
// // //     },
// // //     expandableInput: {
// // //       backgroundColor: colors.secondBackground,
// // //       height: 54,
// // //       fontSize: 28,
// // //       color: colors.secondary,
// // //       letterSpacing: 2,
// // //       fontFamily: fonts.medium,
// // //       paddingLeft: 15,
// // //       borderColor: "transparent",
// // //       justifyContent: "center",
// // //       borderTopLeftRadius: 0,
// // //       borderTopRightRadius: 0,
// // //       borderBottomLeftRadius: 5,
// // //       borderBottomRightRadius: 5,
// // //       width: 355,
// // //     },
// // //   });

// // //   return (
// // //     <View style={styles.container}>
// // //       <View style={styles.switchContainer}>
// // //         <View style={styles.labelContainer}>
// // //           {IconComponent && (
// // //             <IconComponent
// // //               width={24}
// // //               height={24}
// // //               color={colors.primary}
// // //               style={styles.icon}
// // //             />
// // //           )}
// // //           <Text style={styles.label}>{label}</Text>
// // //         </View>
// // //         <Switch
// // //           value={value}
// // //           onValueChange={onValueChange}
// // //           trackColor={{ false: colors.primary, true: colors.secondary }}
// // //           thumbColor={colors.text}
// // //         />
// // //       </View>
// // //       <Animated.View style={{ height: animatedHeight }}>
// // //         <Picker
// // //           selectedValue={selectedValue}
// // //           onValueChange={(itemValue) => setSelectedValue(itemValue)}
// // //           style={{ height: 50, width: 150 }}
// // //         >
// // //           {Array.from({ length: 11 }, (_, index) => (
// // //             <Picker.Item key={index} label={`${index}`} value={index} />
// // //           ))}
// // //         </Picker>
// // //       </Animated.View>
// // //     </View>
// // //   );
// // // };

// // // export default CustomSwitch;

// import React, { useState, useRef, useEffect } from "react";
// import { View, Text, Switch, StyleSheet, Animated } from "react-native";
// import { useTheme } from "../context/ThemeContext";
// import { Picker } from "@react-native-picker/picker";

// const CustomSwitch = ({
//   label,
//   value,
//   onValueChange,
//   IconComponent,
//   pickerPlaceholder = "Entrez une valeur",
//   onPickerValueChange,
// }) => {
//   const theme = useTheme();
//   const { colors, fonts } = theme;
//   const [selectedValue, setSelectedValue] = useState(0);
//   const animatedHeight = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(animatedHeight, {
//       toValue: value ? 200 : 0,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   }, [value]);

//   const styles = StyleSheet.create({
//     container: {
//       alignItems: "center",
//       overflow: "hidden",
//       marginBottom: 20,
//     },
//     switchContainer: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//       backgroundColor: colors.secondBackground,
//       height: 54,
//       width: 355,
//       borderRadius: value ? 0 : 5,
//       borderBottomRightRadius: value ? 0 : 5,
//       borderBottomLeftRadius: value ? 0 : 5,
//       // borderTopRightRadius: value ? 5 : 0,
//       // borderTopLeftRadius: value ? 5 : 0,
//       // borderRadius: 5,
//       paddingRight: 15,
//     },
//     labelContainer: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "flex-start",
//     },
//     label: {
//       fontSize: 30,
//       paddingLeft: 45,
//       fontFamily: fonts.medium,
//       color: colors.text,
//     },
//     icon: {
//       position: "absolute",
//       left: 10,
//       zIndex: 1000,
//     },
//     pickerContainer: {
//       backgroundColor: colors.secondBackground,
//       width: 355,
//       borderBottomLeftRadius: 5,
//       borderBottomRightRadius: 5,
//     },
//     picker: {
//       height: 100,
//       width: 355,
//       color: colors.text,
//     },
//   });

//   const numberArray = Array.from({ length: 11 }, (_, index) => index);

//   return (
//     <View style={styles.container}>
//       <View style={styles.switchContainer}>
//         <View style={styles.labelContainer}>
//           {IconComponent && (
//             <IconComponent
//               width={24}
//               height={24}
//               color={colors.primary}
//               style={styles.icon}
//             />
//           )}
//           <Text style={styles.label}>{label}</Text>
//         </View>
//         <Switch
//           value={value}
//           onValueChange={onValueChange}
//           trackColor={{ false: colors.primary, true: colors.secondary }}
//           thumbColor={colors.text}
//         />
//       </View>
//       <Animated.View
//         style={[styles.pickerContainer, { height: animatedHeight }]}
//       >
//         {value && (
//           <Picker
//             selectedValue={selectedValue.toString()}
//             onValueChange={(itemValue) => {
//               const numberValue = parseInt(itemValue, 10);
//               setSelectedValue(numberValue);
//               if (onPickerValueChange) {
//                 onPickerValueChange(numberValue);
//               }
//             }}
//             style={styles.picker}
//           >
//             {numberArray.map((number) => (
//               <Picker.Item
//                 key={number}
//                 label={`${number}`}
//                 value={`${number}`}
//               />
//             ))}
//           </Picker>
//         )}
//       </Animated.View>
//     </View>
//   );
// };

// export default CustomSwitch;

import React, { useState, useRef, useEffect } from "react";
import { View, Text, Switch, StyleSheet, Animated } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Picker } from "@react-native-picker/picker";

const CustomSwitch = ({
  label,
  value,
  onValueChange,
  IconComponent,
  pickerPlaceholder = "Entrez une valeur",
  onPickerValueChange,
}) => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const [selectedValue, setSelectedValue] = useState(0);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: value ? 200 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      overflow: "hidden",
      marginBottom: 20,
    },
    switchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colors.secondBackground,
      height: 54,
      width: 355,
      // Applique 5px pour les coins supérieurs (top) et 0px pour les coins inférieurs (bottom) quand activé
      borderTopLeftRadius: value ? 5 : 5, // Coins supérieurs à 5
      borderTopRightRadius: value ? 5 : 5, // Coins supérieurs à 5
      borderBottomLeftRadius: value ? 0 : 5, // Coins inférieurs à 0 quand activé, à 5 quand désactivé
      borderBottomRightRadius: value ? 0 : 5, // Coins inférieurs à 0 quand activé, à 5 quand désactivé
      paddingRight: 15,
    },
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    label: {
      fontSize: 30,
      paddingLeft: 45,
      fontFamily: fonts.medium,
      color: colors.text,
    },
    icon: {
      position: "absolute",
      left: 10,
      zIndex: 1000,
    },
    pickerContainer: {
      backgroundColor: colors.secondBackground,
      width: 355,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
    picker: {
      height: 100,
      width: 355,
      color: colors.text,
    },
  });

  const numberArray = Array.from({ length: 11 }, (_, index) => index);

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <View style={styles.labelContainer}>
          {IconComponent && (
            <IconComponent
              width={24}
              height={24}
              color={colors.primary}
              style={styles.icon}
            />
          )}
          <Text style={styles.label}>{label}</Text>
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.primary, true: colors.secondary }}
          thumbColor={colors.text}
        />
      </View>
      <Animated.View
        style={[styles.pickerContainer, { height: animatedHeight }]}
      >
        {value && (
          <Picker
            selectedValue={selectedValue.toString()}
            onValueChange={(itemValue) => {
              const numberValue = parseInt(itemValue, 10);
              setSelectedValue(numberValue);
              if (onPickerValueChange) {
                onPickerValueChange(numberValue);
              }
            }}
            style={styles.picker}
          >
            {numberArray.map((number) => (
              <Picker.Item
                key={number}
                label={`${number}`}
                value={`${number}`}
              />
            ))}
          </Picker>
        )}
      </Animated.View>
    </View>
  );
};

export default CustomSwitch;
