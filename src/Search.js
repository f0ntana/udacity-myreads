import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBooks from './ListBooks';
import { DebounceInput } from "react-debounce-input";

class Search extends Component {
  constructor(props) {
    super();
  }

  state = {
    query: "",
    books: [],
    empty: false
  };

  searchBook = query => {
    BooksAPI.search(query).then(books => {
      if(books && books.length > 0) {
        this.setState({ empty: false, books, query }); 
      } else {
          this.setState({ empty: true, books: [], query });
      }
    });
  };

  componentDidMount() {
    this.setState({ books: this.props.books || [] })
  }

  render() {
    return <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Add a book
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput 
              minLength={2} 
              debounceTimeout={500} 
              value={this.state.query} 
              placeholder="Search by title or author"  
              onChange={event => this.searchBook(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" />
          {this.state.empty && (
            <div> No book for this search</div>
          )}
          <ListBooks updateBook={this.props.updateBook} books={this.state.books} />
        </div>
      </div>;
  }
}

export default Search;
