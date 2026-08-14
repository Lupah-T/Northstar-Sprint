const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const checkReturnStatus = async (orderId) => {
  const response = await fetch(`${API_URL}/returns/${orderId}`);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
};

export const checkStockAvailability = async (productId, variant) => {
  const url = variant 
    ? `${API_URL}/stock/${productId}/${encodeURIComponent(variant)}`
    : `${API_URL}/stock/${productId}`;
    
  const response = await fetch(url);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  
  return data;
};
