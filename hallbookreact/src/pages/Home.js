import { useEffect, useState } from "react";
import HallCard from "../components/Hall/HallCard";
import hallListOrg from "../components/Hall/HallList";

//somehow works
hallListOrg[0].bookings = {
  ...hallListOrg[0].bookings,
  "2023-02-26": { "12:30-13:00": { user: "Jffohn", event: "oriehntation" },  "14:00-15:30": { user: "John", event: "orientation" } },
  // "2023-02-26": { "14:00-15:30": { user: "John", event: "orientation" } },
};
// hallListOrg[0].bookings = {
//   ...hallListOrg[0].bookings,
//   "2023-02-26": { "14:00-15:30": { user: "John", event: "orientation" } },
// };
hallListOrg[0].bookings = {
  ...hallListOrg[0].bookings,
  "2023-02-28": { "10:30-11:00": { user: "John", event: "orientation" } },
};
hallListOrg[1].bookings = {
  ...hallListOrg[0].bookings,
  "2023-02-26": { "10:30-12:00": { user: "John", event: "orientation" } },
};

//when the user supposedly submits the book hall request and the request is still pending
//testing purpose
//this way of changing value does not work
//this changes the value of all the halls event if only index 0 is referenced
// hallList[0].bookings['2023-02-24']['10:30-12:00']= {user:'John',event:"orientation"}
// hallList[0].bookings['2023-02-24']['14:00-15:30']= {user:'Mike',event:"initiation"}
// hallList[0].bookings['2023-02-25']['14:00-15:30']= {user:'Mike',event:"initiation"}

export default function Home() {
  /*const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/halls_api/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:,", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if(loading) return "loading..."
  if(error) return "error..."

  console.log(data)*/

  return (
    <div className="mx-auto mt-10 flex min-h-screen max-w-4xl flex-col gap-12 p-2 md:w-2/3 md:gap-8">
      {hallListOrg.map((hall) => (
        <HallCard
          key={hall.id}
          id={hall.id}
          name={hall.name}
          capacity={hall.capacity}
          slides={hall.slides}
          bookings={hall.bookings}
        />
      ))}
    </div>
  );
}
