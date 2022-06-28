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
  const [is_sub, setIssub] = useState(false);
  const [is_name, setIsname] = useState(false);
  const [is_active, setIsactive] = useState(false);
  const [is_load, setIsload] = useState(false);
  const [is_modal_open, setModalOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const setFilter = async (item) => {
    if (filters.includes(item)) {
      let filtersClone = [...filters];
      const filter = (el) => {
        return el !== item;
      };
      filtersClone = filtersClone.filter(filter);
      setFilters(filtersClone);
    } else setFilters([...filters, item]);
  };
  const toggle = (type) => {
    if (type !== "name") setIsname(false);
    if (type !== "sub") setIssub(false);
    if (type !== "active") setIsactive(false);
    if (type !== "load") setIsload(false);
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);
  return (
    <>
      <table className="table">
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
              {is_modal_open && <FilterModal setFilter={setFilter} />}
            </th>
          </tr>
        </thead>
        {services.map((el, i) => {
          return (
            <tbody key={i}>
              {filters.length > 0 &&
              (filters.includes(el.sub) ||
                filters.includes(el.active) ||
                filters.includes(el.load)) ? (
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
              ) : (
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
              )}
            </tbody>
          );
        })}
      </table>
    </>
  );
}

export default ServicesTable;
