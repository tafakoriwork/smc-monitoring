import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { TotalSentBandwidth } from "../../redux/nicStates";
function TSBUI() {
  const tsbi = useSelector(TotalSentBandwidth);
  const getMin = () => {
    return Math.ceil(Math.min(...tsbi.map((item) => item.y)));
  };
  const getMax = () => {
    return Math.ceil(Math.max(...tsbi.map((item) => item.y)));
  };
  const getAvg = () => {
    var total = 0;
    for (var i = 0; i < tsbi.length; i++) {
      total += tsbi[i].y;
    }
    return Math.ceil(total / tsbi.length);
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
          labels={({ datum }) => Math.ceil(datum.y)}
          domain={{ y: [0, 10000] }}
          style={{
            data: {
              stroke: "yellow",
              strokeWidth: 0.5,
              fill: "yellow",
            },
            parent: { border: "1px solid #ccc" },
            labels: {
              fontSize: 12,
              fill: "darkblue",
            },
          }}
          data={tsbi}
        />
      </VictoryChart>
    </>
  );
}

export default TSBUI;
