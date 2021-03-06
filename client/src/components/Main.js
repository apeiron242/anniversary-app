import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

function Main({ url, user, isLogin }) {
  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [data, setData] = useState([]);
  const [now, setNow] = useState();

  const format = "YYYY-MM-DD";

  const submitDate = () => {
    if (!isLogin) {
      alert("로그인 상태일 때만 저장됩니다");
      if (data) {
        setData([...data, { title, date }]);
      } else {
        setData({ title, date });
      }
    } else {
      Axios.post(`${url}/post`, {
        title,
        date,
        username: user,
      }).then((res) => {
        if (data) {
          setData([...data, { _id: res.data._id, title, date }]);
        } else {
          setData({ _id: res.data._id, title, date });
        }
      });
    }
  };

  const deleteDate = (id, title) => {
    let result = window.confirm(`${title} 이벤트를 삭제하시겠습니까?`);

    if (result) {
      if (!isLogin) {
        setData(data.filter((val) => val._id !== id));
      } else {
        Axios.delete(`${url}/delete/${id}`);
        setData(data.filter((val) => val._id !== id));
      }
    }
  };

  useEffect(() => {
    Axios.get(`${url}/post/${user}`).then((res) => {
      setData(res.data);
    });
    setNow(moment().format(format));
  }, [user]);
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      <h3 className="m-2 mt-5 text-lg text-gray-700">D-day 입력</h3>
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
        placeholder={moment().format(format)}
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
              <div
                className="flex items-center border-2 border-green-400 rounded-lg my-2 w-10/12 sm:w-6/12 bg-green-400"
                key={elem._id}
              >
                <div className="w-2/3 flex justify-center items-center">
                  <Link
                    to={`/posts?title=${elem.title}&date=${elem.date}&id=${elem._id}`}
                  >
                    <div className="flex flex-row justify-center items-center">
                      <h3 className="mx-2 text-purple-800 text-lg">
                        {elem.title}
                      </h3>
                      <h3 className="mx-2 text-blue-600 text-lg">
                        D-
                        {moment.duration(moment(elem.date).diff(now)).asDays() *
                          -1 +
                          1}
                      </h3>
                    </div>
                  </Link>
                </div>
                <div className="flex flex-row justify-center items-center w-1/3">
                  {/* <button className="bg-blue-600 text-white px-4 py-1 m-2 text-sm">
                    수정
                  </button> */}
                  <button
                    className="bg-red-400 text-white px-4 py-1 m-2 text-sm"
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
