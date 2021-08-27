import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { TARGET } from '../../constants';
import { getTotalPremium } from '../../store/slicers/deal';
import './style/Stats.css';

const Stats = ({ today }) => {
  const totalPremium = useSelector(getTotalPremium);

  return (
    <div className="stats">
      <div className="stats-item">
        <div>{today}</div>
        <div>Day</div>
      </div>
      <div className="stats-item">
        <div>{totalPremium}</div>
        <div>Achieved</div>
      </div>
      <div className="stats-item">
        <div>{TARGET > totalPremium ? TARGET - totalPremium : 0}</div>
        <div>Lag</div>
      </div>
      <div className="stats-item">
        <div>{TARGET}</div>
        <div>Target</div>
      </div>
    </div>
  );
};

Stats.propTypes = {
  today: PropTypes.number.isRequired,
};

export default Stats;
