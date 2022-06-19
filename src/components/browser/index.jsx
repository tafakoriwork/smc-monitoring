import TreeMenu from "../tools/TreeMenu";
import { useDispatch, useSelector } from "react-redux";
import { currentPanel } from "../redux/routingSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

function BrowserMenu(props) {
  const current = useSelector(currentPanel);
  const data = [
    {
      method: "setPanel",
    },
    {
      id: "Monitoring",
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
      <TreeMenu
        data={data}
        current={current}
      />
      <div className="collapsing" onClick={ () => props.toggle_browser() }>
      <FontAwesomeIcon icon={ props.width < 25 ? faChevronCircleRight : faChevronCircleLeft } color={'#aaa'} />
      </div>
    </div>
  );
}

export default BrowserMenu;
