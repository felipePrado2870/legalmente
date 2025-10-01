import React, { useState } from 'react';
import { Text, Image, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ExitButton from '../componentes/ExitButton';

const Tela7Screen = () => {
  const navigation = useNavigation();


  const [showUniao, setShowUniao] = useState(false);
  const [showSucessao, setShowSucessao] = useState(false);

  return (
    
    <ScrollView  style={{ flex: 1, backgroundColor:"#ffd8d88f" }} contentContainerStyle={{ paddingBottom:30 }}>
      <LinearGradient colors={['#A67C7C', '#8B4A52', '#5D252A']} style={styles.head}>
        <View style={styles.header}>
          <Image source={require("../../assets/UniãoEstável.png")} style={styles.img1}/>
          <Text style={styles.headerText1}>União Estável e Sucessão</Text>
          <Text style={styles.headerText3}>
            Informações essenciais e um simulador educativo para visualizar a divisão de bens.
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.cardSimulator}>
          <Image source={require("../../assets/iconCalculadora.png")} style={styles.img2}/>
          <Text style={styles.simulatorTitle}> Simulador de Sucessâo</Text>
          <Text style={styles.text1}> 
            Calcule de forma educativa como seria a divisão de bens em diferentes cenários de união estável.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('DivisionCalculator')}>
            <Text style={styles.startButton}>Iniciar Simulação</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.titleCard}>📋  O que é União Estável</Text>
          <Text style={styles.text2}>
            A união estável é reconhecida como entidade familiar, caracterizada pela convivência pública, contínua e duradoura entre duas pessoas, com objetivo de constituir família.
          </Text>

          {showUniao && (
            <View style={styles.extraBox}>
              <Text style={styles.textCardTitulo}>Características principais:</Text>
              <Text style={styles.textCard}>
                {"\n"}• Convivência pública e notória
                {"\n"}• Continuidade temporal
                {"\n"}• Objetivo de constituir família
                {"\n"}• Ausência de impedimentos matrimoniais
                {"\n"}
              </Text>
              <Text style={styles.textCardTitulo}>Pode ser reconhecida:</Text>
              <Text style={styles.textCard}>
                {"\n"}• Por escritura pública em cartório;
                {"\n"}• Judicialmente, em caso de disputa.
              </Text>
              <Text style={styles.baseLegal}>Base legal: Art. 1.723 do Código Civil.</Text>
            </View>
          )}

          <TouchableOpacity onPress={() => setShowUniao(!showUniao)}>
            <Text style={styles.toggleButton}>
              {showUniao ? "Mostrar menos" : "Mostrar mais"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.titleCard}> 🏛️  Direito de Sucessão</Text>
          <Text style={styles.text2}>
            O companheiro(a) possui direitos sucessórios que variam conforme o regime de bens adotado e a existência de outros herdeiros.
          </Text>
          {showSucessao && (
            <View style={styles.extraBox}>
              <Text style={styles.textCardTitulo}>Fatores que influenciam:</Text>
              <Text style={styles.textCard}>
                {"\n"}• Regime de bens escolhido
                {"\n"}• Existência de filhos
                {"\n"}• Presença de outros herdeiros
                {"\n"}• Duração da união
              </Text>
              <Text style={styles.baseLegal}>Referência: Código Civil, Art. 1.723 e seguintes.</Text>
            </View>
          )}

          <TouchableOpacity onPress={() => setShowSucessao(!showSucessao)}>
            <Text style={styles.toggleButton}>
              {showSucessao ? "Mostrar menos" : "Mostrar mais"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ExitButton goTo="Home" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
  },
  head:{
    marginBottom:15,
  },
  body: {
    padding: 15,
  },
  img1: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
    borderRadius: 200,
    marginBottom: 10,
    marginTop: 40,
    borderColor: '#D4AF37',
    backgroundColor:"#fff6dd",
    borderWidth: 5,
    alignSelf: 'center',
  },
  img2: {
    width: 45,
    height: 45,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: "stretch",
    alignSelf: 'center',
    borderColor: "#5D252A",
    borderWidth: 1,
  },
  headerText1: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  headerText3: {
    marginTop: 10,
    fontSize: 13,
    textAlign: "center",
    color: "#fff",
  },
  cardSimulator: {
    backgroundColor: "#5D252A",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  simulatorTitle: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  text1: {
    fontSize: 15,
    marginBottom: 10,
    color: "#fff",
    textAlign: "justify",
  },
  text2: {
    fontSize: 15,
    marginBottom: 10,
    color: "#000000ff",
    textAlign: "justify",
  },
  startButton: {
    backgroundColor: "#D4AF37",
    width: "50%",
    padding: 10,
    borderRadius: 17,
    alignSelf:"center",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  titleCard: {
    fontSize: 20,
    color: "#D4AF37",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  toggleButton: {
    backgroundColor: "#5D252A",
    padding: 8,
    borderRadius: 17,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    width:130,
  },
  extraBox: {
    width:"100%",
    padding: 8,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },
  textCardTitulo:{
    justifyContent:"flex-start",
    padding:5,
    fontSize: 15,
    color: "#000000",
    textAlign: "justify",
    fontWeight: "bold",
  },
  textCard:{
    justifyContent:"flex-start",
    padding:5,
    fontSize: 13,
    marginTop: -15,
    color: "#000000",
    textAlign: "justify",
  },
  baseLegal: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#434141ff",
    textAlign: "center",
  },
});

export default Tela7Screen;
