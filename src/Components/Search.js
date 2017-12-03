import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book.js'
import * as BooksAPI from '../utils/BooksAPI'

class Search extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  state = {
      query: '',
      queryBooks: []
    }

    onQuery = (query) => {
        this.setState({ query: query.trim() })
        query.length > 0 ?
        BooksAPI.search(query).then((queryBooks) => {
          if (queryBooks.error) {
            queryBooks = []
          }

          queryBooks.map(book => (
            this.props.books.filter((b) => b.id === book.id)
            .map(b => book.shelf = b.shelf)
          ))

          this.setState({queryBooks})
        }) :
        this.setState({ queryBooks: [] })

  }

  render() {
    return (
        <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">

              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(e) => this.onQuery(e.target.value)}
              />
              </div>
            </div>
            <div className="search-books-results">
            <ol className="books-grid">
            {
              this.state.queryBooks ?
              this.state.queryBooks
                 .map(book => (
                   <Book
                     onMoveBook={this.props.onMoveBook}
                     shelfBooks={this.props.books}
                     key={book.id}
                     book={book}
                   />
                 )) :
                 null
               }
           </ol>
            </div>
          </div>

    )
  }
}

export default Search
