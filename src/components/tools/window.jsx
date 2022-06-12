import {
  faChevronDown,
  faChevronUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Maximize from "./Maximize";

function Window(props) {
  const el = useRef(null);
  const { body_ui, title } = props;
  const [minimize, setMinimize] = useState(false);
  const [closed, setClosed] = useState(false);
  const set_minimize = () => {
    setMinimize(!minimize);
    el.current.classList.remove("maximize");
  };
  return (
    <>
      {!closed && (
        <div className="col-md-4 p-2 smoothmove" ref={el}>
          <div
            className={
              minimize ? "card card-default" : "card card-default h-100"
            }
          >
            <div
              className="card-header d-flex w-100 justify-content-between mx-0"
              dir="auto"
            >
              <span>{title}</span>
              <div>
                <FontAwesomeIcon
                  icon={minimize ? faChevronDown : faChevronUp}
                  size={"xs"}
                  onClick={() => set_minimize()}
                  className="mx-2 c-pointer"
                />
                <Maximize el={el} />
                <FontAwesomeIcon
                  onClick={() => setClosed(!closed)}
                  icon={faTimes}
                  size={"xs"}
                  className="mx-2 c-pointer"
                />
              </div>
            </div>
            {!minimize && <div className="card-body">{body_ui}</div>}
          </div>
        </div>
      )}
    </>
  );
}

export default Window;
