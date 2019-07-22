import { screenType } from './storeShapes';

export const transferLiquidsRouteName = 'transfer-liquids';
export const colorMixerRouteName = 'color-mixer';

export const routeToStateMap: { [key: string]: screenType } = {
  [transferLiquidsRouteName]: 'transf',
  [colorMixerRouteName]: 'mixer',
};
