import React, { useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ExitButton from '../componentes/ExitButton';

const SLIDE_SIZE = 250;


const images = [
  require("../../assets/lgbt/slideImg1.png"),
  require("../../assets/lgbt/slideImg2.png"),
  require("../../assets/lgbt/slideImg3.png"),
  require("../../assets/lgbt/slideImg4.png"),
];

const themes = [
  {
    type: "cards",
    title: 'O que é o Direito à Identidade de Gênero?',
    text: 'É o reconhecimento da autodeterminação de cada indivíduo em relação à sua experiência interna e pessoal de gênero, que pode ou não corresponder ao sexo atribuído ao nascimento. Trata-se de um direito humano fundamental, protegido contra a discriminação em diversas convenções internacionais, como as da ONU e a CEDAW..',
    cards: [
      { title: 'Auto determinação', text: 'A pessoa define seu próprio género' },
      { title: 'Auto determinação', text: 'Essencial para a dignidade e liberdade.' },
      { title: 'Auto determinação', text: 'Contra qualquer tipo de discriminação.' }
    ]
  },
  {
    type: "topics",
    title: 'Decisão do STF de (2018) e Provimento do CNJ',
    text: 'STF reconheceu direito à alteração de nome e gênero sem cirurgia ou laudos. Provimento CNJ nº 73/2018 garante procedimento administrativo. Inclusão do gênero "não binário" permitida em alguns estados.',
    subTitle: "Quem pode solicitar?",
    topics: [
      "Qualquer pessoa com mais de 18 anos",
    ]
  },
  {
    type: "steps",
    title: 'Alteração do nome e gênero no Registro Civil',
    text: 'O processo para a retificação de nome e gênero é simplificado e pode ser realizado diretamente em qualquer Cartório de Registro Civil.',
    steps: [
      { title: 'Comparecer ao cartório', text: 'Dirija-se a qualquer Cartório de Registro Civil com um documento oficial de identificação.' },
      { title: 'Manifestar Vontade', text: 'Declare sua vontade de alterar o prenome e o gênero para que correspondam à sua identidade.' },
      { title: 'preencher os Termos', text: ' Preencha o termo de declaração e o requerimento formal fornecidos pelo cartório.' },
      { title: ' Registro e Averbação', text: 'O cartório registrará e averbará a alteração em seu assento de nascimento (e casamento, se houver).' },
    ]
  },
  {
    type: "documents",
    title: "Documentação necessária para o pedido",
    text: " É importante notar que a legislação não exige laudos médicos, psicológicos, nem autorização judicial, desburocratizando o processo e respeitando a autodeterminação individual.",
    documents: [
      "Documento de identidade oficial com foto: RG, CNH ou passaporte.",
      "Certidão de nascimento original: Atualizada.",
      "Comprovante de residência atualizado: Conta de consumo, por exemplo.",
      "Declaração pessoal de vontade: Modelo fornecido pelo próprio cartório."
    ],
    importance: [
      { title: "Educação", text: "Acesso pleno a matrículas e reconhecimento em ambientes acadêmicos." },
      { title: "Saúde", text: "Atendimento adequado e respeitoso em hospitais e clínicas." },
      { title: "Trabalho", text: "Oportunidades profissionais e ambiente de trabalho inclusivo." },
      { title: "Cidadania", text: "Exercício pleno de direitos e deveres civis." }
    ]
  },

];

const Tela5Screen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  // Slider automático
 useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollRef.current?.scrollTo({ x: nextIndex * SLIDE_SIZE, animated: true });
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);


  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / SLIDE_SIZE);
    setCurrentIndex(newIndex);
  };

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <LinearGradient 
      colors={['#A67C7C', '#8B4A52', '#602d32ff']} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header2}>Identidade de Gênero</Text>
        <Text style={styles.header3}>Conheça seus direitos.</Text>

        <View style={styles.sliderContainer}>
          <ScrollView 
            ref={scrollRef} 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false} 
            onScroll={onScroll} 
            scrollEventThrottle={16} 
            style={styles.scrollContainer2} 
            contentContainerStyle={styles.scrollContent}
          >
            {images.map((img, i) => (
              <View key={i} style={styles.imageWrapper}>
                <Image source={img} style={styles.image} />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <Text key={index} style={[styles.dot, currentIndex === index && styles.activeDot]}> ●</Text>
          ))}
        </View>


        

        {themes.map((item, index) => (
          <View key={index} style={styles.themes}>
            <TouchableOpacity onPress={() => toggleAnswer(index)} style={styles.alignThemes}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.arrow}>{expandedIndex === index ? "▼" : "▶"}</Text>
            </TouchableOpacity>

            {expandedIndex === index && (
              <View>
                <View style={styles.descriptionBody}>
                  <Text style={styles.description}>{item.text}</Text>
                </View>
                {/* card Identidade de genero */}
                {item.type === "cards" && item.cards?.map((card, i) => (
                  <View key={i} style={styles.topicCard}>
                    <Text style={styles.titleCard}>{card.title}</Text>
                    <Text style={styles.textCard}>{card.text}</Text>
                  </View>
                ))}
                {/* decisão do STF */}
                {item.type === "topics" && (
                  <View>
                    {item.subTitle && (
                      <Text style={styles.subTitle}>{item.subTitle}</Text>
                    )}
                    {item.topics?.map((topic, i) => (
                      <View key={i} style={styles.topicItem}>
                        <Text style={styles.topicText}>{topic}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {/* Alteração nome e gênero */}
                {item.type === "steps" && (
                  <View>
                    {item.steps?.map((step, i) => (
                      <View key={i} style={styles.stepItem}>
                        <View style={styles.stepContent}>
                          <Text style={styles.stepIndex}>{i + 1}.</Text>
                          <Text style={styles.stepTitle}>{step.title}</Text>
                        </View>
                        <Text style={styles.stepText}>{step.text}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {/* Documentação necessária */}
                {item.type === "documents" && (
                  <View>
                    {item.documents?.map((doc, i) => (
                      <View key={i} style={styles.docItem}>
                        <Text style={styles.docText}>{doc}</Text>
                      </View>
                    ))}
                    <Text style={styles.subTitle}>Importância</Text>
                    <View>
                      {item.importance?.map((imp, i) => (
                        <View key={i} style={styles.importanceCard}>
                          <Text style={styles.importanceTitle}>{imp.title}</Text>
                          <Text style={styles.importanceText}>{imp.text}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>
        ))}
         <Text style={styles.endText}>Conteúdo informativo. Para casos específicos, consulte o cartório da sua cidade.</Text>
      </ScrollView>
      <ExitButton goTo="Home" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    padding: 16
  },
  header2: {
    color: '#D4AF37',
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 40,
  },
  header3:{
    color: '#fff',
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  themes: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  alignThemes:{
    flexDirection: "row",
    alignItems: "center",
    paddingEnd:4,
  },
  title: {
    fontSize: 15,
    fontWeight:"bold",
    color:"#D4AF37"
  },
  arrow:{
    fontSize:20,
    fontWeight: "bold",
    color: "#D4AF37",
    position:"absolute",
    right:-10,
  },
  descriptionBody: {
    backgroundColor: '#ffffff8e',
    padding: 5,
    borderRadius: 8,
    marginBottom:10,
  },
  description: {
    fontSize: 14,
    color: '#000',
    textAlign: "justify", 
  },
  topicCard: {
    backgroundColor: "#ab828227",
    padding:10,
    width:"100%",
    borderRadius:8,
    marginBottom:5,
  },
  titleCard: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#D4AF37",
    textAlign: "center"
  },
  textCard: {
    marginTop: 5,
    fontSize: 14,
    color: "#000000de",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000de',
    textAlign: "left",
    marginBottom: 5,
    paddingTop:10,
  },
  topicItem: {
    alignSelf: "flex-start",
    padding:5,
  },
  topicText: {
    fontSize: 14,
    padding:5,
    color:"#000000de",
    backgroundColor:"#ab828227",
    borderRadius:5,
    width:"100%",
  },
  stepItem: {
    backgroundColor:"#ab828227",
    borderRadius:10,
    borderLeftWidth: 6,
    borderLeftColor: "#cbc3c4de",
    marginBottom:10,
    padding:10,
  },
  stepIndex: {
    fontSize: 15,
    fontWeight:"bold",
    color: "#000000de",
    marginRight: 8,
  },
  stepContent: {
    flexDirection: "row",
    alignItems:"center"
  },
  stepTitle: {
    fontSize: 14,
    color: "#000000de",
  },
  docItem: {
    alignItems: "flex-start",
    marginBottom: 6,
  },
  docText: {
    fontSize: 13,
    color: "#000000ff",
    fontWeight:"bold",
  },
  importanceCard: {
    backgroundColor: "#ab828227",
    padding: 8,
    width: "100%",
    borderRadius:8,
    marginBottom:5,
  },
  importanceTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000000ff",
  },
  importanceText: {
    fontSize: 12,
    color: "#444",
  },
  sliderContainer: { 
    height: SLIDE_SIZE, 
    marginBottom:30,
  },
  scrollContainer2: {
    alignSelf: "center",
    borderWidth: 8,
    borderColor: "#D4AF37",
    borderRadius: SLIDE_SIZE / 2,
    overflow: "hidden",
    width: SLIDE_SIZE,
  },
  scrollContent: { 
    alignItems: "center",

   },
  imageWrapper: {
    width: SLIDE_SIZE,
    height: SLIDE_SIZE,
    borderRadius: SLIDE_SIZE / 2,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#D4AF37",
  },

  dotsContainer: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 15,
  marginTop:-25,
},

dot: {
  fontSize: 15,
  color: "#888", 
  marginHorizontal: 1,
},

activeDot: {
  color: "#D4AF37", 
  fontSize: 16,
},
endText:{
  color: '#fff',
  fontSize:10,
  marginTop:10,
  textAlign: "center" ,
  
},
stepText: {
  fontSize: 13,
  color: "#333",
  marginTop: 4,
  textAlign: "justify",
},


});

export default Tela5Screen;
