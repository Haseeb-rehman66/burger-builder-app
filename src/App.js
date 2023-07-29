import React, { Component } from 'react';

import  asyncComponent  from './hoc/asyncComponent/asyncComponent';

import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import logout from './containers/Auth/logout/logout';
import { authCheckState } from './store/action';
import * as actions from './store/action/index';



const asyncCheckout = asyncComponent ( () => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent ( () => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent ( () => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
componentDidMount () {
  this.props.onTryAutoSignup();
}

  render() {
    let  route = (
      <Switch>
         
         <Route path="/auth" component={asyncAuth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/" />
          
          </Switch>
    );
    if(this.props.isAuthenticated) {
      route = (
      <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/logout" component={logout}/>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/" exact component={BurgerBuilder}/> 
          <Redirect to="/" />
         
          
          </Switch>
      );
    }



    return (
      <div >
        <Layout>
          { route }
        </Layout>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
