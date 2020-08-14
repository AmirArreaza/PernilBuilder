import React from "react";
import Logo from "../../Logo/Logo";
import NavigationsItems from "../NavigationItems/NavigationsItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.open){
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  
    return (
    <Auxiliary>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationsItems />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;