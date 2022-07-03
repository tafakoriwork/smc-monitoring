
import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { speedInformation } from "../../redux/cpuStates";

function CPUSpeed() {
  var inf = useSelector(speedInformation);

  const getMin = () => {
    return Math.min(...inf.map((item) => item.y));
  };
  const getMax = () => {
    return Math.max(...inf.map((item) => item.y));
  };
  const getAvg = () => {
    var total = 0;
    for (var i = 0; i < inf.length; i++) {
      total += inf[i].y;
    }
    return Math.floor(total / inf.length);
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
          domain={{ y: [getMin(), getMax()] }}
          style={{
            data: {
              stroke: "teal",
              strokeWidth: 0.5,
              fill: "green",
              fillOpacity: "0.1",
            },
            parent: { border: "1px solid #ccc" },
            labels: {
              fontSize: 12,
              fill: "teal",
            },
          }}
          data={inf}
        />
      </VictoryChart>
    </>
  );
}

export default CPUSpeed;
