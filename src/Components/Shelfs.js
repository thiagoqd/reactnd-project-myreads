import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab} from 'material-ui/Tabs';
import {green700, green800, green600, green900} from 'material-ui/styles/colors';


class Shelfs extends React.Component {


  static propTypes = {
    onMoveBook: PropTypes.func.isRequired,
    books: PropTypes.array
  }



  render() {
    const idshelfs = ["currentlyReading", "wantToRead", "read"]
    const shelfsTitle = ["Currently", "Want To", "Read"]

    const muiTheme = getMuiTheme({
        palette: {
          textColor: green700
        },
        appBar: {
          height: 50,
          color: green800
        }
      });

    //create array of numbers of books in each shelf
    let summaryCount =
          this.props.books ? [this.props.books.filter(b => b.shelf === "currentlyReading").length,
                              this.props.books.filter(b => b.shelf === "wantToRead").length,
                              this.props.books.filter(b => b.shelf === "read").length] : [0,0,0]

    return (
      <div className="list-books">
      <MuiThemeProvider muiTheme={muiTheme}>
      <AppBar
          showMenuIconButton={false}
          title="MyReads"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
      </MuiThemeProvider>

      <MuiThemeProvider muiTheme={muiTheme}>
        <Tabs
              inkBarStyle={{background: green900}}
              tabItemContainerStyle={{background: green600}}>

              {
                // map array os shelf rendering each book
                idshelfs.map((shelf, index) => {
                  return (
                    <Tab
                        key={index}  label={shelfsTitle[index]+" (" +summaryCount[index] +")"} >
                      <div className="bookshelf">
                        <div className="bookshelf-books">
                          <ol className="books-grid">
                          {
                            this.props.books ?
                            this.props.books.filter(book => book.shelf === shelf).map( book => (
                              <li key={book.title}>
                                <Book
                                  book={book}
                                  shelfBooks={this.props.books}
                                  onMoveBook={this.props.onMoveBook}/>
                              </li>
                            )) : null
                          }
                          </ol>
                        </div>
                      </div>
                  </Tab>
                  )
                })
              }
        </Tabs>
      </MuiThemeProvider>
      <div className="open-search">
        <Link to="/search">Add Book</Link>
      </div>
    </div>

    )
  }
}

export default Shelfs
