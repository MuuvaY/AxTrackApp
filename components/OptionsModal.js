import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

const OptionsModal = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  colors,
  fonts,
  editText = "Modifier",
  deleteText = "Supprimer",
  icons,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <Pressable
          style={[styles.modalContent, { backgroundColor: colors.background }]}
          onPress={(e) => e.stopPropagation()}
        >
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              onEdit();
              onClose();
            }}
          >
            <icons.Edit width={24} height={24} color={colors.text} />
            <Text
              style={[
                styles.modalOptionText,
                {
                  color: colors.text,
                  fontFamily: fonts.medium,
                },
              ]}
            >
              {editText}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              onDelete();
              onClose();
            }}
          >
            <icons.Trash width={24} height={24} color="#FF3B30" />
            <Text
              style={[
                styles.modalOptionText,
                styles.modalOptionDelete,
                { fontFamily: fonts.medium },
              ]}
            >
              {deleteText}
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOption: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  modalOptionText: {
    fontSize: 18,
    marginLeft: 15,
  },
  modalOptionDelete: {
    color: "#FF3B30",
  },
});

export default OptionsModal;
