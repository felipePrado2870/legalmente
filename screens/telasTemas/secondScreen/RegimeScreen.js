import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ExitButton from '../../componentes/ExitButton';


const regimes = [
  { key: "partial", label: "Comunhão Parcial" },
  { key: "universal", label: "Comunhão Universal" },
  { key: "separation", label: "Separação Total" },
  { key: "participation", label: "Participação Final nos Aquestos" },
];




export default function RegimeScreen({ navigation, route }) {
  const { itemsA = [], itemsB = [], itemsBoth = [] } = route.params || {};
    const [items, setItems] = useState([...itemsA, ...itemsB, ...itemsBoth]);
  const [regime, setRegime] = useState(null);

  const grandTotal = items.reduce((sum, it) => sum + it.value, 0);

  let shareA = 0;
  let shareB = 0;
  let note = "";

  if (regime === "partial") {
    shareA = grandTotal / 2;
    shareB = grandTotal / 2;
    note = "Na comunhão parcial, divide-se apenas os bens adquiridos após a união.";
  } else if (regime === "universal") {
    shareA = grandTotal / 2;
    shareB = grandTotal / 2;
    note = "Na comunhão universal, todo patrimônio é dividido igualmente.";
  } else if (regime === "separation") {
    shareA = 0;
    shareB = grandTotal;
    note = "Na separação total, cada cônjuge fica com o que está em seu nome.";
  } else if (regime === "participation") {
    shareA = grandTotal / 2;
    shareB = grandTotal / 2;
    note = "Na participação final nos aquestos, divide-se o adquirido onerosamente.";
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.head}>Divisão de Bens</Text>
      </View>
      <Text style={styles.header}>Escolha o Regime de Bens</Text>

      {regimes.map((r) => (
        <TouchableOpacity
          key={r.key}
          style={[styles.regimeBtn, regime === r.key && styles.regimeBtnActive]}
          onPress={() => setRegime(r.key)}
        >
          <Text style={regime === r.key ? styles.regimeTextActive : styles.regimeText}>
            {r.label}
          </Text>
        </TouchableOpacity>
      ))}

      {regime ? (
        <View style={styles.resultBox}>
          <Text style={styles.header}>Resultado</Text>
          <Text>Patrimônio Total: R$ {grandTotal.toFixed(2)}</Text>
          <Text>Parte Cônjuge A: R$ {shareA.toFixed(2)}</Text>
          <Text>Parte Cônjuge B: R$ {shareB.toFixed(2)}</Text>
          <Text style={{ marginTop: 10, color: "#444" }}>{note}</Text>
        </View>
      ) : null}

      <View style={styles.navRow}>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate("DivisionCalculator", { resetStep: true })}>
          <Text style={styles.navText}>Novo Cálculo</Text>
        </TouchableOpacity>
      </View>
      <ExitButton goTo="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f8" },
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
  header: { 
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    textAlign:"center",

  },
  regimeBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal:45,
  },
  regimeBtnActive: { 
    backgroundColor: "#8B4A52",
    borderColor: "#8B4A52",
    
  },
  regimeText: { 
    color: "#333",
    textAlign:"center",

  },
  regimeTextActive: { 
    color: "#fff",
    textAlign:"center", 

  },

  resultBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal:"15",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  navRow: {
    flexDirection: "row",
    justifyContent:"center",
    marginTop: 20,
  },
  navBtn: { 
    padding: 12,
    backgroundColor: "#8B4A52",
    borderRadius: 8,
  },

  navText: { 
     color: "#fff",
     fontWeight: "600",
    },
});
