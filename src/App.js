import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quotes: [],
      random: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            quotes: result,
            random: Math.floor(Math.random() * result.length)
          });
        },
        (error) => {
          setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleClick() {
    this.setState({
      random: Math.floor(Math.random() * this.state.quotes.length)
    });
  }

  render() {
    const { error, isLoaded, quotes, random } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <div id="quote-box">
            <p id="text">{quotes[random].text}</p>
            <p id="author">
              -{" "}
              {quotes[random].author === null
                ? "Anonymous"
                : quotes[random].author}
            </p>
            <button id="new-quote" onClick={this.handleClick}>
              New quote
            </button>
            <a id="tweet-quote" target="_blank" href="twitter.com/intent/tweet">
              <i className="fab fa-twitter-square"></i>
            </a>
          </div>
        </div>
      );
    }
  }
}
