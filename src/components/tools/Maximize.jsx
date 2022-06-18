import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Maximize(props) {
  function toggle () {
    if(props.minimize)
      props.toggle_minimize();
      const el = props.el.current;
      el.classList.contains('maximize')
      ? el.classList.remove('maximize')
      : el.classList.add('maximize');
  }
  return (
    <>
      <FontAwesomeIcon onClick={() => toggle()} size="xs" icon={faWindowMaximize} style={{ cursor: 'pointer' }}/>
    </>
  );
}

export default Maximize;
