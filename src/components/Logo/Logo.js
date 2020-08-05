import React from 'react'

import pernilLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={pernilLogo} alt="MyPernil" />
    </div>
);

export default logo;