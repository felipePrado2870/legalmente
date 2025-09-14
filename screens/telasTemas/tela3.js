import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ExitButton from '../componentes/ExitButton';

const Tela3Screen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#A67C7C", "#8B4A52", "#5D252A"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Questionário Sobre </Text>
        <Text style={styles.subtitle}>Reconhecimento de Casamento</Text>
        <Image
          source={require("../../assets/guiaCasamento/guiaCasamento.png")}
          style={styles.icon}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          Teste se sua união se enquadra nas regras legais para reconhecimento de união estável!
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("QuizCasamento")}>
          <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.startButton}>
            <Text style={styles.startButtonText}>INICIAR QUIZ</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <ExitButton goTo="Home" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: '#D4AF37',
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    resizeMode: "cover",
    borderRadius: 200,
    marginBottom: 10,
    borderColor: "#fff",
    borderWidth: 12,
  },
  description: {
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  startButton: {
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 90,
    alignItems: "center",
    alignSelf: "center",
    borderColor: '#D4AF37',
    borderWidth: 2,
    overflow: "hidden",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Tela3Screen;
