import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Orders from "./containers/Orders/Orders";
// import Checkout from "./containers/Checkout/Checkout";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});
const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const App = (props) => {
  const { onTryAutoSingup } = props;
  useEffect(() => {
    onTryAutoSingup();
  }, [onTryAutoSingup]);

  let routes = (
    <Switch>
      <Route exact path="/" component={BurgerBuilder} />
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSingup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
