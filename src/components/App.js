import React, { Component } from "react";
import "./App.css";
import UsersList from "./UsersList";
import ButtonFetchUsers from "./ButtonFetchUsers";

const API = "https://randomuser.me/api/?results=1";

class App extends Component {
  state = {
    users: []
  };

  handleDataFetch = () => {
    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((data) => {
        const users = this.state.users;
        for (const person of data.results) {
          users.push(person);
        }
        this.setState({
          users
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const users = this.state.users;

    return (
      <div>
        <ButtonFetchUsers click={this.handleDataFetch} />
        {users.length ? <UsersList users={users} /> : null}
      </div>
    );
  }
}

export default App;
