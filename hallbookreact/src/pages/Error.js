import { Link } from "react-router-dom";
const buttonfixedclass = "buttonfixedclass";

export default function Error() {
  return (
    <>
      <div className="flex flex-col items-center justify-center m-auto min-h-screen gap-10 animate-color-change-2x">
        <h2 className="text-3xl font-bold">404 Error!</h2>
        <p className="text-2xl font-semibold">Page does not exist</p>
        
        <button
              className={
                buttonfixedclass +
                ` mx-auto bg-blue-500 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800`
              }
              type="submit"
            >
              <Link to="/">Back To Home</Link>
            </button>
      </div>
    </>
  );
}
