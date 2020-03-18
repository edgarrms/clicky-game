import React, { Component } from "react";
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";
import "./App.css";

let guessedRight = 0;
let scoreToBeat = 0;
let selectedMsg = "select reggaeton artist, don't select the same image twice";

class App extends Component {
  state = {
    matches,
    guessedRight,
    scoreToBeat,
    selectedMsg
  };

  setClicked = id => {
    const matches = this.state.matches;
    const clickedMatch = matches.filter(match => match.id === id);
    if (clickedMatch[0].clicked) {

      console.log("Correct Guesses: " + guessedRight);
      console.log("Best Score: " + scoreToBeat);

      guessedRight = 0;
      selectedMsg = "whoops, try again."

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      this.setState({ selectedMsg });
      this.setState({ guessedRight });
      this.setState({ matches });

    } else if (guessedRight < 11) {

      clickedMatch[0].clicked = true;

      guessedRight++;

      selectedMsg = "nice! keep it up homie";

      if (guessedRight > scoreToBeat) {
        scoreToBeat = guessedRight;
        this.setState({ scoreToBeat });
      }

      matches.sort(function (a, b) { return 0.5 - Math.random() });

      this.setState({ matches });
      this.setState({ guessedRight });
      this.setState({ selectedMsg });
    } else {

      clickedMatch[0].clicked = true;

      guessedRight = 0;

      selectedMsg = "aye look at you! what a pro*Edgar smiles*";
      scoreToBeat = 12;
      this.setState({ scoreToBeat });

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      matches.sort(function (a, b) { return 0.5 - Math.random() });

      this.setState({ matches });
      this.setState({ guessedRight });
      this.setState({ selectedMsg });

    }
  };

  render() {
    return (
      <Wrapper>
        <Title>Click Your Fave reggaetonero! Dale*spanish*!</Title>

        <h3 className="scoreSummary">
          {this.state.selectedMsg}
        </h3>

        <h3 className="scoreSummary card-header">
          Correct Guesses: {this.state.guessedRight}
          <br />
                    Best Score: {this.state.scoreToBeat}
        </h3>
        <div className="container">
          <div className="row">
            {this.state.matches.map(match => (
              <MatchCard
                setClicked={this.setClicked}
                id={match.id}
                key={match.id}
                image={match.image}
              />
            ))}
          </div>
        </div>

      </Wrapper>
    );
  }
}

export default App;