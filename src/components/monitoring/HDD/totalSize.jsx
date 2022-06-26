import { useSelector } from "react-redux";
import { totalSize } from "../../redux/hddstates";

import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
function TotalSize() {
    const totalsize = useSelector(totalSize);
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
    )
}

export default TotalSize;