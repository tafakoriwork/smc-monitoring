import { faFileAlt, faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

function TreeMenu(props) {
  const menuItems = useRef([]);
  function childRender(children) {
    if (children && children.length > 0)
      return (
        <ul>
          {children.map((child, j) => (
            <li key={j} onClick={() => props.selectorTab(child.id)}>
              <FontAwesomeIcon
                icon={faFileAlt}
                size="xs"
                style={{ marginRight: "5px" }}
              />
              {child.id}
              {childRender(child.children)}
            </li>
          ))}
        </ul>
      );
  }

  return (
    <>
      <ul className="active-ul">
        {props.data.map((el, i) => {
          return (
            <li
              key={i}
              ref={menuItems[el.id]}
              onClick={e => e.target === e.currentTarget && props.selector(el.id)}
              className={ props.current === el.id ? "active-li" : "" }
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
        })}
      </ul>
    </>
  );
}

export default TreeMenu;
