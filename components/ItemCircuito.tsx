import { View, Text, StyleSheet, ImageBackground, Pressable } from "react-native";
import { Circuito } from "../types/circuitoType";
import { circuitImages } from "../types/imagesCircuitType";

interface ItemCircuitoProps {
  circuito: Circuito;
  onPress: (circuito: Circuito) => void;
}

export default function ItemCircuito({ circuito, onPress }: ItemCircuitoProps) {
  const imagenLocal =
    circuitImages[circuito.fotoCircuito] || circuitImages["generico.jpg"];

  return (
    <Pressable onPress={() => onPress(circuito)}>
      <ImageBackground
        source={imagenLocal}
        style={styles.fondo}
        imageStyle={styles.fondoImagen}
      >
        <View style={styles.overlay}>
          {/* TÍTULO CENTRADO ARRIBA */}
          <View style={styles.tituloContainer}>
            <Text style={styles.nombre}>{circuito.nombre}</Text>
          </View>

          {/* DATOS CENTRADOS ABAJO */}
          <View style={styles.datosContainer}>
            <Text style={styles.texto}>📍 {circuito.ubicacion}</Text>
            <Text style={styles.texto}>📏 {circuito.kilometros} km</Text>
            <Text style={styles.texto}>🏁 Desde {circuito.desde}</Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fondo: {
    height: 220,
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
    justifyContent: "space-between"
  },
  tituloContainer: {
    alignItems: "center",
    marginTop: 6
  },
  nombre: {
    fontSize: 22,
    fontFamily: "F1Titulo",
    color: "#fff",
    textAlign: "center"
  },
  datosContainer: {
    alignItems: "center",
    marginBottom: 10
  },
  texto: {
    fontSize: 16,
    fontFamily: "F1Texto",
    color: "#fff",
    marginVertical: 2
  }
});
