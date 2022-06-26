import axios from "axios";
import {
  faUser,
  faLock,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import global from "../config/global";
function Login() {
    const [User, setUser] = useState({
        username: null,
        password: null,
      });

      const setUsername = username => localStorage.setItem('username', username);
      const setToken = token => {
        localStorage.setItem('token', token);
        global.token = token;
        window.location.reload();
      }

      const loginRequest = user => {
       /* axios.post("")
        .then(result => result.data)
        .then(data => {
            if(data)
            setToken("data.tokendata.tokendata.token")
            
        })*/
        setToken("data.tokendata.tokendata.token")
        setUsername(user.username)
      }
  return (
    <div className="container w-100 loginbody no-max">
      <div className="screen">
        <div className="screen__content">
          <div className="login">
            <div className="login__field">
              <FontAwesomeIcon className="login__icon" icon={faUser} />
              <input
                type="text"
                className="login__input"
                placeholder="Username"
                onChange={(e) => {
                    setUser((prevState) => ({
                      ...prevState,
                      username: e.target.value,
                    }));
                  }}
              />
            </div>
            <div className="login__field">
              <FontAwesomeIcon className="login__icon" icon={faLock} />
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                onChange={(e) => {
                    setUser((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }));
                  }}
              />
            </div>
            <button className="button login__submit" onClick={() => loginRequest(User)}>
              <span className="button__text">Log In Now</span>
              <FontAwesomeIcon className="button__icon" icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
