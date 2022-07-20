import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl, nodeIp, setAPIUrl, setSelectedBrowser } from "../../redux/routingSlice";
import axios from 'axios';
import global from "../../config/global";
import Window from "../../tools/window";
import Loading from "../../tools/Loading";
function LUNs() {
  const APIUrl = useSelector(apiUrl);
  const nodeIP = useSelector(nodeIp);
  const dispatch = useDispatch();
  const [LUNs_list, setLUNs] = useState([])
  const fetchLUNs = () => {
    axios.get(APIUrl, {
        headers: {
            username: global.username,
            password: global.password,
            address: nodeIP,
            Authorization: `Bearer ${global.token}`,
          },
    })
    .then(res => res.data)
    .then(result => {
        const data = result['Result']['SMC-SL Result']['result'];
        if(data)
       setLUNs(data);
    })
  }

  const setSelected = (i, id) => {
    const el = {
        id: `_node_${nodeIP.split('.')[3]}_nic_lun${i}`,
        title: `lun${i}`,
        type: "LUN",
      };
     dispatch(setAPIUrl( `http://smc-sl-api.local/smc-sl/api/v1/ceph/lun/${id}`));
    //dispatch(setAPIUrl( "http://172.30.5.131/lun.php"));
      dispatch(setSelectedBrowser(el));
  }

  useEffect(() => {
    if(!LUNs_list.length)
    fetchLUNs();
  }, []);
  return (
    <Window body_ui={<div className="h-100">
        {LUNs_list?.length ? LUNs_list.map((el, i) => {
            return (<div className="row" key={i}>
               <div className="col border py-2"><strong>{el}</strong></div>
               <div className="col border py-2">
                   <button className="btn btn-sm btn-primary" onClick={() => setSelected(i, el)}>
                       show
                   </button>
               </div>
           </div>)
        }) : <Loading />}
       </div>} title={"LUNs"}/>
  );
}

export default LUNs;
