import React, { Component } from 'react';
import './App.css';
import postsData from '../posts.json';
import usersData from '../users.json';
import PostsList from './PostsList';
import Filter from './Filter';

class App extends Component {
  constructor() {
    super();
    this.state = {
      postsData,
      usersData,
      cityNames: this.getCityNames(),
      companyNames: this.getCompanyNames(),
      authorsNames: this.getAuthors()
    };
  }

  getCityNames() {
    let cityNames = [];
    usersData.forEach((user) => {
      if (cityNames.indexOf(user.address.city) === -1) {
        cityNames.push(user.address.city)
      }
    });

    return cityNames;
  }

  getCompanyNames() {
    let companyNames = [];
    usersData.forEach((user) => {
      if (companyNames.indexOf(user.company.name) === -1) {
        companyNames.push(user.company.name)
      }
    });

    return companyNames;
  }

  getAuthors() {
    let authors = [];
    usersData.forEach((user) => {
      if (authors.indexOf(user.username) === -1) {
        authors.push(user.username)
      }
    });

    return authors;
  }

  closeClickHandler(id) {
    let posts = this.state.postsData.filter((post) => post.id !== id);
    this.setState({
      postsData: posts
    })
  }

  cityFilterChangeHandler(value) {
    let users = this.state.usersData.filter((user) => user.address.city === value);
    this.setState({
      usersData: users
    }, () => {
      console.log('hi')
    });
  }

  filterChangeHandler() {
    console.log('filter changed')
  }

  render() {
    return (
      <div className="App">
        <h1>Posts</h1>
        <nav>
          <Filter
            filterLabel="City filter:"
            options={this.state.cityNames}
            filterChangeHandler={this.cityFilterChangeHandler.bind(this)}
          />
          <Filter
            filterLabel="Company filter:"
            options={this.state.companyNames}
            filterChangeHandler={this.filterChangeHandler.bind(this)}
          />
          <label>Quick search by post title <input type="text"/></label>
          <hr/>
          <Filter
            filterLabel="Sort by:"
            options={this.state.authorsNames}
            filterChangeHandler={this.filterChangeHandler.bind(this)}
          />
        </nav>
        <PostsList
          posts={this.state.postsData}
          users={this.state.usersData}
          closeHandler={this.closeClickHandler.bind(this)}
        />
      </div>
    );
  }
}

export default App;
