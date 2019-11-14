import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';

class App extends Component {
  state = {
    lists: STORE.lists,
    allCards: STORE.allCards
  }

  handleDeleteCard() {
    console.log('handle delete card called')
  }

  handleAddRandomCard() {
    console.log('handle add random card called')
  }

  render() {
    const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onRandomCard={this.handleAddRandomCard}
              onDeleteCard={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
