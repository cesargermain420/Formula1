import { View, Text, StyleSheet } from "react-native";

export default function VisorSugerencia() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.nombre}>Nombre sugerido</Text>
      <Text style={styles.detalle}>Ganador: ---</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 10,
    backgroundColor: "#fff"
  },
  nombre: {
    fontSize: 16,
    fontWeight: "600"
  },
  detalle: {
    fontSize: 14,
    color: "#666"
  }
});