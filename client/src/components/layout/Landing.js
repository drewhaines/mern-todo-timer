import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Background from "../../images/background.jpg"

const backgroundStyle = {
  height: "calc( 100vh - 64px)",
  backgroundImage: `url(${Background})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/timer");
    }
  }

  render() {
    return (
      <div style={backgroundStyle}>
        <div style={{height: '50vh'}} className="container materialize valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <br />
              <h4>
                <b>Simple</b>
                <span style={{ fontFamily: "monospace" }}>{` MERN `}</span>
                app for The Todo Timer.
              </h4>
              <br />
              <p className="flow-text grey-text text-darken-1">
                A pomodoro timer with a todo list and user auth using passport and JWTs.
              </p>
              <br />
              <br />
              <div className="col s6">
                <Link
                  to="/register"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Register
                </Link>
              </div>
              <div className="col s6">
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large btn-flat waves-effect white black-text"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
)(Landing);
