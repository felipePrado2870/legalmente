import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import ExitButton from "../../componentes/ExitButton";

const regimes = [
  { key: "partial", label: "Comunhão Parcial" },
  { key: "universal", label: "Comunhão Universal" },
  { key: "separation", label: "Separação Total" },
  { key: "participation", label: "Participação Final nos Aquestos" },
];

export default function RegimeScreen({ navigation, route }) {
  const { itemsA = [], itemsB = [], itemsBoth = [] } = route.params || {};
  const [items] = useState([...itemsA, ...itemsB, ...itemsBoth]);

  const [regime, setRegime] = useState(null);     
  const [showOptions, setShowOptions] = useState(true); 

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

  const toggleRegime = (key) => {
    if (regime === key) {
      setRegime(null);
      setShowOptions(true);
    } else {
      setRegime(key);
      setShowOptions(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.head}>Divisão de Bens</Text>
        <Text style={styles.header}>Escolha o Regime de Bens</Text>
        <Image source={require("../../../assets/calculadorabens/imagem1.png")}style={styles.img1} />
        {showOptions ? (
          regimes.map((r) => (
            <TouchableOpacity key={r.key} style={[styles.regimeBtn, regime === r.key && styles.regimeBtnActive]} onPress={() => toggleRegime(r.key)}>
              <Text style={regime === r.key ? styles.regimeTextActive : styles.regimeText}>
                {r.label}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <TouchableOpacity style={[styles.regimeBtn, styles.regimeBtnActive]} onPress={() => toggleRegime(regime)}>
            <Text style={styles.regimeTextActive}>
              {regimes.find((r) => r.key === regime)?.label}
            </Text>
          </TouchableOpacity>
        )}
        {regime ? (
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>Resultado</Text>
            <Text>Patrimônio Total: R$ {grandTotal.toFixed(2)}</Text>
            <Text>Parte Cônjuge A: R$ {shareA.toFixed(2)}</Text>
            <Text>Parte Cônjuge B: R$ {shareB.toFixed(2)}</Text>
            <Text style={{ marginTop: 10, color: "#444" }}>{note}</Text>
          </View>
        ) : null}
        <View style={styles.navRow}>
          <TouchableOpacity  style={styles.navBtn} onPress={() => navigation.navigate("DivisionCalculator", { resetStep: true })}>
            <Text style={styles.navText}>Novo Cálculo</Text>
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
    backgroundColor: "#ecc8ccff",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 6,
  },
  head: {
    marginTop: -10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#5D252A",
    textAlign: "center",
  },
  header: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  img1: {
    width: 220,
    height: 220,
    resizeMode: "stretch",
    borderRadius: 200,
    marginBottom: 5,
    borderColor: "#D4AF37",
    backgroundColor: "#fff6dd",
    borderWidth: 5,
    alignSelf: "center",
  },
  regimeBtn: {
    borderWidth: 2,
    borderColor:"#d4af375b",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    width: "100%",
  },
  regimeBtnActive: {
    backgroundColor: "#D4AF37",
  },
  regimeText: {
    color: "#333",
    textAlign: "center",
  },
  regimeTextActive: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  resultBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
  },
  navBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: "#8B4A52",
    borderRadius: 8,
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontWeight: "600",
  },
});
