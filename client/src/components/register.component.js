import React from "react";

export default function SignUp(props) {
  // render() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const register_function = async (event) => {
    event.preventDefault();
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
      }),
    })
      .then((res) => {
        // res.json(res.bodyUsed);
        // console.log(res.body["message"]["code"]);

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
      })
      .catch((err) => console.log(err));

    console.log(result);
  };

  return (
    <div className="auth-inner">
      <form onSubmit={register_function}>
        <h3>Register</h3>

        <div className="mb-3">
          <label className="label-text">First name*</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            id="fname"
            required="true"
          />
        </div>

        <div className="mb-3">
          <label className="label-text">Last name*</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            id="lname"
            required="true"
          />
        </div>

        <div className="mb-3">
          <label className="label-text">Email address*</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            id="register-email"
            required="true"
          />
        </div>

        <div className="mb-3">
          <label className="label-text">Password*</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            id="register-password"
            required="true"
          />
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={register_function}
          >
            Sign Up
          </button>
        </div>
        <ul>
          {errorMessage && <p className="error"> {errorMessage} </p>}
          <label className="forgot-password text-right">
            <a href="/sign-in">Already registered?</a>
          </label>
        </ul>
      </form>
    </div>
  );
  // }
}
