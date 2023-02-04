import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth){
            navigate("/");
        }
    },[]);

    const handleLogin = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method:'post',
            body: JSON.stringify({email,password}),
            headers: {
                "Content-Type": "application/json",
              }
        });
        result = await result.json();
        if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/');
        }else{
            alert("Please enter correct details")
        }
        console.log(result);
    }
    return(
        <div className='login'>
            <h1>Login</h1>
            <input type="text" onChange={(e)=> setEmail(e.target.value)} value={email} className='inputBox' placeholder="Enter Email" />
            <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} className='inputBox' placeholder='Enter Password' />
            <button onClick={handleLogin} className='appButton' type="button">Login</button>
        </div>
    )
}

export default Login;