import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuizHead = ({ quiz, onQuizSelect }) => {
  return (
    <div
      className="card-header custom-hover bg-light"
      onClick={() => onQuizSelect(quiz)}>
      <div className="">
        <span className="font-weight-bold">Title: {quiz.title} </span>
        <div className="float-right">
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

QuizHead.propTypes = {
  quiz: PropTypes.object.isRequired,
  onQuizSelect: PropTypes.func.isRequired
};

export default QuizHead;
