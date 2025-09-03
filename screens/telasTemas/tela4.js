import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Tela4Screen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#A67C7C", "#8B4A52", "#5D252A"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Quiz Violência Doméstica</Text>
        <Text style={styles.subtitle}>Verdadeiro ou Falso</Text>
        <Image
          source={require("../../assets/verdadeOfalsoImagem.jpg")}
          style={styles.icon}
          resizeMode="contain"
        />

        <Text style={styles.description}>
          Teste seus conhecimentos sobre medidas protetivas e direitos da
          criança e adolescente
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate("QuizVerdFalso")}>
          <LinearGradient
            colors={["#8B4A52", "#8B4A52", "#5D252A"]}
            style={styles.startButton}
          >
            <Text style={styles.startButtonText}>INICIAR QUIZ</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#FFD700", 
    marginBottom: 30,
    fontWeight: "bold",
  },
  icon: {
    width: 180,
    height: 180,
    borderRadius:150,
    marginBottom: 25,
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
  },
  startButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Tela4Screen;
