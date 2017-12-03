import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green700, green800} from 'material-ui/styles/colors';

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  state = {
    openModal: false,
  };

  handleOpen = () => {
   this.setState({openModal: true});
 };

 handleClose = () => {
   this.setState({openModal: false});
 };

  //sends book and shelf to be moved
  onMoveBook (shelf) {
      this.props.onMoveBook(this.props.book, shelf)
  }

  render() {

    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    const muiTheme = getMuiTheme({
        palette: {
          textColor: green700
        },
        appBar: {
          height: 50,
          color: green800
        }
      });

    return (

      <div   className="book">
              <MuiThemeProvider muiTheme={muiTheme}>
              <Dialog
                  title={this.props.book.title}
                  actions={actions}
                  modal={true}
                  open={this.state.openModal}
                      >
                      <div style={{fontSize: '14px'}}>{this.props.book.description}</div>
              </Dialog>
              </MuiThemeProvider>
            <div  className="book-top">
              <a onClick={this.handleOpen}>
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : null})` }}></div>
              </a>
              <div aria-label={this.props.book.title} className="book-shelf-changer">
                <select  value={this.props.book.shelf || "none"} onChange={(e) => this.onMoveBook(e.target.value)}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors}</div>
      </div>
    )
  }
}

export default Book
