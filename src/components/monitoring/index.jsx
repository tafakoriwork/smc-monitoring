import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPanelTab, setPanelTab } from "../redux/routingSlice";
import CPU from "./CPU";
import RAM from "./RAM";

function Monitoring() {
  const currentTab = useSelector(currentPanelTab);
  const dispatch = useDispatch();
  const isCurrent = (tab) => currentTab === tab;
  return (
    <div>
      <div className="row tabbar" style={{ height: "36px" }}>
        <div
          className={isCurrent("CPU") ? "col-1 tab activeTab" : "col-1 tab"}
          onClick={() => dispatch(setPanelTab("CPU"))}
        >
          cpu
        </div>
        <div
          className={isCurrent("RAM") ? "col-1 tab activeTab" : "col-1 tab"}
          onClick={() => dispatch(setPanelTab("RAM"))}
        >
          ram
        </div>
      </div>
      <div className="row h-100 px-4">
        {isCurrent("CPU") && <CPU />}
        {isCurrent("RAM") && <RAM />}
      </div>
    </div>
  );
}

export default Monitoring;
