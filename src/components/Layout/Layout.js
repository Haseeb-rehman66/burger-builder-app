import React,{Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxi';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';





class Layout extends Component {
   
   state = {
       showSideDrawer: false
   }

   sideDrawerClosedHandler = () => {

    this.setState({showSideDrawer: false});
   }

   sideDrawerToggleHandler = () => {
       this.setState((prevState) =>{
           return {showSideDrawer: !prevState.showSideDrawer};
       });
   }
   
   
    render () {
        return (
    <Aux>
    <Toolbar 
    isAuth = {this.props.isAuthenticated}
    drawerToggleclicked={this.sideDrawerToggleHandler} />
    <SideDrawer 
    isAuth = {this.props.isAuthenticated}
    open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={Classes.Content}>
        {this.props.children}
    </main>
    </Aux>
        )
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);