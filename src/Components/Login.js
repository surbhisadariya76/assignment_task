import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [authData, setAuthData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(authData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='row'>
        <div className="col-6 px-5"> <input
      className='form-control'
        type="email"
        name="email"
        placeholder="Email"
        value={authData.email}
        onChange={handleChange}
        required
      /></div>
        <div className="col-6 px-5">
        <input
      className='form-control'
        type="password"
        name="password"
        placeholder="Password"
        value={authData.password}
        onChange={handleChange}
        required
      />
        </div>
      </div>
     
     
      <button type="submit" className='btn-primary btn my-3 w-25'>Login</button>
    </form>
  );
};

export default Login;
