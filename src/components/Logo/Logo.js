import React from 'react'

import pernilLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={pernilLogo} alt="MyPernil" />
    </div>
);

export default logo;