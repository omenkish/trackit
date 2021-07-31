import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { genericRequest } from '../utils/apiRequests';

const entriesUrl = '/entries';
const registerUrl = '/api/v1/register';

export default () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const [submitting, setSubmitting ] = useState(false);
  const [error, setError] = useState('');
  const [passwordsEqual, setPasswordsEqual] = useState(null);

  useEffect(
    () => {
      const user = localStorage.getItem('user');
      
      if (user) history.push(entriesUrl);
    },[]);

  const onSubmit = async (data) => {
    const passwordsAreEqual = data.password && data.password === data.confirmPassword;

    if (passwordsAreEqual) setPasswordsEqual(true);

    if(!passwordsAreEqual) return setPasswordsEqual(false);

    setSubmitting(true);

    try {
      const response = await genericRequest(registerUrl, {user: data}, 'POST');
      
      localStorage.setItem('user', response.data);
      history.push(entriesUrl);
    } catch (error){
      if (error.username) return setError('This username is already taken.');

      setError('Ensure password is at least 6 characters long.');
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

        <div className="form-group">
          <div >
            <input
              {...register("confirmPassword", { required: true })}
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              required
            />
          </div>
          {passwordsEqual === false && (
          <div className="incorrect-feedback">
            Passwords do not match.
          </div>
          )}
        </div>
        
        <button type="submit" className="btn btn-dark" disabled={submitting}>Register</button>
        <p className="text text-muted mt-2">
          Have an account? 
          <Link to="/" className="text text-dark font-weight-bold"> Sign in</Link>
        </p>
      </form>
    </div>
  );
};
