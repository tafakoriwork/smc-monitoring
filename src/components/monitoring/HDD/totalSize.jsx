import { useSelector } from "react-redux";
import { totalSize } from "../../redux/hddstates";

import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
function TotalSize() {
  const totalsize = useSelector(totalSize);

  const getMin = () => {
    return Math.min(...totalsize.map((item) => item.y));
  };
  const getMax = () => {
    return Math.max(...totalsize.map((item) => item.y));
  };
  const getAvg = () => {
    var total = 0;
    for (var i = 0; i < totalsize.length; i++) {
      total += totalsize[i].y;
    }
    return Math.floor(total / totalsize.length);
  };
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
          labels={({ datum }) => Math.ceil(datum.y) + "GB"}
          domain={{ y: [0, getMax()] }}
          style={{
            data: {
              stroke: "lightblue",
              strokeWidth: 0.5,
              fill: "lightblue",
            },
            parent: { border: "1px solid #ccc" },
            labels: {
              fontSize: 12,
              fill: "darkblue",
            },
          }}
          data={totalsize}
        />
      </VictoryChart>
    </>
  );
}

export default TotalSize;
