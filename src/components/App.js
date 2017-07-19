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
      authorsNames: this.getAuthors(),
      searchQuery: '',
      sortOptions: ['author', 'city', 'company']
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
    let users = value !== 'none' ? usersData.filter((user) => user.address.city === value) : usersData;
    this.setState({
      usersData: users
    });
  }

  companyFilterChangeHandler(value) {
    let users = value !== 'none' ? usersData.filter((user) => user.company.name === value) : usersData;
    this.setState({
      usersData: users
    });
  }

  sortChangeHandler(value) {
    let users;
    switch (value) {
      case 'author' :
        users = usersData.sort((prev, next) => {
          let textA = prev.username;
          let textB = next.username;

          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        break;
      case 'company' :
        users = usersData.sort((prev, next) => {
          let textA = prev.company.name;
          let textB = next.company.name;

          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        break;
      case 'city' :
        users = usersData.sort((prev, next) => {
          let textA = prev.address.city;
          let textB = next.address.city;

          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        break;
      default :
        users = usersData;
    }
    this.setState({
      usersData: users
    });
  }

  searchQueryChange(e) {
    e.preventDefault();

    this.setState({
      searchQuery: e.target.value
    })
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
            filterChangeHandler={this.companyFilterChangeHandler.bind(this)}
          />
          <label>Quick search by post title <input type="text" onChange={this.searchQueryChange.bind(this)}/></label>
          <hr/>
          <Filter
            filterLabel="Sort by:"
            options={this.state.sortOptions}
            filterChangeHandler={this.sortChangeHandler.bind(this)}
          />
        </nav>
        <PostsList
          posts={this.state.postsData}
          users={this.state.usersData}
          searchQuery={this.state.searchQuery}
          closeHandler={this.closeClickHandler.bind(this)}
        />
      </div>
    );
  }
}

export default App;
