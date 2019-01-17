import React from 'react';
import PropTypes from 'prop-types';
import './piano.css';

const MusicQuiz = ({ question, onAnswer }) => {
  let key_elements = [];
  let images = {};
  const white_keys = ["C", "D", "E", "F", "G", "A", "B"];
  const black_keys = ["Cs", "Ds", "Fs", "Gs", "As"];
  const notes = white_keys.concat(black_keys);
  const versions = [["C0", "C0"], ["D0", "D0"], ["E0", "E0"], ["F0", "F0"],
                    ["G0", "G0"], ["A0", "A0"], ["B0", "B0"], ["CS", "Db"],
                    ["DS", "Eb"], ["FS", "Gb"], ["GS", "Ab"], ["AS", "Bb"]];
  white_keys.forEach( note => {
    key_elements.push({ name: `white key ${note}`, info: note });
  });
  black_keys.forEach( note => {
    key_elements.push({ name: `black key ${note}`, info: note });
  });

  for (let i = 0, length = notes.length; i < length; i++) {
    images[notes[i]] = versions[i];
  }

  function get_path(note) {
    const clefs = ["bass", "treble"];
    // ** Version flickering workaround (fix this) **
    const clef = clefs[1]; // Better: clefs[Math.floor(Math.random() * 2)];
    const version = 1; // Better: Math.floor(Math.random() * 2);
    // ****************
    const path_prefix = `${process.env.PUBLIC_URL}/musicImages/`;
    return `${path_prefix + clef}/${images[note][version]}.png`;
  }

  return (
    <div className="card">
      <div className="card-header note-background-color">
        <img src={get_path(question)} alt={question}/>
      </div>
      <div className="card-body">
        <div className="wrapper">
          <div className="keyboard">
            {key_elements.map(key => (
              <div
                key={key.info}
                className={key.name}
                onClick={() => onAnswer(key.info)}
              >
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

MusicQuiz.propTypes = {
  question: PropTypes.string.isRequired,
  onAnswer: PropTypes.func.isRequired
};

export default MusicQuiz;
