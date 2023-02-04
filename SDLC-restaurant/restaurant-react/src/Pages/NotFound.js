import React from 'react';

export default class NotFound extends React.Component {
    render() {
        return (
            <>
                <img style={{display: 'block', margin: 'auto'}} src="https://image.freepik.com/free-vector/traffic-sign-page-404-found-flat-illustration_80328-232.jpg"></img>
                <h1><a href="/" style={{display: 'block', textAlign: 'center'}}>Go Home</a></h1>
                <a href="https://www.freepik.com/free-photos-vectors/banner" style={{position: 'fixed', bottom: '0px', right: '0px'}}>Banner vector created by roserodionova - www.freepik.com</a>
            </>
        )
    }
}