import axios from 'axios';
import logout from '../../containers/Auth/logout/logout';


import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
} ;

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };

};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const LogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return { 
        type: actionTypes.AUTH_LOGOUT

    };
}
export const checkAuthTimeout = (expirationTime) => {
        return dispatch => {
            setTimeout(() => {
                dispatch(LogOut());
            }, expirationTime * 1000);
        }
};


export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA61ozeWGreKm3P4Fghf7mDJNRP-sl6tzU';
        if (!isSignup) {
            url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA61ozeWGreKm3P4Fghf7mDJNRP-sl6tzU'
        }
        axios.post(url, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime()  + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idtoken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(LogOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(LogOut());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
}