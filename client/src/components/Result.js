import React, { useEffect, useState } from "react";

function Result({ title, date }) {
  const [now, setNow] = useState();
  // let year, month, day;
  // useEffect(() => {
  //   if (date) {
  //     year = date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3);
  //     month = date.charAt(5) + date.charAt(6);
  //     day = date.charAt(8) + date.charAt(9);
  //     setNow(Date(`${year}/${month}/${day}`));
  //     console.log(now);
  //   }
  // }, [date]);

  return (
    <div>
      <h3>{title}</h3>
      <h3>{date}</h3>
    </div>
  );
}

export default Result;
