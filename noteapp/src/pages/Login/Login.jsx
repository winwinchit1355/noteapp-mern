import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosIntance from '../../utils/axiosInstance'

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState({});
    const navigate = useNavigate();
    const handleLogin = async (e) =>{
        e.preventDefault();
        setError({});
        const errors={};
        if(!validateEmail(email)){
            errors.email = "Please enter a valid email address.";
        }
        if(!password){
            errors.password = "Please enter your password.";
        }
        setError(errors);
        try {
            const response = await axiosIntance.post('/login',{
                email,
                password
            });
            if(response.data && response.data.accessToken)
            {
                localStorage.setItem('token',response.data.accessToken);
                navigate('/dashboard');
            }
          } catch (e) {
            if(e.response && e.response.data && e.response.data.message){
                setError({message:e.response.data.message});
            }else{
                setError({message:"Something went wrong. Please try again later."});
            }
          }
    }
  return (
    <>
        <Navbar />
        <div className='flex items-center justify-center mt-28'>
            <div className='w-2/6 border rounded px-7 py-20'>
                <form onSubmit={handleLogin}>
                    <h4 className="text-2xl mb-7">Login</h4>

                    <input type="text" placeholder='Email' className='input-box'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    {error.email && <p className='text-danger text-xs pb-1'>{error.email}</p>}
                    <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    {error.password && <p className='text-danger text-xs pb-1'>{error.password}</p>}
                    {error.message && <p className='text-danger text-xs pb-1'>{error.message}</p>}
                    <button type='submit' className='btn-primary'>
                        Login
                    </button>

                    <p className='text-sm text-center mt-4'>Not registered yet?{" "}
                        <Link className='font-medium text-primary underline' to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login