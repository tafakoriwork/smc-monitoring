import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setManagementPanelTab } from "../redux/routingSlice";

function Management(props) {
  const dispatch = useDispatch();
  const isCurrent = (tab) => props.current_tab === tab;
  return (
    <>
    <div className="row m-0 bg-light pt-1 align-items-center">
          <h5 style={{ fontSize: "12px", color: "#999" }}>
            {"Management"}
            {props.current_tab && (
              <FontAwesomeIcon
                icon={faChevronRight}
                size={"xs"}
                style={{ color: "#999" }}
              />
            )}{" "}
            {props.current_tab}
          </h5>
        </div>
      <div className="row mx-0 tabbar" style={{ height: "36px" }}>
        <div
          className={isCurrent("Setting") ? "col tab activeTab" : "col tab"}
          onClick={() => dispatch(setManagementPanelTab("Setting"))}
        >
          Setting
        </div>
        <div
          className={isCurrent("Setting2") ? "col tab activeTab" : "col tab"}
          onClick={() => dispatch(setManagementPanelTab("Setting2"))}
        >
          Setting2
        </div>
        
      </div>
    </>
  );
}

export default Management;
