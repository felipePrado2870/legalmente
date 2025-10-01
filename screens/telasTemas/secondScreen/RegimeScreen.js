import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ExitButton from "../../componentes/ExitButton";
import LinearGradient from "react-native-linear-gradient";

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
    const totalBoth = itemsBoth.reduce((s, it) => s + it.value, 0);
    const totalA = itemsA.reduce((s, it) => s + it.value, 0);
    const totalB = itemsB.reduce((s, it) => s + it.value, 0);

    shareA = totalA + totalBoth / 2;
    shareB = totalB + totalBoth / 2;
    note = "Na comunhão parcial, divide-se apenas os bens adquiridos após a união.";
  } else if (regime === "universal") {
    shareA = grandTotal / 2;
    shareB = grandTotal / 2;
    note = "Na comunhão universal, todo patrimônio é dividido igualmente.";
  } else if (regime === "separation") {
    shareA = itemsA.reduce((s, it) => s + it.value, 0);
    shareB = itemsB.reduce((s, it) => s + it.value, 0);
    const shared = itemsBoth.reduce((s, it) => s + it.value, 0);
    shareA += shared / 2;
    shareB += shared / 2;
    note = "Na separação total, cada cônjuge fica com o que está em seu nome. Bens adquiridos em conjunto são divididos igualmente.";
  } else if (regime === "participation") {
    const totalBoth = itemsBoth.reduce((s, it) => s + it.value, 0);
    const totalA = itemsA.reduce((s, it) => s + it.value, 0);
    const totalB = itemsB.reduce((s, it) => s + it.value, 0);

    shareA = totalA + totalBoth / 2;
    shareB = totalB + totalBoth / 2;
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
          <View style={styles.containerResultBox}>
            <View style={styles.resultBox1}>
             <Text style={{ color: "#000000ff", fontSize: 15, fontWeight: 'bold'}}>👤 Cônjuge A - Seus Bens</Text>
              {itemsA.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <Text>{item.desc} — R$ {item.value.toFixed(2)}</Text>
                </View>
              ))}
              <Text style={{marginTop: 15, color: "#000000ff", fontSize: 13, fontWeight: 'bold'}}>Valor final da separação R$ {shareA.toFixed(2)}</Text>
            </View>
            <View style={styles.resultBox1}>
              <Text style={{ color: "#000000ff", fontSize: 15, fontWeight: 'bold'}} >👤 Cônjuge B - Seus Bens</Text>
              {itemsB.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <Text>{item.desc} — R$ {item.value.toFixed(2)}</Text>
                </View>
              ))}
              <Text style={{marginTop: 15, color: "#000000ff", fontSize: 13, fontWeight: 'bold'}}>Valor final da separação R${shareB.toFixed(2)}</Text>
            </View>
            <View style={styles.resultBox2}>
              <Text style={{ color: "#fffafaff", fontSize: 13, fontWeight: 'bold'}}>💰  {regimes.find((r) => r.key === regime)?.label}</Text>
              <Text style={{ marginTop: 5, color: "#fffafaff", fontSize: 20 , fontWeight: 'bold',}}>R$ {grandTotal.toFixed(2)}</Text>
              <Text style={{ marginTop: 10, color: "#fffafaff", textAlign: "center" , fontSize: 10 }}>{note}</Text>
            </View>
          </View>
        ) : null}
        <View  style={styles.rowButtons}>
            <TouchableOpacity onPress={() => navigation.navigate("DivisionCalculator", { resetStep: true })}>
              <LinearGradient colors={["#9f676dff", "#5D252A","#5D252A", "#411619ff"]}  end={{ x: 1, y: 1 }}style={styles.quizButton}  >
                <Text style={styles.buttonText2}>Novo Cálculo</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.homeButton} onPress={() => navigation.navigate("Home")} >
              <Text style={styles.buttonText3}>Voltar ao Menu</Text>
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
    backgroundColor: "#8B4A52",
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#8B4A52",
    textAlign: "center",
  },
  header: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  regimeBtn: {
    borderWidth: 2,
    borderColor:"#D4AF37",
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
    width: "100%",
  },
  regimeBtnActive: {
    backgroundColor: "#D4AF37",
  },
  regimeText: {
    fontSize: 13,
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
  containerResultBox: {
    width: "100%",
  },
  resultBox1: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
    width: "100%",
    shadowRadius: 4,
    elevation: 3,
  },
  resultBox2: {
    backgroundColor: "#8B4A52",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
   rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop:10,
  },
  quizButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 12,
    marginLeft: 10,
    alignItems: "center",
  },
   buttonText2: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  homeButton: {
    backgroundColor: '#ab8085b2',
    padding: 15,
    borderRadius: 10,
    borderColor: "#fff",  
    borderWidth: 2, 
    marginTop: 10,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText3: {
    color: "#FFFFFF",
    fontSize: 15,
  }
});
