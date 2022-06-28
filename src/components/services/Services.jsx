import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiUrl, nodeIp } from "../redux/routingSlice";
import global from "../config/global";
import ServicesTable from "./ServicesTable";
function Services() {
  const APIUrl = useSelector(apiUrl);
  const nodeIP = useSelector(nodeIp);
  const [services, setServices] = useState([
    {
      name: "auditd.service",
      sub: "running",
      active: "active",
      load: "loaded",
    },
    {
      name: "network.service",
      sub: "exited",
      active: "active",
      load: "loaded",
    },
    {
      name: "plymouth-read-write.service",
      sub: "dead",
      active: "inactive",
      load: "loaded",
    },
    {
      name: "ypxfrd.service",
      sub: "dead",
      active: "inactive",
      load: "not-found",
    },
  ]);

  async function sortBy(type, state) {
    switch (true) {
      case type === "name":
        services.sort((a, b) => {
          if (!state) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
          } else {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
          }
          return 0;
        });
        break;
      case type === "sub":
        services.sort((a, b) => {
          if (!state) {
            if (a.sub < b.sub) return -1;
            if (a.sub > b.sub) return 1;
          } else {
            if (a.sub > b.sub) return -1;
            if (a.sub < b.sub) return 1;
          }
          return 0;
        });
        break;
      case type === "active":
        services.sort((a, b) => {
          if (!state) {
            if (a.active < b.active) return -1;
            if (a.active > b.active) return 1;
          } else {
            if (a.active > b.active) return -1;
            if (a.active < b.active) return 1;
          }
          return 0;
        });
        break;
      case type === "load":
        services.sort((a, b) => {
          if (!state) {
            if (a.load < b.load) return -1;
            if (a.load > b.load) return 1;
          } else {
            if (a.load > b.load) return -1;
            if (a.load < b.load) return 1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
  }

  function servicesRequest() {
    services.length === 0 &&
      axios
        .get(APIUrl, {
          headers: {
            username: global.username,
            password: global.password,
            address: nodeIP,
            Authorization: `Bearer ${global.token}`,
          },
        })
        .then((result) => result.data)
        .then((response) => {
          console.log(response.Status.RetVal);
          if (response.Status.RetVal) {
            setServices(response.Result["SMC-SL Result"].result);
          } else servicesRequest();
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
      <ServicesTable services={services} sortBy={sortBy} />
    </div>
  );
}

export default Services;
