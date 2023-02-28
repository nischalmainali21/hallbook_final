import { useLocation, useNavigate } from "react-router-dom";
import ImageSlider from "../ImageSlider";
import CButton from "../CButton";

function HallDetails() {
  const { state } = useLocation();

  const navigate = useNavigate();

  const navigateToBookHall = (hall) => {
    console.log("navigating to book hall from halldetails");
    let path = `/bookhall/${state.name}`;
    navigate(path, { state: { ...hall } });
  };

  return (
    <>
      {console.log(state)}
      <div className="mx-auto mt-6 min-h-screen w-full max-w-4xl p-4 shadow-lg">
        <div className="text-3xl font-bold">{state.name}</div>
        <div className="text-sm text-gray-500">Capacity: {state.capacity}</div>
        <div className="mt-6 h-96 w-full max-w-4xl shadow-sm">
          <ImageSlider slides={state.slides} />
        </div>
        <div className="mt-12">
          <CButton
            id="Book Hall"
            type="button"
            btnDesc="Book Hall"
            onClick={() => navigateToBookHall(state)}
          />
        </div>
      </div>
    </>
  );
}

export default HallDetails;
