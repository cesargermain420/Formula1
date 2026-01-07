import { View, Text, Pressable, StyleSheet } from "react-native";
import { Carrera } from "../types/carreraType";

interface ItemCarreraModalProps {
  carrera: Carrera;
  onEditar: (carrera: Carrera) => void;
  onEliminar: (id: number) => void;
}

export default function ItemCarreraModal({
  carrera,
  onEditar,
  onEliminar
}: ItemCarreraModalProps) {
  return (
    <View style={styles.carreraItem} pointerEvents="box-none">
      {/* Nombre de la carrera */}
      <Text style={styles.carreraNombre}>{carrera.nombre}</Text>

      {/* Detalles */}
      <Text style={styles.detalle}>🥇 {carrera.ganador}</Text>
      <Text style={styles.detalle}>🥈 {carrera.segundo}</Text>
      <Text style={styles.detalle}>🥉 {carrera.tercero}</Text>
      <Text style={styles.detalle}>⏱️ Vuelta rápida: {carrera.vueltaRapida}</Text>

      {/* Botones */}
      <View style={styles.botonesFila}>
        <Pressable
          style={styles.botonEditar}
          onPress={() => onEditar(carrera)}
        >
          <Text style={styles.botonTexto}>Editar</Text>
        </Pressable>

        <Pressable
          style={styles.botonEliminar}
          onPress={() => onEliminar(carrera.id)}
        >
          <Text style={styles.botonTexto}>Eliminar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carreraItem: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 12
  },
  carreraNombre: {
    fontFamily: "F1Titulo",
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center"
  },
  detalle: {
    fontFamily: "F1Texto",
    fontSize: 15,
    marginBottom: 4,
    color: "#333"
  },
  botonesFila: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  botonEditar: {
    backgroundColor: "#2b2d42",
    padding: 8,
    borderRadius: 6,
    flex: 1,
    marginRight: 6
  },
  botonEliminar: {
    backgroundColor: "#d90429",
    padding: 8,
    borderRadius: 6,
    flex: 1,
    marginLeft: 6
  },
  botonTexto: {
    color: "#fff",
    fontFamily: "F1Texto",
    textAlign: "center"
  }
});
