
import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { speedInformation } from "../../redux/coreStates";
import { selectedBrowser } from "../../redux/routingSlice";

function CPUSpeed() {
  var inf = useSelector(speedInformation);
  const selected_borwser = useSelector(selectedBrowser);
  const sessionDatas = sessionStorage.getItem(`${selected_borwser.id}_speed`);
  const getMin = () => {
    if (sessionDatas) {
      const sesstionData = sessionDatas.split(",");
      return Math.min(...sesstionData.map((item) => item));
    }return 0;
  };

  const getMax = () => {
    if (sessionDatas) {
      const sesstionData = sessionDatas.split(",");
      return Math.max(...sesstionData.map((item) => item));
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
      return parseFloat(total / ( sesstionData.length)).toFixed(2);
    }return 0;
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
