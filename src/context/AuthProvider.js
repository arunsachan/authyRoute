import React, { useState } from 'react'
import AuthContext from './AuthContext.js'

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null)

  return (
    <div>
    <AuthContext.Provider value={{token:token , setToken:setToken}} >
          {children}
    </AuthContext.Provider>  
    </div>
  )
}

export default AuthProvider