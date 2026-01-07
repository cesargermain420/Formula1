import { View, Text, Pressable, StyleSheet } from "react-native";

interface ModalBorrarCarreraProps {
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ModalBorrarCarrera({
  onConfirmar,
  onCancelar
}: ModalBorrarCarreraProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.titulo}>Eliminar carrera</Text>
        <Text style={styles.texto}>
          ¿Seguro que quieres eliminar esta carrera?
        </Text>

        <Pressable style={styles.botonConfirmar} onPress={onConfirmar}>
          <Text style={styles.botonTexto}>Confirmar</Text>
        </Pressable>

        <Pressable style={styles.botonCancelar} onPress={onCancelar}>
          <Text style={styles.botonTexto}>Cancelar</Text>
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
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12
  },
  titulo: {
    fontFamily: "F1Titulo",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center"
  },
  texto: {
    fontFamily: "F1Texto",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center"
  },
  botonConfirmar: {
    backgroundColor: "#d90429",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  botonCancelar: {
    backgroundColor: "#2b2d42",
    padding: 12,
    borderRadius: 8
  },
  botonTexto: {
    color: "#fff",
    fontFamily: "F1Texto",
    textAlign: "center"
  }
});
