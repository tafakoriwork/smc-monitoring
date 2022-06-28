import {
  faChevronDown,
  faChevronUp,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import FilterModal from "./FilterModal";

function ServicesTable(props) {
  const { services, sortBy } = props;
  let srvs = services;
  const [is_sub, setIssub] = useState(false);
  const [is_name, setIsname] = useState(false);
  const [is_active, setIsactive] = useState(false);
  const [is_load, setIsload] = useState(false);
  const [is_modal_open, setModalOpen] = useState(false);
  const [SubFilters, setSubFilters] = useState([]);
  const [LoadFilters, setLoadFilters] = useState([]);
  const [ActiveFilters, setActiveFilters] = useState([]);
  const setFilterSub = async (item) => {
    if (SubFilters.includes(item)) {
      let filtersClone = [...SubFilters];
      const filter = (el) => {
        return el !== item;
      };
      filtersClone = filtersClone.filter(filter);
      setSubFilters(filtersClone);
    } else setSubFilters([...SubFilters, item]);
  };
  const setFilterLoad = async (item) => {
    if (LoadFilters.includes(item)) {
      let filtersClone = [...LoadFilters];
      const filter = (el) => {
        return el !== item;
      };
      filtersClone = filtersClone.filter(filter);
      setLoadFilters(filtersClone);
    } else setLoadFilters([...LoadFilters, item]);
  };
  const setFilterActive = async (item) => {
    if (ActiveFilters.includes(item)) {
      let filtersClone = [...ActiveFilters];
      const filter = (el) => {
        return el !== item;
      };
      filtersClone = filtersClone.filter(filter);
      setActiveFilters(filtersClone);
    } else setActiveFilters([...ActiveFilters, item]);
  };
  const toggle = (type) => {
    if (type !== "name") setIsname(false);
    if (type !== "sub") setIssub(false);
    if (type !== "active") setIsactive(false);
    if (type !== "load") setIsload(false);
  };

  const checkFilter = el => {
    let state1 = true, state2 = true, state3 = true;

    switch (true) {
      case SubFilters.length !== 0:
        state1 = SubFilters.includes(el.sub);
        break;
      case ActiveFilters.length !== 0:
        state2 =  ActiveFilters.includes(el.active);
        break;
      case LoadFilters.length !== 0:
        state3 = LoadFilters.includes(el.load);
        break;
    
      default:
        break;
    }
    return state1 && state2 && state3
  }

  return (
    <>
      <table className="table" style={{minHeight: '200px'}}>
        <thead>
          <tr>
            <th className="border">#</th>
            <th className="border">
              name
              <span className="px-2 c-pointer">
                <FontAwesomeIcon
                  size="xs"
                  icon={is_name ? faChevronDown : faChevronUp}
                  onClick={() => {
                    sortBy("name", is_name);
                    toggle("name");
                    setIsname((is_name) => (is_name = !is_name));
                  }}
                />
              </span>
            </th>
            <th className="border">
              sub
              <span className="px-2 c-pointer">
                <FontAwesomeIcon
                  size="xs"
                  icon={is_sub ? faChevronDown : faChevronUp}
                  onClick={() => {
                    sortBy("sub", is_sub);
                    toggle("sub");
                    setIssub((is_sub) => (is_sub = !is_sub));
                  }}
                />
              </span>
            </th>
            <th className="border">
              active
              <span className="px-2 c-pointer">
                <FontAwesomeIcon
                  size="xs"
                  icon={is_active ? faChevronDown : faChevronUp}
                  onClick={() => {
                    sortBy("active", is_active);
                    toggle("active");
                    setIsactive((is_active) => (is_active = !is_active));
                  }}
                />
              </span>
            </th>
            <th className="border position-relative">
              <div>
                load
                <span className="px-2 c-pointer">
                  <FontAwesomeIcon
                    size="xs"
                    icon={is_load ? faChevronDown : faChevronUp}
                    onClick={() => {
                      sortBy("load", is_load);
                      toggle("load");
                      setIsload((is_load) => (is_load = !is_load));
                    }}
                  />
                </span>
              </div>
              <FontAwesomeIcon
                icon={faFilter}
                className="position-absolute c-pointer"
                style={{ top: "5px", right: "10px" }}
                color={"#999"}
                onClick={() => setModalOpen(!is_modal_open)}
              />
              {is_modal_open && <FilterModal filters={{sub: SubFilters, active: ActiveFilters, load: LoadFilters}} setFilterSub={setFilterSub} setFilterLoad={setFilterLoad} setFilterActive={setFilterActive} />}
            </th>
          </tr>
        </thead>
        {services.map((el, i) => {
          return (
            <tbody key={i}>
              {
              checkFilter(el) ? (
                <tr className="border">
                  <td className="border" width={"10%"}>
                    {i + 1}
                  </td>
                  <td className="border" width={"30%"}>
                    {el.name}
                  </td>
                  <td className="border" width={"20%"}>
                    {el.sub}
                  </td>
                  <td className="border" width={"20%"}>
                    {el.active}
                  </td>
                  <td className="border" width={"20%"}>
                    {el.load}
                  </td>
                </tr>
              ) :
              (SubFilters.length === 0 && ActiveFilters.length === 0 && LoadFilters.length === 0 ) && (
                  <tr className="border">
                  <td className="border" width={"10%"}>
                    {i + 1}
                  </td>
                  <td className="border" width={"30%"}>
                    {el.name}
                  </td>
                  <td className="border" width={"20%"}>
                    {el.sub}
                  </td>
                  <td className="border" width={"20%"}>
                    {el.active}
                  </td>
                  <td className="border" width={"20%"}>
                    {el.load}
                  </td>
                </tr>
                )
              }
            </tbody>
          );
        })}
      </table>
    </>
  );
}

export default ServicesTable;
