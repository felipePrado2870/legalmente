import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, Image, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import questionarioViolencia from "../dados/questionarioViolencia.json";
const imagens = {
  'ViolenciaCrianca': require('../../assets/violencia/violenciaCrianca.png'),
  'ViolenciaHomem': require('../../assets/violencia/violenciaHomem.png'),
  'ViolenciaIdoso': require('../../assets/violencia/violenciaIdoso.png'),
  'ViolenciaMulher': require('../../assets/violencia/violenciaMulher.png'),
};

const Tela6Screen = ({ navigation }) => {
  const [tipoSelecionado, setTipoSelecionado] = useState(null);
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [resultado, setResultado] = useState(null);

  const escolherOpcao = (resposta) => {
    setRespostas({ ...respostas, [perguntaIndex]: resposta });

    if (perguntaIndex + 1 < questionarioViolencia[tipoSelecionado].perguntas.length) {
      setPerguntaIndex(perguntaIndex + 1);
    } else {
      finalizarQuestionario();
    }
  };

  const finalizarQuestionario = () => {
    const quiz = questionarioViolencia[tipoSelecionado];
    const respostasArray = Object.values(respostas);

    let contaA = 0, contaB = 0, contaC = 0, alertaCritico = false;

    respostasArray.forEach((resp, idx) => {
      if (resp.startsWith("A")) contaA++;
      if (resp.startsWith("B")) contaB++;
      if (resp.startsWith("C")) contaC++;

      if (quiz.criticas.includes(idx + 1) && resp.startsWith("A")) {
        alertaCritico = true;
      }
    });

    let interpretacao;
    if (alertaCritico) interpretacao = quiz.interpretacao.critica;
    else if (contaA > contaB && contaA > contaC) interpretacao = quiz.interpretacao.A;
    else if (contaB > contaA && contaB > contaC) interpretacao = quiz.interpretacao.B;
    else interpretacao = quiz.interpretacao.C;

    setResultado(interpretacao);
  };

  if (!tipoSelecionado) {
    return (
      <LinearGradient colors={["#A67C7C", "#8B4A52", "#5D252A"]} style={styles.container}>
        <Text style={styles.title}>Questionário Sobre</Text>
        <Text style={styles.subtitle}>Diferentes tipos de Violência</Text>
        <Image source={require('../../assets/violencia/violenciaGeral.png')} style={styles.imagem1} resizeMode="cover"/>
        <Text style={styles.description}>
          Teste se voce ou alguem esta sofrendo algum tipo de violência ou abuso
        </Text>
        {Object.keys(questionarioViolencia).map((tipo) => (
          <TouchableOpacity key={tipo}  onPress={() => setTipoSelecionado(tipo)}>
            <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.startButton}>
              <Text style={styles.startButtonText}>{questionarioViolencia[tipo].titulo}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </LinearGradient>
    );
  }

  if (!resultado) {
    const quiz = questionarioViolencia[tipoSelecionado];
    const perguntaAtual = quiz.perguntas[perguntaIndex];

    return (
      <LinearGradient colors={["#A67C7C", "#8B4A52", "#5D252A"]} style={styles.container}>
        <Text style={styles.title}>{quiz.titulo}</Text>
        <View style={styles.perguntaBox}>
          <Image source={imagens[quiz.imagemTema]} style={styles.imagem1} resizeMode="cover"/>
          <Text style={styles.pergunta}>{perguntaIndex + 1}. {perguntaAtual.texto}</Text>
          {perguntaAtual.opcoes.map((opcao, i) => (
            <TouchableOpacity key={i} onPress={() => escolherOpcao(opcao)}>
              <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.startButton2}>
                <Text style={styles.startButtonText2}>{opcao}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#A67C7C", "#8B4A52", "#5D252A"]} style={styles.container}>
      <Text style={styles.title}>📊 Resultado</Text>
      <View style={styles.resultadoBox}>
        <Text style={styles.resultadoTexto}>{resultado}</Text>
      </View>
      <Text style={styles.contato}>
        📞 Contato do Serviço Social{"\n"}
        CEAV{"\n"}
        (48) 3287-2637{"\n"}
        (48) 3287-2635
      </Text>
      <View  style={styles.rowButtons}>
        <TouchableOpacity onPress={() => navigation.navigate("TELA1")} >
          <LinearGradient colors={['#8B4A52', '#5D252A', '#5D252A', '#5D252A']}  end={{ x: 1, y: 1 }}style={styles.quizButton}  >
            <Text style={styles.buttonText2}>Refazer Quiz</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.homeButton} onPress={() => navigation.navigate("Home")} >
          <Text style={styles.buttonText3}>Voltar Menu Principal</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16, 
    justifyContent: "center" 
  },
  title: { 
    color: "#fff", 
    fontSize: 40, 
    fontWeight: "bold", 
    textAlign: "center",  
  },
  subtitle: {
    textAlign: "center", 
    fontSize: 30,
    color: "#FFD700", 
    marginBottom: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    margin: 10,
    marginTop: 10,
  },
  button: { 
    padding: 12, 
    borderRadius: 10, 
    marginVertical: 5, 
    alignItems: "center" 
  },
  buttonText: { 
    color: "#5D252A", 
    fontWeight: "bold" ,
    fontSize: 18,
  },
  perguntaBox: {  
    padding: 10, 
    backgroundColor:"#fff" , 
    borderRadius: 10 
  },
  pergunta: { 
    fontSize: 23,
    marginTop: -10,
    margin: 10,
    color: "#000000",
    textAlign: "center",
    textAlign: "justify", 
    fontWeight: "bold",
  },
  opcaoButton: { 
    padding: 10, 
    marginVertical: 5, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: "#fff" 
  },
  opcaoTexto: { 
    color: "#fff", 
    fontSize: 18 
  },
  resultadoBox: { 
    padding: 15, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    borderRadius: 10,
    marginBottom: 20 
  },
  resultadoTexto: { 
    color: "#fff", 
    fontSize: 20, 
    marginBottom: 10 
  },
  contato: { 
    color: "#ffdddd", 
    margin: 15, 
    fontSize: 20, 
    textAlign: "center" 
  },
   imagem1: {
    width: 300,
    height:300,
    borderRadius: 200,
    marginBottom: 10,
    alignSelf: 'center',
    borderColor: "#fff",
    borderWidth: 12,
  },
   startButton: {
    width: 330,
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  startButton2: {
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 30,
  },
  startButtonText2: {
    marginStart: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
   rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
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
});

export default Tela6Screen;
