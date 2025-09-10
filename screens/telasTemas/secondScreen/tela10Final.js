import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ExitButton from '../../componentes/ExitButton';

export default function Tela10Final({ navigation}) {
  return (
    <LinearGradient colors={["#A67C7C", "#8B4A52", "#5D252A"]} style={styles.container}>
        <View>
          <Text style={styles.title}>Você chegou ao fim!</Text>
          <Text style={styles.text}>
            A destituição do poder familiar é uma medida excepcional aplicada em situações graves, 
            como abandono, violência ou negligência.
          </Text>
          <Text style={styles.text}>
            Ela só pode ser decidida por um juiz, com participação do Ministério Público, sempre garantindo
            o direito de defesa.
          </Text>
          <Text style={styles.text}>
            O objetivo principal da lei é proteger o melhor interesse da criança ou adolescente.
          </Text>
        </View>
        <View style={styles.rowButtons}>
          <TouchableOpacity onPress={() => navigation.replace("TELA9")}>
            <LinearGradient colors={["#8B4A52", "#5D252A","#5D252A", "#411619ff"]}  end={{ x: 1, y: 1 }}style={styles.quizButton}  >
              <Text style={styles.buttonText2}>Refazer Quiz</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.homeButton} onPress={() => navigation.navigate("Home")} >
            <Text style={styles.buttonText3}>Voltar Menu Principal</Text>
            </TouchableOpacity>
        </View>
        <ExitButton goTo="Home" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: { 
    fontSize: 35,
    fontWeight:"bold",
    color:"#ffffffff",
    marginBottom: 10 ,
    textAlign:"center",
    fontWeight: "bold", 
  },
  text:{
    color:"#ffffffff",
    fontSize:20,
    textAlign:"center",
    padding:5,
    fontWeight: "light", 
    textAlign: "justify",
  },
  buttonBody:{
   flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  rowButtons: {
   flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  }, 
  homeButton: {
   backgroundColor: '#ab8085b2',
    padding: 15,
    borderRadius: 10,
    borderColor: "#fff",  
    borderWidth: 2, 
    marginTop: 20,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText2: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText3: {
    color: "#FFFFFF",
    fontSize: 15,
  },
   quizButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,
    alignItems: "center",
  },
});
