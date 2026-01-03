import { Pressable, Text, StyleSheet } from "react-native";

export default function BotonAñadir({ onPress }: { onPress: () => void }) {
  return (
    <Pressable style={styles.boton} onPress={onPress}>
      <Text style={styles.texto}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#d90429",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  texto: {
    color: "#fff",
    fontSize: 36,
    fontFamily: "F1"
  }
});