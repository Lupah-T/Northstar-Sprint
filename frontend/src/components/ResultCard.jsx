import React from 'react';

const ResultCard = ({ title, children }) => {
  return (
    <div className="result-card">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};

export default ResultCard;
