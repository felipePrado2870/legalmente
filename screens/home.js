import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const lista = require('./dados/informacoes.json');
const infoGeral = require('./dados/infoGeral.json');
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

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HomeScreen = ({ navigation }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [expanded, setExpanded] = useState({});

  const toggleInfo = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowInfo(!showInfo);
  };

  const toggleSection = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Cabeçalho */}
        <LinearGradient colors={['#8B4A52', '#8B4A52', '#5D252A']} style={styles.headerScroll2}>
          <Image source={require('../assets/splash1.png')} style={styles.icon} resizeMode="contain" />
          <Text style={styles.textTemaAplicativo}>Direito da Família</Text>
          <Text style={styles.text1}>Conhecimento jurídico especializado ao seu alcance</Text>
        </LinearGradient>

        {/* Lista de cards */}
        {lista.ListaDados?.length === 0 && (
          <Text style={styles.emptyText}>Nenhum dado disponível no momento</Text>
        )}
        {lista.ListaDados?.map((item) => (
          <TouchableOpacity key={item.titulo} onPress={() => navigation.navigate(item.tela)}>
            <View style={styles.container}>
              <LinearGradient colors={['#FFFFFF', '#FAF7F0', '#FFFFFF']} style={styles.card}>
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

        {/* Seção inferior - Informações do aplicativo */}
        <View style={styles.infoContainer}>
          <TouchableOpacity onPress={toggleInfo} style={styles.infoHeader}>
            <Text style={styles.infoTitle}>
              {showInfo ? 'Ocultar informações' : 'Ver mais sobre o aplicativo'}
            </Text>
          </TouchableOpacity>

          {showInfo && (
            <View style={styles.infoContent}>
              {/* Instituição */}
              <TouchableOpacity onPress={() => toggleSection('instituicao')} style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>🏛 Instituição</Text>
              </TouchableOpacity>
              {expanded.instituicao && (
                <View style={styles.sectionBody}>
                  <Text style={styles.sectionText1}>
                    <Text style={styles.bullet}>•  </Text>
                    {infoGeral.informacoes_gerais.instituicao.nome}
                  </Text>
                  <Text style={styles.sectionText1}>
                    <Text style={styles.bullet}>•  </Text>
                    {infoGeral.informacoes_gerais.instituicao.descricao}
                  </Text>
                </View>
              )}
              {/* Coordenação */}
              <TouchableOpacity onPress={() => toggleSection('prof')} style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>👨‍🏫  Mentores</Text>
              </TouchableOpacity>
              {expanded.prof && (
                <View style={styles.sectionBody}>
                  {infoGeral.informacoes_gerais.Mentores.map((p, i) => (
                    <View key={i} style={styles.professorBox}>
                      <Text style={styles.sectionTextCargo}>{p.cargo}</Text>
                      <Text style={styles.sectionTextNome}>{p.nome}</Text>
                    </View>
                  ))}
                </View>
              )}
              {/* Desenvolvedores */}
              <TouchableOpacity onPress={() => toggleSection('devs')} style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>💻 Desenvolvedores</Text>
              </TouchableOpacity>
              {expanded.devs && (
                <View style={styles.sectionBody}>
                  {infoGeral.informacoes_gerais.desenvolvedores.map((dev, i) => (
                    <Text key={i} style={styles.sectionText2}>
                      <Text style={styles.bullet}>•  </Text>
                      {dev}
                    </Text>
                  ))}
                </View>
              )}
              {/* Turma de Direito */}
              <TouchableOpacity onPress={() => toggleSection('direito')} style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>⚖️ Turma de Direito</Text>
              </TouchableOpacity>
              {expanded.direito && (
                <View style={styles.sectionBody}>
                  <Text style={styles.sectionText3}>{infoGeral.informacoes_gerais.turma_de_direito.descricao}</Text>
                  {infoGeral.informacoes_gerais.turma_de_direito.alunos.map((aluno, i) => (
                    <Text key={i} style={styles.sectionText2}>
                      <Text style={styles.bullet}>•  </Text>
                      {aluno}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F0',
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
    borderColor: '#d4af3774',
    borderWidth: 2,
    marginBottom: 10,
  },
  assuntoText: {
    color: '#6f6d6dff',
    fontSize: 15,
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
    fontWeight: 'bold',
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
  infoContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
  },
  infoHeader: {
    alignItems: 'center',
    backgroundColor:'#8B4A52',
    padding: 12,
    borderRadius: 20,
    width: '65%',
    alignSelf: 'center',
  },
  infoTitle: {
    fontSize: 15,
    color: '#ffffffff',
  },
  infoContent: {
    marginTop: 20,
    padding: 10,
    borderRadius: 12,
    borderColor: '#D4AF37',
    borderWidth: 0.2,
    borderTopWidth: 2,
  },
  sectionHeader: {
    marginBottom: 15,
    padding: 12,
    borderRadius: 12,
    borderColor: '#D4AF37',
    borderLeftWidth: 2,
    borderWidth: 0.2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: '#8B4A52',
  },
  sectionBody: {
    paddingLeft: 15,
    marginBottom: 20,
  },
  sectionText1: {
    fontSize: 13,
    color: '#000000ff',
    textAlign: "justify", 
  },
  sectionText2: {
    fontSize: 15,
    color: '#000000ff',
    textAlign: "justify", 
  },
  sectionText3: {
    fontSize: 15,
    color: '#8B4A52',
    fontWeight: "bold",
    textAlign: "justify", 
  },
  professorBox: {
    marginBottom: 10,
    paddingBottom: 5,
  },

  sectionTextCargo: {
    fontSize: 15,
    color: '#8B4A52',
    fontWeight: "bold",
    textAlign: "justify", 
  },

  sectionTextNome: {
    fontSize: 15,
    color: '#000000ff',
    marginLeft: 10,
  },
  bullet: {
    color: '#D4AF37',
    fontWeight: 'bold',
  },

});
