import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Pernil from '../../components/Pernil/Pernil'

class PernilBuilder extends Component{

    state = {
        ingridients: {
            salad: 0,
            tomatoes: 0,
            cheese: 0,
            meat: 0
        }
    }

    render(){
        return(
            <Auxiliary>
                <Pernil ingridients={this.state.ingridients}/>
                <div> Build Controls </div>
            </Auxiliary>
        );
    };
}

export default PernilBuilder;