import React from 'react';
import './App.css';
import List from './List';

import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://api.spoonacular.com/recipes/"
});


function App() {
  return (
    <div className="App">
      <header className="App-header">
        My List
      </header>
      <div className="App-content">
        <List />
      </div>
    </div>
  );
}

export default App;
