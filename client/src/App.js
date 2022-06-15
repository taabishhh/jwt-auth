// import logo from "./logo.svg";
import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              My App
            </Link>
            <div className="navbar-collapse " id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to={"/home"}>
                    Home
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
