import React, { useState,useEffect, useContext } from 'react'
// import auth from '../utils/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Signup = () => {

  const [user, setUser] = useState({name: " ", email:" ", password:" ",cpassword:" "})
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {setToken} = useContext(AuthContext);
  const navigate = useNavigate();
 

useEffect(()=>{
  if(localStorage.getItem("token") != null){
     navigate("/dashboard")
  } 
},[])

  const {name, email, password, cpassword} = user

   async function implementSignup(e){
       e.preventDefault();
      if(!name || !email || !password || !cpassword){
        setError("Kindly fill in all the fields")
       return setSuccess("")
      } 
      else if(password !== cpassword){
        setError("Password doesn't match")
       return setSuccess("")
      } 

     try{
         const response = await axios.post("http://instagram-express-app.vercel.app/api/auth/signup/" ,
        // const response = await auth.post("/signup" ,                           
            {name: name, email:email, password:password}) 
             setSuccess(response.data.message)
            //  save token to local Storage
             setToken(response.data.data.token) 
             setError("")   
            //below we are saving token to localStorage because so that as we refresh the page after logging or signing in the user remains logged in as it happens in real case scenario
            localStorage.setItem("token", response.data.data.token)
            // redirecting to dashboard as after this stage sign up is done successfully
            alert("You are Successfully Signed Up") 
            navigate("/dashboard")     
     }
     catch(err){
      console.log("Error", err)
          setError(err.response.data.message)
        }
}

  return (
    <div>
       <h1>SIGN-UP</h1>
       {error && <h3 style={{color: "red"}}>{error}</h3>}
       {success && <h3 style={{color: "green"}}>{success}</h3>} 
       <form className='signup' onSubmit={implementSignup}>
        <input type='text' placeholder='Enter Your Name' onChange={e => setUser({...user, name: e.target.value })}/> 
        <input type='email' placeholder='Enter Your Email'  onChange={e => setUser({...user, email: e.target.value })}/>  
        <input type='password' placeholder='Enter Your Password' onChange={e => setUser({...user, password: e.target.value })}/> 
        <input type='password' placeholder='Re-Enter Password' onChange={e => setUser({...user, cpassword: e.target.value })} />

        <button type='submit'>Sign-Up</button>
       </form>
    </div>
  )
}

export default Signup


// Note about errors => If you get something in 200 format like 200 series like 201,202 this means the work that you are trying to do is done and if you get something in 400 series for eg => 401,402 this means the work that you are trying to do is not done. For eg- the most common error that we get is error 404