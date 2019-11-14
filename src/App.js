import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
  + Math.random().toString(36).substring(2, 4);
return {
  id,
  title: `Random Card ${id}`,
  content: 'lorem ipsum',
  }
}

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}
class App extends Component {
  state = {
    store: STORE,
  }

  handleDeleteCard = (cardId) => {
    console.log('handle delete card called')
    const {lists, allCards} = this.state.store;
    
    const newLists = lists.map(list =>  ({
      ...list,
      cardIds: list.cardIds.filter(id => id !== cardId)
    }));
    console.log(newLists)

    const newCards = omit(allCards, cardId);
    console.log(newCards)

    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  }

  handleAddRandomCard = (listId) => {
    const randomCard = newRandomCard()
    console.log(randomCard);

    const newLists = this.state.store.lists.map(list => {
      if(list.id === listId) {
        return {
          ...list,
          cardIds: [...list.cardIds, randomCard.id]
        };
      } 
      return list;
    })
    console.log(newLists)

    this.setState({
      store: {
        lists: newLists,
        allCards: {
        ...this.state.store.allCards,
        [randomCard.id]: randomCard
        }
      }
    })
    console.log('handle add random card called')
  }

  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
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
