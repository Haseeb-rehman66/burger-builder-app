import React, {Component} from "react";
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from '../Checkout/ContactData/ContactData';
import {connect} from 'react-redux';


class Checkout extends Component {

 
  

checkoutCancelledHandler = () => {
    this.props.history.goBack();
}

checkoutContinuedHandler = () => {
    this.props.history.replace('/Checkout/contact-data')
}


    render (){
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                {purchasedRedirect}
                <CheckoutSummary 
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                ingredients={this.props.ings}/>
                <Route 
                    path={this.props.match.path + '/contact-data'}
                    render = {(props) => (<ContactData ingredients={this.props.ings} price={this.props.price} {...props}/>)}/>
                </div>
            );
        }
        return summary;
    }

};
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}




export default connect(mapStateToProps)(Checkout);