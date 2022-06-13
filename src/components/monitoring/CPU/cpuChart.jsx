
import { useEffect, useState } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

function VChart() {
  const [datad, setData] = useState([
    {x: 0, y:0}
  ]);
  let i = 0;

  const smcRequest = () => {
    fetch('http://172.30.5.131/smc-monitoringlaravel/public/')
    .then(function(response) {
          return response.json();   
  
        }).then(data => {
        if(data) {
        const newval = {x: Math.floor(data['cpu usage']), y: Math.floor(data['cpu current speed'])}
        setData(datad=> [...datad, newval]);
      }
      })
  };
  
setInterval(() => {
  smcRequest();
}, 4000);
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        animate={{
          duration: 500,
          onLoad: { duration: 300 },
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

export default VChart;
