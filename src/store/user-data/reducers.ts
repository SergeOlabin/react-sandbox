import { IPostsState } from '../storeShapes';
import { FETCH_ERROR, RECEIVE_POSTS, REQUEST_POSTS } from './types';

const userDataInitizalState: IPostsState = {
  posts: [],
  isFetching: false,
  isValid: false,
};

export interface IPostsActions {
  type: string;
  payload: any;
}

export function postsData(
  state: IPostsState = userDataInitizalState,
  action: IPostsActions,
): IPostsState {
  switch (action.type) {
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
      };

    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        isFetching: false,
        isValid: true,
      };

    case FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        isValid: false,
      };
    default:
      return state;
  }
}
