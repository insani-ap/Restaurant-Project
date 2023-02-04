import { BehaviorSubject } from 'rxjs';
import { Redirect } from "react-router-dom";
import { authHeader, handleResponse } from '../_helpers';
import { decodeToken } from "react-jwt";
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
const currentAdminSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentAdmin')));

export const authenticationService = {
    login,
    loginAdmin,
    logout,
    logoutAdmin,
    currentUser: currentUserSubject.asObservable(),
    currentAdmin: currentAdminSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value },
    get currentAdminValue() { return currentAdminSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    // const myDecodedToken = decodeToken(token);
    return fetch(`http://localhost:8080/user/uname/` + username, requestOptions)
        .then(handleResponse)
        .then(user => {

            if (!user) {
                alert("Incorrect username/password. Please try again")
            } else {
                console.log((user.token))
                if (password !== user.password) {
                    alert("Incorrect username/password. Please try again")
                } else {
                    alert("Welcome " + user.name)
                    let data = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        token: user.token
                    }
                    fetch('http://localhost:8081/addChannels/' + user.email)
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    localStorage.setItem("chatData", [{}]);
                    currentUserSubject.next(user);
                    return user;
                }
            }

        });
}
function loginAdmin(username, password) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`http://localhost:8080/admin/uname/` + username, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user)
            if (!user) {
                alert("Incorrect username/password. Please try again")
            } else {
                if (password !== user.password) {
                    alert("Incorrect username/password. Please try again")

                } else {
                    alert("Welcome " + user.name)
                    let data = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        token: user.token
                    }
                    localStorage.setItem('currentAdmin', JSON.stringify(data));
                    currentUserSubject.next(user);
                    return user;
                }
            }

        });
}

function logout() {
    // remove user from local storage to log user out
    let data = JSON.parse(localStorage["currentUser"]);

    if (data) {
        fetch('http://localhost:8081/deleteChannels/' + data.email)
        let name = JSON.parse(localStorage.getItem('currentUser'))
        alert("Thankyou " + name.name + ", you have been successfully logged out.")
        localStorage.removeItem('currentUser');
        localStorage.removeItem('seatUser');
        localStorage.removeItem('listResv');

        currentUserSubject.next(null);
    }
    else {
    }
}

function logoutAdmin() {
    // remove user from local storage to log user out
    let data = localStorage["currentAdmin"];

    if (data) {
        let name = JSON.parse(localStorage.getItem('currentAdmin'))
        alert("Thankyou " + name.name + ", you have been successfully logged out.")
        localStorage.removeItem('currentAdmin');
        currentUserSubject.next(null);
    }
    else {
    }
}
