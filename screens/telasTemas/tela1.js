import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const curiosities = [
  {
    title: "CURIOSIDADE 1",
    question:
      "1.Você sabia que ato infracional não aparece como “antecedente criminal” quando o adolescente vira adulto?",
    answer:
      "Porque a lei entende que erros cometidos na adolescência não podem marcar a pessoa para sempre.",
    art: "Art. 103 e 111 do ECA",
  },
  {
    title: "CURIOSIDADE 2",
    question:
      "2.Você sabia que um ato infracional pode ser só uma “bronca” do juiz?",
    answer:
      "Por quê? Porque em casos leves, o juiz pode aplicar só uma advertência (um tipo de sermão formal), sem nenhuma outra punição.",
    art: "Art. 112, I do ECA",
  },
  {
    title: "CURIOSIDADE 3",
    question:
      "3.Você sabia que a maioria dos adolescentes que cumprem medidas não fica internada?",
    answer:
      "Por quê? Porque existem medidas como prestação de serviços, liberdade assistida e até reparação de danos, que ajudam o jovem a repensar suas atitudes sem ser isolado da sociedade.",
    art: "Art. 112 do ECA",
  },
  {
    title: "CURIOSIDADE 4",
    question:
      "4.Você sabia que o juiz pode escolher a medida pensando no que é melhor para a vida do adolescente?",
    answer:
      "Por quê? Porque o ECA manda avaliar história de vida, família, estudo e até vícios para decidir a medida mais justa e educativa.",
    art: "Art. 112 do ECA",
  },
  {
    title: "CURIOSIDADE 5",
    question:
      "5.Você sabia que o advogado nomeado pelo juiz pode ser o único defensor do adolescente durante todo o processo?",
    answer:
      "Por quê? Porque muitos adolescentes não têm condições de contratar um advogado, e a Justiça garante que ninguém fique sem defesa.",
    art: "Art. 111, III do ECA",
  },
  {
    title: "CURIOSIDADE 6",
    question:
      "6.Você sabia que mesmo internado o adolescente tem direito a estudar e fazer cursos?",
    answer:
      "Por quê? Porque o objetivo não é só punir, é dar ferramentas para que ele tenha um futuro melhor.",
    art: "Art. 124, VI do ECA",
  },
];

const Tela1Screen = ({ navigation }) => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    if (currentIndex < curiosities.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setFinished(false);
    setStarted(false);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  // Tela inicial
  if (!started && !finished) {
    return (
      <LinearGradient
        colors={["#A67C7C", "#8B4A52", "#5D252A"]}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.homeTitle1}>Curiosidades Sobre</Text>
          <Text style={styles.subTitle}>Atos Infracionais</Text>
        </View>
        <View style={styles.homeBody}>
          <Image source={require("../../assets/atosInfracionaisImagem.jpg")} style={styles.homeImg}/>
          <Text style={styles.descriptionText}>
            Descubra fatos importantes sobre o direito juvenil e o ECA
          </Text>
        </View>
        <TouchableOpacity onPress={() => setStarted(true)}>
          <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.startButton}>
            <Text style={styles.startButtonText}>INICIAR QUIZ</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  // Tela final
  if (finished) {
    return (
      <LinearGradient
        colors={["#A67C7C", "#8B4A52", "#5D252A"]}
        style={styles.container}
      >
        <Text style={styles.title2}> 🎉   Parabéns!   🎉  </Text>
        <Text style={styles.question2}>Você explorou todas as ciriosidades!</Text>
        <Text style={styles.question3}>Agora você conhece mais sobre ato Infracionais a o ECA!</Text>
        <View  style={styles.rowButtons}>
            <TouchableOpacity onPress={handleRestart} >
              <LinearGradient colors={["#8B4A52", "#5D252A","#5D252A", "#411619ff"]}  end={{ x: 1, y: 1 }}style={styles.quizButton}  >
                <Text style={styles.buttonText2}>Refazer Quiz</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.homeButton} onPress={() => navigation.navigate("Home")} >
              <Text style={styles.buttonText3}>Voltar Menu Principal</Text>
            </TouchableOpacity>
          </View>
      </LinearGradient>
    );
  }

  // Tela das curiosidades
  const current = curiosities[currentIndex];
  return (
    <LinearGradient colors={["#A67C7C", "#8B4A52", "#5D252A"]} style={styles.container}>
      <Text style={styles.homeTitle2}>Quiz para Atos</Text>
      <Text style={styles.homeTitle3}>Infracionais</Text>
      <View style={styles.card}>
        <Image source={require("../../assets/atosInfracionaisImagem.jpg")} style={styles.homeImg}/>
        <Text style={styles.question1}>{current.question}</Text>

        {showAnswer && (
          <View style={styles.answerBox}>
            <Text style={styles.answer}>{current.answer}</Text>
            <Text style={styles.art}>{current.art}</Text>
          </View>
        )}
        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => setShowAnswer(!showAnswer)}
          >
            <Text style={styles.btnText}>
              {showAnswer ? "Esconder Resposta" : "Mostrar Resposta"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.btnText}>
              {currentIndex < curiosities.length - 1 ? "Próximo" : "Finalizar"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignSelf: "center",
  },
  homeTitle1: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
   homeTitle2: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  homeTitle3: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subTitle: {
    color: '#D4AF37',
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  homeBody: {
    alignItems: "center",
    paddingVertical: 20,
  },
  homeImg: {
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 200,
    marginBottom: 10,
    borderColor: "#fff",
    borderWidth: 12,
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 15,
    textAlign: "center",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
  },
  title1: {
    fontSize:30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#8B4A52",
    textAlign: "center",
  },
  title2: {
    fontSize:35,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  question1: {
    fontSize: 23,
    marginTop: -10,
    margin: 10,
    color: "#000000",
    textAlign: "center",
    textAlign: "justify", 
    fontWeight: "bold",
  },
  question2: {
    fontSize: 20,
    marginBottom: 20,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  question3: {
    fontSize: 12,
    marginBottom: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  answerBox: {
    padding: 10,
    backgroundColor:"#f0dee0ff",
    borderRadius: 8,
  },
  answer: {
    fontSize: 18,
    color: "#000000",
    marginBottom: 5,
    textAlign: "justify",
  },
  art: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#552125ff",
  },
  toggleBtn: {
    width: 200,
    backgroundColor: '#8B4A52',
    padding: 10,
    borderRadius: 30,
    marginVertical: 8,
    alignItems: "center",
  },
  nextBtn: {
    width: 110,
    backgroundColor: '#D4AF37',
    padding: 10,
    borderRadius: 30,
    marginVertical: 8,
    marginLeft: 10,
    alignItems: "center",
  },
  startButton: {
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
    quizButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,
    alignItems: "center",
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
});

export default Tela1Screen;
