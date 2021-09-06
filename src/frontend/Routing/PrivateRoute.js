import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !auth ? <Route exact to="/" /> : <Component {...props}></Component>
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.loginReducer.auth,
  user: state.loginReducer.user,
});

export default connect(mapStateToProps)(PrivateRoute);
