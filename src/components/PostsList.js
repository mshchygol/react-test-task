import React, { Component } from 'react';
import SinglePost from './SinglePost';

class PostsList extends Component {
  getPosts() {
    let users = {};
    this.props.users.forEach((user) => {
      users[user.id] = user;
    });

    return this.props.posts.map((post) => {

      if (users.hasOwnProperty(post.userId)) {
        return <SinglePost
          title={post.title}
          authorName={users[post.userId].username}
          companyName={users[post.userId].company.name}
          cityName={users[post.userId].address.city}
          postBody={post.body}
          closeClickHandler={this.props.closeHandler}
          postId={post.id}
          key={post.id}
        />
      }
    })
  }

  render() {
    return (
      <div className="posts-list">
        {this.getPosts()}
      </div>
    );
  }
}

export default PostsList;
