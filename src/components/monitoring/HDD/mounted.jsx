import React from "react";
import { useSelector } from "react-redux";
import { Mounted, _fs } from "../../redux/hddstates";
import Loading from "../../tools/Loading";

function MountedShow() {
    const mounted = useSelector(Mounted)
    const fs = useSelector(_fs)
    return (
        <>
        <div className="row">
        <div className="col border">
            <strong>Mounted</strong>
        </div>
        <div className="col border">
            {mounted === null ? <Loading /> : (mounted ? 'TRUE' : 'FALSE')}
        </div>
        </div>

        <div className="row">
        <div className="col border">
            <strong>filesystem</strong>
        </div>
        <div className="col border">
            {fs}
        </div>
        </div>
        </>
    )
}

export default MountedShow;