import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "../Time/DatePicker";
import TimePicker from "../Time/TimePicker";
import HallFIle from "./HallFIle";
import HallInput from "./HallInput";
import HallInputFields from "./HallInputFields";
import HallTextArea from "./HallTextArea";
import useFetch from "../../hooks/useFetch";


const loginBtnClass = `relative  block rounded-lg bg-blue-500 px-6 py-4 text-base 
font-medium uppercase leading-tight text-white shadow-md  transition duration-150 ease-in-out hover:bg-blue-700
hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none
focus:ring-0 active:bg-blue-800 active:shadow-lg  md:py-3`;

function BookHall({handleEditSubmit,formInputState}) {
  const { state } = useLocation();
  const navigate = useNavigate()

  let api = useFetch();
  let submitData = async (payload) => {
    try {
      let { response, data } = await api("/api/hall/book_hall/", {
        method: "POST",
        body: payload,
      });
      if(response.status===400){
        alert(response)//use a notification component here
      }
      // console.log(response, data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(formInputState)
  
  let inputFieldsState = {};
  if(!formInputState){
    HallInputFields.forEach((hallField) => (inputFieldsState[hallField.id] = ""));
  }
  else{
    
    let {eventManager,orgClub,eventName,pnumber} = formInputState
    inputFieldsState={eventManager,orgClub,eventName,pnumber,email:""}
  }

  const [inputState, setInputState] = useState(inputFieldsState);

  const handleChange = (e) => {
    setInputState({ ...inputState, [e.target.id]: e.target.value });
  };

  console.log(inputState)

  let formHandleSubmit;

  const handleSubmit = (e) => {
    const file = e.target.eventDetails.files[0];

    const payload = new FormData();
    payload.append("bookedHall", state.id);
    payload.append("eventDate", e.target.eventDate.value);
    payload.append("startTime", e.target.eventStartTime.value);
    payload.append("endTime", e.target.eventendTime.value);
    payload.append("eventManager", e.target.eventManager.value);
    payload.append("organizingClub", e.target.orgClub.value);
    payload.append("eventName", e.target.eventName.value);
    // payload.append("email", e.target.email.value); not added to backend
    payload.append("PhoneNumber", e.target.pnumber.value);
    payload.append("EventDetailText", e.target.eventDesc.value);
    payload.append("EventDetailFile",file);

    for (const [key, value] of payload) {
      console.log(key, value);
    }

    submitData(payload)

    e.preventDefault();
    // navigate('/')
  };

  if(!formInputState){
     formHandleSubmit = handleSubmit
  }else{
     formHandleSubmit = handleEditSubmit
  }

  return (
    <>
      <div className="mx-auto mt-6 min-h-screen w-full max-w-3xl p-4 shadow-lg">
        <div className="text-3xl font-bold">{!formInputState?state.name:formInputState.hallName}</div>
        <div className="text-sm text-gray-500">Capacity: {!formInputState?state.capacity:formInputState.capacity}</div>
        <form onSubmit={formHandleSubmit}>
          {/* date input  */}
          <DatePicker
          spanText="Event Date:"
          customDivClass="my-6 max-w-[420px]"
          />
          {/* date input ends here */}

          {/*  time input */}
          <TimePicker></TimePicker>
          {/* time input ends here */}

          {/* event manager,organizing club,event name,email,phone number */}
          <div>
            {HallInputFields.map((hallField) => (
              <HallInput
                key={hallField.id}
                labelText={hallField.labelText}
                id={hallField.id}
                name={hallField.name}
                type={hallField.type}
                inputmode={hallField.inputmode}
                pattern={hallField.pattern}
                isRequired={hallField.isRequired}
                placeholder={hallField.placeholder}
                handleChange={handleChange}
                value={inputState[hallField.id]}
                optionList={hallField.optionList}
                optionListName={hallField.optionListName}
                minLength={hallField.minLength}
                maxLength={hallField.maxLength}
              />
            ))}
          </div>
          {/* ends here */}

          {/* brief event description */}
          <HallTextArea
          textInputState={formInputState?.eventDesc}
          />

          <HallFIle />

          <button className={loginBtnClass} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default BookHall;
