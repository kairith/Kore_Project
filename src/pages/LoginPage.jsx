import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
  const handleLoginSuccess = async (response) => {
    const res = await fetch('http://localhost:5010/auth/google/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: response.credential })
    });

    const data = await res.json();
    console.log("User:", data);
  };

  return (
    <div>
      <h1>Login</h1>
      <GoogleLogin onSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
