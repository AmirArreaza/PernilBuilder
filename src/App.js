import React, { Component } from "react";

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
          <PernilBuilder />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
