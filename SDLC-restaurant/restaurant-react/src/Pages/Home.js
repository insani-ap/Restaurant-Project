import React, { Component } from 'react'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import HomeContent from '../Components/Home/HomeContent';
import HomeCustomerReview from '../Components/Home/HomeCustomerReview';
import HomeGallery from '../Components/Home/HomeGallery';

import QT from '../Components/QT';

class Home extends Component {
    render() {
        return (
            <div>
                <Header home="nav-item active" />
                <HomeContent />

                <QT />
                <HomeGallery />
                <div style={{ marginLeft: '9.5%', marginRight: '9.5%', marginBottom: '1%' }}>
                    <HomeCustomerReview />
                </div>

                <Footer />
            </div>
        )
    }
}
export default Home;