import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import PernilBuilder from "./containers/PernilBuilder/PernilBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders';

import Auth from './containers/Auth/Auth';

class App extends Component {
  state = {
    show: true,
  };

  /*
  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: false });
    }, 5000);
  }
*/
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}></Route>
            <Route path="/orders" component={Orders}></Route>
            <Route path="/auth" component={Auth}></Route>
            <Route path="" exact component={PernilBuilder}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
