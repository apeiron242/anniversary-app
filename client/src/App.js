import "./assets/main.css";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Login from "./components/Login";
import Posts from "./components/Posts";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [url, seturl] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get(`${url}/login`).then((res) => {
      if (res.data !== "no") {
        setIsLogin(true);
        setUser(res.data.user[0].username);
      }
    });
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <>
                <Header isLogin={isLogin} user={user} url={url} />
                <Main url={url} user={user} />
              </>
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <>
                <Header isLogin={isLogin} user={user} />
                <Login url={url} setIsLogin={setIsLogin} setUser={setUser} />
              </>
            )}
          />
          <Route
            exact
            path="/posts"
            render={(props) => (
              <>
                <Header isLogin={isLogin} user={user} />
                <Posts />
              </>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
