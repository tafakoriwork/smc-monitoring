import { faWindowMinimize } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Maximize from "../tools/Maximize";
function FooterNav(props) {
  const { minimize, footer } = props;
  return (
    <div className="nav">
      <div className="controls">
        <span>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            onClick={() => minimize()}
            size="xs"
            icon={faWindowMinimize}
          />
        </span>
        <span>
          <Maximize el={footer} />
        </span>
      </div>
    </div>
  );
}

export default FooterNav;
