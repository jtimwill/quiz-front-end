import React from 'react';
import PropTypes from 'prop-types';

const Timer = ({ time }) => {
  return (
    <div className="text-center mb-3">
      Time:
      <span className="text-monospace text-success">
        {` ${time.seconds}.${time.tenths}`}
      </span>
    </div>
  );
};

Timer.propTypes = {
  time: PropTypes.object.isRequired
};

export default Timer;
