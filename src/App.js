import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      quotes: [],
      random: null,
      color: "hsl(234, 100%, 25%)",
      hoverColor: "hsl(234, 100%, 40%)",
      hoverButton: false,
      hoverTwitter: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggleHoverButton = this.toggleHoverButton.bind(this);
    this.toggleHoverTwitter = this.toggleHoverTwitter.bind(this);
  }

  componentDidMount() {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            quotes: result,
            random: [35, 72]
          });
          console.log(this.state.random);
          console.log(this.state.quotes);
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
    let randomColor1 = Math.floor(Math.random() * 360);
    this.setState({
      random: [
        ...this.state.random,
        Math.floor(Math.random() * this.state.quotes.length)
      ],
      color: `hsl(${randomColor1}, 100%, 25%)`,
      hoverColor: `hsl(${randomColor1}, 100%, 40%)`
    });

    document
      .getElementById("tweet-quote")
      .setAttribute(
        "href",
        "https://twitter.com/intent/tweet?hashtags=inspirationalquotes&related=freecodecamp&text=" +
          encodeURIComponent(
            '"' +
              this.state.quotes[this.state.random.length - 1].text +
              '"  - ' +
              this.state.quotes[this.state.random.length - 1].author
          )
      );
  }

  toggleHoverButton() {
    this.setState({
      hoverButton: !this.state.hoverButton
    });
  }

  toggleHoverTwitter() {
    this.setState({
      hoverTwitter: !this.state.hoverTwitter
    });
  }

  render() {
    const { error, isLoaded, quotes, random, color } = this.state;
    let hoverStyleButton;
    let hoverStyleTwitter;
    if (this.state.hoverButton) {
      hoverStyleButton = {
        background: this.state.hoverColor,
        transition: `background-color 1s, transform 0.2s`
      };
    } else {
      hoverStyleButton = {
        opacity: "1",
        background: this.state.color,
        transition: `background-color 1s, transform 0.2s`
      };
    }

    if (this.state.hoverTwitter) {
      hoverStyleTwitter = {
        color: this.state.hoverColor,
        transition: `color 1s, transform 0.2s`
      };
    } else {
      hoverStyleTwitter = {
        color: this.state.color,
        transition: `color 1s, transform 0.2s`
      };
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App" style={{ background: color }}>
          <div id="quote-box">
            <div className="quote-wrapper">
              <p id="text" className="text" style={{ color: color }}>
                <i
                  class="fas fa-quote-right color"
                  style={{ color: color }}
                ></i>{" "}
                {quotes[random.length - 2].text}
              </p>
              <p id="author" className="author" style={{ color: color }}>
                -{" "}
                {quotes[random.length - 2].author === null
                  ? "Anonymous"
                  : quotes[random.length - 2].author}
              </p>
            </div>
            <div className="bottom-wrapper">
              <a
                id="tweet-quote"
                target="_blank"
                href="twitter.com/intent/tweet"
              >
                <i
                  className="fab fa-twitter-square"
                  style={hoverStyleTwitter}
                  onMouseEnter={this.toggleHoverTwitter}
                  onMouseLeave={this.toggleHoverTwitter}
                ></i>
              </a>
              <button
                id="new-quote"
                style={hoverStyleButton}
                onMouseEnter={this.toggleHoverButton}
                onMouseLeave={this.toggleHoverButton}
                onClick={this.handleClick}
              >
                New quote
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
