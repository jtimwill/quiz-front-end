import React from 'react';
import PropTypes from 'prop-types';

const GenericQuiz = ({ quiz, onFormSubmit, onInputChange }) => {
  return (
    <form onSubmit={onFormSubmit} className="card bg-light">
      <div className="card-body">
        <h5>Quiz Name: {quiz.title}</h5>
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="form-group">
            <label htmlFor={"inlineFormInputTitle" + index}>
              {question.question}
            </label>
            <input
              name={index}
              type="text"
              className="form-control"
              id={"inlineFormInputTitle" + index}
              onChange={onInputChange}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
};

GenericQuiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default GenericQuiz;
