import React from "react";
const {
  parse,
  differenceInMilliseconds,
  compareAsc,
  format,
} = require("date-fns");

function sortIntervals(intervals) {
  const intervalTimes = intervals.map((interval) => {
    const [start, end] = interval.split("-");
    return {
      start: parse(start, "H:mm", new Date()),
      end: parse(end, "H:mm", new Date()),
    };
  });

  intervalTimes.sort((a, b) => compareAsc(a.start, b.start));

  const intervalStrings = intervalTimes.map(({ start, end }) => {
    return `${format(start, "H:mm")}-${format(end, "H:mm")}`;
  });

  return intervalStrings;
}

function getDuration(bookedIntervals, unbookedIntervals, intervals) {
  

  
  const intervalTimes = intervals.map((interval) => {
    const [start, end] = interval.split("-");
    return {
      start: parse(start, "H:mm", new Date()),
      end: parse(end, "H:mm", new Date()),
    };
  });
  const durations = [];
  intervalTimes.forEach((item) => {
    const { start, end } = item;
    const duration = differenceInMilliseconds(end, start);
    durations.push(duration);
  });
  return durations;
}

function getWidth(durations) {
  const totalDuration = Number(43200000);
  const widthArr = durations.map((item) => {
    const width = Number(Math.round((item / totalDuration) * 100));
    return width;
  });
  return widthArr;
}

function VisualBar({ bookedIntervals, unbookedIntervals }) {
  let sortedIntervals = sortIntervals(
    bookedIntervals.concat(unbookedIntervals)
  );
  let durations = getDuration(
    bookedIntervals,
    unbookedIntervals,
    sortedIntervals
  );

  let widthArr = getWidth(durations);

  let bookedIndex = [];

  bookedIntervals.forEach((itemToSearch) => {
    let index = sortedIntervals.findIndex(
      (element) => element === itemToSearch
    );
    bookedIndex.push(index);
  });

  

  const divs = widthArr.map((item, index) => {
    let isBooked = bookedIndex.sort().includes(index)
    let backClass = isBooked?"bg-red-500":"bg-green-600"
    return (
      <div
        key={index}
        className={`w-${item} m-2 h-4 flex-grow rounded-lg `+backClass}
        style={{ flexBasis: `${item}%` }}
      ></div>
    );
  });

  return <div className="flex">{divs}</div>;
}

export default VisualBar;
