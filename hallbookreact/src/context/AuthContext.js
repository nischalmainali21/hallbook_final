import {useState,useEffect, createContext} from 'react'
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom"

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    
    let [authTokens,setAuthTokens] = useState(() => localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null)
    let [user,setUser] = useState(() => localStorage.getItem('authTokens')?jwt_decode(localStorage.getItem('authTokens')):null)

    const navigate = useNavigate()

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
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate('/about')
        }else{
            alert('something is wrong')
        }
        
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }
    
    let contextData = {
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}