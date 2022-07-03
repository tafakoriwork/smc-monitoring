
import { useSelector } from "react-redux";
import { VictoryArea, VictoryChart, VictoryTheme } from "victory";
import {
  _loadeds,
  _notfounds,
} from "../redux/serviceSlice";

function Load() {
  const notfound = useSelector(_notfounds);
  const loaded = useSelector(_loadeds);
  const totalCount = notfound.length + loaded.length;
  const data = [
    { x: "notfound", y: (notfound.length / totalCount) * 100 },
    { x: "loaded", y: (loaded.length / totalCount) * 100 },
  ];
  return (
    <VictoryChart theme={VictoryTheme.material} width={800}>
      <VictoryArea
        width={800}
        labels={({ datum }) => Math.ceil(datum.y) + "%"}
        domain={{y: [0,100]}}
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
        data={data}
      />
    </VictoryChart>
  );
}

export default Load;
