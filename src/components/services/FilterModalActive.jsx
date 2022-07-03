import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

function FilterModalActive(props) {
  const { setFilterActive, filters, close, setSelectAll } = props;
  const slctAll = (e) => {
    setSelectAll(e.target.checked);
  }
  return (
    <div className="bg-light filter_modal py-4 " style={{ width: "200px" }}>
      <span className="text-secondary me-auto position-absolute" style={{fontSize: '13px', top: '5px', left: '5px'}}>
          Active:
        </span>
        <FontAwesomeIcon onClick={() => close()} icon={faTimes} color={"#555"} size={"xs"} className={"position-absolute c-pointer"} style={{ top: '10px', right: '10px'}}/>
      <div className="row flex-column ms-3 border-left mt-2">
      <div className="row justify-content-between align-items-center mx-0">
        <label
          htmlFor="selectall"
          style={{ fontSize: "12px" }}
          className="col-10 text-444 text-start"
        >
          Select all
        </label>
        <input
            type="checkbox"
            className="col input-check"
            id="selectall"
            checked={filters.active.join('') == ['active', 'inactive'].join('') && true}
            onChange={slctAll}
          />
          </div>
        <div className="row justify-content-between align-items-center mx-0">
          <label
            htmlFor="active"
            style={{ fontSize: "12px" }}
            className="col-10 text-444 text-start ps-4"
          >
            active
          </label>
          <input
            checked={filters.active.includes("active") && true}
            type="checkbox"
            className="col input-check"
            id="active"
            onChange={() => setFilterActive("active")}
          />
        </div>
        <div className="row justify-content-between align-items-center mx-0">
          <label
            htmlFor="inactive"
            style={{ fontSize: "12px" }}
            className="col-10 text-444 text-start ps-4"
          >
            inactive
          </label>
          <input
            checked={filters.active.includes("inactive") && true}
            type="checkbox"
            id="inactive"
            className="col input-check"
            onChange={() => setFilterActive("inactive")}
          />
        </div>
      </div>
    </div>
  );
}
export default FilterModalActive;
