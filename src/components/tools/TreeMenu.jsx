import { createRef, useEffect, useRef } from "react";

function TreeMenu(props) {
    const menuItems = useRef([]);
  function childRender(children) {
    if (children && children.length > 0)
      return (
        <ul>
          {children.map((child, j) => (
            <li key={j}>
              {child.id}
              {childRender(child.children)}
            </li>
          ))}
        </ul>
      );
  }

  useEffect(() => {
    console.log(menuItems);
  }, [])

  const Toggle = (e) => {
    const el = e.target;
    el.classList.contains('active-li')
    ? el.classList.remove('active-li')
    : el.classList.add('active-li');
  }

  return (
    <>
      <ul className="active-ul">
        {props.data.map((el, i) => {
          return (
            <li key={i} ref={menuItems[el.id]} onClick={Toggle}>
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
