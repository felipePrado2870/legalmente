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

  const images = {
    A: require("../../../assets/calculadorabens/imagem2.png"),
    B: require("../../../assets/calculadorabens/imagem3.png"),
    Both: require("../../../assets/calculadorabens/imagem1.png"),
  };


  return ( 
    <View style={styles.container}>
      <View style={styles.card2}>
      <Text style={styles.head}>Divisão de Bens</Text>
      <Text style={styles.header}>
        {step === "A" ? "Bens do Cônjuge A" : step === "B" ? "Bens do Cônjuge B" : "Bens de Ambos"}
      </Text>
      <Image source={images[step]} style={styles.img1} />
      <TextInput placeholder="Descrição do bem"  placeholderTextColor={"#222222"} style={styles.input} value={desc} onChangeText={setDesc}/>
      <TextInput
        placeholder="Valor (R$)"
        placeholderTextColor={"#222222"}
        style={styles.input}
        keyboardType="numeric"
        value={value}
        onChangeText={setValue}
      />

      <TouchableOpacity style={styles.addBtn} onPress={addItem}>
        <Text style={styles.addBtnText}>Adicionar Bem</Text>
      </TouchableOpacity>

      <FlatList
        data={currentItems}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.desc} — R$ {item.value.toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#666", textAlign:"center" }}>
            Nenhum bem ainda
          </Text>
        }
        style={styles.list}
      />

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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ecc8ccff",
    justifyContent: "center",
    alignItems: "center",
  }, 
  card2: {
    width: "90%", 
    padding: 20,    
    borderRadius: 20,
    backgroundColor: "#ffffffff",
    alignItems: "center",   
    elevation: 6,
  },
  header: { 
    fontSize: 15,
    fontWeight: 'bold', 
    textAlign: "center" ,
    marginBottom: 5,
  },
  img1: {
    width: 250,
    height: 250,
    resizeMode: "stretch",
    borderRadius: 200,
    marginBottom: 10,
    borderColor: '#D4AF37',
    backgroundColor:"#fff6dd",
    borderWidth: 5,
    alignSelf: 'center',
  },
  head: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    color: '#5D252A',
    fontWeight: 'bold',
    marginTop: -10,
  },
  input: {
    width: "100%",
    backgroundColor: "#ecc8ccff",
    borderWidth: 1,
    borderColor: "#ddd",
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
    borderRadius: 8
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
