import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import {
    total,
    reloader,
} from "../../redux/ramStates";
import { selectedBrowser } from "../../redux/routingSlice";
import Loading from "../../tools/Loading";
function Total() {
  const _total = useSelector(total);
  const selected_borwser = useSelector(selectedBrowser);
  const _reloader = useSelector(reloader);
  const [diagram_obj, setDiagramObj] = useState([]);
  const sessionDatas = sessionStorage.getItem(`${selected_borwser.id}_total`);

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
      return parseFloat(total / (sesstionData.length)).toFixed(2);
    }
    return 0;
  };

  function diagramMaker() {
    const d = new Date();
    const n = d.toLocaleTimeString();
    if (diagram_obj.length > 6) {
        const temp = diagram_obj;
        temp.splice(0, 1);
        setDiagramObj(temp);
      }
    if(_total !== null)
    setDiagramObj([...diagram_obj, { x: n, y: _total }]);
    
  }

  useEffect(() => {
    diagramMaker();
  }, [_reloader]);

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
      : <Loading />
      }
    </>
  );
}

export default Total;
