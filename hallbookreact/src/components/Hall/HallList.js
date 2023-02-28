const hallListOrg = [
  {
    id: "1",
    name: "Library Hall",
    capacity: "150",
    slides: [
      {
        url: "https://plus.unsplash.com/premium_photo-1664302662512-ffed9b5db747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGhhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        title: "libraryHallImg1",
      },
      {
        url: "https://images.unsplash.com/photo-1527698334848-f475f9d99449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80",
        title: "libraryHallImg2",
      },
      {
        url: "https://images.unsplash.com/photo-1566596343373-30675086c273?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aGFsbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        title: "libraryHallImg3",
      },
    ],
  },
  {
    id: "2",
    name: "A Hall",
    capacity: "70",
    photo:
      "https://plus.unsplash.com/premium_photo-1664302662512-ffed9b5db747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGhhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "3",
    name: "B Hall",
    capacity: "70",
    photo:
      "https://plus.unsplash.com/premium_photo-1664302662512-ffed9b5db747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGhhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "4",
    name: "C Hall",
    capacity: "70",
    photo:
      "https://plus.unsplash.com/premium_photo-1664302662512-ffed9b5db747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGhhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
];

function addBookings(hallList) {
  const bookings = {};
  const today = new Date();
  for (let i = 0; i <= 10; i++) {
    const date = new Date(today.getTime() + i * 24 * 3600 * 1000);
    bookings[date.toISOString().slice(0, 10)] = {};
  }
  for (const hall of hallList) {
    hall.bookings = bookings;
  }
}

addBookings(hallListOrg);

export default hallListOrg;
