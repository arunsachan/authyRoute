import React, { useEffect , useState, useContext} from 'react'
import auth from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Dashboard = () => {
    const [zuku, setZuku] = useState("")
    const [name, setName] = useState("")
    const {token, setToken} = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(()=>{

          // axios.get("http://instagram-express-app.vercel.app/api/auth/zuku" , {
            auth.get("/zuku" , {
            headers: {
              "Authorization" : `Bearer ${token!=""?token:localStorage.getItem("token")}`
            }
          }) 
          .then((res)=>{
            setZuku(res.data.data.message)
            setName(res.data.data.user.name)
          })
          .catch((err)=>{
               console.log(err)
          })
    },[token])

 function logout(){
//   axios.delete("http://instagram-express-app.vercel.app/api/auth/logout", {
    auth.delete("/logout", {
     headers : {
      "Authorization" : `Bearer ${token} `
     }
  })
  .then(  
    ()=>{
        setZuku("")
        setName("")
        setToken("")
        //when we will perform logout then we will be deleting token from the local storage that we have stored
        localStorage.removeItem("token")
        alert("You have successfully logged out")
        navigate("/login")
  })
  .catch(err=>{
    console.log(err);
  })
 }

  return ( 
    <div>
      <h1>Dashboard</h1>      
      {
        name && <h2 style={{textAlign: "center"}}>{name}</h2>
      }

      {
        zuku && <p>{zuku}</p>
      }
      {name && <button onClick={logout}>Log-Out</button>}
    </div>
  )
}

export default Dashboard