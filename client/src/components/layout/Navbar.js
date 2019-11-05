import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import CyclesDialog from "../todo-timer/CyclesDialog";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="navbar materialize">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
              className={`col brand-logo black-text ${user.name ? 'left-brand' : 'center'}`}
            >
              <i className="material-icons">alarm_on</i>
              The Todo Timer
            </Link>
            {
              user && user.name &&
              <div className="user-actions">
                <p>{user.name}</p>
                <button
                  style={{
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  onClick={this.onLogoutClick}
                  className="btn waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
              </div>
            }
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
