import React from 'react';
import { TouchableOpacity, Text,Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExitButton = ({ goTo = "Home" }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(goTo)}>
      <Image source={require('../../assets/icon1.png')} style={styles.imagem1} resizeMode="cover"/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 40,       
    right: 8,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  imagem1: {
    width: 30,
    height:30,
    padding:15,
    borderRadius: 200,
    alignSelf: 'center',
    borderColor: '#ffffffff',
    borderWidth:2,
  },
});

export default ExitButton;
