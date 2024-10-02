import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <b className="navbar-brand" style={{ color: "white" }}>
            Olmegle
          </b>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  style={{ color: "white" }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ color: "white" }}>
                  Exit
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  aria-disabled="true"
                  style={{ color: "white" }}
                >
                  Donations
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="ladki"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
