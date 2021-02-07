import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Header({ isLogin, user, url }) {
  const logout = () => {
    let result = window.confirm("로그아웃 하시겠습니까?");

    if (result) {
      Axios.post(`${url}/logout`);
      window.location.href = "/";
    }
  };
  return (
    <div className="border-b-2 pt-1">
      <Link to="/">
        <h1 className="text-center p-1 text-2xl text-blue-700">
          기념일 계산기
        </h1>
      </Link>
      {isLogin ? (
        <>
          <p
            className="text-right mr-3 mb-3 text-lg text-blue-500"
            onClick={logout}
          >
            {isLogin ? user : "Login"}
          </p>
        </>
      ) : (
        <Link to="/login">
          <p className="text-right mr-3 mb-3 text-lg text-blue-500">
            {isLogin ? user : "Login"}
          </p>
        </Link>
      )}
    </div>
  );
}

export default Header;
