import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { icons } from "./../assets/icons/icons";
import { getUserProfile, updateUserProfile } from "../api/User/User";

const DonneePerso = () => {
  const theme = useTheme();
  const { colors, fonts } = theme;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingNom, setEditingNom] = useState(false);
  const [editingPrenom, setEditingPrenom] = useState(false);
  const [editingAge, setEditingAge] = useState(false);

  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        setUserData(data);
      } catch (err) {
        setError("Impossible de récupérer vos informations");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (field, value, setEditing) => {
    try {
      if (!userData?.user_id) return;

      const updateData = {
        ...userData,
        [field]: value,
      };

      await updateUserProfile(userData.user_id, updateData);
      setEditing(false);

      setUserData((prev) => ({
        ...prev,
        [field]: value,
      }));
    } catch (error) {
      Alert.alert("Erreur", "Impossible de mettre à jour vos informations");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    titleContainer: {
      left: 30,
      top: 30,
    },
    title: {
      color: colors.primary,
      fontSize: 45,
      fontFamily: fonts.semiBold,
      letterSpacing: 2,
    },
    dataPersoContainer: {
      height: 54,
      width: 355,
      backgroundColor: colors.secondBackground,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderRadius: 5,
      marginBottom: "7%",
    },
    dataPersoText: {
      fontFamily: fonts.medium,
      color: colors.text,
      fontSize: 30,
      paddingLeft: 45,
    },
    icon: {
      position: "absolute",
      left: 10,
    },
    icon2: {
      position: "absolute",
      right: 15,
    },
    infoContainer: {
      marginTop: 80,
      paddingHorizontal: 30,
    },
    infoSection: {
      marginBottom: 20,
    },
    infoLabel: {
      color: colors.secondary,
      fontSize: 24,
      fontFamily: fonts.medium,
      marginBottom: 5,
    },
    infoValue: {
      color: colors.text,
      fontSize: 24,
      fontFamily: fonts.regular,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      color: "red",
      fontSize: 18,
      textAlign: "center",
      marginTop: 20,
    },
    input: {
      fontFamily: fonts.medium,
      color: colors.text,
      fontSize: 30,
      paddingLeft: 45,
      flex: 1,
    },
    saveButtonContainer: {
      marginTop: 80,
      // width: "100%",
      // height: "100%",
      alignItems: "center",
    },
    button: {
      backgroundColor: colors.secondary,
      borderRadius: 5,
      height: 54,
      width: 355,

      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: colors.text,
      letterSpacing: 2,
      fontFamily: fonts.medium,
      fontSize: 32,
    },
  });

  const renderField = (label, value, editing, setEditing) => {
    return (
      <TouchableOpacity
        style={styles.dataPerso}
        onPress={() => {
          setEditing(true);
          setActiveField(label.toLowerCase());
        }}
      >
        <View style={styles.dataPersoContainer}>
          <icons.UserRound
            width={24}
            height={24}
            color={colors.primary}
            style={styles.icon}
          />
          {editing ? (
            <TextInput
              style={styles.input}
              value={value?.toString()}
              onChangeText={(text) => {
                const newData = { ...userData };
                newData[label.toLowerCase()] = text;
                setUserData(newData);
              }}
              autoFocus
              placeholder={label}
              placeholderTextColor={colors.placeholder}
            />
          ) : (
            <Text style={styles.dataPersoText}>{value || "-"}</Text>
          )}
          <icons.Edit
            width={24}
            height={24}
            color={colors.placeholder}
            style={styles.icon2}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.donnerPerso}>
          {renderField("Nom", userData?.nom, editingNom, setEditingNom)}
        </View>
        <View style={styles.donnerPerso}>
          {renderField(
            "Prenom",
            userData?.prenom,
            editingPrenom,
            setEditingPrenom
          )}
        </View>
        <View style={styles.donnerPerso}>
          {renderField("Age", userData?.age, editingAge, setEditingAge)}
        </View>
      </View>

      {activeField && (
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleUpdate(activeField, userData[activeField], () => {
                setEditingNom(false);
                setEditingPrenom(false);
                setEditingAge(false);
                setActiveField(null);
              });
            }}
          >
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default DonneePerso;
