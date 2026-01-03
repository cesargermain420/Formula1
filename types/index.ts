export type Carrera = {
  id: number;
  nombre: string;
  ubicacion: string;
  kilometros: number;
  desde: number;
  fotoCircuito: string;
  ganador?: string;
  segundo?: string;
  tercero?: string;
  vueltaRapida?: string;
};