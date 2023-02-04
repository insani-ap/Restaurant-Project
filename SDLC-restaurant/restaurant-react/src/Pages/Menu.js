import React, { Component } from 'react'
import Category from '../Components/CategoryMenu/Category';
import Subheader from '../Components/Subheader';
import Header from '../Components/Header2';
import Footer from '../Components/Footer';

class Menu extends Component {
    render() {
        return (
            <div>
                <Header menu="nav-item active" />
                {/* Subheader */}
                <Subheader title="Menu" />
                <Category />
                <Footer />
            </div>
        )
    }
}
export default Menu;
