import { useSelector } from "react-redux";
import { reloader, usedSize } from "../../redux/hddstates";

import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { selectedBrowser } from "../../redux/routingSlice";
import { useEffect } from "react";
import Loading from "../../tools/Loading";
function UsedSize() {
  const usedsize = useSelector(usedSize);
  const reload = useSelector(reloader);
  const selected_borwser = useSelector(selectedBrowser);
  const sessionDatas = sessionStorage.getItem(
    `${selected_borwser.id}_usedsize`
  );

  const getMin = () => {
    if (sessionDatas) {
      const sesstionData = sessionDatas.split(",");
      return Math.min(...sesstionData.map((item) => item));
    }
    return 0;
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
      return parseFloat(total / sesstionData.length).toFixed(2);
    }
    return 0;
  };

  useEffect(() => {}, [reload]);
  return (
    <>
      {usedSize.length ? (
        <div>
          <div className="row justify-content-between">
            <div className="col">Min: {getMin()} GB</div>
            <div className="col">Max: {getMax()} GB</div>
            <div className="col">Avg: {getAvg()} GB</div>
          </div>
          <VictoryChart theme={VictoryTheme.material} width={800}>
            <VictoryArea
              width={800}
              labels={({ datum }) => Math.ceil(datum.y) + "GB"}
              domain={{ y: [0, getMax() * 2] }}
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
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default UsedSize;
