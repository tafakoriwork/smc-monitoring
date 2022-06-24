import { useDispatch } from "react-redux";
import { clearEvents } from "../redux/usersSlice";

function Setting() {
    const dispatch = useDispatch();
return (
    <div style={{padding: '40px'}}>
        <button className="btn btn-sm btn-primary" onClick={() => dispatch(clearEvents())}>delete all events</button>
    </div>
)
}

export default Setting;