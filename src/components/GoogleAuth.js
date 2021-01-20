import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends Component {
  // state = { isSignedIn: null };

  // initialize the library first time component is mounted
  // load only gives callback.. init returns a promise
  // here we get an auth instance which we can use to sign in and stuff
  componentDidMount() {
    //select what to load and callback
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "234976540443-uu663dlbedv4glt4c31nj2j2fbh9t46i.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          // takes a callback whenever the auth status changes
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  OnSignInClick = () => {
    this.auth.signIn();
  };

  OnSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.OnSignOutClick}>
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.OnSignInClick}>
          <i className="google icon" />
          Sign in with google
        </button>
      );
    }
  }

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
