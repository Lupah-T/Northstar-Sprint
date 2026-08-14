import React, { useState } from 'react';
import ReturnsForm from './ReturnsForm';
import StockForm from './StockForm';

const SupportAssistant = () => {
  const [activeTab, setActiveTab] = useState('returns');

  return (
    <div className="assistant-card">
      <h1>NORTHSTAR SUPPORT ASSISTANT</h1>
      <p className="subtitle">What can we help you with?</p>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'returns' ? 'active' : ''}`}
          onClick={() => setActiveTab('returns')}
        >
          Returns & Refunds
        </button>
        <button 
          className={`tab ${activeTab === 'stock' ? 'active' : ''}`}
          onClick={() => setActiveTab('stock')}
        >
          Stock Availability
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'returns' ? <ReturnsForm /> : <StockForm />}
      </div>
    </div>
  );
};

export default SupportAssistant;
