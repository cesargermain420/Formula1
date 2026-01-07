// services/carrerasService.ts
import { Carrera } from "../types/carreraType";

const API = "http://192.168.1.42:3001/carreras";

// OBTENER TODAS LAS CARRERAS
export async function getCarreras(): Promise<Carrera[]> {
  const res = await fetch(API);
  return res.json();
}

// CREAR CARRERA
export async function crearCarrera(
  carrera: Omit<Carrera, "id">
): Promise<Carrera> {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carrera),
  });
  return res.json();
}

// EDITAR CARRERA
export async function editarCarrera(
  id: number,
  carrera: Partial<Carrera>
): Promise<Carrera> {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(carrera),
  });
  return res.json();
}

// ELIMINAR CARRERA
export async function eliminarCarrera(id: number): Promise<void> {
  await fetch(`${API}/${id}`, { method: "DELETE" });
}
