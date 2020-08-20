import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import PernilBuilder from "./containers/PernilBuilder/PernilBuilder";
import Checkout from "./containers/Checkout/Checkout";

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
            <Route path="" exact component={PernilBuilder}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
