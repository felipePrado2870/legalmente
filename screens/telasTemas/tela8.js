import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ExitButton from '../componentes/ExitButton';

// ---------- COMPONENTE CARD ----------
function Card({ isFlipped, onPress, image, resizeModeType = "cover" }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      <Image
        source={isFlipped ? image : require('../../assets/jogoMemoria/backCard1.jpg')}
        style={styles.image}
        resizeMode={resizeModeType}
      />
    </TouchableOpacity>
  );
}

// ---------- LISTA DE IMAGENS DO JOGO ----------
const images = [
  { img: require('../../assets/jogoMemoria/frontCard1.png'), pairId: 1 },
  { img: require('../../assets/jogoMemoria/frontCard2.png'), pairId: 2 },
  { img: require('../../assets/jogoMemoria/frontCard3.png'), pairId: 3 },
  { img: require('../../assets/jogoMemoria/frontCard4.png'), pairId: 4 },
  { img: require('../../assets/jogoMemoria/frontCard5.png'), pairId: 5 },
  { img: require('../../assets/jogoMemoria/frontCard6.png'), pairId: 6 },
  { img: require('../../assets/jogoMemoria/frontCard7.png'), pairId: 7 },
  { img: require('../../assets/jogoMemoria/frontCard8.png'), pairId: 8 },
];

// ---------- LISTA DE TÓPICOS ----------
const familyTopics = [
  {
    titulo: 'Família Unipessoal',
    imagem: require('../../assets/jogoMemoria/familyImg1.png'),
    explicacao: 'Composta por uma única pessoa que vive sozinha, cada vez mais comum na sociedade moderna.'
  },
  {
    titulo: 'Família Adotiva',
    imagem: require('../../assets/jogoMemoria/familyImg2.png'),
    explicacao: 'Formada através de adoção legal de criança, criando vínculos afetivos e jurídicos permanentes.'
  },
  {
    titulo: 'Família Monoparental',
    imagem: require('../../assets/jogoMemoria/familyImg3.png'),
    explicacao: 'Formada por apenas um dos pais e seus filhos, seja por divórcio, viuvez ou escolha.'
  },
  {
    titulo: 'Família Reconstituída',
    imagem: require('../../assets/jogoMemoria/familyImg4.png'),
    explicacao: 'Quando um ou ambos os cônjuges trazem filhos de relacionamentos anteriores.'
  },
  {
    titulo: 'Família Anaparental',
    imagem: require('../../assets/jogoMemoria/familyImg5.png'),
    explicacao: 'Constituída por irmãos ou parentes que vivem juntos, sem presença de pais.'
  },
  {
    titulo: 'Família Nuclear',
    imagem: require('../../assets/jogoMemoria/familyImg6.png'),
    explicacao: 'Pai, mãe e filhos vivendo na mesma casa. Modelo tradicional.'
  },
  {
    titulo: 'Família Extensa',
    imagem: require('../../assets/jogoMemoria/familyImg7.png'),
    explicacao: 'Inclui avós, tios e primos vivendo juntos ou mantendo vínculos próximos.'
  },
  {
    titulo: 'Família Homoafetiva',
    imagem: require('../../assets/jogoMemoria/familyImg8.png'),
    explicacao: 'Casal do mesmo sexo, com ou sem filhos, reconhecida legalmente no Brasil.'
  }
];

// ---------- FUNÇÃO PARA EMBARALHAR ----------
const createShuffledDeck = () => {
  // duplica cada imagem
  const duplicated = images.flatMap((card) => [card, { ...card }]);

  return duplicated
    .map((card, index) => ({
      id: index + '_' + Math.random(),
      image: card.img,
      pairId: card.pairId,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5); // embaralha
};

export default function Tela8Screen() {
  const [deck, setDeck] = useState(createShuffledDeck());
  const [selectedCards, setSelectedCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showTopics, setShowTopics] = useState(false);

  const handleCardPress = (index) => {
    if (deck[index].isFlipped || selectedCards.length === 2) return;

    const newDeck = [...deck];
    newDeck[index].isFlipped = true;
    setDeck(newDeck);
    setSelectedCards([...selectedCards, { ...newDeck[index], index }]);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;

      if (first.pairId === second.pairId) {
        const updatedDeck = [...deck];
        updatedDeck[first.index].isMatched = true;
        updatedDeck[second.index].isMatched = true;
        setDeck(updatedDeck);
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          const updatedDeck = [...deck];
          updatedDeck[first.index].isFlipped = false;
          updatedDeck[second.index].isFlipped = false;
          setDeck(updatedDeck);
          setSelectedCards([]);
        }, 1000);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    if (deck.every((card) => card.isMatched)) {
      setModalVisible(true);
    }
  }, [deck]);

  return (
    <LinearGradient colors={['#A67C7C', '#8B4A52', '#5D252A']} style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
        <Text style={styles.title}>Jogo da Memória - Família</Text>
        <FlatList data={deck} keyExtractor={(item) => item.id} 
          columnWrapperStyle={{ gap: 0, justifyContent: 'center' }} // espaçamento horizontal
          numColumns={4} 
          renderItem={({ item, index }) => (
            <Card image={item.image} isFlipped={item.isFlipped || item.isMatched} 
              onPress={() => handleCardPress(index)}resizeModeType="stretch" 
            />
          )}
          scrollEnabled={false}
          contentContainerStyle={[styles.board, { rowGap: 3 }]} // espaçamento vertical
          style={{ width: '95%', height: '100%' }} 
        />
        <View style={styles.topicContainer}>
         <TouchableOpacity onPress={() => setShowTopics(!showTopics)}>
            <Text style={styles.topicBodyTitle}>
              {showTopics ? 'Ocultar detalhes' : 'Clique para mais detalhes'}
            </Text>
          </TouchableOpacity>
          {showTopics && (
            <View style={styles.topicTbody}>
              {familyTopics.map((topic, index) => (
                <View key={index} style={styles.topicCard}>
                  <Text style={styles.topicCardTitle}>{topic.titulo}</Text>
                  <Image source={topic.imagem} style={styles.topicCardImage}/>
                  <Text style={styles.topicCardText}>{topic.explicacao}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.button}
              onPress={() => { setDeck(createShuffledDeck()); setModalVisible(false);}}>
              <Text style={styles.buttonText}>Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ExitButton goTo="Home" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginVertical: 15
  },
  board: {
    paddingBottom: 10,
  },
  card: {
    width: 82,
    height: 145,
    margin: 2,
    marginHorizontal: 3,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  topicContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center'
  },
  topicBodyTitle: {
    width: 340,
    height: 35,
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#5D252A',
    borderRadius: 8,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    paddingHorizontal: 30
  },
  topicTbody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  topicCard: {
    width: '41%',
    margin: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 3
  },
  topicCardTitle: {
    color: '#000000ff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 5
  },
  topicCardImage: {
    width: '70%',
    height: 100,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: 2,
    borderRadius: 20,
  },
  topicCardText: {
    color: '#010101ff',
    fontSize: 13,
    textAlign: 'justify',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
  },
  button: {
    backgroundColor: '#D4AF37',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  }
});
