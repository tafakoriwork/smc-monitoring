import { faFileAlt, faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import * as Rslice from "../redux/routingSlice";
function TreeMenu(props) {
  const menuItems = useRef([]);
  const dispatch = useDispatch();
  const dispatcher = (func, id) => func && dispatch(Rslice[func](id));
  function childRender(children) {
    if (children && children.length > 0)
      return (
        <ul>
          {children.map(function (child, j) {
            if (j > 0)
              return (
                <li
                  key={j}
                  onClick={() => dispatcher(children[0].method, child.id) }
                >
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    size="xs"
                    style={{ marginRight: "5px" }}
                  />
                  {child.id}
                  {childRender(child.children)}
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
                ref={menuItems[el.id]}
                onClick={(e) =>
                  e.target === e.currentTarget &&
                  dispatcher(props.data[0].method, el.id)
                }
                className={props.current === el.id ? "active-li" : ""}
              >
                <FontAwesomeIcon
                  icon={faFolderClosed}
                  size="xs"
                  style={{ marginRight: "5px" }}
                />
                {el.id}
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
