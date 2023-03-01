import {useState,useEffect, createContext} from 'react'

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
        console.log(data)
    }
    
    let contextData = {
        loginUser:loginUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}