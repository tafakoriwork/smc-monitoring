import TreeMenu from "../tools/TreeMenu";
import { useDispatch, useSelector } from "react-redux";
import { currentPanel } from "../redux/routingSlice";

function BrowserMenu() {
  const dispatch = useDispatch();
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
    <>
      <TreeMenu
        data={data}
        current={current}
      />
    </>
  );
}

export default BrowserMenu;
