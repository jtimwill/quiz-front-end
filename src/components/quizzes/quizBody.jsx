import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuizBody = ({ quiz, current_quiz, index, category, onQuizDelete }) => {
  function getCSSClass(quiz, current_quiz) {
    return quiz === current_quiz ? "custom-show" : "custom-hide-2"
  }
  const btn = "btn btn-";
  const fa = "fa fa-";
  const url_prefix = `/quizzes/${quiz.id}`;
  return (
    <div>
      <div className={getCSSClass(quiz, current_quiz)}>
        <div className="card-body">
          <p className="card-text">
            <span className="font-weight-bold">Description: </span>
            {quiz.description}
          </p>
          <p className="card-text">
            <span className="font-weight-bold">Difficulty: </span>
            {quiz.difficulty}
          </p>
          <p className="card-text">
            <span className="font-weight-bold">Category: </span>
            {category}
          </p>
          <Link to={`${url_prefix}/show`} className={`${btn}warning`}>
            Edit Questions
          </Link>
          <div className="float-right">
            <Link to={`${url_prefix}/edit`} className={`${btn}info mx-1`}>
              <i className={`${fa}pencil-square-o`}></i>
            </Link>
            <button
              onClick={() => onQuizDelete(quiz)}
              className={`${btn}danger`}
            >
              <i className={`${fa}trash`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

QuizBody.propTypes = {
  quiz: PropTypes.object.isRequired,
  current_quiz: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  onQuizDelete: PropTypes.func.isRequired
};

export default QuizBody;
