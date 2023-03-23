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
      start: parse(start, "HH:mm", new Date()),
      end: parse(end, "HH:mm", new Date()),
    };
  });

  intervalTimes.sort((a, b) => compareAsc(a.start, b.start));

  const intervalStrings = intervalTimes.map(({ start, end }) => {
    return `${format(start, "HH:mm")}-${format(end, "HH:mm")}`;
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

function VisualBar({
  bookedIntervals,
  unbookedIntervals,
  bookedIntervalsData,
}) {
  // console.log("🚀 ~ file: VisualBar.js:57 ~ VisualBar ~ bookedIntervals:", bookedIntervals)
  // console.log(
  //   "🚀 ~ file: VisualBar.js:57 ~ VisualBar ~ bookedIntervalsData :",
  //   bookedIntervalsData
  // );
  // console.log("🚀 ~ file: VisualBar.js:57 ~ VisualBar ~ bookedIntervals, unbookedIntervals:", bookedIntervals, unbookedIntervals)

  let sortedIntervals = sortIntervals(
    bookedIntervals.concat(unbookedIntervals)
  );
  // console.log("🚀 ~ file: VisualBar.js:62 ~ VisualBar ~ sortedIntervals:", sortedIntervals)
  let durations = getDuration(
    bookedIntervals,
    unbookedIntervals,
    sortedIntervals
  );
  // console.log("🚀 ~ file: VisualBar.js:68 ~ VisualBar ~ durations:", durations)

  let widthArr = getWidth(durations);
  // console.log("🚀 ~ file: VisualBar.js:71 ~ VisualBar ~ widthArr:", widthArr)

  let bookedIndex = [];

  //   let index = sortedIntervals.findIndex(
  // bookedIntervals.forEach((itemToSearch) => {
  //     (element) => element === itemToSearch
  //   );

  //   bookedIndex.push(index);
  // });
  // console.log("🚀 ~ file: VisualBar.js:74 ~ VisualBar ~ bookedIndex:", bookedIndex)

  bookedIntervals.forEach((itemToSearch) => {
    let index = sortedIntervals.findIndex(
      (element) => element === itemToSearch
    );
    const matchingObj = bookedIntervalsData.find(
      (obj) => obj.interval === itemToSearch
    );
    // console.log("🚀 ~ file: VisualBar.js:92 ~ bookedIntervals.forEach ~ matchingObj:", matchingObj)
    const tempObj = {
      [index]: matchingObj.isVerified,
      interval: matchingObj.interval,
    };

    // console.log("🚀 ~ file: VisualBar.js:95 ~ bookedIntervals.forEach ~ tempObj:", tempObj)
    bookedIndex.push(tempObj);
  });
  console.log(
    "🚀 ~ file: VisualBar.js:97 ~ bookedIntervals.forEach ~ bookedIndex:",
    bookedIndex
  );

  let i = -1;
  const divs = widthArr.map((item, index) => {
    //find if the index is present in the keys of the bookedIndex array's object
    const sortedKeys = bookedIndex.map((obj) => Object.keys(obj)[0]).sort();
    // console.log("🚀 ~ file: VisualBar.js:105 ~ divs ~ sortedKeys:", sortedKeys)
    let isBooked = sortedKeys.includes(String(index));
    // console.log("🚀 ~ file: VisualBar.js:106 ~ divs ~ index:", index)

    // console.log("🚀 ~ file: VisualBar.js:106 ~ divs ~ isBooked:", isBooked)

    let tempIsVerified;
    let tempStartHour;
    let tempEndHour;
    if (isBooked) {
      i += 1;
      const tempVerifyObj = bookedIndex[i];
      console.log(
        "🚀 ~ file: VisualBar.js:113 ~ divs ~ tempVerifyObj:",
        tempVerifyObj
      );

      if (tempVerifyObj) {
        [tempStartHour, tempEndHour] = tempVerifyObj.interval
          .split("-")
          .map((timeStr) => {
            const [hours, minutes] = timeStr.split(":").map(Number);
            return format(new Date(0, 0, 0, hours, minutes), "H");
          });
        console.log(
          "🚀 ~ file: VisualBar.js:126 ~ [tempStartHour,tempEndHour]=tempVerifyObj.interval.split ~ tempStartHour, tempEndHour:",
          tempStartHour,
          tempEndHour
        );

        const tempVerifyKey = Object.keys(tempVerifyObj)[0];
        const tempVerifyValue = tempVerifyObj[tempVerifyKey];
        console.log(
          "🚀 ~ file: VisualBar.js:122 ~ divs ~ tempVerifyValue:",
          tempVerifyValue
        );
        tempIsVerified = tempVerifyValue;
      }
    }

    // let isBooked = bookedIndex.
    let backClass = isBooked
      ? tempIsVerified
        ? "bg-red-500"
        : "bg-yellow-500"
      : "bg-green-500";
    return (
      // <div className="flex items-center">
      //   <span className="mr-2">{tempStartHour}</span>
      //   <div
      //     key={index}
      //     className={`w-${item} m-2 h-4 flex-grow rounded-lg ` + backClass}
      //     style={{ flexBasis: `${item}%` }}
      //   ></div>
      //   <span className="ml-2">{tempEndHour}</span>
      // </div>

      <div
        key={index}
        className={`w-${item} m-2 h-4 flex-grow rounded-lg ` + backClass}
        style={{ flexBasis: `${item}%` }}
      ></div>
    );
  });

  return <div className="flex">{divs}</div>;
}

export default VisualBar;
