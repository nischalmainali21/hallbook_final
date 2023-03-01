import { useContext } from "react"
import AuthContext from "../context/AuthContext"
export default function About(){

    let {user} = useContext(AuthContext)
    return (
        <div>
            About goes here
            {user && <p>Hello {user.user_id}</p>}
            
        </div>
    )
}