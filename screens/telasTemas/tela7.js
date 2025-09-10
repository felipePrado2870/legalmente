import React, { useState } from 'react';
import {  Text, StyleSheet, View, ScrollView, TouchableOpacity, Image,  Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ExitButton from '../componentes/ExitButton';

const topics = [
  {
    title: 'O que é União Estável',
    summary:
      'União estável é a convivência pública, contínua e duradoura entre duas pessoas com o objetivo de construir família, sem a necessidade de casamento formal. Ela é reconhecida legalmente e garante direitos e deveres aos parceiros',
    subTitle: 'Definição:',
    explanation:
      'É a convivência pública, contínua e duradoura entre duas pessoas, com objetivo de constituir família. Não exige casamento formal. Pode ser reconhecida:',
    characteristics: [
      'Por escritura pública no cartório;',
      'Judicialmente, em caso de disputa.',
    ],
    legalBasis: 'Art. 1.723 do Código Civil',
    icon: require('../../assets/calculadorabens/modalIcon2.png'),
  },
  {
    title: 'Direito de Sucessão na União Estável',
    summary:
      'Na união estável, o companheiro(a) tem direitos sucessórios semelhantes aos do cônjuge no casamento civil. Isso significa que, em caso de falecimento, ele pode herdar bens do parceiro. É importante destacar que o direito à herança depende da comprovação da união estável e da inexistência de testamento em contrário',
    subTitle: '',
    explanation: '',
    characteristics: [
      'União estável deve ser pública, contínua e duradoura;',
      'Companheiro(a) não pode estar só(a) em relação concorrencial ao falecido(a).',
    ],
    legalBasis: 'Código Civil, Art. 1.723',
    icon: require('../../assets/calculadorabens/modalIcon1.png'),
  },
];

const Tela7Screen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const openModal = (topic) => {
    setSelectedTopic(topic);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#A67C7C', '#8B4A52', '#5D252A']} style={styles.head}>
        <Text style={styles.mainTitle}>O título aqui</Text>
      </LinearGradient>
      <View style={styles.calcCard}>
        <Text style={styles.title}>Simulador de Divisão de Bens</Text>
        <Text style={styles.text}>
          Nesse campo vai ter uma breve explicação do funcionamento do simulador
          e o que ele faz, além de poder ser uma forma de orientar o usuário.
        </Text>
        <TouchableOpacity style={styles.calclButton} onPress={() => navigation.navigate('DivisionCalculator')}>
          <Text style={styles.calcButtonText}>Iniciar Simulação</Text>
        </TouchableOpacity>
      </View>
      {topics.map((item, index) => (
        <View key={index} style={styles.topicCard}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.summary}</Text>
          <TouchableOpacity style={styles.button} onPress={() => openModal(item)}>
            <Text style={styles.buttonText}>Mostrar mais</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedTopic && (
              <ScrollView>
                <View style={styles.modalHeader}>
                  <Image source={selectedTopic.icon} style={styles.icon} />
                  <Text style={styles.modalTitle}>{selectedTopic.title}</Text>
                </View>
                {selectedTopic.subTitle ? (
                  <Text style={styles.sectionTitle}>
                    {selectedTopic.subTitle}
                  </Text>
                ) : null}
                {selectedTopic.explanation ? (
                  <Text style={styles.modalText}>
                    {selectedTopic.explanation}
                  </Text>
                ) : null}
                <Text style={styles.sectionTitle}>Características:</Text>
                {selectedTopic.characteristics.map((car, idx) => (
                  <Text key={idx} style={styles.listItem}>
                    • {car}
                  </Text>
                ))}
                <Text style={styles.legalBasis}>
                  Base legal: {selectedTopic.legalBasis}
                </Text>
              </ScrollView>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)} >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ExitButton goTo="Home" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 30,
  },
  head: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    height: 150,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  calcCard: {
    padding: 20,
  },
  text: {
    textAlign: 'center',
    margin: 10,
    paddingBottom: 10,
    fontSize: 16,
  },
  calclButton: {
    backgroundColor: '#8B4A52',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
    borderRadius: 12,
  },
  calcButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  topicCard: {
    backgroundColor: '#e9dbd9',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8B4A52',
    paddingHorizontal: 20,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    maxHeight: '85%',
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    width: 80,
    height: 80,
    marginRight: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'justify',
  },
  listItem: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 4,
  },
  legalBasis: {
    marginTop: 15,
    fontStyle: 'italic',
    fontSize: 14,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#8B4A52',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Tela7Screen;
