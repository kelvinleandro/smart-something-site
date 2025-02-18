export type OnOffState = "ON" | "OFF";
export type AirConditionerState = OnOffState;
export type LightState = OnOffState | `ON|${number}` | `OFF|${number}`;
export type TemperatureState = `${number}`;
export type DoorLockState = "LOCKED" | "UNLOCKED";
export type CarLocState = `${number}|${number}`;

export type PostData = {
  name: string;
  state: string;
};

export type DeviceState =
  | AirConditionerState
  | LightState
  | TemperatureState
  | DoorLockState
  | CarLocState;
