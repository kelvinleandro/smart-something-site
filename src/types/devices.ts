export enum Devices {
  AC,
  CAR_LOC,
  HEADLIGHT
}

export type DeviceData = {
  type: Devices;
  name: string;
  status: string | { lat: number; lng: number };
  level?: number;
  id: number;
  min?: number;
  max?: number;
}