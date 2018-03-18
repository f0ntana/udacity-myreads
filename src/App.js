import React from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./ListBooks";
import Search from "./Search";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    showSearchPage: true,
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(_response => {
      const books = this.state.books.filter(item => item.id !== book.id);
      book.shelf = shelf
      this.setState({ books: books.concat(book) });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <div className="list-books">
                <div className="list-books-title">
                  <h1>My Reads</h1>
                </div>
              </div>
              <div className="list-books-top">
                <div className="list-books-content">
                  <ListBooks
                    updateBook={this.updateBook}
                    books={this.state.books.filter(
                      book => book.shelf === "currentlyReading"
                    )}
                    shelf="currentlyReading"
                    title="Currently Reading"
                  />
                  <ListBooks
                    updateBook={this.updateBook}
                    books={this.state.books.filter(
                      book => book.shelf === "wantToRead"
                    )}
                    shelf={"wantToRead"}
                    title="Want To Read"
                  />
                  <ListBooks
                    updateBook={this.updateBook}
                    books={this.state.books.filter(
                      book => book.shelf === "read"
                    )}
                    shelf={"read"}
                    title="Read"
                  />
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <div className="list-books">
              <Search updateBook={this.updateBook} books={this.state.books} />
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
