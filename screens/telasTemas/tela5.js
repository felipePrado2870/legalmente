import React, { useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get("window");

const images = [
  require("../../assets/lgbt/slideImg1.png"),
  require("../../assets/lgbt/slideImg2.png"),
  require("../../assets/lgbt/slideImg3.png"),
  require("../../assets/lgbt/slideImg4.png"),
  require("../../assets/lgbt/slideImg5.png")
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
    title: 'Decisão do STF de 2018 e Provimento do CNJ',
    text: 'STF reconheceu direito à alteração de nome e gênero sem cirurgia ou laudos. Provimento CNJ nº 73/2018 garante procedimento administrativo. Inclusão do gênero "não binário" permitida em alguns estados.',
    subTitle: "Quem pode solicitar a alteração no Registro Civil?",
    topics: [
      "Maiores de 18 anos",
      "Travestis",
      "Pessoas transgênero",
      "Não-binárias"
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

  //slider
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
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
        <Text style={styles.header}>Identidade de Gênero</Text>

        <View style={styles.sliderContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            style={styles.scrollContainer2}   // 🔹 aplica borda circular
            contentContainerStyle={styles.scrollContent}
          >
            {images.map((img, i) => (
              <View key={i} style={styles.imageWrapper}>
                <Image source={images[i]} style={styles.image} />
              </View>
            ))}
          </ScrollView>

          <View style={styles.dotsContainer}>
            {images.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === currentIndex ? styles.activeDot : null]}
              />
            ))}
          </View>
        </View>
          {/* cards expansivos */}
        <View style={styles.cardHeader}>
          <Text style={styles.title1}>LGBTQUIAPN+</Text>
          <Text style={styles.textCardHeader}>Conheça seus direitos</Text>
        </View>
        {themes.map((item, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity onPress={() => toggleAnswer(index)}>
              <Text style={styles.title2}>{item.title}</Text>
            </TouchableOpacity>

            {expandedIndex === index && (
              <View>
                <View style={styles.descriptionBody}>
                  <Text style={styles.description}>{item.text}</Text>
                </View>
               {/* card Identidade de genero */}
                {item.type === "cards" && item.cards?.map((card, i) => (
                  <View
                    key={i}
                    style={[
                      styles.topicCard,
                      i === 1 ? styles.positionCenter : i === 2 ? styles.positionRight : null
                    ]}
                  >
                    <Text style={styles.titleCard}>{card.title}</Text>
                    <Text style={styles.textCard}>{card.text}</Text>
                  </View>
                ))}
              {/* decisão do STF*/}
                {item.type === "topics" && (
                  <View>
                    {item.subTitle && (
                      <Text style={styles.subTitle}>{item.subTitle}</Text>
                    )}
                    {item.topics?.map((topic, i) => (
                      <View key={i} style={styles.topicItem}>
                        <Text style={styles.topicText}>➤ {topic}</Text>
                      </View>
                    ))}
                  </View>
                )}
              {/* Alteração nome e gênero*/}
                {item.type === "steps" && (
                  <View>
                    {item.steps?.map((step, i) => (
                      <View key={i} style={styles.stepItem}>
                        <Text style={styles.stepIndex}>{i + 1}.</Text>
                        <View style={styles.stepContent}>
                          <Text style={styles.stepTitle}>{step.title}</Text>
                          <Text style={styles.stepText}>{step.text}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              {/* Documenteção necessária */}
                {item.type === "documents" && (
                  <View>
                    {item.documents?.map((doc, i) => (
                      <View key={i} style={styles.docItem}>
                        <Text style={styles.docBullet}>➤</Text>
                        <Text style={styles.docText}>{doc}</Text>
                      </View>
                    ))}
                    <Text style={styles.subTitle}>Importância</Text>
                    <View style={styles.importanceGrid}>
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
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  scrollContainer: {
    padding: 16
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 40
  },
  image: {
    width: width,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10
  },
  dotsContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignSelf: "center"
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    margin: 4
  },
  activeDot: {
    backgroundColor: "#fff"
  },
  cardHeader:{
    alignSelf:"center",
    marginBottom:15,
  },
  textCardHeader:{
    alignSelf:"center",
    textAlign:"right",
    color:"#fff",
    fontSize:16,
    
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12
  },
  title1: {
    fontSize: 30,
    fontWeight: 'bold',
    color:  '#ffffffff',
    marginBottom: 5
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    color:  '#602d32ff',
    marginBottom: 5
  },
  descriptionBody: {
    backgroundColor: '#ffffff8e',
    padding: 5,
    borderRadius: 8
  },
  description: {
    fontSize: 16,
    color: '#000',
    textAlign: "center"
  },
  descriptionBody: {
    backgroundColor: '#ffffff8e',
    padding: 5,
    borderRadius: 8,
  },
  topicCard: {
    backgroundColor: "#f4efefde",
    width: "65%",
    height: 100,
    marginTop: 10,
    borderTopWidth: 5,
    borderWidth: 1,
    borderColor: "#6d0000ff",
    borderRadius: 6,
    paddingTop: 7,
    alignSelf: 'flex-start',

  },
  positionCenter: {
    alignSelf: "center"
  },
  positionRight: {
    alignSelf: "flex-end"
  },

  titleCard: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#7f0314ff",
    textAlign: "center"


  },
  textCard: {
    fontSize: 18,
    color: "#920013de",
    textAlign: "center",

  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#920013de',
    textAlign: "center",
    marginBottom: 5,
    paddingTop:10,
  },
  topicItem: {
    alignSelf: "center",
    padding:5,

  },
  topicText: {
    fontSize: 18,
    padding: 8,
    color:"#920013de",
    backgroundColor:"white",
    borderRadius:8,
    width:230,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff3e0",
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
    borderLeftWidth: 6,
    borderLeftColor: "#920013de"
  },
  stepIndex: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#920013de",
    marginRight: 8
  },
  stepContent: {
    flex: 1
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#920013de"
  },
  stepText: {
    fontSize: 16,
    color: "#4f3128ff"
  },
  docItem: {
    paddingTop:10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  docBullet: {
    fontSize: 30,
    color: "#920013de",
    marginRight: 6,
  },
  docText: {
    fontSize: 18,
    color: "#56000cff",
    fontWeight:"bold",
    flexShrink: 1,

  },
  importanceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor:"#f1f1f1",
    marginTop: 12,
    borderRadius:20,
  },
  importanceCard: {
    padding: 10,
    width: "48%",
    marginBottom: 10,
  },
  importanceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#4a148c",
  },
  importanceText: {
    fontSize: 14,
    color: "#444",
  },
  sliderContainer: {
    height: 200,
    marginVertical: 20,
  },
  image: {
    width: width,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    margin: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
    /* --- Carrossel Circular --- */
  sliderContainer: { height: 320 },
  scrollContainer2: {
    alignSelf: "center",
    borderWidth: 8,
    borderColor: "#fff",
    borderRadius: 160,
    overflow: "hidden",
    width: 320,
    height: 320,
  },
  scrollContent: { alignItems: "center", justifyContent: "center" },
  imageWrapper: {
    width: 320,
    height: 320,
    borderRadius: 160,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 30,
  },

});

export default Tela5Screen;