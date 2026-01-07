import { View, Text, StyleSheet, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Circuito } from "../types/circuitoType";


interface ModalMapaCircuitoProps {
  circuito: Circuito;
  onCerrar: () => void;
}

export default function ModalMapaCircuito({ circuito, onCerrar }: ModalMapaCircuitoProps) {

  return (
    <Pressable style={styles.overlay} onPress={onCerrar}>
      <View style={styles.contenedor} onStartShouldSetResponder={() => true}>
        <Text style={styles.titulo}>{circuito.nombre}</Text>

        <MapView
          style={styles.mapa}
          initialRegion={{
            latitude: circuito.lat!,
            longitude: circuito.lng!,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={{ latitude: circuito.lat!, longitude: circuito.lng! }} />
        </MapView>

        <Pressable style={styles.botonCerrar} onPress={onCerrar}>
          <Text style={styles.botonTexto}>Cerrar</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  contenedor: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12
  },
  titulo: {
    fontFamily: "F1Titulo",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10
  },
  mapa: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 10
  },
  botonCerrar: {
    backgroundColor: "#d40000",
    padding: 10,
    borderRadius: 8
  },
  botonTexto: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "F1Texto"
  }
});
