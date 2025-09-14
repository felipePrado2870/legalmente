import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, useColorScheme} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const lista = require('./dados/informacoes.json');
const imagens = {
  'GuiaDeCasamento': require('../assets/guiaDeCasamento1.png'),
  'IdentidadeLegal': require('../assets/identidadeLegal1.png'),
  'AtosInfracionais': require('../assets/atosInfracionais1.png'),
  'ViolênciaIntrafamiliar': require('../assets/violênciaIntrafamiliar1.png'),
  'Adoções': require('../assets/adoções1.png'),
  'ViolênciaDoméstica': require('../assets/violenciaDomestica1.png'),
  'GuardaCompartilhada': require('../assets/guardaCompartilhada1.png'),
  'TiposDeFamilias': require('../assets/tiposDeFamilias1.png'),
  'DestituiçãoPoderFamiliar': require('../assets/destituiçãoPoderFamiliar1.png'),
};
const HomeScreen = ({ navigation }) =>  {
  const colorScheme = useColorScheme();
  const backgroundColor = '#ffffff';
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 35 ,backgroundColor: '#ffffff' }}>
        <LinearGradient colors={['#8B4A52', '#8B4A52', '#5D252A']} style={styles.headerScroll2}>
          <Image source={require('../assets/splash1.png')} style={styles.icon} resizeMode="contain"/>
          <Text style={styles.textTemaAplicativo}>Direito da Familia
            
          </Text>
          <Text style={styles.text1}>Conhecimento jurídico especializado ao seu alcance</Text>
        </LinearGradient>
        {lista.ListaDados.length === 0 && (
          <Text style={styles.emptyText}>Nenhum dado disponível no momento</Text>
        )}
        {lista.ListaDados.map((item, index) => (
        <TouchableOpacity key={item.titulo} onPress={() => navigation.navigate(item.tela)}>
          <View style={styles.container}>
            <LinearGradient colors={['#FFFFFF', '#FAF7F0','#FFFFFF']} start={{ x: 0, y: 0 }}  end={{ x: 1, y: 0 }}  style={styles.card}>
              <View style={styles.header}>
                <Image source={imagens[item.imagemSecundari]} style={styles.postImage} />
                <View style={styles.headerText}>
                  <Text style={styles.temaPinciapl}>{item.temaPinciapl}</Text>
                  <Text style={styles.titulo}>{item.tituloTela}</Text>
                </View>
              </View>
              <View style={styles.assuntoBox}>
                <Text style={styles.assuntoText}>{item.textAssunto}</Text>
              </View>
            </LinearGradient>
          </View>
        </TouchableOpacity> 
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F0',
    marginTop: -10,
    marginBottom: 10,
  },
  scroll: {
    paddingHorizontal: 10,
  },
  emptyText: {
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  card: {
    width: '100%',
    height: '94%',
    backgroundColor: '#222222',
    borderRadius: 12,
    padding: 10,
    marginBottom: 18,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerText: {
    flexDirection: 'column',
  },
  temaPinciapl: {
    color: '#5D252A',
    fontWeight: 'bold',
    marginTop: -10,
    fontSize: 25,
  },
  titulo: {
    marginTop: 5,
    color: '#8B4A52',
    fontSize: 18,
  },
  postImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#D4AF37',
    borderWidth: 3,
    marginRight: 10,
  },
  assuntoBox: {
  backgroundColor: '#d4af3750',
  paddingVertical: 7,
  paddingHorizontal: 10,
  borderRadius: 12,
  marginLeft: 7,
  marginRight: 7,
  marginBottom: 10,
  borderColor: '#d4af3774',
  borderWidth: 2,
  overflow: "hidden",
  },
  assuntoText: {
    color: '#6f6d6dff',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'justify',
  },

   headerScroll2: {
    alignItems: 'center',
    width: '110%',
    padding: 16,
    marginBottom: 20,
    marginLeft: -15,
  },
  textTemaAplicativo: {
    fontSize: 25,
    fontStyle: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  text1: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  icon: {
    width: 60,
    height: 60,
    marginTop: 40,
  },
  temaAplicativo: {
    fontSize: 22,
    fontStyle: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  }
});