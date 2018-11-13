import React from 'react';
import PropTypes from 'prop-types';
import './piano.css';

const MusicQuiz = ({ quiz, onFormSubmit, onInputChange }) => {
  return (
    <div className="card">
      <div className="quiz">
        <div className="card"></div>
        <img className="card-img-top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22508%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20508%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1670e7f2ff2%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A25pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1670e7f2ff2%22%3E%3Crect%20width%3D%22508%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22226.234375%22%20y%3D%22123.6%22%3EGIF%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="Note"/>
      </div>
      <div className="card-body">
        <div className="wrapper">
          <div className="keyboard">
            <div className="white key C"></div>
            <div className="white key D"></div>
            <div className="white key E"></div>
            <div className="white key F"></div>
            <div className="white key G"></div>
            <div className="white key A"></div>
            <div className="white key B"></div>
            <div className="black key Cs"></div>
            <div className="black key Ds"></div>
            <div className="black key Fs"></div>
            <div className="black key Gs"></div>
            <div className="black key As"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

MusicQuiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default MusicQuiz;
