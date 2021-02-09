import React, { useEffect, useState, useRef } from "react";
import queryString from "query-string";
import moment from "moment";

function Posts({}) {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [now, setNow] = useState();
  const [dDay, setDDay] = useState();
  const [ddayCalc, setDdayCalc] = useState("D-day 계산");
  const dDayInput = useRef(null);
  const dDayOutput = useRef(null);

  const calcDate = moment(date);
  const format = "YYYY-MM-DD";
  const cssForContent =
    "m-2 p-1 border-2 border-gray-300 rounded-lg w-5/6 h-11 text-center text-blue-600 bg-green-400 text-lg sm:w-6/12";

  const calcDDay = () => {
    if (dDayInput.current.className === "hidden") {
      dDayInput.current.className = "block";
      setDdayCalc("접기");
    } else if (dDayInput.current.className === "block") {
      dDayInput.current.className = "hidden";
      dDayOutput.current.className = "hidden";
      setDdayCalc("D-day 계산");
    }
  };

  useEffect(() => {
    const { title, date, id } = queryString.parse(window.location.search);

    setTitle(title);
    setDate(date);
    setNow(moment().format(format));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100">
      <div className="flex flex-col justify-center items-center w-5/6 sm:w-6/12 bg-red-50 m-2 ">
        <div className="flex flex-row justify-center items-center m-2">
          <h3 className="text-2xl mx-5 text-purple-600">{title}</h3>
          <h3 className="text-xl text-blue-500 mx-4">
            D-{moment.duration(calcDate.clone().diff(now)).asDays() * -1 + 1}
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center m-2 mt-0">
          <h3 className="m-1 text-lg text-pink-600">From: {date}</h3>
          <h3 className="m-1 text-lg text-blue-700">Today: {now}</h3>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-5/6 sm:w-6/12 m-2">
        <div className="flex flex-row justify-center items-center">
          <button
            onClick={calcDDay}
            className="mx-2 bg-blue-600 text-gray-100 px-3 py-1"
          >
            {ddayCalc}
          </button>
          <div className="hidden" ref={dDayInput}>
            <input
              type="date"
              onChange={(e) => {
                setDDay(e.target.value);
                dDayOutput.current.className = "block";
              }}
              className="mx-2 border-2 border-gray-300 p-1"
            />
          </div>
        </div>
        <div className="hidden" ref={dDayOutput}>
          <h3 className="m-3 bg-purple-400 text-white p-2 mb-0">
            D-{moment.duration(calcDate.clone().diff(dDay)).asDays() * -1 + 1}{" "}
            for {dDay}
          </h3>
        </div>
      </div>
      <h3 className={cssForContent}>
        100일:{" "}
        {calcDate
          .clone()
          .add(100 - 1, "days")
          .format(format)}
      </h3>
      <h3 className={cssForContent}>
        200일:{" "}
        {calcDate
          .clone()
          .add(200 - 1, "days")
          .format(format)}
      </h3>
      <h3 className={cssForContent}>
        300일:{" "}
        {calcDate
          .clone()
          .add(300 - 1, "days")
          .format(format)}
      </h3>
      <h3 className={cssForContent}>
        1주년: {calcDate.clone().add(1, "years").format(format)}
      </h3>
      <h3 className={cssForContent}>
        400일:{" "}
        {calcDate
          .clone()
          .add(400 - 1, "days")
          .format(format)}
      </h3>
      <h3 className={cssForContent}>
        500일:{" "}
        {calcDate
          .clone()
          .add(500 - 1, "days")
          .format(format)}
      </h3>
      <h3 className={cssForContent}>
        600일:{" "}
        {calcDate
          .clone()
          .add(600 - 1, "days")
          .format(format)}
      </h3>

      <h3 className={cssForContent}>
        700일:{" "}
        {calcDate
          .clone()
          .add(700 - 1, "days")
          .format(format)}
      </h3>
      <h3 className={cssForContent}>
        2주년: {calcDate.clone().add(2, "years").format(format)}
      </h3>
      <h3 className={cssForContent}>
        800일:{" "}
        {calcDate
          .clone()
          .add(800 - 1, "days")
          .format(format)}
      </h3>
      <h3 className={cssForContent}>
        900일:{" "}
        {calcDate
          .clone()
          .add(900 - 1, "days")
          .format(format)}
      </h3>
      <h3 className={cssForContent}>
        1000일:{" "}
        {calcDate
          .clone()
          .add(1000 - 1, "days")
          .format(format)}
      </h3>
      <h3 className={cssForContent}>
        3주년: {calcDate.clone().add(3, "years").format(format)}
      </h3>
    </div>
  );
}

export default Posts;
