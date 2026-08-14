import React, { useState } from 'react';
import { checkStockAvailability } from '../services/api';
import ResultCard from './ResultCard';
import ErrorMessage from './ErrorMessage';

const StockForm = () => {
  const [productId, setProductId] = useState('');
  const [variant, setVariant] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId.trim()) {
      setError('Please provide a product ID');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await checkStockAvailability(productId.trim(), variant.trim());
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
          <label htmlFor="productId">Product:</label>
          <input 
            type="text" 
            id="productId"
            value={productId} 
            onChange={(e) => setProductId(e.target.value)}
            placeholder="e.g. P1001"
          />
        </div>
        <div className="form-group">
          <label htmlFor="variant">Variant (optional):</label>
          <input 
            type="text" 
            id="variant"
            value={variant} 
            onChange={(e) => setVariant(e.target.value)}
            placeholder="e.g. Size 42"
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Checking...' : 'Check Availability'}
        </button>
      </form>

      {error && <ErrorMessage message={error} />}
      
      {result && (
        <ResultCard title="Result:">
          <div className="result-item">
            <span className="result-label">Product:</span>
            <span>{result.productName}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Variant:</span>
            <span>{result.variant}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Availability:</span>
            <span>{result.available ? 'Available' : 'Out of Stock'}</span>
          </div>
          {result.available && (
            <div className="result-item">
              <span className="result-label">Quantity:</span>
              <span>{result.quantity}</span>
            </div>
          )}
        </ResultCard>
      )}
    </div>
  );
};

export default StockForm;
