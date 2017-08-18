import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends React.Component {

  render() {
    const shelves = [
      ["Currently Reading", "currentlyReading"],
      ["Want to Read", "wantToRead"],
      ["Read", "read"]
    ]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(
              (shelf) => (
                <BookShelf
                  key={shelf[1]}
                  title={shelf[0]}
                  name={shelf[1]}
                  books={this.props.books}
                  onChangeShelf={this.props.onChangeShelf}
                />
              )
            )}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
