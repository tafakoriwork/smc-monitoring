
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
        <div>SMC-SL</div>
      </a>
    </nav>
  );
}

export default Navbar;
