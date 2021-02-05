import React, { useEffect, useState } from "react";
import Result from "./Result";
import Axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

function Main({ url, user }) {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [data, setData] = useState();
  const [now, setNow] = useState();

  const format = "YYYY-MM-DD";

  const submitDate = () => {
    Axios.post(`${url}/post`, {
      title,
      date,
      username: user,
    }).then((res) => {
      setData([...data, { _id: res.data._id, title, date }]);
    });
  };

  const deleteDate = (id, title) => {
    let result = window.confirm(`${title} 이벤트를 삭제하시겠습니까?`);

    if (result) {
      Axios.delete(`${url}/delete/${id}`);
      setData(data.filter((val) => val._id !== id));
    }
  };

  useEffect(() => {
    Axios.get(`${url}/post/${user}`).then((res) => {
      setData(res.data);
    });
    setNow(moment().format(format));
  }, [user]);
  return (
    <div className="flex flex-col items-center  h-screen">
      <h3 className="m-2 mt-5 text-lg">이벤트의 시작일을 입력해주세요</h3>
      <input
        type="text"
        className="border-2 border-gray-400 rounded-sm p-1 m-2"
        placeholder="이벤트 이름"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        className="border-2 border-gray-400 rounded-sm p-1 m-2"
        onChange={(e) => setDate(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-1 m-2"
        onClick={submitDate}
      >
        저장
      </button>
      {data
        ? data.map((elem) => {
            return (
              <div className="flex items-center border-2 border-gray-600 my-1 w-10/12">
                <div className="w-1/2 flex justify-center items-center">
                  <Link
                    to={`/posts?title=${elem.title}&date=${elem.date}&id=${elem._id}`}
                  >
                    <div className="flex flex-row justify-center items-center">
                      <h3 className="mx-2 text-purple-600">{elem.title}</h3>
                      <h3 className="mx-2 text-blue-500">
                        D-
                        {moment.duration(moment(elem.date).diff(now)).asDays() *
                          -1 +
                          1}
                      </h3>
                    </div>
                  </Link>
                </div>

                <div className="flex flex-row justify-center items-center w-1/2">
                  <button className="bg-blue-600 text-white px-4 py-1 m-2 text-sm">
                    수정
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-1 m-2 text-sm"
                    onClick={() => {
                      deleteDate(elem._id, elem.title);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Main;
