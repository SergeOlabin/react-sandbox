export type shorthandColorType = 'r' | 'g' | 'b';
export type waterColorType = shorthandColorType | number[];

export interface Bulb {
  id: number;
  volume: number;
  waterLevel: number;
  waterColor?: waterColorType; // stands for 'red', 'green', 'blue'
}

export type selectedBulbType = Bulb | IWaterSource | null;

export interface IWaterSource {
  id: string | number;
  waterColor?: waterColorType;
}
