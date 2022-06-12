import Window from "../tools/window";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import { useEffect, useState } from "react";

function VChart() {
  const [datad, setData] = useState([]);
  let i = 0;
  useEffect(() => { setInterval(() => {
    i % 2 === 0
    ? setData([
      {x: 3, y: 6},
      {x: 6, y: 8},
      {x: 16, y: 18},
    ])
    : setData([
      {x: 13, y: 16},
      {x: 16, y: 18},
      {x: 16, y: 28},
    ])
    i++
  }, 4000);}, [])
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
      animate={{
  duration: 500,
  onLoad: { duration: 300 }
}}
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc" },
          
        }}
        data={datad}
      />
    </VictoryChart>
  );
}

function CPU() {
  return (
    <>
      <Window body_ui={<VChart />} title={"first chart"} />
      <Window body_ui={<span>second</span>} title={"22222"} />
      <Window body_ui={<span>second</span>} title={"22322"} />
      <Window body_ui={<span>second</span>} title={"2222"} />
      <Window body_ui={<span>second</span>} title={"225422"} />
      <Window body_ui={<span>second</span>} title={"2622"} />
      <Window body_ui={<span>second</span>} title={"22722"} />
      <Window body_ui={<span>second</span>} title={"227022"} />
      <Window body_ui={<span>second</span>} title={"228922"} />
    </>
  );
}

export default CPU;
