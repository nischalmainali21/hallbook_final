import { useContext } from "react"
import AuthContext from "../context/AuthContext"
export default function About(){

    let {name} = useContext(AuthContext)
    return (
        <div>
            About goes here
            <p>Hello {name}</p>
        </div>
    )
}