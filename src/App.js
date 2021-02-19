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
    this.setState({
      random: [
        ...this.state.random,
        Math.floor(Math.random() * this.state.quotes.length)
      ]
    });

    let randomColor1 = Math.floor(Math.random() * 360);

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

    document.querySelector("#quote-box").style["background"] =
      "hsl(100, 10%, 90%)";
    document.querySelector(".color").style["background"] =
      "hsl(" + randomColor1 + ", 100%, 25%)";
    document.querySelector(".text").style["color"] =
      "hsl(" + randomColor1 + ", 100%, 25%)";
    document.querySelector(".author").style["color"] =
      "hsl(" + randomColor1 + ", 100%, 25%)";
    document.querySelector("button").style["background"] =
      "hsl(" + randomColor1 + ", 100%, 25%)";
    document.querySelector(".color").style["color"] =
      "hsl(" + randomColor1 + ", 100%, 25%)";
    document.querySelector(".fab").style["color"] =
      "hsl(" + randomColor1 + ", 100%, 25%)";
    document.querySelector(".fas").style["color"] =
      "hsl(" + randomColor1 + ", 100%, 25%)";
    document.querySelector(".color").style["transition"] = "color 1s";
    document.querySelector(".text").style["transition"] = "color 1s";
    document.querySelector(".author").style["transition"] = "color 1s";
    document.querySelector(".fas").style["transition"] = "color 1s";
    document.querySelector(".fas").style["transition"] = "color 1s";
    document.querySelector(".fab").style["transition"] = "color 1s";
    document.querySelector(".color").style["transition"] = "background 1s";
    document.querySelector("button").style["transition"] = "background 1s";
    document.querySelector("#quote-box").style["transition"] = "background 1s";
  }

  render() {
    const { error, isLoaded, quotes, random } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App color">
          <div id="quote-box">
            <div className="quote-wrapper">
              <p id="text" className="text">
                <i class="fas fa-quote-right color"></i>{" "}
                {quotes[random.length - 2].text}
              </p>
              <p id="author" className="author">
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
                <i className="fab fa-twitter-square"></i>
              </a>
              <button id="new-quote" onClick={this.handleClick}>
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
