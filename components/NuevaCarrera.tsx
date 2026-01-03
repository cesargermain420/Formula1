import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";

export default function NuevaCarrera({ onCerrar }: { onCerrar: () => void }) {
  return (
    <View style={styles.overlay}>
      <View style={styles.form}>
        <Text style={styles.titulo}>Nueva Carrera</Text>

        <TextInput style={styles.input} placeholder="Nombre de la carrera" />
        <TextInput style={styles.input} placeholder="Ganador" />
        <TextInput style={styles.input} placeholder="Segundo" />
        <TextInput style={styles.input} placeholder="Tercero" />
        <TextInput style={styles.input} placeholder="Vuelta rápida" />

        <Pressable style={styles.botonCerrar} onPress={onCerrar}>
          <Text style={styles.textoCerrar}>Cerrar</Text>
        </Pressable>

        {/* Aquí añadirás tú el botón GUARDAR */}
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
  form: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12
  },
  titulo: {
    fontSize: 22,
    fontFamily: "F1",
    marginBottom: 12
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  botonCerrar: {
    marginTop: 10,
    backgroundColor: "#d90429",
    padding: 12,
    borderRadius: 8
  },
  textoCerrar: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "F1"
  }
});