import { useState } from "react";
import { useDispatch } from "react-redux";
import { password } from "../config/global";
import { setEvent } from "../redux/usersSlice";

function CreateUser() {
  const dispatch = useDispatch();
  const set_event = (msg) => dispatch(setEvent(msg));
  const [User, setUser] = useState({
    username: null,
    password: null,
    is_admin: false,
  });
  return (
    <div className="form-group text-start">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">username</label>
        <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Username"
          onChange={(e) => {
            setUser((prevState) => ({
              ...prevState,
              username: e.target.value,
            }));
          }}
        />
        <small id="emailHelp" className="form-text text-muted">
          don't start with numbers and special characters;
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => {
            setUser((prevState) => ({
              ...prevState,
              password: e.target.value,
            }));
          }}
        />
      </div>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          onChange={(e) => {
            setUser((prevState) => ({
              ...prevState,
              is_admin: e.target.checked,
            }));
          }}
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          is an admin?
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-primary float-end"
        onClick={() => set_event(User)}
      >
        create
      </button>
    </div>
  );
}

export default CreateUser;
