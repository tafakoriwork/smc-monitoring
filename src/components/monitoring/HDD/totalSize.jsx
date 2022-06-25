import { useSelector } from "react-redux";
import { apiUrl } from "../../redux/routingSlice";
function TotalSize() {
    const APIUrl = useSelector(apiUrl);
    return (
        <>{APIUrl}</>
    )
}

export default TotalSize;