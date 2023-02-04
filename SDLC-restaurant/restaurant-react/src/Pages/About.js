import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import AboutContent from '../Components/About/AboutContent';
import AboutFooter from '../Components/About/AboutFooter';
import Subheader from '../Components/Subheader';

export default class About extends React.Component {
    render() {
        return(
            <>
                <Header about="nav-item active"/>
                <Subheader title="About" />
                <AboutContent />
                <AboutFooter />
                <Footer />
            </>
        )
    }
}