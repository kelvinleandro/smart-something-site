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
