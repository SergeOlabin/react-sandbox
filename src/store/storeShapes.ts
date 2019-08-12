import { Bulb, IPost, selectedBulbType } from '../TS-types';

export interface StoreState {
  colorMixerState: TransferLiquidsState;
  transferLiquids: TransferLiquidsState;
  posts: IPostsState;
}

export interface TransferLiquidsState {
  bulbs: Bulb[];
  selectedBulb: selectedBulbType;
  bulbId: number;
}

export interface IPostsState {
  posts: IPost[];
  isFetching: boolean;
  isValid: boolean;
}

export type screenType = 'transf' | 'mixer' | 'posts';
