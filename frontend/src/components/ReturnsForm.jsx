import React, { useState } from 'react';
import { checkReturnStatus } from '../services/api';
import ResultCard from './ResultCard';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';

const ReturnsForm = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('Please provide an order ID');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const fetchPromise = checkReturnStatus(orderId.trim());
      const timerPromise = new Promise((resolve) => setTimeout(resolve, 7500)); // Minimum 7.5 seconds delay
      
      const [data] = await Promise.all([fetchPromise, timerPromise]);
      
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="orderId">Order ID:</label>
          <input 
            type="text" 
            id="orderId"
            value={orderId} 
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="e.g. NS1001"
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Checking...' : 'Check Return'}
        </button>
      </form>

      {loading && <Loader />}

      {error && <ErrorMessage message={error} />}
      
      {result && (
        <ResultCard title="Result:">
          <div className="result-item">
            <span className="result-label">Order ID:</span>
            <span>{result.orderId}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Return eligibility:</span>
            <span>{result.eligible ? 'Eligible' : 'Not Eligible'}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Return status:</span>
            <span>{result.returnStatus}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Refund status:</span>
            <span>{result.refundStatus}</span>
          </div>
        </ResultCard>
      )}
    </div>
  );
};

export default ReturnsForm;
