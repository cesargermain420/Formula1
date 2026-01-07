import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { Carrera } from "../types/carreraType";

interface ModalEditarCarreraProps {
  carrera: Carrera;
  onGuardar: (carreraEditada: Carrera) => void;
  onCerrar: () => void;
}

export default function ModalEditarCarrera({
  carrera,
  onGuardar,
  onCerrar
}: ModalEditarCarreraProps) {

  const [nombre, setNombre] = useState(carrera.nombre);
  const [ganador, setGanador] = useState(carrera.ganador);
  const [segundo, setSegundo] = useState(carrera.segundo);
  const [tercero, setTercero] = useState(carrera.tercero);
  const [vueltaRapida, setVueltaRapida] = useState(carrera.vueltaRapida);

  const [error, setError] = useState("");

  const validarTiempo = (t: string) => {
    // Formato mm:ss.xxx
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
      ...carrera,
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
        <Text style={styles.titulo}>Editar carrera</Text>

        {error !== "" && <Text style={styles.error}>{error}</Text>}

        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre de la carrera"
        />

        <TextInput
          style={styles.input}
          value={ganador}
          onChangeText={setGanador}
          placeholder="Nombre del Ganador"
        />

        <TextInput
          style={styles.input}
          value={segundo}
          onChangeText={setSegundo}
          placeholder="Nombre del Segundo"
        />

        <TextInput
          style={styles.input}
          value={tercero}
          onChangeText={setTercero}
          placeholder="Nombre del Tercero"
        />

        <TextInput
          style={styles.input}
          value={vueltaRapida}
          onChangeText={setVueltaRapida}
          placeholder="Tiempo vuelta rápida (mm:ss.xxx)"
        />

        <Pressable style={styles.botonGuardar} onPress={guardar}>
          <Text style={styles.textoBoton}>Guardar cambios</Text>
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
