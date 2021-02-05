import React, { useState, useRef } from "react";
import Header from "./Header";
import Axios from "axios";

function Login({ url, setIsLogin, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const register = () => {
    if (!newUsername || !newPassword) {
      alert("아이디와 비밀번호를 모두 입력해주세요");
    } else {
      Axios.post(`${url}/register`, {
        newUsername,
        newPassword,
      });
      alert("회원가입이 완료되었습니다! 로그인해주세요");
      usernameInput.current.value = "";
      passwordInput.current.value = "";
    }
  };

  const login = () => {
    Axios.post(`${url}/login`, {
      username,
      password,
    }).then((res) => {
      if (res.data === "비밀번호가 맞지 않습니다") {
        alert(res.data);
        setIsLogin(false);
      } else if (res.data === "아이디가 맞지 않습니다") {
        alert(res.data);
        setIsLogin(false);
      } else if (res.data === "아이디가 맞지 않습니다") {
        alert(res.data);
        setIsLogin(false);
      } else {
        setIsLogin(true);
        setUser(res.data[0].username);
        window.location.href = "/";
      }
    });
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="m-2">Login</h3>
        <input
          type="text"
          className="border-2 border-gray-400 m-2"
          placeholder="아이디를 입력하세요"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="border-2 border-gray-400 m-2"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 m-2"
          onClick={login}
        >
          Login
        </button>
        <h3 className="m-2">회원가입</h3>
        <input
          type="text"
          className="border-2 border-gray-400 m-2"
          placeholder="아이디를 입력하세요"
          onChange={(e) => setNewUsername(e.target.value)}
          ref={usernameInput}
        />
        <input
          type="password"
          className="border-2 border-gray-400 m-2"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setNewPassword(e.target.value)}
          ref={passwordInput}
        />
        <button
          className="bg-red-600 text-white px-4 py-1 m-2"
          onClick={register}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Login;
