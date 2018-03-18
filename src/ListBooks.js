import React, { Component } from "react";

class ListBooks extends Component {
  constructor(props) {
    super();
  }

  render() {
    return <div>
        <div className="bookshelf">
          {this.props.title && <h2 className="bookshelf-title">
              {this.props.title}
            </h2>}
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books && this.props.books.map(book => {
                  return <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ (book.imageLinks && (book.imageLinks.thumbnail))})` }} />
                          <div className="book-shelf-changer">
                            <select defaultValue={book.shelf || "none"} onChange={event => this.props.updateBook(book, event.target.value)}>
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">
                                Want to Read
                              </option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                          {book.authors && book.authors.map(author => {
                              return author;
                            })}
                        </div>
                      </div>
                    </li>;
                })}
            </ol>
          </div>
        </div>
      </div>;
  }
}

export default ListBooks;
