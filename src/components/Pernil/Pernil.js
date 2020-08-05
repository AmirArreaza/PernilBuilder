import React from 'react';

import classes from './Pernil.module.css';
import PernilIngredient from './PernilIngredient/PernilIngridient'

const pernil = (props) => {
    
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map((_, i) => {
                return <PernilIngredient key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    
    console.log(transformedIngredients);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Pernil}>
            <PernilIngredient type="bread-top"/>
            {transformedIngredients}
            <PernilIngredient type="bread-bottom"/>
        </div>
    );

};

export default pernil;