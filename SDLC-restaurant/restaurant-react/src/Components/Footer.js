import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer class="footer-area bg-f">
                <div class="container">
                    <div class="row" style={{textAlign: 'center'}}>
                        <div class="col-lg-4 col-md-6">
                            <h3>About Us</h3>
                            <p>C Team
                                <br></br>
                                Daniel Bram Chandra (Leader)
                                <br></br>
                                Angela Vitadewi
                                <br></br>
                                Adyt Prasetyo Insani
                            </p>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <h3>Contact information</h3>
                            <p class="lead">teamcbatch5@gmail.com</p>
                            <p class="lead">+1 234-567-890</p>
                            <p class>Home Living Park Tower 2 Lt 2, Tangerang, 15810 Indonesia</p>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <h3>Opening hours</h3>
                            <p><span class="text-color">Everyday </span> 24 hours</p>
                        </div>
                    </div>
                </div>
                <div class="copyright">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <p class="company-name">All Rights Reserved. &copy; 2021 | Team C</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}