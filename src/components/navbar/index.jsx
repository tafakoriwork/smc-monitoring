import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <nav
      className="navbar navbar-secondary bg-secondary position-fixed w-100 px-4 d-flex"
      style={{
        top: "0",
        height: "60px",
        zIndex: 100,
        boxShadow: "0 0 5px #aaa5",
      }}
    >
      <a className="navbar-brand text-light" href="#">
        <div>Navbar</div>
      </a>
      <div className="position-relative">
          <textarea className="bg-secondary resize-none srch-box" placeholder="search..."></textarea>
          <FontAwesomeIcon className="srch-icon position-absolute" icon={ faSearch } />
      </div>
    </nav>
  );
}

export default Navbar;
