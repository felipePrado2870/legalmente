import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import ExitButton from '../../componentes/ExitButton';

export default function DivisionCalculator({ navigation, route }) {
  const [itemsA, setItemsA] = useState([]);
  const [itemsB, setItemsB] = useState([]);
  const [itemsBoth, setItemsBoth] = useState([]);

  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");
  const [step, setStep] = useState("A"); // etapas: "A" → "B" → "Both"

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

const resetStep = route?.params?.resetStep || false;
  
  React.useEffect(() => {
    if (resetStep) {
      setStep("A");
      navigation.setParams({ resetStep: false }); 
    }
  }, [resetStep]);

  return (
    
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.head}>Divisão de Bens</Text>
      </View>
      <Text style={styles.header}>
        {step === "A" ? "Bens do Cônjuge A" : step === "B" ? "Bens do Cônjuge B" : "Bens de Ambos"}
      </Text>

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
        ListEmptyComponent={<Text style={{ color: "#666", textAlign:"center"}}>Nenhum bem ainda</Text>}
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
      <ExitButton goTo="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
     container: { flex: 1,
     backgroundColor: "#ffffffff",
    marginBottom: 40,
    

  },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 10, textAlign: "center" 
  },
  head: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    height: 115,
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#5D252A',
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 6,
  },
  addBtn: {
    backgroundColor: "#8B4A52",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 60,
    marginBottom: 45,
  },
  addBtnText: { color: "#fff",
     textAlign: "center",
      fontWeight: "600" 

  },

  itemRow: { 
     paddingVertical: 6,
     borderBottomWidth: 1,
     borderColor: "#eee",
     padding:40,

 },

  navRow: { 
     flexDirection: "row",
     justifyContent: "space-between",
     marginHorizontal: 15,
     marginBottom: 30,
 },
 
  navBtn: { 
     padding: 12,
     backgroundColor: "#8B4A52",
     borderRadius: 8
 },
  navText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});
