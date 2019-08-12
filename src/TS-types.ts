export type shorthandColorType = 'r' | 'g' | 'b'; // stands for 'red', 'green', 'blue'
export type waterColorType = shorthandColorType | number[];

export interface Bulb {
  id: number;
  volume: number;
  waterLevel: number;
  waterColor?: waterColorType;
}

export interface IPost {
  userId: string | number;
  id: string | number;
  title: string;
  body: string;
}

export type selectedBulbType = Bulb | IWaterSource | null;

export interface IWaterSource {
  id: string | number;
  waterColor?: waterColorType;
}
