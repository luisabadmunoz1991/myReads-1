import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

function ListBooksTitle(props) {
  return (
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
  )
}

function OpenSearch(props) {
  return (
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  )
}

class ListBooks extends React.Component {

  render() {
    const shelves = [
      ["Currently Reading", "currentlyReading"],
      ["Want to Read", "wantToRead"],
      ["Read", "read"]
    ]

    return (
      <div className="list-books">
        <ListBooksTitle />
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
        <OpenSearch />
      </div>
    )
  }
}

export default ListBooks
