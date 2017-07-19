import React, { Component } from 'react';

class SinglePost extends Component {
  handleCloseClick() {
    this.props.closeClickHandler(this.props.postId);
  }
  render() {
    return (
      <article>
        <h2 className="capitalize">{this.props.title}</h2>
        <span>{this.props.authorName}</span> - <span>{this.props.companyName}</span> - <span>{this.props.cityName}</span>
        <p className="capitalize">{this.props.postBody}</p>
        <button onClick={this.handleCloseClick.bind(this)}>X</button>
      </article>
    );
  }
}

export default SinglePost;
