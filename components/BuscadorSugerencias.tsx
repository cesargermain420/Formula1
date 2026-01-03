import { View, Text, StyleSheet } from "react-native";

export default function BuscadorSugerencias() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.cuadroTexto}>
        <Text style={styles.placeholder}>Buscar carrera...</Text>
      </View>

      <View style={styles.lista}>
        <Text style={styles.placeholder}>[Sugerencias aquí]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    position: "absolute",
    top: 60,
    left: 24,
    width: "100%",
    zIndex: 10
  },
  cuadroTexto: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#2b2d42",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  lista: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: 4,
    elevation: 3,
    padding: 8
  },
  placeholder: {
    color: "#aaa"
  }
});