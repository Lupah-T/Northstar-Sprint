import React, { useState, useEffect } from 'react';

const Loader = () => {
  const messages = [
    "Waking up the server... 😴",
    "Putting on our running shoes... 👟",
    "Sprinting to the warehouse... 🏃💨",
    "Searching the aisles... 🔍",
    "Almost there, hang tight! ⏳"
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2500); // Change text every 2.5 seconds
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="entertaining-loader">
      <div className="spinner">🌀</div>
      <div className="loader-text">{messages[msgIndex]}</div>
    </div>
  );
};

export default Loader;
