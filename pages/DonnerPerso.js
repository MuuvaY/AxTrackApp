import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Text, SafeAreaView } from "react-native";

const DonnerPerso = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;

  return (
    <>
      <SafeAreaView>
        <Text>Bonjour</Text>
      </SafeAreaView>
    </>
  );
};
export default DonnerPerso;
