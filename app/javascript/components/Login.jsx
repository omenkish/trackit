import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { genericRequest } from '../utils/apiRequests';

const entriesUrl = '/entries';
const loginUrl = '/login';

export default () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [submitting, setSubmitting ] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(
    () => {
      const user = localStorage.getItem('user');
      
      if (user) history.push(entriesUrl);
    },[]);

  const onSubmit = async data => {
    setSubmitting(true);

    try {
      const response = await genericRequest(loginUrl, data, 'POST');

      localStorage.setItem('user', response.data);
      history.push(entriesUrl);
    } catch (error){
      setError('Invalid username/password');
    } finally {
      setSubmitting(false);
    };
  };
  
  return (
    <div className="d-flex align-items-center justify-content-center">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
          
        {error && (
          <div className="form-group row">
            <div className="alert alert-danger alert-dismissible fade show text-center" role="alert">
              {error}
            </div>
        </div>
        )}
        <div className="form-group row">
          <div >
            <input
              {...register("username", { required: true })}
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <div >
            <input
              {...register("password", { required: true })}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
            />
          </div>
        </div>
        
        <button type="submit" className="btn btn-dark" disabled={submitting}>Sign in</button>
        <p className="text text-muted mt-2">
          Don't have an account? 
          <Link to="/register" className="text text-dark font-weight-bold"> Create one</Link>
        </p>
      </form>
    </div>
  );
};
