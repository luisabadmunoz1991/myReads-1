import React from 'react'
import { Component } from 'react'
import * as BooksAPI from './BooksAPI'

function makeImageUrl(id) {
  var imageUrl = "https://books.google.com/books/content?id=" + id
  imageUrl += "&printsec=frontcover&img=1&zoom=1"
  imageUrl += "&source=gbs_api"
  return imageUrl
}

class Book extends Component {

  handleChange(event) {
    const newShelf = event.target.value
    event.preventDefault()
    BooksAPI.update({ id: this.props.id }, newShelf)
    this.props.onChangeShelf(this.props.title, newShelf)
    this.forceUpdate()
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
              backgroundImage: `url(${makeImageUrl(this.props.id)})` }}></div>
              <div className="book-shelf-changer">
                <select value={this.props.shelf} onChange={(event) => this.handleChange(event)}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{
          Array.isArray(this.props.authors) ? this.props.authors.join(', ') : this.props.authors
        }</div>
      </div>
    )
  }
}

export default Book
