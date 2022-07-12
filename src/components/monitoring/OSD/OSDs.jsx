import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl, nodeIp, setAPIUrl, setSelectedBrowser } from "../../redux/routingSlice";
import axios from 'axios';
import global from "../../config/global";
import Window from "../../tools/window";
import Loading from "../../tools/Loading";
function OSDs() {
  const APIUrl = useSelector(apiUrl);
  const nodeIP = useSelector(nodeIp);
  const dispatch = useDispatch();
  const [OSDs_list, setOSDs] = useState([])
  const fetchOsds = () => {
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
       setOSDs(data);
    })
  }

  const setSelected = (i, id) => {
    const el = {
        id: `_node_${nodeIP.split('.')[3]}_nic_osd${i}`,
        title: `OSD${i}`,
        type: "OSD",
      };
      dispatch(setAPIUrl( `http://smc-sl-api.local/smc-sl/api/v1/ceph/osd/${id}`));
      dispatch(setSelectedBrowser(el));
  }

  useEffect(() => {
    if(!OSDs_list.length)
    fetchOsds();
  }, []);
  return (
    <Window body_ui={<div className="h-100">
        {OSDs_list.length ? OSDs_list.map((el, i) => {
            return (<div className="row" key={i}>
               <div className="col border py-2"><strong>{el}</strong></div>
               <div className="col border py-2">
                   <button className="btn btn-sm btn-primary" onClick={() => setSelected(i, el)}>
                       show
                   </button>
               </div>
           </div>)
        }) : <Loading />}
       </div>} title={"OSDs"}/>
  );
}

export default OSDs;
