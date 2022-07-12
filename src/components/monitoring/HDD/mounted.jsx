import React from "react";
import { useSelector } from "react-redux";
import { Mounted } from "../../redux/hddstates";

function MountedShow() {
    const mounted = useSelector(Mounted)
    return (
        <div className="row">
        <div className="col border">
            <strong>Mounted</strong>
        </div>
        <div className="col border">
            {mounted ? 'TRUE' : 'FALSE'}
        </div>
        </div>
    )
}

export default MountedShow;