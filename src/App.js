import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onChangeShelf(title, shelf) {
    this.setState((prevState) => {
      return {
        books: prevState.books.map((book) => {
          if (book.title === title) {
            book.shelf = shelf
          }
          return book
        })}
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <ListBooks
              books={this.state.books}
              onChangeShelf={(title, shelf) => {
                this.onChangeShelf(title, shelf)
              }}
            />
          )} />
        <Route exact path="/search" component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
