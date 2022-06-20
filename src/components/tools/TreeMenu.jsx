import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setInformation, setspeedInformation } from "../redux/cpuStates";
import * as Rslice from "../redux/routingSlice";
function TreeMenu(props) {
  const menuItems = useRef([]);

  const opens_in_menu = localStorage.getItem("opens_in_menu");
  const [opens, setOpens] = useState(opens_in_menu?.split(",") ?? []);
  const dispatch = useDispatch();
  const dispatcher = (func, id) => func && dispatch(Rslice[func](id));
  const is_open = (id) => opens.includes(id);
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
  function childRender(children, parentMethod, parentIp) {
    if (children && children.length > 0)
      return (
        <ul>
          {children.map(function (child, j) {
            if (j > 0)
              return (
                <li
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      dispatcher(
                        children[0].method,
                        child.ip ? child.ip : child.title
                      );

                      toggling(child.id);
                      child.children &&
                      dispatcher(children[1].children[0].method, null);
                      if (parentIp) {
                        dispatcher(parentMethod, parentIp);
                        dispatch(setInformation([]));
                        dispatch(setspeedInformation([]));
                      }
                    }
                  }}
                  className={is_open(child.id) ? "active-li" : ""}
                  key={j}
                >
                  {child.children && (
                    <FontAwesomeIcon
                      onClick={(e) => {
                        if (e.target === e.currentTarget) {
                          dispatcher(
                            children[0].method,
                            child.ip ? child.ip : child.title
                          );
                          toggling(child.id);
                          if (parentIp) {
                            dispatcher(parentMethod, parentIp);
                            dispatch(setInformation([]));
                            dispatch(setspeedInformation([]));
                          }
                        }
                      }}
                      icon={is_open(child.id) ? faMinus : faPlus}
                      size="xs"
                      style={{ marginRight: "5px", padding: "2px" }}
                    />
                  )}
                  {child.title}
                  {child.ip
                    ? childRender(child.children, children[0].method, child.ip)
                    : childRender(child.children, null, null)}
                </li>
              );
            else return null;
          })}
        </ul>
      );
  }

  return (
    <>
      <ul className="active-ul">
        {props.data.map(function (el, i) {
          if (i > 0)
            return (
              <li
                key={i}
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    dispatcher(props.data[0].method, el.id);
                    toggling(el.id);
                  }
                }}
                ref={menuItems[el.id]}
                className={is_open(el.id) ? "active-li" : ""}
              >
                <FontAwesomeIcon
                  icon={is_open(el.id) ? faMinus : faPlus}
                  size="xs"
                  style={{ marginRight: "5px", padding: "2px" }}
                />
                {el.title}
                {childRender(el.children)}
              </li>
            );
          else return null;
        })}
      </ul>
    </>
  );
}

export default TreeMenu;
