import React, { useEffect, useState } from "react";
import queryString from "query-string";
import moment from "moment";

function Posts({}) {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [now, setNow] = useState();
  const calcDate = moment(date);
  const format = "YYYY-MM-DD";
  const cssForContent =
    "m-2 p-1 border-2 border-gray-300 rounded-lg w-5/6 h-11 text-center text-blue-800 bg-green-400 text-lg";

  useEffect(() => {
    const { title, date, id } = queryString.parse(window.location.search);

    setTitle(title);
    setDate(date);
    setNow(moment().format(format));
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-center items-center m-2 mt-4">
        <h3 className="text-2xl mx-5 text-purple-600">{title}</h3>
        <h3 className="text-xl text-blue-500 mx-4">
          D-{moment.duration(calcDate.clone().diff(now)).asDays() * -1 + 1}
        </h3>
      </div>
      <h3 className="m-2 p-1 text-lg">시작일: {date}</h3>
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
