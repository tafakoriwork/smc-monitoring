import { faWindowMinimize } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import Maximize from "../tools/Maximize";
import Tasks from "./tasks";
import Events from "./events";
function FooterUI(props) {
  const footer = useRef(null);
  const [currentTab, setCurrentTab] = useState('tasks');
  return (
    <div className="footerComp" ref={footer}>
        <nav>
          <div className="tabs">
            <a href="#tasks" onClick={() => setCurrentTab('tasks')} style={ currentTab === 'tasks' ? { borderBottom: '2px solid darkblue'} : {} }>Tasks</a>
            <a href="#events" onClick={() => setCurrentTab('events')} style={ currentTab === 'events' ? { borderBottom: '2px solid darkblue'} : {} }>Events</a>
          </div>
          <div className="controls">
            <span>
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                onClick={() => props.minimize()}
                size="xs"
                icon={faWindowMinimize}
              />
            </span>
            <span>
              <Maximize el={footer} />
            </span>
          </div>
        </nav>
        <div style={{ paddingTop: "35px" }}>
          {
              currentTab === 'tasks'
              ? <Tasks />
              : <Events />  
          }
        </div>
    </div>
  );
}

export default FooterUI;
