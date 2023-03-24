// import { useNavigate } from "react-router-dom"

function Unauthorized() {

    // const navigate = useNavigate()
 
    // const goBack = () => navigate(-1);
  return (
    <div>
        <h1>Unauthorized</h1>
        <p> You do not have access to this page</p>
        {/* <div>
            <button onClick={goBack}>Go Back</button>
        </div> */}
    </div>
  )
}

export default Unauthorized