import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { password, token, username } from "../config/global";
import { apiUrl, nodeIp } from "../redux/routingSlice";

function ServiceDetails() {
  const nodeIP = useSelector(nodeIp);
  const APIUrl = useSelector(apiUrl);
  const [ndata, setNdata] = useState({ sub: 0, active: 0, load: 0 });
  function serviceRequest() {
    setNdata({ sub: 0, active: 0, load: 0 });
    axios
      .get(APIUrl, {
        headers: {
          username: username,
          password: password,
          address: nodeIP,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => result.data)
      .then((data) => {
        if (data.Result["SMC-SL Result"] && data.Result["SMC-SL Result"].result) {
          const data_json = data.Result["SMC-SL Result"].result[0];
          if (data_json) setNdata(data_json);
        }
      });
  }

  useEffect(() => {
    serviceRequest();
  }, [APIUrl]);
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>key</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sub</td>
            <td>
              <span className={ndata["sub"] === 'dead' ? "text-danger" : "text-success"}>{ndata.sub}</span>
            </td>
          </tr>
          <tr>
            <td>active</td>
            <td>
              <span className={ndata["active"] === 'inactive' ? "text-danger" : "text-success"}>{ndata.active}</span>
            </td>
          </tr>
          <tr>
            <td>load</td>
            <td>
              <span className="text-success">{ndata.load}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ServiceDetails;
