import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import global from "../../config/global";
import {
  available,
  setAvailable,
  setTotal,
  setUsed,
} from "../../redux/ramStates";
import { apiUrl, nodeIp, selectedBrowser } from "../../redux/routingSlice";
import Loading from "../../tools/Loading";
function Available() {
  const [reload, setReload] = useState(0);
  const dispatch = useDispatch();
  const _available = useSelector(available);
  const nodeIP = useSelector(nodeIp);
  const APIUrl = useSelector(apiUrl);
  const selected_borwser = useSelector(selectedBrowser);
  const [diagram_obj, setDiagramObj] = useState([]);
  const sessionDatas = sessionStorage.getItem(
    `${selected_borwser.id}_available`
  );

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
      .then((response) => response.data)
      .then((data) => {
        const ndata = data.Result["SMC-SL Result"].result[0];
        dispatch(setAvailable(ndata["available"]));
        dispatch(setTotal(ndata["total"]));
        dispatch(setUsed(ndata["used"]));
        let availableFromStorage;
        const getFromStorage = sessionStorage.getItem(
          `${selected_borwser.id}_available`
        );
        if (getFromStorage) availableFromStorage = getFromStorage.split(",");
        else availableFromStorage = [];
        sessionStorage.setItem(`${selected_borwser.id}_available`, [
          ...availableFromStorage,
          ndata["available"],
        ]);

        let usedFromStorage;
        const getFromStorage2 = sessionStorage.getItem(
          `${selected_borwser.id}_used`
        );
        if (getFromStorage2) usedFromStorage = getFromStorage2.split(",");
        else usedFromStorage = [];
        sessionStorage.setItem(`${selected_borwser.id}_used`, [
          ...usedFromStorage,
          ndata["used"],
        ]);

        let totalFromStorage;
        const getFromStorage3 = sessionStorage.getItem(
          `${selected_borwser.id}_total`
        );
        if (getFromStorage3) totalFromStorage = getFromStorage3.split(",");
        else totalFromStorage = [];
        sessionStorage.setItem(`${selected_borwser.id}_total`, [
          ...totalFromStorage,
          ndata["total"],
        ]);

        setTimeout(() => {
          setReload(Math.random());
        }, 2000);
      })
      .catch((error) => {
        const ndata = error;
      });
  };

  function diagramMaker() {
    const d = new Date();
    const n = d.toLocaleTimeString();
    if (_available !== null)
      setDiagramObj([...diagram_obj, { x: n, y: _available }]);
    if (diagram_obj.length > 6) {
      const temp = diagram_obj;
      temp.splice(0, 1);
      setDiagramObj(temp);
    }
  }

  useEffect(() => {
    smcRequest();
    if (localStorage.getItem("_pre") !== selected_borwser.id) {
      dispatch(setAvailable([]));
      dispatch(setTotal([]));
      dispatch(setUsed([]));
      setReload(Math.random());
    }
    localStorage.setItem("_pre", selected_borwser.id);
    diagramMaker();
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
              labels={({ datum }) => Math.ceil(datum.y)}
              domain={{ y: [0, getMax() * 2] }}
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
          </VictoryChart>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Available;
