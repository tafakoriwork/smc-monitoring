import TreeMenu from "../tools/TreeMenu";
import { useDispatch, useSelector } from "react-redux";
import { currentPanel } from "../redux/routingSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function BrowserMenu(props) {
  const current = useSelector(currentPanel);
  const [selectorType, setselectorType] = useState("Physical");
  /* physical */
  const physicaldata = [
    {
      method: "setPanel",
    },
    {
      id: "CLUSTER1",
      children: [
        {
          method: "setMonitoringPanelTab",
        },
        { id: "node1" },
        { id: "node2" },
      ],
    },
  ];
  /* logical */
  const logicaldata = [
    {
      method: "setPanel",
    },
    {
      id: "CLUSTER",
      children: [
        {
          method: "setMonitoringPanelTab",
        },
        { id: "CPU" },
        { id: "RAM" },
      ],
    },
    {
      id: "Management",
      children: [
        {
          method: "setManagementPanelTab",
        },
        { id: "Setting" },
        { id: "Setting2" },
      ],
    },
  ];
  return (
    <div className="h-100">
      <select value={selectorType} className="form-select" onChange={e => setselectorType(e.target.value)}>
        <option value="Physical">Physical</option>
        <option value="Logical">Logical</option>
      </select>
      {selectorType === "Physical"
      ? <TreeMenu
        data={physicaldata}
        current={current}
      />
      : <TreeMenu
        data={logicaldata}
        current={current}
      />
       }
      <div className="collapsing" onClick={ () => props.toggle_browser() }>
      <FontAwesomeIcon icon={ props.width < 25 ? faChevronCircleRight : faChevronCircleLeft } color={'#aaa'} />
      </div>
    </div>
  );
}

export default BrowserMenu;
