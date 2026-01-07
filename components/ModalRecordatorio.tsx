import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useState } from "react";
import * as Notifications from "expo-notifications";
import { Circuito } from "../types/circuitoType";
import { Carrera } from "../types/carreraType";

interface ModalRecordatorioProps {
  circuito: Circuito;
  carreras: Carrera[];
  onCerrar: () => void;
}

export default function ModalRecordatorio({ circuito, carreras, onCerrar }: ModalRecordatorioProps) {

  const [minutos, setMinutos] = useState("");

  const totalCarreras = carreras.length;

  async function programarRecordatorio() {
    const mins = parseInt(minutos);

    if (isNaN(mins) || mins <= 0) {
      alert("Introduce un número válido de minutos");
      return;
    }

    setTimeout(async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `Recordatorio: ${circuito.nombre}`,
          body: `Este circuito tiene ${totalCarreras} carreras registradas.`,
        },
        trigger: null
      });
    }, mins * 60 * 1000);

    alert(`Te enviaré una notificación en ${mins} minutos`);
    onCerrar();
  }

  return (
    <Pressable style={styles.overlay} onPress={onCerrar}>
      <View style={styles.contenedor} onStartShouldSetResponder={() => true}>
        <Text style={styles.titulo}>Recordatorio - {circuito.nombre}</Text>

        <Text style={styles.label}>Enviar notificación en (minutos):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={minutos}
          onChangeText={setMinutos}
        />

        <Pressable style={styles.botonGuardar} onPress={programarRecordatorio}>
          <Text style={styles.botonTexto}>Guardar recordatorio</Text>
        </Pressable>

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
  label: {
    fontFamily: "F1Texto",
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginBottom: 15
  },
  botonGuardar: {
    backgroundColor: "#1a8f2f",
    padding: 10,
    borderRadius: 8,
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
