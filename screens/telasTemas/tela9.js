import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const questions = [
  {
    question: "1.O poder familiar reúne direitos e deveres dos pais. Em casos graves, esse poder pode ser retirado judicialmente. Qual situação justifica a destituição do poder familiar?",
    options: [
      "Apenas notificar os pais da ação",
      "Defender os interesses dos pais",
      "Atuar obrigatoriamente no processo, protegendo o interesse da criança"
    ],
    answer: "Atuar obrigatoriamente no processo, protegendo o interesse da criança",
    explanation: "A destituição só ocorre em casos graves, como abandono, maus-tratos ou violência (CC, art. 1.638; ECA, arts. 22-24)."
  },
  {
    question: "2. Uma criança sofre negligência: sem alimentação, escola e em risco. Quem pode adotar providências legais e pedir a destituição do poder familiar?",
    options: [
      "Apenas um parente próximo",
      "Ministério Público ou qualquer pessoa com legitimo interesse",
      "Somente a própria criança"
    ],
    answer: "Ministério Público ou qualquer pessoa com legitimo interesse",
    explanation: "O ECA (art. 155) autoriza o Ministério Público ou qualquer interessado a propor ação judicial para proteger a criança."
  },
  {
    question: "3. A destituição do poder familiar pode ser decidida rapidamente e sem defesa dos pais, ou é preciso processo judicial com provas e direito de defesa?",
    options: [
      "Sim, se for urgente",
      "Sim, desde que o juiz ouça o Conselho Tutelar",
      "Não, é preciso decisão judicial com direito à defesa e prova"
    ],
    answer: "Não, é preciso decisão judicial com direito à defesa e prova",
    explanation: "A destituição exige processo judicial com ampla defesa e provas (CPC, art. 693; ECA, arts. 23-24)."
  },
  {
    question: "4. Quando o juiz determina a destituição do poder familiar, o que acontece com os direitos dos pais em relação ao filho?",
    options: [
      "Eles continuam podendo visitar e decidir sobre a educação da criança",
      "Eles perdem todos os direitos e deveres em relação ao filho",
      "Eles continuam responsáveis financeiramente, mas sem convivência"
    ],
    answer: "Eles perdem todos os direitos e deveres em relação ao filho",
    explanation: "Com a destituição, os pais perdem totalmente os direitos e deveres (ECA, art. 24; CC, art. 1.638)."
  },
  {
    question: "5. Em processos de destituição do poder familiar, qual é o papel do Ministério Público?",
    options: [
      "Apenas notificar os pais da ação",
      "Defender os interesses dos pais",
      "Atuar obrigatoriamente no processo, protegendo o interesse da criança"
    ],
    answer: "Atuar obrigatoriamente no processo, protegendo o interesse da criança",
    explanation: "O MP atua obrigatoriamente, fiscalizando a lei e defendendo a criança (CPC, art. 178; ECA, art. 201)."
  },
];


const Tela9Screen = () => {
  const navigation = useNavigation();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    setShowExplanation(true);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setAnswers([]);
    setCurrentIndex(0);
    setShowResult(false);
    setQuizStarted(false);
  };

  return (
    <LinearGradient
      colors={['#A67C7C', '#8B4A52', '#5D252A']}
      style={styles.container}
    >
      {!quizStarted ? (
        <View style={styles.startContainer}>
          <Text style={styles.homeTitle}>Curiosidades Sobre</Text>
          <Text style={styles.subTitle}>Destituição do poder da familia</Text>
          <Image source={require('../../assets/quiz/startImg.png')} style={styles.mainImg} />
          <Text style={styles.startTitle}>Responda ao quiz sobre a destituição do poder familiar.</Text>
          <TouchableOpacity style={styles.startButton} onPress={() => setQuizStarted(true)}>
            <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.startButton}>
              <Text style={styles.buttonText}>INICIAR QUIZ</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : showResult ? (
        <View style={styles.resultContainer}>
          <Image source={require('../../assets/quiz/trophyImg.png')} style={styles.feedbackImg} />
          <Text style={styles.resultTitle}>Parabéns você concluiu o quiz!</Text>
          <Text style={styles.resultText}>
            Você acertou {answers.filter((a, i) => a === questions[i].answer).length} de {questions.length}
          </Text>
          <Text style={styles.resultPhrase}>
            Continue estudando para fortalecer seus conhecimentos em direito de família.
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TELA10Final")}>
              <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.startButton}>
                <Text style={styles.buttonText}>Continuar</Text>
              </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.quizContainer}>
          {!showExplanation ? (
            <>
              <View style={styles.card}>
                <Image source={require('../../assets/quiz/startImg.png')} style={styles.mainImg} />
                <Text style={styles.question}>{questions[currentIndex].question}</Text>
                {questions[currentIndex].options.map((option, i) => (
                  <TouchableOpacity key={i} onPress={() => handleAnswer(option)}>
                    <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.optionButton}>
                      <Text style={styles.optionText}>{option}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <View style={styles.explanationContainer}>
              {selectedAnswer === questions[currentIndex].answer ? (
                <>
                  <Image source={require("../../assets/quiz/correctImg.png")} style={styles.feedbackImg} />
                  <Text style={styles.feedbackText}>Correto</Text>
                </>
              ) : (
                <>
                  <Image source={require("../../assets/quiz/incorrectImg.png")} style={styles.feedbackImg} />
                  <Text style={styles.feedbackText}>Incorreto</Text>
                </>
              )}
              <Text style={styles.explanationText}>{questions[currentIndex].explanation}</Text>
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.startButton}>
                  <Text style={styles.buttonText}>Próxima</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  startContainer: { 
    alignItems: "center",
  },
  homeTitle: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    color: '#D4AF37',
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  mainImg: { 
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 200,
    marginBottom: 10,
    borderColor: "#fff",
    borderWidth: 12,
    alignSelf: "center",
  },
  startTitle: { 
    fontSize: 15, 
    margin: 10, 
    textAlign: "center", 
    color: "#FFFFFF" 
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
  quizContainer: { 
    flexGrow: 1, 
    justifyContent: "center" 
  },
  question: { 
    fontSize: 23,
    marginTop: -10,
    margin: 10,
    color: "#000000",
    textAlign: "center",
    textAlign: "justify", 
    fontWeight: "bold",
  },
  optionButton: { 
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 30,
  },
  optionText: { 
    marginStart: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "justify",
    marginHorizontal: 15,
  },
  explanationContainer: {  
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  explanationText: { 
    fontSize: 20, 
    textAlign: "center", 
    padding: 20,
    marginBottom: -20, 
    color:  "#5D252A",
    fontWeight: "bold", 
    textAlign: "justify",
  },
  feedbackImg: { 
    resizeMode: "cover", 
    width: 200, 
    height: 200 
  },
  feedbackText: {  
    fontSize: 40, 
    color:  "#5D252A",
    fontWeight: "bold" 
  },
  resultContainer: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  resultTitle: { 
    fontSize: 36, 
    fontWeight: "bold", 
    marginBottom: 10,
    textAlign: "center", 
    color: "#FFFFFF" 
  },
  resultPhrase: { 
    textAlign: "center", 
    fontSize: 20,
    padding: 5, 
    marginBottom: 15, 
    color: "#ffffffff",
    fontWeight: "light", 
  },
  resultText: { 
    fontSize: 24, 
    margin: 20, 
    color: "#ffffffff",
    fontWeight: "bold",  
  },
  button: { 
    padding: 18, 
    borderRadius: 20, 
    marginVertical: 6, 
  },
  startButton: {
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
   card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default Tela9Screen;
