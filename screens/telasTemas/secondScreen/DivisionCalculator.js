import React, { useState } from "react";
import { View, Text,Image, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import ExitButton from '../../componentes/ExitButton';
import { useFocusEffect } from '@react-navigation/native';

export default function DivisionCalculator({ navigation, route }) {
  const [itemsA, setItemsA] = useState([]);
  const [itemsB, setItemsB] = useState([]);
  const [itemsBoth, setItemsBoth] = useState([]);
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");
  const [step, setStep] = useState("A"); 

  const addItem = () => {
    const v = parseFloat(value.replace(",", "."));
    if (!desc.trim() || isNaN(v) || v < 0) {
      Alert.alert("Erro", "Informe descrição válida e valor numérico ≥ 0.");
      return;
    }
    const newItem = { id: Date.now().toString(), desc: desc.trim(), value: v };

    if (step === "A") {
      setItemsA((s) => [newItem, ...s]);
    } else if (step === "B") {
      setItemsB((s) => [newItem, ...s]);
    } else {
      setItemsBoth((s) => [newItem, ...s]);
    }
    setDesc("");
    setValue("");
  };

  

  const nextStep = () => {
    if (step === "A") {
      setStep("B");
    } else if (step === "B") {
      setStep("Both");
    } else {
      navigation.navigate("Regime", { itemsA, itemsB, itemsBoth });
    }
  };
  const currentItems = step === "A" ? itemsA : step === "B" ? itemsB : itemsBoth;
  const total = currentItems.reduce((acc, item) => acc + item.value, 0);
  const prevStep = () => {
    if (step === "B") {
      setStep("A"); 
    } else if (step === "Both") {
      setStep("B"); 
    } else {
      navigation.goBack();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.resetStep) {
        setStep("A");
        setItemsA([]);
        setItemsB([]);
        setItemsBoth([]);
        navigation.setParams({ resetStep: false });
      }
    }, [route.params])
  );

  return ( 
    <View style={styles.container1}>
      <View style={styles.card2}>
      <Text style={styles.head}> ⚖️ Divisão de Bens</Text>
      <View style={styles.container2}>
        <Text style={[ styles.text2,step === "A" && { backgroundColor:'#D4AF37',borderColor: '#D4AF37', color: "#fff", elevation: 6},]}> A </Text>
        <Text style={[ styles.text2,step === "B" && { backgroundColor: '#D4AF37',borderColor: '#D4AF37', color: "#fff", elevation: 6},]}> B </Text>
        <Text style={[ styles.text2,step === "Both" && { backgroundColor: '#D4AF37',borderColor: '#D4AF37',color: "#fff", elevation: 6},]}>📊</Text>
      </View>
      <Text style={styles.header}>
        {step === "A" ? "  👤 Cônjuge A  " : step === "B" ? "  👤 Cônjuge B  " : "  Bens de Ambos  "}
      </Text>
      <Text style={styles.text1}> 📝 Descrição do Bem</Text>
      <TextInput placeholder="Ex: Casa, Carro, Conta Bancária..."  placeholderTextColor={"#2222226e"} style={styles.input} value={desc} onChangeText={setDesc}/>
      <Text style={styles.text1}> 💰 Valor (R$)</Text>
      <TextInput placeholder="0,00" placeholderTextColor={"#2222226e"}style={styles.input}keyboardType="numeric" value={value} onChangeText={setValue} />
      <TouchableOpacity style={styles.addBtn} onPress={addItem}>
        <Text style={styles.addBtnText}>➕ Adicionar Bem</Text>
      </TouchableOpacity>
      <FlatList data={currentItems} keyExtractor={(it) => it.id} renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.desc} — R$ {item.value.toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View>
            <Text style={{ color: "#666", textAlign:"center", fontSize: 35 }}>
              📦
            </Text>
            <Text style={{ color: "#666", textAlign:"center", fontSize: 13 }}>
              Nenhum bem ainda
            </Text>
          </View>
        }
        style={styles.list}
      />
      <View style={styles.card3}>
        <Text style={styles.totalText1}>Total dos bens</Text>
        <Text style={styles.totalText2}>R$  {total.toFixed(2)}</Text>
      </View>
      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navBtn} onPress={prevStep}>
          <Text style={styles.navText}>⬅ Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={nextStep}>
          <Text style={styles.navText}>
            {step === "A" ? "Próximo ➡" : step === "B" ? "Próximo ➡" : "Calcular ➡"}
          </Text>
        </TouchableOpacity>
      </View>
      </View>
      <ExitButton goTo="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    padding: 16,
    backgroundColor: "#8B4A52",
    justifyContent: "center",
    alignItems: "center",
  }, 
  container2: {
    flexDirection: "row", 
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 10,
    marginTop: 10,
  }, 
  card2: {
    width: "90%", 
    padding: 20,    
    borderRadius: 20,
    backgroundColor: "#ffffffff",
    alignItems: "center",   
    elevation: 6,
  },
  card3: {
    width: "100%", 
    padding: 10,  
    marginTop: 20,  
    borderRadius: 10,
    backgroundColor: '#D4AF37',
    alignItems: "center",
    textAlign: "center",   
   
  },
  header: { 
    fontSize: 15,
    fontWeight: 'bold', 
    textAlign: "center" ,
    marginBottom: 5,
    backgroundColor: "#8B4A52",
    padding: 8,
    elevation: 6,
    borderRadius: 20,
    color: "#fff",
  },
  head: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    color: '#5D252A',
    fontWeight: 'bold',
    marginTop: -10,
  },
  text1: {
    marginTop: 10,
    width: '100%',
    fontSize: 15,
    color: '#5D252A',
    fontWeight: 'bold',
    marginBottom: 5,
  },
   text2: {
    fontSize: 15,
    fontWeight: 'bold', 
    textAlign: "center" ,
    marginBottom: 5,
    borderColor: "#8B4A52",
    borderWidth: 2,
    marginHorizontal: 10,
    padding: 7,
    borderRadius: 20,
    color: "#000000ff",
  },
  text3: {
    fontSize: 15,
    textAlign: "center" ,
    marginBottom: 5,
    padding: 7,
  },
  totalText1: {
    fontSize: 10,
    color: "#ffffffff",
    textAlign: "center",
  },
   totalText2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffffff",
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: '#d4af3739',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 10,
  },
  addBtn: {
    width: "100%",  
    backgroundColor:  '#D4AF37',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  addBtnText: { 
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    elevation: 6,
  },
  itemRow: { 
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#eee",
    padding:10,
  },
  navRow: { 
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  navBtn: { 
    flex: 1,
    alignItems:"center",
    marginTop: 20,
    marginHorizontal: 10,
    padding: 12,
    backgroundColor: "#8B4A52",
    borderRadius: 8,
    elevation: 6,
 },
 list: {
    marginTop: 10,
    maxHeight: 80, 
    width: "100%", 
  },
  itemRow: { 
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderColor:'#d4af3780',
    paddingHorizontal: 10,
  },
  navText: { 
    color: "#fff", 
    fontWeight: "600", 
    textAlign: "center" 
  },
});
