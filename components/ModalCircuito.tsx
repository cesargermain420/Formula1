import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { Circuito } from "../types/circuitoType";
import { Carrera } from "../types/carreraType";
import ItemCarreraModal from "./ItemCarreraModal";
import { Ionicons } from "@expo/vector-icons";

// MODALES
import ModalMapaCircuito from "./ModalMapaCircuito";
import ModalRecordatorio from "./ModalRecordatorio";

interface ModalCircuitoProps {
  circuito: Circuito;
  carreras: Carrera[];
  onCerrar: () => void;
  onCrear: () => void;
  onEditar: (carrera: Carrera) => void;
  onEliminar: (id: number) => void;
}

export default function ModalCircuito({
  circuito,
  carreras,
  onCerrar,
  onCrear,
  onEditar,
  onEliminar
}: ModalCircuitoProps) {

  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [mostrarRecordatorio, setMostrarRecordatorio] = useState(false);

  return (
    <Pressable style={styles.overlay} onPress={onCerrar}>
      <View
        style={styles.contenedor}
        pointerEvents="box-none"
        onStartShouldSetResponder={() => true}
      >
        {/* BOTÓN CERRAR */}
        <Pressable style={styles.cerrarIcono} onPress={onCerrar}>
          <Ionicons name="close" size={28} color="#333" />
        </Pressable>

        {/* TÍTULO */}
        <Text style={styles.titulo}>{circuito.nombre}</Text>

        {/* LISTA DE CARRERAS */}
        <FlatList
          data={carreras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemCarreraModal
              carrera={item}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          )}
        />

        {/* BOTONES SECUNDARIOS */}
        <View style={styles.botonesFila}>
          <Pressable
            style={styles.botonMapa}
            onPress={() => setMostrarMapa(true)}
          >
            <Text style={styles.botonTextoSecundario}>Ver mapa</Text>
          </Pressable>

          <Pressable
            style={styles.botonRecordatorio}
            onPress={() => setMostrarRecordatorio(true)}
          >
            <Text style={styles.botonTextoSecundario}>Recordatorio</Text>
          </Pressable>
        </View>

        {/* BOTÓN CREAR CARRERA */}
        <Pressable style={styles.botonCrear} onPress={onCrear}>
          <Text style={styles.botonTexto}>Añadir carrera</Text>
        </Pressable>

        {/* MODAL MAPA */}
        {mostrarMapa && (
          <ModalMapaCircuito
            circuito={circuito}
            onCerrar={() => setMostrarMapa(false)}
          />
        )}

        {/* MODAL RECORDATORIO */}
        {mostrarRecordatorio && (
          <ModalRecordatorio
            circuito={circuito}
            carreras={carreras}   // ← AÑADIDO AQUÍ
            onCerrar={() => setMostrarRecordatorio(false)}
          />
        )}

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
    borderRadius: 12,
    maxHeight: "85%",
    position: "relative"
  },
  cerrarIcono: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 4,
    zIndex: 10
  },
  titulo: {
    fontSize: 22,
    fontFamily: "F1Titulo",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 10
  },

  botonesFila: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10
  },
  botonRecordatorio: {
    flex: 1,
    backgroundColor: "#ff9100ff",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5
  },
  botonMapa: {
    flex: 1,
    backgroundColor: "#004eebcb",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5
  },
  botonSecundario: {
    flex: 1,
    backgroundColor: "#d40000",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5
  },
  botonTextoSecundario: {
    color: "#fff",
    fontFamily: "F1Texto",
    textAlign: "center",
    fontSize: 14
  },

  botonCrear: {
    backgroundColor: "#1a8f2f",
    padding: 12,
    borderRadius: 8,
    marginTop: 10
  },
  botonTexto: {
    color: "#fff",
    fontFamily: "F1Texto",
    textAlign: "center"
  }
});
