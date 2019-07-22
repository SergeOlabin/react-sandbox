import { shorthandColorType } from '../../TS-types';

type colorType = number[];
const colorRangeLimit = 255;

export class ColorMixerHelper {
  private static _colorMap = {
    r: [255, 0, 0],
    g: [0, 255, 0],
    b: [0, 0, 255],
  };

  public static RED = 'rgba(255, 0, 0)';
  public static GREEN = 'rgba(0, 255, 0)';
  public static BLUE = 'rgba(0, 0, 255)';

  private static _getColor(color: colorType | shorthandColorType): number[] {
    if (typeof color === 'string') {
      return this._colorMap[color];
    }

    return color;
  }

  public static mixColors(
    color1: colorType | shorthandColorType,
    color2: colorType | shorthandColorType,
    ratio: number,
  ): colorType {
    if (!color1 && !color2) return [0, 0, 0];
    if (!color1) return this._getColor(color2);
    if (!color2) return this._getColor(color1);

    const one = this._getColor(color1);
    const two = this._getColor(color2);

    const r = one[0] * ratio + two[0] * (1 - ratio);
    const g = one[1] * ratio + two[1] * (1 - ratio);
    const b = one[2] * ratio + two[2] * (1 - ratio);

    const result = [r, g, b];

    return result;
  }

  public static formatColorToRGBA(color1: colorType) {
    return `rgba(${color1[0]} ${color1[1]} ${color1[2]})`;
  }
}
