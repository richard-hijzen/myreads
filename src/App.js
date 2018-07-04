import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './components/Search.js'
import ListBooks from './components/ListBooks.js'
import './styles/App.css'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (e, book) => {
    const books = this.state.books;
    const shelf = e.target.value;
    book.shelf = e.target.value;
    this.setState({
      books
    });

    BooksAPI.update(book, shelf).then(() => {
      this.setState((state) => ({
        books: state.books
          .filter(b => b.id !== book.id)
          .concat([book])
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp
