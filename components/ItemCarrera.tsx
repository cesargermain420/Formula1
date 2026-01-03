import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Carrera } from "../types";
import { circuitImages } from "../assets/circuitos";

export default function ItemCarrera({ carrera }: { carrera: Carrera }) {
  const imagenLocal =
    circuitImages[carrera.fotoCircuito] || circuitImages["generico.jpg"];

  return (
    <ImageBackground
      source={imagenLocal}
      style={styles.fondo}
      imageStyle={styles.fondoImagen}
    >
      <View style={styles.overlay}>
        <Text style={styles.nombre}>{carrera.nombre}</Text>

        <View style={styles.fila}>
          <Text style={styles.posicion}>🥇</Text>
          <Text style={styles.texto}>{carrera.ganador}</Text>
        </View>

        <View style={styles.fila}>
          <Text style={styles.posicion}>🥈</Text>
          <Text style={styles.texto}>{carrera.segundo}</Text>
        </View>

        <View style={styles.fila}>
          <Text style={styles.posicion}>🥉</Text>
          <Text style={styles.texto}>{carrera.tercero}</Text>
        </View>

        <View style={styles.fila}>
          <Text style={styles.reloj}>⏱️</Text>
          <Text style={styles.texto}>{carrera.vueltaRapida}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fondo: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16
  },
  fondoImagen: {
    resizeMode: "cover"
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 16,
    justifyContent: "flex-end"
  },
  nombre: {
    fontSize: 20,
    fontFamily: "F1",
    color: "#fff",
    marginBottom: 10
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  posicion: {
    width: 28,
    fontSize: 18,
    color: "#fff"
  },
  texto: {
    fontSize: 16,
    fontFamily: "F1",
    color: "#fff"
  },
  reloj: {
    width: 28,
    fontSize: 18,
    color: "#fff"
  }
});