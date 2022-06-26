import { useSelector } from "react-redux";
import { usedSize } from "../../redux/hddstates";

import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
function UsedSize() {
    const usedsize = useSelector(usedSize);
    return (
        <>
         <VictoryChart theme={VictoryTheme.material} width={800} >
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y) + "GB"}
        domain={{y: [0, 128]}}
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