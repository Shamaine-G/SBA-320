import React, { useState } from "react";
import "./Quiz.css";
import { quizQuestions } from "../../assets/quizQuestions";
import axios from "axios";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(quizQuestions[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState({ type: "" });

  const fetchPokemon = async () => {
    //21-28 clefairy, diglett 29-35, dragon less than 12 fire 13-20

    if (score < 12) {
      setPokemonName("dragonite");
    } else if (score >= 13 && score < 20) {
      setPokemonName("charmander");
    } else if (score >= 21 && score < 28) {
      setPokemonName("clefairy");
    } else if (score > 28) {
      setPokemonName("diglett");
    }

    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    setPokemon({type: res.data.types[0].type.name})
  };
  //   try {
  //     axios
  //       .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  //       .then((res) => {
  //         setPokemon({ type: res.data.types[0].type.name });
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const clickedAnswer = (id) => {
    if (lock === false) {
      if (id === 0) {
        setScore(score + 1);
        setLock(true);
      } else if (id === 1) {
        setScore(score + 3);
        setLock(true);
      } else if (id === 2) {
        setScore(score + 5);
        setLock(true);
      } else if (id === 3) {
        setScore(score + 7);
        setLock(true);
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === quizQuestions.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(quizQuestions[index]);
      setLock(false);
    }
  };

  const resetGame = () => {
    setIndex(0);
    setQuestion(quizQuestions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setPokemon("");
    setPokemonName("");
  };


  return (
    <div className="container">
      <h1>What Pokemon Type Are You?</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}{" "}
          </h2>
          <ul>
            {question.choices.map((choices) => (
              <li onClick={() => clickedAnswer(choices.id)} key={choices.id}>
                {choices.answer}
                {/* <button>reset choice</button> */}
              </li>
            ))}
          </ul>
          <button className="nextButton" onClick={next}>
            Next
          </button>
          {/* <button className='nextButton'>Prev</button> */}
          <div className="numberOfQuestions">
            {index + 1} of {quizQuestions.length}
          </div>
          <div className="numberOfQuestions">Points:{score}</div>
        </>
      )}

      {result ? (
        <>
          <h2>You scored {score} points</h2>
          <button onClick={fetchPokemon}>Double Click to Show Result</button>
          <h1>Congrats, you are a "{pokemon.type}" type pokemon!</h1>
          <button onClick={resetGame}>Play Again?</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;


