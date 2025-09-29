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
          <Text style={styles.headerText1}>União Estável e Sucessão</Text>
          <Text style={styles.headerText2}>Entenda e Simule</Text>
          <Text style={styles.headerText3}>
            Informações essenciais e um simulador educativo para visualizar a divisão de bens.
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.cardSimulator}>
          <Text style={styles.simulatorTitle}>Simulador</Text>
          <Image source={require("../../assets/calculadorabens/imagem1.png")} style={styles.img1}/>
          <Text style={styles.text}>
            Uma forma rápida e educativa de estimar uma divisão de bens em união estável usando regras simplificadas. O resultado é apenas informativo.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('DivisionCalculator')}>
            <Text style={styles.startButton}>Iniciar Simulação</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.titleCard}>O que é União Estável</Text>
          <Text style={styles.text}>
            Convivência pública, contínua e duradoura entre duas pessoas com objetivo de constituir família, sem exigir casamento formal.
          </Text>

          {showUniao && (
            <View style={styles.extraBox}>
              <Text style={styles.textCard}>
                Pode ser reconhecida:
                {"\n"}
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
          <Text style={styles.titleCard}>Direito de Sucessão</Text>
          <Text style={styles.text}>
            O companheiro(a) possui proteção sucessória; a extensão depende do regime de bens e da existência de descendentes.
          </Text>

          {showSucessao && (
            <View style={styles.extraBox}>
              <Text style={styles.textCard}>
                Direitos variam com a existência de descendentes, ascendentes e pactos.
                {"\n"}
                {"\n"}• Deve ser pública, contínua e duradoura;
                {"\n"}
                {"\n"}• As regras de herança podem mudar com filhos, ascendentes e pactos.
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
    padding: 10,
  },
  img1: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
    borderRadius: 200,
    marginBottom: 10,
    borderColor: '#D4AF37',
    backgroundColor:"#fff6dd",
    borderWidth: 5,
    alignSelf: 'center',
  },
  headerText1: {
    marginTop: 50,
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  headerText2: {
    fontSize: 24,
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
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  simulatorTitle: {
    fontSize: 20,
    color: "#5D252A",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "justify",
  },
  startButton: {
    backgroundColor: "#D4AF37",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    alignItems:"center",
  },
  titleCard: {
    fontSize: 20,
    color: "#D4AF37",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  toggleButton: {
    backgroundColor: "#D4AF37",
    padding: 8,
    borderRadius: 8,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    width:120,
  },
  extraBox: {
    width:"100%",
    backgroundColor: "#fff6dd",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
    borderWidth:2,
    borderColor:"#ffebb3ff"
  },
  textCard:{
    justifyContent:"flex-start",
    padding:5,
    fontSize: 13,
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
