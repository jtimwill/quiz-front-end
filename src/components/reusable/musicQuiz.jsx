import React from 'react';
import PropTypes from 'prop-types';
import './piano.css';

const MusicQuiz = ({ question, onAnswer }) => {
  const keys = [
    { name: "white key C", info: "C" },
    { name: "white key D", info: "D" },
    { name: "white key E", info: "E" },
    { name: "white key F", info: "F" },
    { name: "white key G", info: "G" },
    { name: "white key A", info: "A" },
    { name: "white key B", info: "B" },
    { name: "black key Cs", info: "Cs" },
    { name: "black key Ds", info: "Ds" },
    { name: "black key Fs", info: "Fs" },
    { name: "black key Gs", info: "Gs" },
    { name: "black key As", info: "As" }
  ];
  return (
    <div className="card">
      <div className="quiz">
        <div className="card">
          <h4>Press the {question} key</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="wrapper">
          <div className="keyboard">
            <div
              className="white key C"
              onClick={() => onAnswer("C")}>
            </div>
            {keys.map(key => (
              <div
                key={key.info}
                className={key.name}
                onClick={() => onAnswer(key.info)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

MusicQuiz.propTypes = {
  question: PropTypes.string.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default MusicQuiz;
