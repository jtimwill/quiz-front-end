import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuizBody = ({ quiz, current_quiz, index, category }) => {
  function getCSSClass(quiz, current_quiz) {
    return quiz === current_quiz ? "custom-show" : "custom-hide-2"
  }

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
          <Link
            to={`/quizzes/${quiz.id}/show`}
            className={`btn-sm btn btn-info mx-1`}
          >
            Edit Questions
          </Link>
          <Link
            to={`/user-quizzes/new?quizId=${quiz.id}`}
            className={`btn-lg btn btn-success mx-1`}
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

QuizBody.propTypes = {
  quiz: PropTypes.object.isRequired,
  current_quiz: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired
};

export default QuizBody;
