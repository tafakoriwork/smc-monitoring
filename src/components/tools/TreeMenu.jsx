import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Rslice from "../redux/routingSlice";
function TreeMenu(props) {
  const dispatch = useDispatch();
  const dispatcher = (func, args) => func && dispatch(Rslice[func](args));
  const opens_in_menu = localStorage.getItem("opens_in_menu");
  const [opens, setOpens] = useState(opens_in_menu?.split(",") ?? []);
  const is_open = (id) => opens.includes(id);
  function openIt(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add("active-li");
      el.parentNode.parentNode.classList.add("active-li");
    }
  }
  const is_active = useSelector(Rslice.selectedBrowser);
  const toggling = (id) => {
    if (!is_open(id)) {
      setOpens([...opens, id]);
    } else {
      const editedArray = opens.filter(function (val) {
        return val !== id;
      });
      setOpens(editedArray);
    }
  };

  useEffect(() => {
    localStorage.setItem("opens_in_menu", opens);
  }, [opens]);

  const { data, setSelected } = props;
  return (
    <>
      {data.map((el, i) => {
        return (
          <ul key={i} className={el.root ? "active-ul" : null}>
            <li id={el.id} className={is_open(el.id) ? "active-li" : null}>
              <span
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    el.method && dispatcher(el.method, el.args);
                    toggling(el.id);
                    setSelected(el);
                  }
                }}
                style={
                  is_active?.id === el.id ? { backgroundColor: "#eee" } : {}
                }
              >
                {is_active?.id === el.id ? openIt(el.id) : null}
                {el.title}
              </span>
              {el.children && (
                <TreeMenu data={el.children} setSelected={setSelected} />
              )}
            </li>
          </ul>
        );
      })}
    </>
  );
}

export default TreeMenu;
