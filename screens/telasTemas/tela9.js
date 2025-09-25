import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ExitButton from '../componentes/ExitButton';

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
          <Text style={styles.homeTitle}>Questionário Sobre</Text>
          <Text style={styles.subTitle}>Destituição do poder da familia</Text>
          <Image source={require('../../assets/quiz/destituiçãofamilia.png')} style={styles.mainImg1} />
          <Text style={styles.startTitle}>Teste seus conhecimentos e descubra como o Direito protege crianças e adolecentes em situações delicadas. Aprenda de forma prática e divertida</Text>
          <TouchableOpacity onPress={() => setQuizStarted(true)}>
            <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.startButton}>
              <Text style={styles.buttonText}>INICIAR QUIZ</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : showResult ? (
        <View style={styles.resultContainer}>
          <View style={styles.card2}>
            <Text style={styles.resultTitle}>Você chagou ao fim!</Text>
            <Text style={styles.resultText}>
             Você acertou {answers.filter((a, i) => a === questions[i].answer).length} de {questions.length}
            </Text>
            <View style={styles.card3}>
              <Text style={styles.resultPhrase1}>
                .
              </Text>
              <Text style={styles.resultPhrase2}>
                A destituição do poder famiLiar é uma medida excepcional aplicada em situações graves, como abandono, violência ou negligência.
              </Text>
            </View>
            <View style={styles.card3}>
              <Text style={styles.resultPhrase1}>
                .
              </Text>
              <Text style={styles.resultPhrase2}>
                Ela só poder ser decidida po um juiz com participação no Ministerio Público sempre garantindo o direito de defesa.
              </Text>
            </View>
            <View style={styles.card3}>
              <Text style={styles.resultPhrase1}>
                 .
              </Text>
              <Text style={styles.resultPhrase2}>
                O objetivo principal da lei é proteger o melhor interesse da criança ou adolecente.
              </Text>
            </View>
            <View style={styles.rowButtons}>
              <TouchableOpacity onPress={() => navigation.replace("TELA9")}>
                <LinearGradient colors={["#9f676dff", "#5D252A","#5D252A", "#411619ff"]}  end={{ x: 1, y: 1 }}style={styles.quizButton}  >
                  <Text style={styles.buttonText2}>Refazer Quiz</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity  style={styles.homeButton} onPress={() => navigation.navigate("Home")} >
                <Text style={styles.buttonText3}>Voltar ao Menu </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.resultPhrase3}>
               Dica: reveja os pontos-chave do conteudo para consolidar o aprendixado - prètrica leva á confiança.
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.quizContainer}>
          {!showExplanation ? (
            <>
              <Text style={styles.homeTitle2}>Questionário Sobre</Text>
              <Text style={styles.subTitle2}>Destituição do poder da familia</Text>
              <View style={styles.card}>
                <Image source={require('../../assets/quiz/destituiçãofamilia.png')} style={styles.mainImg2} />
                <Text style={styles.question}>{questions[currentIndex].question}</Text>
                {questions[currentIndex].options.map((option, i) => (
                  <TouchableOpacity key={i} onPress={() => handleAnswer(option)}>
                    <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.optionButton}>
                      <Text style={styles.optionText}>{option}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
                <Text style={styles.progresso}>
                  Pergunta {currentIndex + 1} de {questions.length}
                </Text>
              </View>
            </>
          ) : (
            <View>
              <Text style={styles.homeTitle2}>Questionário Sobre</Text>
              <Text style={styles.subTitle2}>Destituição do poder da familia</Text>
              <View style={styles.explanationContainer}>
                <View style={styles.card}>
                  <Image source={require('../../assets/quiz/destituiçãofamilia.png')} style={styles.mainImg2} />
                  <Text style={styles.question}>{questions[currentIndex].question}</Text>
                </View>
                {selectedAnswer === questions[currentIndex].answer ? (
                  <>
                    <View style={styles.correctBackground1}>
                      <View style={styles.container2}>
                        <Text style={styles.feedbackText1}>✅ Correto</Text>
                      </View>
                      <Text style={styles.explanationText}>{questions[currentIndex].explanation}</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.correctBackground2}>
                      <View style={styles.container2}>
                        <Text style={styles.feedbackText2}>❌ Incorreto</Text>
                      </View>
                      <Text style={styles.explanationText}>{questions[currentIndex].explanation}</Text>
                    </View>
                  </>
                )}
                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.startButton2}>
                    <Text style={styles.buttonText}>Próxima</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      )}
      <ExitButton goTo="Home" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  container2: { 
    flexDirection: "row"
  },
  startContainer: { 
    alignItems: "center",
  },
  homeTitle: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    color: '#D4AF37',
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
   homeTitle2: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle2: {
    color: '#D4AF37',
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mainImg1: { 
    width: 250,
    height: 250,
    resizeMode: "cover",
    borderRadius: 200,
    marginTop: 10,
    borderColor: '#D4AF37',
    borderWidth: 5,
    alignSelf: "center",
  },
   mainImg2: { 
    width: 250,
    height: 250,
    resizeMode: "cover",
    borderRadius: 200,
    borderColor: '#D4AF37',
    borderWidth: 5,
    alignSelf: "center",
    marginTop: -5,
    marginBottom: 10,
  },
  startTitle: { 
    fontSize: 13, 
    margin: 10,
    marginBottom: 20, 
    textAlign: "center", 
    color: "#FFFFFF" 
  },
  startButton2: {
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  quizContainer: { 
    flexGrow: 1, 
    justifyContent: "center" 
  },
  question: { 
    fontSize: 15,
    color: "#000000",
    textAlign: "center",
    textAlign: "justify", 
    fontWeight: "bold",
    marginTop: -5,
    padding: 10,
    backgroundColor:"#f0dee064",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },
  optionButton: { 
    marginTop: 7,
    paddingVertical: 15,
    borderRadius: 30,
  },
  optionText: { 
    marginStart: 20,
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "justify",
    marginHorizontal: 15,
    marginVertical: -5,
  },
  explanationContainer: {  
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  explanationText: { 
    fontSize: 13,  
    color:  "#000000ff", 
    textAlign: "justify",
  },
  feedbackImg: { 
    resizeMode: "cover", 
    width: 40, 
    height: 40 
  },
  feedbackText1: {  
    fontSize: 20, 
    color:  "rgba(24, 91, 24, 1)",
    fontWeight: "bold" 
  },
  feedbackText2: {  
    fontSize: 20, 
    color:  "#5e1a1fff",
    fontWeight: "bold" 
  },
  resultContainer: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  resultTitle: { 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 10,
    textAlign: "center", 
    color: '#D4AF37',
  },
  resultPhrase1: {  
    fontSize: 55, 
    marginTop:-36,
    color: '#D4AF37',
    fontWeight: "bold", 
  },
  resultPhrase2: {  
    fontSize: 13,
    padding: 5, 
    marginBottom: 10, 
    textAlign: "justify",
    color: "#ffffffff",
    fontWeight: "light", 
  },
  resultPhrase3: {  
    fontSize: 10,
    padding: 5, 
    marginTop: 10, 
    textAlign: "center",
    color: "#ffffffff",
    fontWeight: "light", 
  },
  resultText: { 
    fontSize: 22, 
    marginBottom:15,
    textAlign: "center",
    color: "#ffffffff",
    fontWeight: "bold",  
  },
  button: { 
    padding: 15, 
    borderRadius: 20, 
    marginVertical: 6, 
  },
  startButton: {
    width: 250,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 60,
    alignItems: "center",
    alignSelf: "center",
    borderColor: '#D4AF37',
    borderWidth: 2,
    overflow: "hidden",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
   card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
  },
   progresso: {
    marginTop: 5,
    color: '#000',
    textAlign: 'center',
  },
   correctBackground1: {
    margin: 10,
    marginTop:-3,
    marginBottom: -10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "rgba(0, 200, 0, 0.1)", 
    borderLeftWidth: 4,
    borderLeftColor: "rgba(0, 200, 0, 0.8)",
  },
  correctBackground2: {
    margin: 10,
    marginTop:-3,
    marginBottom: -10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "rgba(200, 0, 0, 0.1)", 
    borderLeftWidth: 4,
    borderLeftColor: "rgba(200, 0, 0, 0.8)",
  },
  rowButtons: {
   flexDirection: "row",
    justifyContent: "center",
  }, 
  quizButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,
    alignItems: "center",
  },
   buttonText2: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonText3: {
    color: "#FFFFFF",
    fontSize: 15,
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
  card2: {
    padding: 25,    
    borderRadius: 20,
    backgroundColor:"#8B4A52",
    elevation: 6,
  },
  card3: {
   flexDirection: "row",
  },
});

export default Tela9Screen;
