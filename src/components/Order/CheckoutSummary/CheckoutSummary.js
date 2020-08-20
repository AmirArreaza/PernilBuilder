import React from 'react';

import Pernil from '../../Pernil/Pernil';

import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {

    return(                     
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!!</h1>
            <div style={{ width: '100%',  margin: 'auto'}}>
                <Pernil ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    );

}

export default checkoutSummary;