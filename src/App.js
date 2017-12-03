import React from 'react'
import { Route   } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'
import Shelfs from './Components/Shelfs.js'
import Search from './Components/Search.js'


class BooksApp extends React.Component {
  state = {
    books: []
  }

//get list of all books in the shelf
  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      this.setState({books});
    });

  }

//move book to shelf
  moveBook = (book, shelf) => {
    if (book) {
      BooksAPI.update(book,shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books ? state.books.filter(b => b.id !== book.id).concat([ book ]) : null

        }))
      })
    }
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
            <Shelfs
              onMoveBook={this.moveBook}
              books={this.state.books}
            />

        )}/>

        <Route exact path="/search" render={() => (
            <Search
              onMoveBook={this.moveBook}
              books={
              this.state.books}/>
        )}/>
        
      </div>
    )
  }
}

export default BooksApp
