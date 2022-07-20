import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectedBrowser } from "../../redux/routingSlice";
import {
  _Used,
} from "../../redux/osdStates";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import Loading from "../../tools/Loading";
function Used() {
  const selected_borwser = useSelector(selectedBrowser);
  const used = useSelector(_Used);
  const [diagram_obj, setDiagramObj] = useState([]);
  const sessionDatas = sessionStorage.getItem(
    `${selected_borwser.id}_used`
  );

  const getMin = () => {
    if (sessionDatas) {
      const sesstionData = sessionDatas.split(",");
      return (Math.min(...sesstionData.map((item) => item))).toFixed(2);
    }
    return 0;
  };

  const getMax = () => {
    if (sessionDatas) {
      const sesstionData = sessionDatas.split(",");
      return (Math.max(...sesstionData.map((item) => item))).toFixed(2);
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
    used.size !== undefined &&
      setDiagramObj([...diagram_obj, { x: n, y: used.size }]);
    if(diagram_obj.length >= 6)
    {
      const temp = diagram_obj;
    temp.splice(0, 1);
    setDiagramObj(temp);
    }
  }

  useEffect(() => {
    diagramMaker();
  }, [used.size, selected_borwser]);

  return (
    <>
     {
      diagram_obj.length ? 
      <div>
     <div className="row justify-content-between">
        <div className="col">Min: {getMin()}</div>
        <div className="col">Max: {getMax()}</div>
        <div className="col">Avg: {getAvg()}</div>
      </div>
      <VictoryChart theme={VictoryTheme.material} width={800}>
        <VictoryArea
          width={800}
          labels={({ datum }) => Math.ceil(datum.y) + used.type}
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
      </VictoryChart>
     </div>
     : <Loading />
     }
    </>
  );
}

export default Used;
