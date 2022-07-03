import { useSelector } from "react-redux";
import { usedSize } from "../../redux/hddstates";

import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
function UsedSize() {
    const usedsize = useSelector(usedSize);
   
  const getMin = () => {
    return Math.min(...usedsize.map((item) => item.y));
  };
  const getMax = () => {
    return Math.max(...usedsize.map((item) => item.y));
  };
  const getAvg = () => {
    var total = 0;
    for (var i = 0; i < usedsize.length; i++) {
      total += usedsize[i].y;
    }
    return Math.floor(total / usedsize.length);
  };
  return (
    <>
      <div className="row justify-content-between">
        <div className="col">Min: {getMin()}</div>
        <div className="col">Max: {getMax()}</div>
        <div className="col">Avg: {getAvg()}</div>
      </div>
         <VictoryChart theme={VictoryTheme.material} width={800} >
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y) + "GB"}
        domain={{y: [0, getMax()]}}
        style={{
          data: {
            stroke: "lightblue",
            strokeWidth: 0.5,
            fill: "purple",
            fillOpacity: 0.3,
          },
          parent: { border: "1px solid #ccc" },
          labels: {
            fontSize: 12,
            fill: "purple",
          },
        }}
        data={usedsize}
      />
    </VictoryChart>
        </>
    )
}

export default UsedSize;