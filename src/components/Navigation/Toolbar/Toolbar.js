import React from "react";

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";


const toolbar = (props) => (
<header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleclicked}/>
    <div className={classes.Logo}>
    <Logo clicked={props.opensideDrawer}/>
    </div>
   
    <nav className={classes.DesktopOnly}>
        <Navigationitems isAuthenticated={props.isAuth}/>
    </nav>


</header>



);
export default toolbar;