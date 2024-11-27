import './index.css'
import React, { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class LoginEl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showError: false,
      errorMsg: "",
    };
  }

  nameInput = (event) => {
    this.setState({ username: event.target.value });
  };

  passwordInput = (event) => {
    this.setState({ password: event.target.value });
  };

  userDetails = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetailsSend = { username, password };

    const option = {
      method: "POST",
      body: JSON.stringify(userDetailsSend),
    };

    //const url = "http://localhost:4000/login/";
    const url = "https://apis.ccbp.in/login";
    const response = await fetch(url, option);
    const data = await response.json();
    console.log(data);
    this.setState({ username: "", password: "" });

    if (response.ok === true) {
      Cookies.set("AccessToken", data.jwt_token, { expires: 1 });
      this.props.history.replace('/'); // Use navigate to redirect
    } else {
      this.setState({ showError: true, errorMsg: data.error_msg });
    }
  };

  render() {
    const { username, password, showError, errorMsg } = this.state;
   const cokkiesExistOrnot = Cookies.get("AccessToken");

    if (cokkiesExistOrnot !== undefined) {
      return <Redirect to='/'/>;
    } else {
      return (
        <div className="login-bg-container">
          <h1 className="login-name-heading">Login</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="small-view-logo-website"
            alt="logo"
          />
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
              className="login-image-styling"
              alt="login-logo"
            />
          </div>
          <div className="login-form-container">
            <div className="form-image-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                className="form-logo-styling"
                alt="logo"
              />
            </div>
            <form onSubmit={this.userDetails}>
              <label className="form-label-styling">USERNAME</label>
              <input
                type="text"
                onChange={this.nameInput}
                className="input-styling-form"
                placeholder="Username"
                value={username}
              />
              <label className="form-label-styling">PASSWORD</label>
              <input
                type="text"
                onChange={this.passwordInput}
                className="input-styling-form"
                placeholder="Password"
                value={password}
              />
              {showError ? (
                <p className="error-msg-styling">{errorMsg}</p>
              ) : (
                ""
              )}
              <button type="submit" className="form-button-styling">
                Login
              </button>
            </form>
          </div>
        </div>
      );
    }
  }
}

/* To use `useNavigate` with a class component, wrap it with a functional component
const WithNavigate = (props) => {
  const navigate = useNavigate();
  return <LoginEl {...props} navigate={navigate} />;
};*/

export default LoginEl;
