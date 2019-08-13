import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { IPostsState } from '../../store/storeShapes';
import { fetchPosts } from '../../store/user-data/actions';
import './posts.scss';

export interface IUserDataProps {
  postsState: IPostsState;
  fetchPosts: () => void;
}

class UserDataC extends React.Component<IUserDataProps> {
  private getTopNPosts(n: number) {
    return this.props.postsState.posts.slice(0, n);
  }
  public componentDidMount() {
    this.props.fetchPosts();
  }

  public render() {
    if (this.props.postsState.isFetching) return <div>Loading...</div>;

    const posts = this.getTopNPosts(10).map(value => (
      <div className="post" key={value.id}>
        <span className="author">User: {value.userId}</span>
        <span className="title">Title: {value.title}</span>
        <span className="body">Body: {value.body}</span>
      </div>
    ));

    return <div className="posts-view">{posts}</div>;
  }
}

const UserData = connect(
  (state: AppState) => ({
    postsState: state.postsData,
  }),
  { fetchPosts },
)(UserDataC);

export default UserData;
