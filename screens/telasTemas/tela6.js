import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, Image, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import questionarioViolencia from "../dados/questionarioViolencia.json";
import ExitButton from '../componentes/ExitButton';

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

    let resultadoObj = {};
    if (alertaCritico) resultadoObj = { texto: quiz.interpretacao.critica, tipo: "critica" };
    else if (contaA > contaB && contaA > contaC) resultadoObj = { texto: quiz.interpretacao.A, tipo: "A" };
    else if (contaB > contaA && contaB > contaC) resultadoObj = { texto: quiz.interpretacao.B, tipo: "B" };
    else resultadoObj = { texto: quiz.interpretacao.C, tipo: "C" };

    setResultado(resultadoObj);
  };
    const corResultado = () => {
    if (!resultado) return "rgba(0,0,0,0.19)";
    switch(resultado.tipo) {
      case "A": return "#ff634740";       
      case "B": return "#ffd90040";       
      case "C": return "#32cd3240";       
      case "critica": return "#ff440040"; 
      default: return "rgba(0,0,0,0.19)";
    }
  };
  const corBordaEsquerda = () => {
    if (!resultado) return "rgba(0,0,0,0.19)";
    switch(resultado.tipo) {
      case "A": return "#FF6347";       // vermelho
      case "B": return "#FFD700";       // amarelo
      case "C": return "#32CD32";       // verde
      case "critica": return "#FF4500"; // laranja/alerta
      default: return "rgba(0,0,0,0.19)";
    }
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
        <ExitButton goTo="Home" />
      </LinearGradient>
    );
  }

  if (!resultado) {
    const quiz = questionarioViolencia[tipoSelecionado];
    const perguntaAtual = quiz.perguntas[perguntaIndex];

    return (
      <LinearGradient colors={["#A67C7C", "#8B4A52", "#5D252A"]} style={styles.container}>
        <Text style={styles.title2}>{quiz.titulo}</Text>
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
          <Text style={styles.progresso}>
            Pergunta {perguntaIndex + 1} de {quiz.perguntas.length}
          </Text>
        </View>
        <ExitButton goTo="Home" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#A67C7C", "#8B4A52", "#5D252A"]} style={styles.container}>
      <Text style={styles.title}>📊 Resultado do Questionario</Text>
      <Text style={styles.text3}>Veja o significado do seu resultado e como agir com segurnça.</Text>
      <View style={styles.card1}>
        <View style={styles.card2}>
          <Text style={styles.text1}>🟢</Text>
          <View>
            <Text style={styles.text2}>Sutuação</Text>
            <Text style={styles.text2}>Positiva</Text>
          </View>
        </View>
        <View style={styles.card2}>
          <Text style={styles.text1}>🟡</Text>
          <View>
            <Text style={styles.text2}>Sinal de</Text>
            <Text style={styles.text2}>Atenção</Text>
          </View>
        </View>
        <View style={styles.card2}>
          <Text style={styles.text1}>🔴</Text>
          <View>
            <Text style={styles.text2}>Alerta </Text>
            <Text style={styles.text2}>Vermelho</Text>
          </View>
        </View>
        <View style={styles.card2}>
          <Text style={styles.text1}>⚠️</Text>
          <View>
            <Text style={styles.text2}>Alerta</Text>
            <Text style={styles.text2}>Imedìato</Text>
          </View>
        </View>
      </View>
      <View style={[styles.resultadoBox, { backgroundColor: corResultado(), borderLeftWidth: 5,  borderLeftColor: corBordaEsquerda()}]}>
        <Text style={styles.resultadoTexto}>
          {resultado.texto.split("**").map((part, index) => 
            index % 2 === 1 
              ? <Text key={index} style={{ fontWeight: 'bold', fontSize: 20 }}>{part}</Text> 
              : part
          )}
        </Text>
      </View>
      <View style={styles.card3}>
        <Text style={styles.contato1}>
          📞 Procure Ajuda
        </Text>
        <Text style={styles.contato2}>
          CEAV{"\n"}
          (48) 3287-2637{"\n"}
          (48) 3287-2635{"\n"}
          Disque 100 | 180
        </Text>
      </View>
      <View  style={styles.rowButtons}>
        <TouchableOpacity onPress={() => { setTipoSelecionado(null); setPerguntaIndex(0); setRespostas({}); setResultado(null); }}>
          <LinearGradient colors={["#9f676dff", '#5D252A', '#5D252A', '#5D252A']}  end={{ x: 1, y: 1 }}style={styles.quizButton}  >
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 12, 
    justifyContent: "center" 
  },
  card1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,    
    borderRadius: 12,
    borderWidth:0.5,
    borderColor:"#f8f1f347",
    backgroundColor:"#c3878eaa",
    marginBottom:10,
    marginTop: 10
  },
  card2: {
    width: 75,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    borderRadius: 12,
    borderWidth:1,
    borderColor:"#f8f1f347",
    backgroundColor:"#c3878eff",
  },
  card3: {
    padding: 25,    
    borderRadius: 20,
    borderWidth:0.5,
    borderColor:"#ffffff47",
    backgroundColor:"#8B4A52",
    elevation: 6,
  },
  title: { 
    color: '#D4AF37', 
    fontSize: 25, 
    fontWeight: "bold", 
    textAlign: "center",  
  },
  title2: { 
    color:  '#D4AF37',  
    fontSize: 35, 
    fontWeight: "bold", 
    textAlign: "center",  
  },
  subtitle: {
    textAlign: "center", 
    fontSize: 20,
    color: '#D4AF37', 
    marginBottom: 10,
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    margin: 5,
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
    fontSize: 15,
  },
  perguntaBox: {  
    padding: 10, 
    backgroundColor:"#fff" , 
    borderRadius: 10 
  },
  pergunta: { 
    fontSize: 15,
    marginTop: -10,
    color: "#000000",
    textAlign: "center",
    textAlign: "justify", 
    fontWeight: "bold",
    padding: 10,
    backgroundColor:"#f0dee064",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
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
    fontSize: 15 
  },
  resultadoBox: { 
    padding: 15, 
    backgroundColor: "rgba(0, 0, 0, 0.19)", 
    borderRadius: 10,
    marginBottom: 20 
  },
  resultadoTexto: { 
    color: "#fff", 
    fontSize: 13, 
    marginBottom: 10,
    textAlign: "justify"
  },
  contato1: { 
    color: '#D4AF37',  
    fontSize: 18, 
    textAlign: "center" ,
    fontWeight: "bold",
  },
  contato2: { 
    marginTop:10,
    color: "#ffdddd",  
    fontSize: 15, 
    textAlign: "center" ,
    fontWeight: "bold",
  },
  text1: { 
    marginHorizontal:1,
    marginStart:-4,
    color: "#ffdddd",  
    fontSize: 10, 
    textAlign: "center" ,
    fontWeight: "bold",
  },
  text2: { 
    color: "#ffdddd",  
    fontSize: 11, 
    textAlign: "center" ,
    fontWeight: "bold",
  },
  text3: { 
    margin:10,
    color: "#ffdddd",  
    fontSize: 12, 
    textAlign: "center" ,
    fontWeight: "bold",
  },
   imagem1: {
    width: 250,
    height:250,
    borderRadius: 200,
    marginBottom: 10,
    alignSelf: 'center',
    borderColor: '#D4AF37',
    borderWidth: 5,
  },
   startButton: {
    width: 330,
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 99,
    alignItems: "center",
    alignSelf: "center",
    borderColor: "#ffffff4f",
    borderWidth: 2,
    overflow: "hidden",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  startButton2: {
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 30,
  },
  startButtonText2: {
    marginStart: 20,
    color: "#fff",
    fontSize: 13,
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
  progresso: {
    marginTop: 15,
    color: '#000',
    textAlign: 'center',
  },
});

export default Tela6Screen;
