import React, { useState } from "react";
import { View, Text, TouchableOpacity,Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ExitButton from '../../componentes/ExitButton';

const questions = [
  {
    question: "1. A principal finalidade das medidas protetivas aplicadas pelo juiz, de acordo com o ECA, é a punição dos agressores.",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer: "FALSO",
    explanation: "FALSO. A finalidade principal das medidas protetivas é a proteção e a garantia dos direitos da criança ou adolescente, e não a punição do agressor, que é tratada em outras esferas (civil e criminal).",
  },
  {
    question: "2.O afastamento do agressor do lar é uma medida protetiva que pode ser aplicada em casos de violência psicológica, mesmo que não haja agressão física.",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer: "VERDADEIRO",
    explanation: "VERDADEIRO. A violência psicológica é uma forma de violência intrafamiliar, e o afastamento do agressor é uma medida essencial para garantir a segurança emocional e psicológica da vítima.",
  },
  {
    question: "3. O simples estabelecimento de regras e horários para um filho é considerado violência psicológica, de acordo com o Direito de Família.",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer: "FALSO",
    explanation: "FALSO. O estabelecimento de regras e horários é uma prática pedagógica e faz parte do dever de educação dos pais. A violência psicológica é caracterizada por comportamentos que causam dano emocional, como humilhação e ameaças constantes.",
  },
  {
    question: "4. A violência intrafamiliar ocorre apenas entre cônjuges ou companheiros.",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer: "FALSO",
    explanation: "FALSO. A violência intrafamiliar envolve qualquer relação de convivência familiar ou afetiva, incluindo pais e filhos, irmãos, avós, tutores, etc. (Lei Maria da Penha, art. 5º; CF/88, art. 226). Não se limita a relacionamento amoroso, mas a todo e qualquer vínculo familiar.",
  },
  {
    question: "5. A Lei Maria da Penha pode ser aplicada mesmo que a vítima e o agressor não morem mais juntos. ",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer: "VERDADEIRO",
    explanation: "VERDADEIRO. A convivência sob o mesmo teto não é requisito para aplicação da LMP. Basta a existência de relação doméstica, familiar ou de afeto, mesmo que encerrada. (LMP, art. 5º, parágrafo único). A violência pode continuar mesmo após o término da relação.",
  },
  {
    question: "6. Ofensas verbais entre pais e filhos, quando recorrentes e humilhantes, podem ser consideradas violência psicológica. ",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer: "VERDADEIRO",
    explanation: "VERDADEIRO. A violência psicológica é amplamente reconhecida como forma de violência doméstica. (LMP, art. 7º, II; ECA, art. 5º). Desvalorização, xingamentos, chantagens emocionais... tudo entra na conta.",
  },
  {
    question: "7.. A alienação parental não configura forma de violência intrafamiliar, pois trata-se apenas de disputa de guarda. ",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer: "FALSO",
    explanation: "FALSO. A alienação parental é forma de violência psicológica e pode causar danos irreversíveis à criança ou adolescente. (Lei 12.318/10; CF/88, art. 227). Não é só briga de guarda. É manipulação e abuso emocional.",
  },
  {
    question: "8. Patrícia vive com um companheiro agressivo há anos, mas não quer denunciá-lo por medo de perder a guarda dos filhos ou de não ter para onde ir. Por isso, acredita que a melhor saída é aguentar e tentar manter a paz em casa. ",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer: "FALSO",
    explanation: "FALSO. O medo de denunciar é comum, mas existem redes de apoio que protegem a mulher e os filhos. A Justiça não tira a guarda de quem é vítima, e há abrigos, auxílios e medidas que garantem a proteção e os direitos da mulher e dos filhos.",
  },
  {
    question: "9. A violência patrimonial contra idosos, como o uso indevido da aposentadoria, é caracterizada como infração penal.",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer:  "VERDADEIRO",
    explanation: "VERDADEIRO. Estatuto do Idoso, art. 102. Além disso, pode configurar apropriação indébita, estelionato e até maus-tratos. Explorar financeiramente o idoso é crime, infelizmente.",
  },
  {
    question: "10.Para que o Ministério Público atue nos casos de violência familiar, é necessário que a vítima formalize a denúncia.",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer: "FALSO",
    explanation: "FALSO. O MP pode agir de ofício em situações de violência familiar. Não depende da vontade da vítima em muitos casos. (LMP, art. 25 e 26; CPP, art. 129, I, II e VIII da CF/88). Violência doméstica é questão pública. Não é assunto (de dentro de casa).",
  },
  {
    question: "11. O ciclo da violência doméstica é composto apenas por agressões físicas recorrentes. ",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer: "FALSO",
    explanation: "FALSO. O ciclo da violência envolve três fases: tensão, agressão e lua de mel. Inclui agressões psicológicas, patrimoniais, morais, sexuais e físicas. (LMP, art. 7º). A agressão física é só a ponta do iceberg.",
  },
  {
    question: "12. Se uma criança vive em uma casa onde o pai agride a mãe, mas ela mesma nunca é agredida, não há o que a Justiça possa fazer, já que ela não é vítima direta.",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer:  "VERDADEIRO",
    explanation: "VERDADEIRO. A criança que convive com violência é considerada vítima indireta. Isso pode afetar seu desenvolvimento emocional e psicológico. O Conselho Tutelar ou o juiz da vara da infância pode intervir para proteger a criança.",
  },
  {
    question: "13.Homens também podem ser vítimas de violência doméstica, e a Lei Maria da Penha pode protegê-los nesses casos. ",
    type: "VERDADEIRO OU FALSO?",
    correctAnswer: "FALSO",
    explanation: "FALSO. A LMP é voltada especificamente à proteção da mulher em razão de gênero (LMP, art. 1º). Homens vítimas devem buscar amparo geral no CPP e Código Civil. Homem pode ser vítima? Sim. Mas a Lei Maria da Penha não se aplica a ele.",
  },
];

const QuizVerdFalsoScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const question = questions[currentQuestion];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentQuestion(currentQuestion + 1);
  };


  return (
    <LinearGradient
      colors={['#A67C7C', '#8B4A52', '#5D252A']}
      style={styles.container}
    >
      <Text style={styles.title}>Questionário Sobre</Text>
      <Text style={styles.subtitle}>Violência Familiar</Text>
      {currentQuestion < questions.length ? (
        <View style={styles.card}>
          <Image source={require('../../../assets/verdadeOfalsoImagem.jpg')} style={styles.imagem1} resizeMode="cover"/>
          <Text style={styles.question}>{question.question}</Text>
          {!showExplanation ? (
            <View style={styles.rowButtons}>
              <TouchableOpacity
                style={[styles.button1, { marginRight: 10 }]}
                onPress={() => handleAnswer("VERDADEIRO")}
              >
                <Text style={styles.buttonText1}>Verdadeiro</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button2}
                onPress={() => handleAnswer("FALSO")}
              >
                <Text style={styles.buttonText1}>Falso</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View
                style={[
                  styles.answerContainer,
                  selectedAnswer === question.correctAnswer
                    ? styles.correctBackground
                    : styles.incorrectBackground,
                ]}
              >
                <Text
                  style={[
                    styles.result,
                    selectedAnswer === question.correctAnswer
                      ? styles.correct
                      : styles.incorrect,
                  ]}
                >
                  {selectedAnswer === question.correctAnswer
                    ? "✅ Resposta Correta!"
                    : "❌ Resposta Incorreta!"}
                </Text>
                <Text style={styles.explanation}>{question.explanation}</Text>
              </View>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.buttonText1}>Continuar</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.progresso}>
            Pergunta {currentQuestion + 1} de {questions.length}
          </Text>
        </View>
      ) : (
       <View style={{ alignItems: "center" }}>
          <Text style={styles.finalText1}>
            🎉 Parabéns! 🎉 
          </Text>
          <Text style={styles.finalText2}>
          Você completou o quiz sobre violencia domentica e medidas protetivas
          </Text>
          <View  style={styles.rowButtons}>
            <TouchableOpacity onPress={() => navigation.navigate("TELA4")} >
              <LinearGradient colors={["#8B4A52", "#5D252A","#5D252A", "#411619ff"]}  end={{ x: 1, y: 1 }}style={styles.quizButton}  >
                <Text style={styles.buttonText2}>Refazer Quiz</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.homeButton} onPress={() => navigation.navigate("Home")} >
              <Text style={styles.buttonText3}>Voltar Menu Principal</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ExitButton goTo="Home" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#FFD700", 
    marginBottom: 10,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    width: "100%",
  },
  question: {
    fontSize: 15,
    color: '#000000ff',
    fontWeight: "bold",
    textAlign: "justify",
    padding: 10,
    backgroundColor:"#f0dee064",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },
  button1: {
    width: 150,
    backgroundColor: "#18f504ff",
    padding: 10,
    borderRadius: 30,
    marginVertical: 8,
    alignItems: "center",
  },
   button2: {
    width: 150,
    backgroundColor: "#fb0000ff",
    padding: 10,
    borderRadius: 30,
    marginVertical: 8,
    alignItems: "center",
  },
  buttonText1: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
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
  result: {
    fontSize: 15,
    fontWeight: "bold",
  },
  correct: {
    color: "green",
  },
  incorrect: {
    color: "red",
  },
  explanation: {
    fontSize: 13,
    fontWeight: "bold",
    color: '#000000ff',
    marginVertical: 10,
    textAlign: "justify", 
  },
  nextButton: {
    width: 150,
    marginTop: 15,
    backgroundColor: '#D4AF37',
    padding: 5,
    borderRadius: 30,
    alignSelf: "center",
    alignItems: "center",
  },
  finalText1: {
    fontSize: 25,
    marginVertical:10,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  finalText2: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    color: "#fff",
    fontStyle: "italic",
    marginBottom: 15,
    textAlign: "center"
  },
  quizButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 10,
    alignItems: "center",
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
  imagem1: {
    width: 250,
    height:250,
    marginTop: -20,
    borderRadius: 200,
    alignSelf: 'center',
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  answerContainer: {
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
  },

  correctBackground: {
    backgroundColor: "rgba(0, 200, 0, 0.1)", 
     borderLeftWidth: 4,
    borderLeftColor: "rgba(0, 200, 0, 0.8)",
  },

  incorrectBackground: {
    backgroundColor: "rgba(200, 0, 0, 0.1)", 
    borderLeftWidth: 4,
    borderLeftColor: "rgba(200, 0, 0, 0.8)",
  },
  progresso: {
    marginTop: 10,
    color: '#000',
    textAlign: 'center',
  },

});

export default QuizVerdFalsoScreen;
