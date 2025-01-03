import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const CustomSwitch = ({ label, value, onValueChange, IconComponent }) => {
  const theme = useTheme();
  const { colors, fonts } = theme;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    switchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      backgroundColor: colors.secondBackground,
      height: 54,
      width: 355,
      borderRadius: 5,
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
  });
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
          style={styles.switch}
        />
      </View>
    </View>
  );
};

export default CustomSwitch;
