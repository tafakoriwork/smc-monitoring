import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectedBrowser } from "../../redux/routingSlice";
import {
  _Poolminsize,
  _Reloader
} from "../../redux/poolStates";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
function PoolSize() {
  const selected_borwser = useSelector(selectedBrowser);
  const pool_min_size = useSelector(_Poolminsize);
  const reloader = useSelector(_Reloader);
  
  const [diagram_obj, setDiagramObj] = useState([]);
  const sessionDatas = sessionStorage.getItem(
    `${selected_borwser.id}_poolminsize`
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

  function diagramMaker() {
    const d = new Date();
    const n = d.toLocaleTimeString();
    if(pool_min_size !== null)
      setDiagramObj([...diagram_obj, { x: n, y: pool_min_size }]);
    if(diagram_obj.length >= 6)
    {
      const temp = diagram_obj;
      temp.splice(0, 1);
      setDiagramObj(temp);
    }
  }

  useEffect(() => {
    diagramMaker();
  }, [reloader]);

  return (
    <>
      <div className="row justify-content-between">
        <div className="col">Min: {getMin()}</div>
        <div className="col">Max: {getMax()}</div>
        <div className="col">Avg: {getAvg()}</div>
      </div>
      <VictoryChart theme={VictoryTheme.material} width={800}>
        <VictoryArea
          width={800}
          labels={({ datum }) => datum.y}
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
    </>
  );
}

export default PoolSize;
