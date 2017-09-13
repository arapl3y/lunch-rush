import React, { Component } from "react";
import { auth, googleAuthProvider, githubAuthProvider } from "./firebase";

class SignIn extends Component {
  render() {
    return (
      <div className="SignIn">
        <button
          onClick={() => {
            auth.signInWithPopup(googleAuthProvider);
          }}
        >
          Sign in with Google
        </button>
        <button
          onClick={() => {
            auth.signInWithPopup(githubAuthProvider);
          }}
        >
          Sign in with Github
        </button>
      </div>
    );
  }
}

export default SignIn;
