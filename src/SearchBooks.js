import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {

  state = {
    searchTerm: '',
    matchingBooks: []
  }

  findBookShelf = (title) => {
    let matches = this.props.books.filter(
      (book) => book.title === title
    )
    if (matches && matches.length === 1) {
      return matches[0].shelf
    } else {
      return 'none'
    }
  }

  matchBooks = (searchTerm) => {
    BooksAPI.search(searchTerm, 20).then((books) => {
      this.setState((prevState) => {
        return {
          matchingBooks: books.map((book) => {
            book.shelf = this.findBookShelf(book.title)
            return book
          })
        }
      })
    })
  }

  updateSearch = (searchTerm) => {
    this.setState(
      { searchTerm: searchTerm.trim() },
      () => this.state.searchTerm && this.state.searchTerm !== '' 
        ? this.matchBooks(searchTerm)
        : this.setState({ matchingBooks: [] })
    )
   }

  handleChange = (title, shelf) => {
    this.setState((prevState) => {
      return {
        matchingBooks: prevState.matchingBooks.map((book) => {
          if (book.title === title) {
            book.shelf = shelf
          }
          return book
        })
      }
    }

    )
    this.props.onChangeShelf(title, shelf)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              values={this.state.searchTerm}
              onChange={(event) => this.updateSearch(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.matchingBooks && this.state.matchingBooks.map(
              (book) => (
                <li key={book.id}>
                  <Book
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    shelf={book.shelf}
                    onChangeShelf={this.handleChange}
                  />
                </li>
              )
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
