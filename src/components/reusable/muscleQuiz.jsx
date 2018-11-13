import React from 'react';
import PropTypes from 'prop-types';
import MuscleMap from './muscleMap';

const MuscleQuiz = ({ question, onAnswer }) => {
  return (
    <div className="card">
      <div className="quiz">
        <div className="card">
          <h4>Click the {question} muscle group</h4>
        </div>
      </div>
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
