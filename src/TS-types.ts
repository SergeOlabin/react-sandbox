export type waterColorType = 'r' | 'g' | 'b';

export interface Bulb {
  id: number;
  volume: number;
  waterLevel: number;
  waterColor?: 'r' | 'g' | 'b'; // stands for 'red', 'green', 'blue'
}