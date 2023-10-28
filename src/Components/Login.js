import React, { useState, useEffect, useContext} from 'react'
import auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {

  const [user, setUser] = useState({email:"", password:""})
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {setToken} = useContext(AuthContext)
  const navigate = useNavigate()


  useEffect(()=>{
    if(localStorage.getItem("token") != null){
       navigate("/dashboard")
    } 
  },[])


  const {email, password} = user

   async function implementLogin(e){
       e.preventDefault();
      if(!email || !password){
        setError("Kindly fill in all the fields")
       return setSuccess("")
      } 

     try{
        //  const response = await axios.post("http://instagram-express-app.vercel.app/api/auth/login" ,
         const response = await auth.post("/login" ,                        
            {email:email, password:password}) 
             setSuccess(response.data.message)
             setToken(response.data.data.token) 
             setError("")  
             localStorage.setItem("token", response.data.data.token) 
             alert("You are successfully logged in");
             navigate("/dashboard")

     }
     catch(err){
          setError(err.response.data.message)
        }
}

  return (
    <div>
       {error && <h3 style={{color: "red"}}>{error}</h3>}
       {success && <h3 style={{color: "green"}}>{success}</h3>} 
    <form className='login' onSubmit={implementLogin}>
         <input type='email' placeholder='Enter Your Email'
          onChange={(e) => setUser({...user, email: e.target.value })}/>  
         <input type='password' placeholder='Enter Your Password' 
            onChange={(e) => setUser({...user, password: e.target.value })}/> 
         <button type='submit'>Log-In</button>
       </form>
    </div>
  )
}


  export default Login 