import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import global, { user } from "../config/global";
function Navbar() {
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(1);
  return (
    <>
      <nav
        className="navbar navbar-secondary position-fixed bg-secondary w-100 px-4 d-flex"
        style={{
          top: "0",
          height: "60px",
          zIndex: 100,
          boxShadow: "0 0 5px #aaa5",
        }}
      >
        <a className="navbar-brand text-light" href="#">
          <div>SMC-SL</div>
        </a>
        <div>
          <button className="user-button" {...buttonProps}>
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </nav>

      <div className={isOpen ? "visible" : ""} role="menu">
        <div {...itemProps[0]} href="https://example.com">
          {user.name}
        </div>
        <div onClick={() => {
          localStorage.removeItem('token')
          global.token = null;
          window.location.reload();
        }} {...itemProps[1]}>
          Log out
        </div>
      </div>
    </>
  );
}

export default Navbar;
