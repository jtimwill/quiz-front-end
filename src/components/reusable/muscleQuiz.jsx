import React from 'react';
import PropTypes from 'prop-types';
import MuscleMap from './muscleMap';

const MuscleQuiz = ({ question, onAnswer }) => {
  return (
    <div className="card">
      <h5 className="card-header bg-primary text-center text-light">
        Click the {question} muscle group
      </h5>
      <div className="card-body">
        <MuscleMap
          current_muscles={[]}
          onMuscleSelect={onAnswer}
        />
      </div>
    </div>
  );
};

MuscleQuiz.propTypes = {
  question: PropTypes.string.isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default MuscleQuiz;
