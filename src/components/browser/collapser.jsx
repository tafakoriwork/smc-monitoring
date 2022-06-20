import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
function Collapser(props) {
    const {toggle_browser, width} = props;
  return (
    <div className="collapsing" onClick={() => toggle_browser()}>
      <FontAwesomeIcon
        icon={width < 25 ? faChevronCircleRight : faChevronCircleLeft}
        color={"#aaa"}
      />
    </div>
  );
}

export default Collapser;
