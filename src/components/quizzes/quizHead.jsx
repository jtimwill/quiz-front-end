import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const QuizHead = ({ quiz, onQuizSelect, onQuizDelete }) => {
  const btn = "btn btn-";
  const fa = "fa fa-";
  const url_prefix = `/quizzes/${quiz.id}`;
  return (
    <div
      className="card-header custom-hover bg-light"
      onClick={() => onQuizSelect(quiz)}>
      <div className="">
        <span className="font-weight-bold">Title: {quiz.title} </span>
        <div className="float-right">
          <Link to={`${url_prefix}/edit`} className={`${btn}info mx-1`}>
            <i className={`${fa}pencil-square-o`}></i>
          </Link>
          <button
            onClick={() => onQuizDelete(quiz)}
            className={`${btn}danger mx-1`}
          >
            <i className={`${fa}trash`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

QuizHead.propTypes = {
  quiz: PropTypes.object.isRequired,
  onQuizSelect: PropTypes.func.isRequired,
  onQuizDelete: PropTypes.func.isRequired,
};

export default QuizHead;
