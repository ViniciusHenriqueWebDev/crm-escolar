import React, { useState, useEffect } from 'react';
import TurmasList from './components/TurmasList';
import { CirclesWithBar } from 'react-loader-spinner';
import './style.css';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='m-4 text-center'>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
          <CirclesWithBar
            type="CirclesWithBar"
            color="#00BFFF"
            height={120}
            width={120}
          />
        </div>
      ) : (
        <TurmasList />
      )}
    </div>
  );
};

export default Index;
