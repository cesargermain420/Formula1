import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";

import ItemCircuito from "./components/ItemCircuito";
import ModalCircuito from "./components/ModalCircuito";
import ModalCrearCarrera from "./components/ModalCrearCarrera";
import ModalEditarCarrera from "./components/ModalEditarCarrera";
import ModalBorrarCarrera from "./components/ModalBorrarCarrera";

import { Circuito } from "./types/circuitoType";
import { Carrera } from "./types/carreraType";

import {
  getCarreras,
  crearCarrera,
  editarCarrera,
  eliminarCarrera,
} from "./functions/carrerasCRUD";

// CONFIGURACIÓN GLOBAL DE NOTIFICACIONES
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  const [fontsLoaded] = useFonts({
    F1Titulo: require("./assets/fonts/Formula1.ttf"),
    F1Texto: require("./assets/fonts/Formula1Texto.ttf"),
  });

  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [carreraEditando, setCarreraEditando] = useState<Carrera | null>(null);
  const [carreraAEliminar, setCarreraAEliminar] = useState<number | null>(null);

  const [listaCircuitos, setListaCircuitos] = useState<Circuito[]>([]);
  const [listaCarreras, setListaCarreras] = useState<Carrera[]>([]);
  const [circuitoSeleccionado, setCircuitoSeleccionado] =
    useState<Circuito | null>(null);

  useEffect(() => {
    fetch("http://192.168.1.42:3001/circuitos")
      .then((res) => res.json())
      .then((data) => setListaCircuitos(data));
  }, []);

  useEffect(() => {
    getCarreras().then(setListaCarreras);
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.todo}>
      {/* HEADER STICKY */}
      <View style={styles.headerSticky}>
        <Text style={styles.tituloPrincipal}>Formula 1</Text>
      </View>

      {/* LISTA PRINCIPAL (SCROLL) */}
      <FlatList
        data={listaCircuitos}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contenedor}
        ListHeaderComponent={
          <>
            {/* BLOQUE HISTORIA */}
            <View style={styles.datosBox}>
              <Text style={styles.subtitulo}>Historia</Text>

              <ImageBackground
                source={require("./assets/fotos/foto1.png")}
                style={styles.fondoTexto}
                imageStyle={styles.fondoImagen}
              >
                <View style={styles.overlayOscuro} />
                <View style={styles.textoPadding}>
                  <Text style={styles.textoConContorno}>
                    La Fórmula 1 es la categoría más prestigiosa del
                    automovilismo mundial. Desde su primera temporada en 1950,
                    ha evolucionado hasta convertirse en un espectáculo
                    tecnológico donde los equipos invierten cientos de millones
                    para desarrollar los monoplazas más rápidos del planeta.
                  </Text>
                </View>
              </ImageBackground>

              <ImageBackground
                source={require("./assets/fotos/foto2.png")}
                style={styles.fondoTexto}
                imageStyle={styles.fondoImagen}
              >
                <View style={styles.overlayOscuro} />
                <View style={styles.textoPadding}>
                  <Text style={styles.textoConContorno}>
                    A lo largo de su historia, la F1 ha sido escenario de
                    rivalidades legendarias, innovaciones revolucionarias y
                    momentos inolvidables. Pilotos como Ayrton Senna, Michael
                    Schumacher y Lewis Hamilton han marcado épocas enteras,
                    dejando récords que parecen imposibles de superar.
                  </Text>
                </View>
              </ImageBackground>

              <ImageBackground
                source={require("./assets/fotos/foto3.png")}
                style={styles.fondoTexto}
                imageStyle={styles.fondoImagen}
              >
                <View style={styles.overlayOscuro} />{" "}
                <View style={styles.textoPadding}>
                  <Text style={styles.textoConContorno}>
                    Los circuitos también forman parte esencial del ADN de la
                    Fórmula 1. Desde las calles estrechas de Mónaco hasta las
                    rectas infinitas de Monza, cada trazado ofrece un desafío
                    único. Spa-Francorchamps es el más largo, mientras que
                    Mónaco es el más corto y técnico.
                  </Text>{" "}
                </View>
              </ImageBackground>

              <ImageBackground
                source={require("./assets/fotos/foto4.png")}
                style={styles.fondoTexto}
                imageStyle={styles.fondoImagen}
              >
                <View style={styles.overlayOscuro} />{" "}
                <View style={styles.textoPadding}>
                  <Text style={styles.textoConContorno}>
                    La velocidad máxima registrada en un Gran Premio supera los
                    370 km/h, demostrando el nivel extremo de ingeniería que
                    existe detrás de cada coche. Ferrari es el equipo más
                    laureado de la historia, mientras que Hamilton y Schumacher
                    comparten el récord de siete campeonatos mundiales.
                  </Text>{" "}
                </View>
              </ImageBackground>
            </View>

            {/* TÍTULO CIRCUITOS */}
            <Text style={styles.subtitulo}>Circuitos</Text>
          </>
        }
        renderItem={({ item }) => (
          <ItemCircuito
            circuito={item}
            onPress={() => setCircuitoSeleccionado(item)}
          />
        )}
      />

      {/* MODALES */}
      {circuitoSeleccionado && (
        <ModalCircuito
          circuito={circuitoSeleccionado}
          carreras={listaCarreras.filter(
            (c) => c.circuitoId === circuitoSeleccionado.id
          )}
          onCerrar={() => setCircuitoSeleccionado(null)}
          onEliminar={(id) => setCarreraAEliminar(id)}
          onCrear={() => setMostrarCrear(true)}
          onEditar={(carrera) => setCarreraEditando(carrera)}
        />
      )}

      {mostrarCrear && circuitoSeleccionado && (
        <ModalCrearCarrera
          circuitoId={circuitoSeleccionado.id}
          onGuardar={(nuevaCarrera) => {
            crearCarrera(nuevaCarrera).then((creada) => {
              setListaCarreras([...listaCarreras, creada]);
              setMostrarCrear(false);
            });
          }}
          onCerrar={() => setMostrarCrear(false)}
        />
      )}

      {carreraEditando && (
        <ModalEditarCarrera
          carrera={carreraEditando}
          onGuardar={(carreraActualizada) => {
            editarCarrera(carreraActualizada.id, carreraActualizada).then(
              (actualizada) => {
                setListaCarreras(
                  listaCarreras.map((c) =>
                    c.id === actualizada.id ? actualizada : c
                  )
                );
                setCarreraEditando(null);
              }
            );
          }}
          onCerrar={() => setCarreraEditando(null)}
        />
      )}

      {carreraAEliminar !== null && (
        <ModalBorrarCarrera
          onConfirmar={() => {
            eliminarCarrera(carreraAEliminar).then(() => {
              setListaCarreras(
                listaCarreras.filter((c) => c.id !== carreraAEliminar)
              );
              setCarreraAEliminar(null);
            });
          }}
          onCancelar={() => setCarreraAEliminar(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    flex: 1,
    backgroundColor: "#2b2b2b",
  },

  headerSticky: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#2b2b2b",
    paddingTop: 40,
  },

  contenedor: {
    paddingTop: 90, // espacio para el sticky
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: "#2b2b2b",
  },

  tituloPrincipal: {
    fontFamily: "F1Titulo",
    fontSize: 32,
    textAlign: "center",
    color: "#d40000",
  },

  subtitulo: {
    fontFamily: "F1Titulo",
    fontSize: 26,
    color: "#d40000",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 10,
  },

  datosBox: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#454444ff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#850000ff",
  },

  fondoTexto: {
    width: "100%",
    minHeight: 220,

    borderRadius: 14,
    marginBottom: 18,
    overflow: "hidden",
    justifyContent: "flex-start",
  },
textoPadding: { padding: 18, 
},
  fondoImagen: {
    borderRadius: 14,
    resizeMode: "cover",
    opacity: 0.8,
  },

  overlayOscuro: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)", // más oscuro = sube a 0.6 o 0.7
    borderRadius: 14,
  },

  textoConContorno: {
    fontFamily: "F1Texto",
    fontSize: 17,
    color: "#fff",
    lineHeight: 23,
    textShadowColor: "#6b0101ff",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
