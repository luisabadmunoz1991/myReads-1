import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.filter((book) =>
              book.shelf === this.props.name
            ).map(
              (book) => (
                <li key={book.id}>
                  <Book
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    shelf={book.shelf}
                    onChangeShelf={this.props.onChangeShelf}
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

export default BookShelf
