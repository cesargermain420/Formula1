import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { Carrera } from "../types/carreraType";

interface ModalCrearCarreraProps {
  circuitoId: number;
  onGuardar: (carrera: Omit<Carrera, "id">) => void;
  onCerrar: () => void;
}

export default function ModalCrearCarrera({
  circuitoId,
  onGuardar,
  onCerrar
}: ModalCrearCarreraProps) {

  const [nombre, setNombre] = useState("");
  const [ganador, setGanador] = useState("");
  const [segundo, setSegundo] = useState("");
  const [tercero, setTercero] = useState("");
  const [vueltaRapida, setVueltaRapida] = useState("");

  const [error, setError] = useState("");

  const validarTiempo = (t: string) => {
    // Formato: mm:ss.xxx
    const regex = /^\d{1,2}:\d{2}\.\d{3}$/;
    return regex.test(t);
  };

  const guardar = () => {
    if (!nombre || !ganador || !segundo || !tercero || !vueltaRapida) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!validarTiempo(vueltaRapida)) {
      setError("El tiempo debe tener formato mm:ss.xxx (ej: 1:32.548)");
      return;
    }

    setError("");

    onGuardar({
      circuitoId,
      nombre,
      ganador,
      segundo,
      tercero,
      vueltaRapida
    });
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.titulo}>Nueva carrera</Text>

        {error !== "" && <Text style={styles.error}>{error}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Nombre de la carrera"
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Nombre del Ganador"
          onChangeText={setGanador}
        />

        <TextInput
          style={styles.input}
          placeholder="Nombre del Segundo"
          onChangeText={setSegundo}
        />

        <TextInput
          style={styles.input}
          placeholder="Nombre del Tercero"
          onChangeText={setTercero}
        />

        <TextInput
          style={styles.input}
          placeholder="Tiempo vuelta rápida (mm:ss.xxx)"
          onChangeText={setVueltaRapida}
        />

        <Pressable style={styles.botonGuardar} onPress={guardar}>
          <Text style={styles.textoBoton}>Guardar</Text>
        </Pressable>

        <Pressable style={styles.botonCerrar} onPress={onCerrar}>
          <Text style={styles.textoBoton}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
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
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12
  },
  titulo: {
    fontFamily: "F1Titulo",
    fontSize: 20,
    marginBottom: 12
  },
  error: {
    color: "#d90429",
    fontFamily: "F1Texto",
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  botonGuardar: {
    backgroundColor: "#1a8f2f",
    padding: 12,
    borderRadius: 8,
    marginTop: 10
  },
  botonCerrar: {
    backgroundColor: "#d90429",
    padding: 12,
    borderRadius: 8,
    marginTop: 10
  },
  textoBoton: {
    color: "#fff",
    fontFamily: "F1Texto",
    textAlign: "center"
  }
});
