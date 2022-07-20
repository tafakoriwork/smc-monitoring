import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl, nodeIp, selectedBrowser } from "../../redux/routingSlice";
import axios from "axios";
import global from "../../config/global";
import {
  setApplication,
  setAvailable,
  setCrush_rule,
  setData,
  setDetils,
  setMaximum_size,
  setMaximum_size_type,
  setPool_min,
  setPool_min_size,
  setTotal,
  setUsed,
  setWeight,
  _Available,
} from "../../redux/poolStates";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import Loading from "../../tools/Loading";
function Available() {
  const APIUrl = useSelector(apiUrl);
  const nodeIP = useSelector(nodeIp);
  const selected_borwser = useSelector(selectedBrowser);
  const available = useSelector(_Available);
  const dispatch = useDispatch();
  const [reload, setReload] = useState(Math.random());
  const [diagram_obj, setDiagramObj] = useState([]);
  const sessionDatas = sessionStorage.getItem(
    `${selected_borwser.id}_available`
  );
  const smcRequest = () => {
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
      .then((data) => {
        if (!data.Status["RetVal"]) setReload(Math.random());
        else {
          const ndata = data.Result["SMC-SL Result"]?.result[0];
          dispatch(
            setData({
              used: {
                size: ndata["used size"].toFixed(2),
                type: ndata["used size type"],
              },
              total: {
                size: ndata["cluster size"],
                type: ndata["cluster total size type"],
              },
              available: {
                size: ndata["cluster available size"],
                type: ndata["cluster available size type"],
                percentage: ndata["percentage"].toFixed(2),
              },
              details: {
                pool_name: ndata["pool name"],
                crush_rule: ndata["crush rule"],
                application: ndata["application"],
              },
              maximum: {
                size: ndata["Maximum size"],
                type: ndata["Maximum size type"],
              },
              pool_min: ndata["pool size"],
              pool_min_size: ndata["pool min size"],
            })
          );

          let usedFromStorage;
          const getFromStorageused = sessionStorage.getItem(
            `${selected_borwser.id}_used`
          );
          if (getFromStorageused)
            usedFromStorage = getFromStorageused.split(",");
          else usedFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_used`, [
            ...usedFromStorage,
            ndata["used size"],
          ]);

          let availableFromStorage;
          const getFromStorage2 = sessionStorage.getItem(
            `${selected_borwser.id}_available`
          );
          if (getFromStorage2)
            availableFromStorage = getFromStorage2.split(",");
          else availableFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_available`, [
            ...availableFromStorage,
            ndata["cluster available size"],
          ]);

          let _availablepercentageFromStorage;
          const getFromStorage4 = sessionStorage.getItem(
            `${selected_borwser.id}_availablepercentage`
          );
          if (getFromStorage4)
            _availablepercentageFromStorage = getFromStorage4.split(",");
          else _availablepercentageFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_availablepercentage`, [
            ..._availablepercentageFromStorage,
            ndata["percentage"].toFixed(2),
          ]);

          let totalFromStorage;
          const getFromStorage = sessionStorage.getItem(
            `${selected_borwser.id}_total`
          );
          if (getFromStorage) totalFromStorage = getFromStorage.split(",");
          else totalFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_total`, [
            ...totalFromStorage,
            ndata["cluster size"],
          ]);

          let maximumFromStorage;
          const getFromStorage5 = sessionStorage.getItem(
            `${selected_borwser.id}_Maximum`
          );
          if (getFromStorage5) maximumFromStorage = getFromStorage5.split(",");
          else maximumFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_Maximum`, [
            ...maximumFromStorage,
            ndata["Maximum size"],
          ]);

          let poolsizeFromStorage;
          const getFromStorage6 = sessionStorage.getItem(
            `${selected_borwser.id}_poolsize`
          );
          if (getFromStorage6) poolsizeFromStorage = getFromStorage6.split(",");
          else poolsizeFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_poolsize`, [
            ...poolsizeFromStorage,
            ndata["pool size"],
          ]);

          let poolmainsizeFromStorage;
          const getFromStorage7 = sessionStorage.getItem(
            `${selected_borwser.id}_poolminsize`
          );
          if (getFromStorage7)
            poolmainsizeFromStorage = getFromStorage7.split(",");
          else poolmainsizeFromStorage = [];
          sessionStorage.setItem(`${selected_borwser.id}_poolminsize`, [
            ...poolmainsizeFromStorage,
            ndata["pool min size"],
          ]);
        }
        setReload(Math.random());
      });
  };

  const getMin = () => {
    if (sessionDatas) {
      const sesstionData = sessionDatas.split(",");
      return Number(Math.min(...sesstionData.map((item) => item)));
    }
    return 0;
  };

  const getMax = () => {
    if (sessionDatas) {
      const sesstionData = sessionDatas.split(",");
      return Number(Math.max(...sesstionData.map((item) => item)));
    }
    return 0;
  };

  const getAvg = () => {
    if (sessionDatas) {
      const sesstionData = sessionDatas.split(",");
      var total = 0;
      for (var i = 0; i < sesstionData.length; i++) {
        total = Number(sesstionData[i]) + total;
      }
      return parseFloat(total / sesstionData.length).toFixed(2);
    }
    return 0;
  };

  function diagramMaker() {
    const d = new Date();
    const n = d.toLocaleTimeString();
    if (available.size !== null)
      setDiagramObj([...diagram_obj, { x: n, y: available.size }]);
    if (diagram_obj.length >= 6) {
      const temp = diagram_obj;
      temp.splice(0, 1);
      setDiagramObj(temp);
    }
  }

  useEffect(() => {
    diagramMaker();
    smcRequest();
  }, [reload]);

  return (
    <>
      {diagram_obj.length ? (
        <div>
          <div className="row justify-content-between">
            <div className="col">Min: {getMin()}</div>
            <div className="col">Max: {getMax()}</div>
            <div className="col">Avg: {getAvg()}</div>
          </div>
          <VictoryChart theme={VictoryTheme.material} width={800}>
            <VictoryArea
              width={800}
              labels={({ datum }) => Math.ceil(datum.y) + available.type}
              domain={{ y: [0, Number(getMax()) * 2] }}
              style={{
                data: {
                  stroke: "darkblue",
                  strokeWidth: 0.5,
                  fill: "darkblue",
                  fillOpacity: "0.1",
                },
                parent: { border: "1px solid #ccc" },
                labels: {
                  fontSize: 12,
                  fill: "darkblue",
                },
              }}
              data={diagram_obj}
            />
          </VictoryChart>{" "}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Available;
