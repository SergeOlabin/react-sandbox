import axios from 'axios';
import { IPost } from '../../TS-types';
import { FETCH_ERROR, RECEIVE_POSTS, REQUEST_POSTS } from './types';

export const requestPosts = () => ({
  type: REQUEST_POSTS,
});

export const receivePosts = (posts: IPost[]) => ({
  type: RECEIVE_POSTS,
  payload: { posts },
});

const fetchingError = () => ({
  type: FETCH_ERROR,
});

export const fetchPosts = () => {
  return (dispatch: Function) => {
    dispatch(requestPosts());

    return axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.data, err => console.error(err))
      .then(res => dispatch(receivePosts(res)));
  };
};
