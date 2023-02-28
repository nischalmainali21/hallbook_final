import { Link } from "react-router-dom"

export default function Error(){
    return (
        <>
        <h2>Error</h2>
        <p>Page does not exist</p>
        <Link to="/">Back To Home</Link>
        </>
    )
}



