import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";
import PernilBuilder from "./containers/PernilBuilder/PernilBuilder";

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
        <Layout>{this.state.show ? <PernilBuilder /> : null}</Layout>
      </div>
    );
  }
}

export default App;
