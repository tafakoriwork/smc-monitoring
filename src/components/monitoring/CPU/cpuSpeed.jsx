import { useEffect } from "react";
import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import { speedInformation } from "../../redux/cpuStates";

function CPUSpeed() {
  var inf = useSelector(speedInformation);
  return (
    <VictoryChart theme={VictoryTheme.material} width={800}>
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y)}
        domain={{ y: [0, 3000] }}
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
  );
}

export default CPUSpeed;
