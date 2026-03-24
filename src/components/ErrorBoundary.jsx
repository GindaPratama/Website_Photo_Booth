import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

export function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleErr = (e) => {
      console.error(e);
      setHasError(true);
      setErrorMsg(e.message || String(e));
    };
    window.addEventListener('error', handleErr);
    return () => window.removeEventListener('error', handleErr);
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: '20px', background: 'red', color: 'white' }}>
        <h2>React Crash Captured!</h2>
        <p>{errorMsg}</p>
      </div>
    );
  }
  return children;
}
