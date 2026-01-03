import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useFonts } from "expo-font";
import { globalStyles } from "./styles/GlobalStyles";
import ItemCarrera from "./components/ItemCarrera";
import BotonAdd from "./components/BotonAñadir";
import FormNuevaCarrera from "./components/NuevaCarrera";
import { Carrera } from "./types";


export default function App() {
  const [fontsLoaded] = useFonts({
    F1: require("./assets/fonts/Formula1.ttf")
  });

  const [mostrarForm, setMostrarForm] = useState(false);
const [listaCarreras, setListaCarreras] = useState<Carrera[]>([]);

  if (!fontsLoaded) return null;

  useEffect(() => {
    fetch("http://localhost:3000/circuitos")
      .then(res => res.json())
      .then(data => setListaCarreras(data));
  }, []);

  return (
    <View style={styles.contenedor}>
      <Text style={globalStyles.titulo}>Temporada Formula 1:</Text>

      {/* LISTA DE CIRCUITOS */}
      <FlatList
        data={listaCarreras}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemCarrera carrera={item} />}
      />

      <BotonAdd onPress={() => setMostrarForm(true)} />

      {mostrarForm && (
        <FormNuevaCarrera onCerrar={() => setMostrarForm(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff"
  }
});