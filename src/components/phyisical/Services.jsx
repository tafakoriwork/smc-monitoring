import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { apiUrl } from "../redux/routingSlice";

function Services() {
  const APIUrl = useSelector(apiUrl);
  function servicesRequest() {
    axios
      .get(APIUrl)
      .then((result) => result.data)
      .then((response) => {
        console.log(response);
      });
  }

  useEffect(() => {
    servicesRequest();
  }, []);
  return (
    <div
      className="w-100 h-100"
      style={{ display: "grid", placeItems: "center" }}
    >
      <h3 className="text-primary">Services: Please select an option</h3>
    </div>
  );
}

export default Services;
