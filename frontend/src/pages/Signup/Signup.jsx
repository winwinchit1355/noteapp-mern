import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosIntance from '../../utils/axiosInstance'

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError({});
    const errors = {};
    if (!name) {
      errors.name = "Please enter a name.";
    }
    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password) {
      errors.password = "Please enter your password.";
    }
    setError(errors);

    //to call signup api
    try {
      const response = await axiosIntance.post('/create-account',{
          fullName: name,
          email,
          password
      });
      console.log(response);
      if(response.data && response.data.error)
      {
          setError({message:response.data.message});
          return;
      }
      if(response.data && response.data.accessToken)
      {
        localStorage.setItem('token',response.data.accessToken);
        navigate('/');
      }
      
    } catch (e) {
      if(e.response && e.response.data && e.response.data.message){
          setError({message:e.response.data.message});
      }else{
          setError({message:"Something went wrong. Please try again later."});
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-2/6 border rounded px-7 py-20">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7">Signup</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error.name && (
              <p className="text-danger text-xs pb-1">{error.name}</p>
            )}
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <p className="text-danger text-xs pb-1">{error.email}</p>
            )}
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && (
              <p className="text-danger text-xs pb-1">{error.password}</p>
            )}
            <button type="submit" className="btn-primary" >
              Signup
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link className="font-medium text-primary underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
