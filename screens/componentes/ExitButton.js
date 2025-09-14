import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExitButton = ({ goTo = "Home" }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(goTo)}>
      <Text style={styles.text}>🏠</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 35,       
    right: 8,
    borderColor: "#ffffffff",
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffffff",
  }
});

export default ExitButton;
