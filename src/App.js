import React, { Component } from "react";

import Layout from "./components/Layout/Layout";
import PernilBuilder from './containers/PernilBuilder/PernilBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <PernilBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
