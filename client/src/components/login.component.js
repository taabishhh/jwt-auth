import React from "react";

export default function Login(props) {
  const [errorMessage, setErrorMessage] = React.useState("");
  const login_function = async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const result = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      res.text().then(async (text) => {
        const body = await JSON.parse(text);
        if (res.status === 200) {
          alert("Successfully registered!");
          // window.open("/home");    //opens in new tab
          window.location.href = "/home"; //opens in same tab
        } else {
          setErrorMessage(body["message"]);
          setTimeout(function() {
            setErrorMessage("");
          }, 5000);
        }
      });
    });

    console.log(result);
  };
  return (
    <div className="auth-inner">
      <form className="form" onSubmit={login_function}>
        <h3>Login</h3>

        <div className="mb-3">
          <label className="label-text">Email address*</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            id="login-email"
            required="true"
          />
        </div>

        <div className="mb-3">
          <label className="label-text">Password*</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            id="login-password"
            required="true"
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={login_function}
          >
            Submit
          </button>
        </div>
        {errorMessage && <p className="error"> {errorMessage} </p>}
        <p className="forgot-password text-right">
          <a href="#">Forgot password?</a>
        </p>
      </form>
    </div>
  );
}
