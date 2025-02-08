export enum Devices {
  AC,
  CAR_LOC,
  HEADLIGHT
}

export interface CarLoc {
  lat: number;
  lng: number;
}

export interface AirConditioner {
  level: number;
  temperature: number;
}

export interface Headlight {
  status: string;
}

export type Device = AirConditioner | CarLoc | Headlight;

export type DeviceData = {
  type: Devices;
  name: string;
  state: string | { lat: number; lng: number };
  level?: number;
  id: number;
  min?: number;
  max?: number;
}