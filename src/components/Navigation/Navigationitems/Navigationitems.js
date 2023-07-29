import React from "react";
import classes from './Navigationitems.css';

import NavigationItem from '../Navigationitem/Navigationitem';

const navigationitems = (props) => (
<ul className={classes.NavigationItems}>

    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Order</NavigationItem> : null}
    {props.isAuthenticated ? 
    <NavigationItem link="/logout">Logout</NavigationItem>
    : <NavigationItem link="/auth">Authenticate</NavigationItem>}

</ul>


);

export default navigationitems;