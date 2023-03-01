import {useState,useEffect, createContext} from 'react'
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens,setAuthTokens] = useState(null)
    let [user,setUser] = useState(null)

    let loginUser = async (e) => {
        
        let response = await fetch("http://127.0.0.1:8000/api/user/login/",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'user_type':'student','email':e.target.userName.value,'password':e.target.password.value}) //user_type
        })
        

        let data = await response.json()
        // console.log("data",data)
        // console.log("🚀 ~ file: AuthContext.js:21 ~ loginUser ~ response:", response)
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
        }else{
            alert('something is wrong')
        }
        
    }
    
    let contextData = {
        user:user,
        loginUser:loginUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}