import React, { useState } from 'react';
import { View,Image, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ExitButton from '../../componentes/ExitButton';

const questionario = [
  {
    id: 1,
    pergunta: "1. Você mora junto com seu cônjuge?",
    opcoes: ["Sim", "Não mas pretendemos morar juntos","Não",],
  },
  {
    id: 2,
    pergunta: "2. Seus familiares e amigos veem você e seu cônjuge como um casal?",
    opcoes: ["Sim, todos nos veem como casal", "Não, alguns nos veem como casal", "Não, ninguem nos veem como casal"  ],
  },
  {
    id: 3,
    pergunta: "3. O seu relacionamento é contínuo sem longas pausas, ou idas e vindas constantes?",
    opcoes: ["Sim, é estável e contínuo", "Já tivemos pausas e reconciliações","Não, não é estável e contínuo",],
  },
  {
    id: 4,
    pergunta: "4. O casal tem planos futuros, como filhos e casamento?",
    opcoes: ["Sim, temos esses objetivos", "Não, ainda não conversamos ", "Não, não temos esses objetivos"],
  },
  {
    id: 5,
    pergunta: "5. Vocês têm algum vínculo financeiro em comum?",
    opcoes: ["Sim, temos vínculo financeiro", "Não, não temos vínculo financeiro"],
  },
  {
    id: 6,
    pergunta: "6. Algum de vocês é legalmente casado com outra pessoa?",
    opcoes: ["Sim, casado legalmente de fato","Não, divorciado separado de fato", "Não, nunca casei"  ],
  },
];

const QuizCasamentoScreen = ({ navigation}) => {
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [finalizado, setFinalizado] = useState(false);
  const [resultado, setResultado] = useState("");

  const perguntaAtual = questionario[indice];

  const handleResposta = (opcao) => {
    const novasRespostas = { ...respostas, [perguntaAtual.id]: opcao };
    setRespostas(novasRespostas);

    if (indice < questionario.length - 1) {
      setIndice(indice + 1);
    } else {
      analisarRespostas(novasRespostas);
      setFinalizado(true);
    }
  };

     const analisarRespostas = (respostas) => {
    let pontos = 0;
    let maxPontos = 10;
    let resumo = [];

    // 1 - Coabitação ou intenção de morar juntos
    if (respostas[1] === "Sim") {
      pontos += 2;
      resumo.push("✅ Moram juntos");
    } else if (respostas[1] === "Não mas pretendemos morar juntos") {
      pontos += 1;
      resumo.push("⚠️ Ainda não moram juntos, mas há intenção");
    } else {
      resumo.push("❌ Não moram juntos");
    }

    // 2 - Reconhecimento social
    if (respostas[2] === "Sim, todos nos veem como casal") {
      pontos += 2;
      resumo.push("✅ Reconhecimento social pleno");
    } else if (respostas[2] === "Não, alguns nos veem como casal") {
      pontos += 1;
      resumo.push("⚠️ Reconhecimento parcial");
    } else {
      resumo.push("❌ Não há reconhecimento social");
    }

    // 3 - Estabilidade
    if (respostas[3] === "Sim, é estável e contínuo") {
      pontos += 2;
      resumo.push("✅ Relacionamento estável e contínuo");
    } else if (respostas[3] === "Já tivemos pausas e reconciliações") {
      pontos += 1;
      resumo.push("⚠️ Já houve pausas no relacionamento");
    } else {
      resumo.push("❌ Relacionamento instável");
    }

    // 4 - Planos futuros
    if (respostas[4] === "Sim, temos esses objetivos") {
      pontos += 2;
      resumo.push("✅ Têm planos futuros (filhos/casamento)");
    } else if (respostas[4] === "Não, ainda não conversamos ") {
      pontos += 1;
      resumo.push("⚠️ Ainda não conversaram sobre o futuro");
    } else {
      resumo.push("❌ Não têm planos futuros em comum");
    }

    // 5 - Vínculo financeiro
    if (respostas[5] === "Sim, temos vínculo financeiro") {
      pontos += 2;
      resumo.push("✅ Possuem vínculo financeiro em comum");
    } else {
      resumo.push("❌ Não possuem vínculo financeiro");
    }

    // 6 - Impedimento legal
    if (respostas[6] === "Não, divorciado separado de fato" || respostas[6] === "Não, nunca casei") {
      pontos += 2;
      resumo.push("✅ Não há impedimento legal");
    } else if (respostas[6] === "Sim, casado legalmente de fato") {
      pontos -= 2;
      resumo.push("❌ Um dos cônjuges ainda é casado legalmente");
    }

    // Definição da análise final
    let resultadoFinal = "";
    if (pontos >= 9) {
      resultadoFinal =
        "✅ União Estável Reconhecida\n\n" +
        "Com base nas respostas, todos os requisitos legais foram atendidos.";
    } else if (pontos >= 6) {
      resultadoFinal =
        "📌 União Estável em Potencial\n\n" +
        "A maioria dos requisitos está presente, faltam apenas alguns pontos.";
    } else if (pontos >= 3) {
      resultadoFinal =
        "⚠️ Relacionamento com Elementos de União Estável\n\n" +
        "Há alguns aspectos importantes, mas ainda não suficientes.";
    } else {
      resultadoFinal =
        "❌ Ausência de Requisitos para União Estável\n\n" +
        "Poucos requisitos foram atendidos, sendo necessário amadurecer mais pontos.";
    }

    // Junta a análise com o resumo checklist
    setResultado({
      titulo: resultadoFinal, // título principal
      resumo: resumo,         // lista de itens
    });
  };



  return (
    <LinearGradient
      colors={['#A67C7C', '#8B4A52', '#5D252A']}
      style={styles.container}
    >
      {!finalizado ? (
        <View>
          <Text style={styles.homeTitle}>Teste de reconhacimento para casamento</Text>
          <View style={styles.card1}>
            <Image source={require('../../../assets/guiaCasamento/guiaCasamento.png')} style={styles.imagem1} resizeMode="cover"/>
            <Text style={styles.pergunta}>{perguntaAtual.pergunta}</Text>
            <FlatList
              data={perguntaAtual.opcoes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleResposta(item)}>
                  <LinearGradient colors={["#8B4A52",  "#8B4A52","#5D252A", "#45191dff"]} style={styles.startButton2}>
                    <Text style={styles.textoBotao}>{item}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            />
            <Text style={styles.progresso}>
              Pergunta {indice + 1} de {questionario.length}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.card2}>
          <Image source={require('../../../assets/guiaCasamento/imagesFinalGuiaCasamento.png')} style={styles.imagem2} resizeMode="cover"/>
            <Text style={styles.text1}>Resultado do Quiz</Text>
            <Text style={styles.text2}>Análise sobre possibilidade de união estável</Text>
            <View style={styles.card3}>
              <Text style={styles.destaque}>{resultado.titulo}</Text>
              <Text style={styles.subtitulo}>📋 Resumo:</Text>
              {resultado.resumo.map((item, index) => (
                <Text key={index} style={styles.resultadoTexto}>
                  {item}
                </Text>
              ))}
            </View>
          <View  style={styles.rowButtons}>
            <TouchableOpacity onPress={() => navigation.navigate("TELA3")} >
              <LinearGradient colors={["#9f676dff", "#5D252A","#5D252A", "#411619ff"]}  end={{ x: 1, y: 1 }}style={styles.quizButton}  >
                <Text style={styles.buttonText2}>Refazer Quiz</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.homeButton} onPress={() => navigation.navigate("Home")} >
              <Text style={styles.buttonText3}>Voltar Menu Principal</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text3}>Análise sobre possibilidade de união estavel</Text>
        </View>
      )}
      <ExitButton goTo="Home" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card1: {
    padding: 10,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  card2: {
    padding: 15,    
    borderRadius: 20,
    backgroundColor:"#8B4A52",
    elevation: 6,
  },
  card3: {
    padding: 15,    
    borderRadius: 20,
    backgroundColor:'#fff',
    marginBottom:-8,
  },
  pergunta: {
    fontSize: 15,
    color: '#000000ff',
    marginTop: -10,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "justify",
    padding: 10,
    backgroundColor:"#f0dee064",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },

  botao: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius:200,
    marginVertical: 6,
  },
  textoBotao: {
    marginStart: 20,
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },

  progresso: {
    marginTop: 15,
    color: '#000',
    textAlign: 'center',
  },
  destaque: {
    fontSize: 13,
    color: '#000',
    textAlign: 'justify',
    fontWeight: "bold",
    marginBottom: 10
  },
  subtitulo: {
    fontSize: 13,
    color: '#000',
    fontWeight: "bold",
  },
  resultadoTexto: {
    fontSize: 13,
    color: '#000',
    textAlign: 'justify',
    lineHeight: 18,
  },
  imagem1: {
    width: 250,
    height:250,
    borderRadius: 200,
    marginBottom: 15,
    alignSelf: 'center',
    borderColor: '#D4AF37',
    borderWidth:5,
  },
  imagem2: {
    width: 250,
    height:250,
    borderRadius: 200,
    alignSelf: 'center',
    borderColor: '#D4AF37',
    borderWidth:5,
    marginTop:-10
  },
  startButton2: {
    marginTop: 10,
    paddingVertical: 15,
    borderRadius: 30,
  },
  homeTitle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: '#D4AF37',
    marginBottom: 10,
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
  text1: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: '#D4AF37',
  },
  text2: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  text3: {
    textAlign: "center",
    fontSize: 13,
    color: "#FFFFFF",
    marginTop: 10,
  },

});

export default QuizCasamentoScreen;
